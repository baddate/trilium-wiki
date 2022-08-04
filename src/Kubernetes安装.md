由于 Trilium 可以在 Docker 中运行，它也可以部署在 Kubernetes 中。Trilium 可以手动或按通过helm chart 应用于 Kubernetes。

推荐的方式是helm。

**安装helm**
----------

非官方的helm chart：[ohdearaugustin](https://github.com/ohdearaugustin): [https://github.com/ohdearaugustin/charts](https://github.com/ohdearaugustin/charts)

### **添加 helm 存储库**
```
    helm repo add <repo_name> https://ohdearaugustin.github.io/charts/
    "<repo_name>" has been added to your repositories
```
### **如何安装图表**

只需运行`helm install <repo_name>/trilium-notes`。

有关使用 Helm 的更多信息，请参阅 Helm 文档。