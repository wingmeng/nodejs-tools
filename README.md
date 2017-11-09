# nodejs-tools 基于 NodeJS 的小工具
    @Author: Wing Meng
    @Update: 2017-11-09
---
1. [markdown2html](/markdown2html) 
    > markdown 文档转 html，支持批量转换。
    - 将 md 文件放到 `src` 目录下；
    - 定位到 `run.js` 所在目录，运行 `node run`；
    - 将在 `build` 文件夹下生成转换后的 html 文档；
    - `temp.html` 文件是 HTML 模板，转换的内容将使用该模板，该模板支持自定义。

1. [batch naming photos](/batch-naming-photos)
    > 将照片按照人员姓名批量命名

    
    ![](batch-naming-photos/intro.gif)

    - 将需要处理的照片放到 `photos` 文件夹下；
     
         `demoPhotos` 文件夹存放有示例照片。

    - 按照片**升序**的顺序将对应的人员姓名写到 `names.txt` 文件中（也可以先通过 Excel 收集人员姓名，再一次性把姓名文字复制到 names.txt 中 ），一行一个；
    - 定位到 `run.js` 所在目录，运行 `node run`；
    - 照片将按姓名顺序重命名，并保存到 `ok` 文件夹下。