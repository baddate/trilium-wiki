# NixOS 服务器安装
本页介绍配置 NixOS 中包含的 Trilium 模块。

# 要求
安装 [NixOS](https://nixos.org/)

# 配置
将其添加到您的 `configuration.nix` 中：

```
services.trilium-server.enable = true;

# default data directory: /var/lib/trilium
#services.trilium-server.dataDir = "/var/lib/trilium-sync-server";

# default bind address: 127.0.0.1, port 8080
#services.trilium-server.host = "0.0.0.0";
#services.trilium-server.port = 12783;
```

取消注释您想要更改的任何选项。

有关更多选项（包括 nginx 反向代理配置），请参阅 [NixOS 选项列表](https://search.nixos.org/options?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=trilium-server)。
