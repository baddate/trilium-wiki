Trilium可以作为docker映像运行。推荐作为在服务器上部署Trilium的方法。

**AMD64**、**ARMv6**、**ARMv7**和**ARMv8/64**的官方 docker 镜像发布在 docker hub上：[https ://hub.docker.com/r/zadam/trilium/](https://hub.docker.com/r/zadam/trilium/)

~感谢霍华德（Howard）为**ARMv7**和**ARMv8**提供的非官方docker镜像：~[~https://hub.docker.com/r/hlince/trilium~](https://hub.docker.com/r/hlince/trilium) ~(~[~build scripts~](https://gitea.e9g.rocks/howard/trilium-daily-build)~)~

**条件**
------

首先，您需要在计算机上安装 docker。以下是两个可以提供帮助的指南：

*   [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)
*   [https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04)

**拉取镜像**
--------
```
    docker pull zadam/trilium:[VERSION]
```
将[VERSION]替换为实际的最新版本，或使用“series”标签-例如`0.48-latest`。

**不推荐使用“latest”标签，因为它可能会将您的Trilium实例升级到新的次要版本(minor version)，这可能会破坏您的同步设置或引起其他问题。**

**在主机系统上准备数据目录**
----------------

Trilium 需要一个可以存储其数据的目录，然后需要将其挂载到 docker 容器中。容器作为用户“节点”运行，因此我们需要使该目录可供该用户使用：
```
    mkdir ~/trilium-data
    chmod 777 ~/trilium-data
```
由于这允许系统上的任何用户读取/写入此目录，因此建议仅在单用户系统上执行此操作。该目录将在下面使用（挂载）。

**运行镜像**
--------

这些命令将卷挂载到主机系统，以便在容器停止后保留 trilium 的数据（最重要的是[文档](./文档.md)）并且不会被清除。

### **仅限本地**

这将运行容器，使其仅在本地主机上可用。使用它来测试安装：通过运行此命令的同一台机器上的 Web 浏览器，或者如果您正在使用带有 nginx/apache 的代理。
```
    sudo docker run -t -i -p 127.0.0.1:8080:8080 -v ~/trilium-data:/home/node/trilium-data zadam/trilium:[VERSION]
```
1.  使用`docker ps`测试并查看 docker 映像是否正在运行：
2.  通过打开浏览器并转到`127.0.0.1:8080`访问 trilium 

### **仅限本地网络**

此命令将运行容器，使其仅在您的本地网络上可用。如果您不想向 Internet 的其余部分开放端口，则此方法更为可取。但是，您仍然可以通过使用 WireGuard 之类的 VPN 首先进入您自己的网络从外部访问它。此方法确实假定您的本地网络限制外部访问。

首先，您必须在 Docker 中创建一个新网络来访问您的本地网络。这是一个示例，请注意“parent”和网络编号，因为它可能与您自己的不同。如需更多详细信息，[请单击此处](https://blog.oddbit.com/post/2018-03-12-using-docker-macvlan-networks/)。
```
    docker network create -d macvlan -o parent=eth0 --subnet 192.168.2.0/24 --gateway 192.168.2.254 --ip-range 192.168.2.252/27 mynet
```
其次，您必须调整 docker run 命令，以便将这个网络考虑在内，但继续使用 localhost 来限制端口对外界的可访问性。
```
    docker run --net=mynet -d -p 127.0.0.1:8080:8080 -v ~/trilium-data:/home/node/trilium-data zadam/trilium:0.48-latest
```
最后，使用 docker inspect 查找要连接的本地 IP 地址。您可以从连接到本地网络的所有设备访问它，例如：[local:ip]:8080。
```
    docker ps
    docker inspect [container_name] 
```
### **随处可用**

这会将容器作为后台进程运行，并且可以从任何 IP 地址访问
```
    docker run -d -p 0.0.0.0:8080:8080 -v ~/trilium-data:/home/node/trilium-data zadam/trilium:[VERSION]
```
要停止此后台 docker 进程，请使用`docker ps`获取“CONTAINER ID”，然后使用`docker stop <CONTAINER ID>`

### **不同的数据目录位置**

如果您想以非默认方式运行您的实例，请如下所示使用volume转换：`-v ~/YourOwnDirectory:/home/node/trilium-data zadam/trilium:[VERSION]`. 重要的是要了解 Docker 如何使用volume工作，第一个路径是您自己的，第二个路径是虚拟绑定的。详细信息： [https://docs.docker.com/storage/volumes/](https://docs.docker.com/storage/volumes/)