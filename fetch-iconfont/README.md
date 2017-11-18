## fetch-iconfont
    @Desc: 从 iconfont.cn (阿里巴巴矢量图标库) 拉取、解析、下载 iconfont 资源到本地，并自动构建
    @Update: 2017-11-18
---

- 在 iconfont.cn 上创建项目，并挑选需要的字体图标，生成在线地址；
- 将生成的在线地址填写到 `run.js` 的 `iconfontURL` 变量中；
- 定位到 `run.js` 所在目录，运行 `node run`；
- 将在 `include` 文件夹下生成对应的 iconfont 资源。