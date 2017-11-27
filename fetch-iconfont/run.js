var fs   = require('fs'),
    http = require('http');

/**
 * 资源拉取自：阿里巴巴矢量图标库 (iconfont.cn)
 */
var iconfontURL = '//at.alicdn.com/t/font_479525_abqmpfyfh9drhpvi.css';  // 字体的 CSS 路径
    fontType = ['eot', 'woff', 'ttf', 'svg'],  // 字体类型
    destPath = {  // 本地路径
        base: 'include/',
        css: 'css/',
        fonts: 'fonts/'
    };

/**
 * 下载 iconfont 的 CSS 文件
 */
http.get('http:' + iconfontURL, function(res) {
    res.setEncoding('utf8');

    var cssContent = '';  // 内容字符串

    // 下载数据
    res.on('data', function(chunk) {
        cssContent += chunk;
    });

    // 下载完成
    res.on('end', function() {
        var regRule = new RegExp(/(?=url\(\W)\S+(?=\W\))/, 'g');  // output: url('//xxx//xx.xx?t=xxxxx
        var fontURLs = getFontURLs(cssContent, regRule);

        modifyFontCSS(fontURLs, cssContent, regRule);
        downloadFonts(fontURLs);
    });
});

/**
 * 从 CSS 文本中解析出字体的地址
 * @param {string} content - 下载的 iconfont CSS 文件文本内容
 * @param {object} regEx - 正则表达式
 */
function getFontURLs(content, regEx) {
    var fontURLs = [];  // output: url('//xxx//xx.xx?t=xxxxx

    content.replace(regEx, function(match) {
        fontURLs.push(match);  // 保存从 CSS 文件中解析出的字体地址
    });

    // 处理 fontURLs 使其格式合法化
    fontURLs = fontURLs.map(item => {
        if (item.indexOf('data:application') === -1) {  // base64 形式的字体
            item = item.replace(/url\(\W/, '').split('?t=')[0];  // output: //xxx//xx.xx

            // 筛选 fontType 中设置的字体类型
            for (var i = 0; i < fontType.length; i++) {
                if (item.lastIndexOf('.' + fontType[i]) > 0) {
                    return item;
                }
            }
        }
    });

    return removeRepeat(fontURLs);  // 移除空值，合并重复 url
}

function modifyFontCSS(fonts, data, regEx) {
    fonts.forEach(item => {
        var fontName = returnFontName(item),
            fontHost = item.replace(fontName, ''),
            regEx = new RegExp(fontHost + fontName, 'g');

        data = data.replace(regEx, function(match) {
            return '../' + destPath.fonts + fontName;
        });
    });

    // 将调整完字体路径的 CSS 写入本地项目
    var localCSSFile = cssPath
        + iconfontURL.substr(iconfontURL.lastIndexOf('/'));

    fs.writeFile(localCSSFile, data, function (err) {
        if (err) {
            throw err;
        }
    });
}

/**
 * 从远程地址下载字体到本地
 * @param {array} urlArr - 字体远程地址
 */
function downloadFonts(urlArr) {
    urlArr.forEach(url => {
        var fileName = returnFontName(url),
            fileStream = fs.createWriteStream(
                destPath.base + destPath.fonts + fileName
            );

        http.get('http:' + url, function(res) {
            res.pipe(fileStream);  // 文件流写入

            // 下载完成
            res.on('end', function() {
                console.log(fileName + ' 下载成功');
            });
        });
    });
}

/**
 * 返回 url 地址中的字体名称
 * @param {string} url - 字体 url 地址
 * @returns {string} 字体名称
 */
function returnFontName(url) {
    return url.substr(url.lastIndexOf('/') + 1);
}

/**
 * 数组去重、去空值
 * @param {array} arr - 待处理数组
 * @returns {array} 合并重复项的数组
 */
function removeRepeat(arr) {
    var result = [],
        hash = {};

    for (var i = 0, elm; i < arr.length; i++) {
        if (arr[i]) {
            (elm = arr[i]) != null;
            if (!hash[elm]) {
                result.push(arr[i]);
                hash[elm] = true;
            }
        }
    }

    return result;
}
