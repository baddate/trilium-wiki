我假设您已经创建了`trilium.yourdomain.com`的DNS的A记录，用于Trilium服务器。

1. 下载Docker镜像并创建容器
```
     docker pull zadam/trilium:[VERSION]
     
     docker create --name trilium -t -p 127.0.0.1:8080:8080 -v ~/trilium-data:/root/trilium-data zadam/trilium:[VERSION]
```
2. 配置Apache代理和WebSocket代理

i. 启用apache代理模块
```
     a2enmod ssl
     a2enmod proxy
     a2enmod proxy_http
     a2enmod proxy_wstunnel
```
ii. 创建一个新的let's encrypt加密证书
```
     sudo certbot certonly -d trilium.mydomain.com
```
选择standalone （2）并记下创建的证书的位置（通常为/etc/letsencrypt/live/...）

iii. 为apache创建一个新的虚拟主机文件（您可能要使用它`apachectl -S`来确定服务器的根目录，我的是/etc/apahce2）
```
     sudo nano /etc/apache2/sites-available/trilium.yourdomain.com.conf
```
将以下文本粘贴（并自定义）到配置文件中
```
     <VirtualHost *:80>
         ServerName http://trilium.yourdomain.com
     	RewriteEngine on
             RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,QSA,R=permanent]
     </VirtualHost>
     <VirtualHost *:443>
         ServerName https://trilium.yourdomain.com
         RewriteEngine On
     	RewriteCond %{HTTP:Connection} Upgrade [NC]
     	RewriteCond %{HTTP:Upgrade} websocket [NC]
     	RewriteRule /(.*) ws://localhost:8080/$1 [P,L]
         AllowEncodedSlashes NoDecode
         ProxyPass / http://localhost:8080/ nocanon
         ProxyPassReverse / http://localhost:8080/
         SSLCertificateFile /etc/letsencrypt/live/trilium.yourdomain.com/fullchain.pem
         SSLCertificateKeyFile /etc/letsencrypt/live/trilium.yourdomain.com/privkey.pem
         Include /etc/letsencrypt/options-ssl-apache.conf
     </VirtualHost>
```
iv. 通过`sudo a2ensite trilium.yourdomain.com.conf`启用虚拟主机 

v. 用`sudo systemctl reload apache2`重新加载apache2 

3. 创建并启用systemd服务以在系统启动时启动Docker容器

i. 创建一个新的空文件`/lib/systemd/system/trilium.service`，其内容为
```
     [Unit]
     Description=Trilium Server
     Requires=docker.service
     After=docker.service
     	
     [Service]
     Restart=always
     ExecStart=/usr/bin/docker start -a trilium
     ExecStop=/usr/bin/docker stop -t 2 trilium
     	
     [Install]
     WantedBy=local.target
```

ii. 安装，启用并启动服务
```
     sudo systemctl daemon-reload
     sudo systemctl enable trilium.service
     sudo systemctl start trilium.service
```