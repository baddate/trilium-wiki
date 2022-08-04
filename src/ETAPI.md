ETAPI 是 Trilium 的公共/外部 REST API。它从 Trilium v0.50 开始可用。

该文档采用 OpenAPI 格式，可[在此处](https://github.com/zadam/trilium/blob/master/src/etapi/etapi.openapi.yaml)获得。

**验证**
------

所有操作都必须使用令牌进行身份验证。您可以从 Options -> ETAPI 或以编程方式使用`/auth/login`REST 调用获取此令牌（请参阅[规范](https://github.com/zadam/trilium/blob/master/src/etapi/etapi.openapi.yaml)）。