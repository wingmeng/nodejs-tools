# nodejs-tools 基于 NodeJS 的小工具
    @Author: Wing Meng
    @Update: 2017-10-25
---
1. [markdown2html](/markdown2html) 
    > markdown 文档转 html，支持批量转换。
    - 将 md 文件放到 `src` 目录下；
    - 定位到 `run.js` 所在目录，运行 `node run`；
    - 将在 `build` 文件夹下生成转换后的 html 文档；
    - `temp.html` 文件是 HTML 模板，转换的内容将使用该模板，该模板支持自定义。