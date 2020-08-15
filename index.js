var express = require('express');
var fs = require('fs');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/:number', (req, res) => {
    var num = req.params.number;
    var klist = mbam_gen(num);
    console.log(klist);
    var data="";
    for (let index = 0; index < klist.length; index++) {
        data = data + klist[index] + "\n";
    }
    fs.writeFile("key.txt", data, (err)=>{
        if (err)
        throw err;
    else //nếu không thì hiển thị nội dung ghi file thành công
        console.log('Ghi file thanh cong!');
    })
})

function mbam_gen(num) {
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var number = '0123456789';
    var key = "";
    var lkey = [];
    for (let count = 0; count < num; count++) {
        for (let index = 1; index <= 20; index++) {
            if (index > 1 && index % 5 == 1) {
                key = key + "-" + alphabet[Math.floor(Math.random() * alphabet.length)];
            }
            else {
                key = key + alphabet[Math.floor(Math.random() * alphabet.length)];
            }
        }
        lkey.push(key);
        key = "";
    }
    return lkey
}
app.listen(4444);