var glob = require("glob")
const fs = require('fs')

// options is optional
glob("*.{png,jpg,pdf,mp4,mp3,gif,jpeg,avi,scss,txt}", function (err, files) {
if(err){
console.log(err)
}
    for (const file of files) {
console.log(file)
         fs.unlinkSync(file)
    }
})