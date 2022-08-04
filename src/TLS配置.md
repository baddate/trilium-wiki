TLS配置是服务器安装所必需的，它与桌面端的使用无关。

首先要做的是获取TLS证书。您有两种选择：

* **推荐** - 获取由根证书颁发机构(root certificate authority)签名的TLS证书。对于个人用途，最好的选择是[Let's encrypt](https://letsencrypt.org/)。它是免费的、自动化且容易的。
* 生成自己的自签名证书。将证书导入到您连接到服务器安装的所有计算机中时会遇到额外的麻烦，因此不建议这样做。

## 修改config.ini

现在您已经有了证书，我们需要修改[数据目录](./数据目录.md)中的`config.ini`，以便Trilium使用它：

```
[Network]
port=8080
# true for TLS/SSL/HTTPS (secure), false for HTTP (unsecure).
https=true
# path to certificate (run "bash bin/generate-cert.sh" to generate self-signed certificate). Relevant only if https=true
certPath=/[username]/.acme.sh/[hostname]/fullchain.cer
keyPath=/[username]/.acme.sh/[hostname]/example.com.key
``` 

上面仅是当我使用**Let's encrypt**程序生成证书时如何在环境中设置的示例。您的路径可能完全不同。（请注意，如果您使用的是Docker安装，则这些路径应位于docker容器对应的分区或其他路径中。）

设置完之后，您可以重新启动Trilium，然后就可以使用"https"访问主机名。
