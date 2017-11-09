var fs = require('fs');
var src = 'photos',  // 待处理照片
	photoType = ['jpg', 'png'],  // 照片类型
	output = 'ok',  // 照片输出文件夹
	textFile = 'names.txt';  // 姓名文件
	
fs.readdir(src, function(err, files) {
	var photos = files.filter(function(item) {
		// 获取拓展名
		var extName = getExtName(item);
		return (photoType.indexOf(extName) > -1);
	});

	if (photos.length) {
		console.log('running: 成功读取 ' + photos.length + ' 张照片');
	} else {
		throw src + ' 文件夹下没有任何照片！';
	}

	// 读取姓名文件
	fs.readFile(textFile, {
		encoding: 'utf8'
	}, function(err, names) {
		if (err) {
			throw err;
		}
		
		console.log('running: 成功读取 ' + textFile);
		names = names.split('\r\n');

		renamePhotos(names, photos);
	});
});

function getExtName(fileName) {
	return fileName.substr(fileName.lastIndexOf('.') + 1);
}

function renamePhotos(names, photos) {
	if (names.length) {
		var count = 0;
		photos.forEach(function(filename, index) {
			var oldPath = src + '/' + filename,
				newPath = output + '/' + names[index] + '.' + getExtName(filename);

			fs.rename(oldPath, newPath, function(err) {
				if (err) {
					throw err;
				}
			});
			
			count++;
		});
		if (photos.length === count) {
			console.log('finished: 全部照片已命名完毕！');
		}
	}
}
