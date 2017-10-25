var fs = require('fs');
var marked = require('marked');
// console.log(marked('I am using __markdown__.'));

var src = 'src',
    output = 'build',
    tempFile = 'temp.html';  // 模板文件

fs.readdir(src, function(err, files) {
    if (files.length === 0) {
        console.log(src + ' 文件夹下无任何文件');
        return;
    }

    // 遍历文件
    files.forEach(function(fileName) {
        if (isFileType(fileName, 'md')) {  // 必须是 md 文件
            // 读取 md 文件
            fs.readFile(src + '/' + fileName, {
                encoding: 'utf8'
            }, function(err, data) {
                if (data) {
                    var htmlStr = marked(data);
                    var newFileName = fileName.substr(0, fileName.lastIndexOf('.md'));
                    createHtmlFile(newFileName, htmlStr);
                }
            });
        }
    });
});

// 检测文件类型
function isFileType(fileName, types) {
    types = types.split(',');
    var regRule = '\.(';
    for (var i = 0; i < types.length; i++) {
        if (i !== 0) {
            regRule += '|';
        }
        regRule += types[i].trim();
    }
    regRule += ')$';
    return new RegExp(regRule, 'i').test(fileName);
}

// 创建并写入 HTML 文件
function createHtmlFile(fileName, content) {
    // 读取模板文件
    fs.readFile(tempFile, {
        encoding: 'utf8'
    }, function(err, data) {
        if (data) {
            var filePath = output + '/' + fileName + '.html';
            data = data.replace('<title></title>', '<title>' + fileName + '</title>');
            data = data.replace('<body></body>', '<body>\n' + content + '\n</body>');
            fs.writeFile(filePath, data, {
                encoding: 'utf-8'
            }, function (err) {
                if (err) {
                    throw err;
                } else {
                    console.log('成功生成文件：' + filePath);
                }
            });
        }
    });
}