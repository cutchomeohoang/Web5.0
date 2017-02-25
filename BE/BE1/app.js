var fs = require('fs');
FileUntils = {
    readfile: function(file) {
        fs.readFile(file, function(err, data) {
            if (err) {
                return console.error(err);
            }
            return data.toString().split('\n');
        });
    },
    writefile: function(file, data) {
        fs.writeFile(file, data, {
            encoding: 'utf8',
            mode: '0666',
            flag: 'ax+'
        }, function(err) {
            if (err) {
                return console.error(err);
            }
            return console.log('Ghi file thanh cong');
        });
    }
}
var a = FileUntils.readfile('input.txt');
var b = [];

for(var i = 0; i< a.length-1; i++) {
  for( var j = i+1; j< a.length; j++){
    if(parseInt(a[i].substring(0, 1))===parseInt(a[j].substring(0, 1))){
      b.push(a[i].substring(0, 1))
    }
  }
}
