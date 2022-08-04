Trilium Notes支持导入Markdown（CommonMark风格）。

## 导入

### 剪贴板导入

如果您只想从剪贴板导入makrdown的一部分，则可以从编辑器块菜单中进行：

![](gif/markdown-inline-import.gif)

### 文件导入

您还可以从以下文件导入Markdown文件：

*   单个markdown文件（扩展名为.md）
*   整个markdown文件树（打包到[.zip](https://en.wikipedia.org/wiki/Tar_(computing))归档文件中）
    *   Markdown文件需要打包到ZIP存档中，因为浏览器无法读取目录，只能读取单个文件。
    *   您可以使用例如[7-zip](https://www.7-zip.org/)将markdown文件的目录打包到ZIP文件中

![](gif/markdown-file-import.gif)

## 导出

### 子树导出

您可以将整个子树导出到ZIP存档，该存档将具有按照子树结构建模的目录结构：

![](gif/markdown-export-subtree.gif)

### 单个笔记导出

如果您只想导出不带子树的单个笔记，则可以从“Note actions”菜单中进行：

![](gif/markdown-export-note.gif)
