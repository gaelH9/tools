const express = require("express");

const bodyParser = require("body-parser");

const admzip = require('adm-zip')

const sharp = require('sharp')

const webp=require('webp-converter');

const fs = require("fs");

const { exec } = require("child_process");

const path = require("path");

var format;

var outputFilePath;

const multer = require("multer");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 80;

app.use(express.static("public"));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const videoFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".mp4" &&
    ext !== ".avi" &&
    ext !== ".flv" &&
    ext !== ".wmv" &&
    ext !== ".mov" &&
    ext !== ".mkv" &&
    ext !== ".gif" &&
    ext !== ".m4v"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

const imageFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".png" &&
    ext !== ".jpg" &&
    ext !== ".jpeg" &&
    ext !== ".bmp" &&
    ext !== ".tiff" &&
    ext !== ".gif" &&
    ext !== ".wmf" &&
    ext !== ".pdf"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

const audioFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".mp3" &&
    ext !== ".aac" &&
    ext !== ".wmv" &&
    ext !== "wav" &&
    ext !== ".m4a" &&
    ext !== ".flac" &&
    ext !== ".wmf" &&
    ext !== ".wma"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var maxSize = 200 * 1024 * 1024

var videotomp3upload = multer({ storage: storage,limits:{fileSize:maxSize},fileFilter: videoFilter });
var imageconverterupload = multer({
  storage: storage,
  fileFilter: imageFilter,
});
var audioconverter = multer({ storage: storage, fileFilter: audioFilter });
var dir = "public";
var subDirectory = "public/uploads";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);

  fs.mkdirSync(subDirectory);
}

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index",{title:"Free Media Tools"});
});

app.get("/videotomp3", (req, res) => {
  res.render("videotomp3",{title:"Video to Mp3 Online - Free Media Tools"});
});

app.get("/videoconverter", (req, res) => {
  res.render("videoconverter",{title:"Online Video Converter - Free Media Tools"});
});

app.get("/imageconverter", (req, res) => {
  res.render("imageconverter",{title:"Online Image Converter - Free Media Tools"});
});

app.get("/audioconverter", (req, res) => {
  res.render("audioconverter",{title:"Online Audio Converter - Free Media Tools"});
});

app.get("/removeaudiofromvideo", (req, res) => {
  res.render("removeaudiofromvideo",{title:"Remove Audio From Video - Free Media Tools"});
});

app.get("/resizeimage", (req, res) => {
  res.render("resizeimage",{title:"Resize Image Online - Free Media Tools"});
});

app.get("/imagetopdf", (req, res) => {
  res.render("imagetopdf",{title:"Image to PDF Online - Free Media Tools"});
});

app.get("/encryptpdf", (req, res) => {
  res.render("encryptpdf",{title:"Encrypt PDF with Password Online - Free Media Tools"});
});

app.get("/increasevideospeed", (req, res) => {
  res.render("increasevideospeed",{title:"Increase Video Speed Online - Free Media Tools"});
});

app.get("/decreasevideospeed", (req, res) => {
  res.render("decreasevideospeed",{title:"Decrease Video Speed Online - Free Media Tools"});
});

app.get('/compressvideo',(req,res) => {
  res.render('compressvideo',{title:"Compress Video Online - Free Media Tools"})
})

app.get('/compressimage',(req,res) => {
  res.render('compressimage',{title:"Compress Image Online - Free Media Tools"})
})

app.get('/compressaudio',(req,res) => {
  res.render('compressaudio',{title:"Compress Audio Online - Free Media Tools"})
})

app.get('/privacypolicy',(req,res) => {
  res.render('privacypolicy',{title:"Privacy Policy - Free Media Tools"})
})

app.get('/changevideoresolution',(req,res) => {
  res.render('changevideoresolution',{title:'Change Video Quality - Free Media Tools'})
})

app.get('/addwatermarktovideo',(req,res) => {
  res.render('addwatermarktovideo',{title:"Add Watermark to Video - Free Media Tools"})
})

app.get('/webptoimages',(req,res) => {
  res.render('webptoimages',{title:"Webp to Images Converter - Free Media Tools"})
})

app.get('/imagestowebp',(req,res) => {
  res.render('imagestowebp',{title:'Images to Webp Converter - Free Media Tools'})
})

app.get('/mergeimages',(req,res) => {
  res.render('mergeimages',{title:'Merge Multiple Images Online - Free Media Tools'})
})

app.get('/mergevideos',(req,res) => {
  res.render('mergevideos',{title:"Merge Multiple Videos Online - Free Media Tools"})
})

app.get('/mergeaudio',(req,res) => {
  res.render('mergeaudio',{title:"Merge Multiple Audio Online - Free Media Tools"})
})

app.get('/imagetobase64',(req,res) => {
  res.render('imagetobase64',{title:"Image to Base64 Online - Free Media Tools"})
})


app.get('/base64toimage',(req,res) => {
  res.render('base64toimage',{title:"Base64 to Image Online - Free Media Tools"})
})


app.get('/imagetobase64',(req,res) => {
  res.render('imagetobase64',{title:"Image to Base64 Online - Free Media Tools"})
})

app.get('/cropimage',(req,res) => {
  res.render('cropimage',{title:"Crop Image Online - Free Media Tools"})
})

app.get('/compressfiles',(req,res) => {
  res.render('compressfiles',{title:"Compress Files Online - Free Media Tools"})
})

app.get('/recordvideo',(req,res) => {
  res.render('recordvideo',{title:'Record Video From Webcam - Free Media Tools'})
})

app.get('/contactus',(req,res) => {
  res.render('contactus',{title:"Contact us Page - Free Media Tools"})
})

app.post(
  "/videotomp3",
  videotomp3upload.single("videotomp3file"),
  (req, res) => {
    if (req.file) {
      console.log(req.file.path);

      outputFilePath = Date.now() + "output.mp3";

      exec(
        `ffmpeg -i ${req.file.path} ${outputFilePath}`,
        (err, stderr, stdout) => {
          if (err) {
            fs.unlinkSync(req.file.path);
            res.send("Some error occured during conversion Please try Again");
          }

          res.download(outputFilePath, (err) => {
            if (err) {
              fs.unlinkSync(req.file.path);
              fs.unlinkSync(outputFilePath);
              res.send("Server is unable to download the file");
            }

            fs.unlinkSync(req.file.path);
            fs.unlinkSync(outputFilePath);
          });
        }
      );
    }
  }
);

app.post(
  "/videoconverter",
  videotomp3upload.single("videoconverterfile"),
  (req, res) => {
    if (req.file) {
      console.log(req.file.path);

      format = req.body.videoconverterformat;

      outputFilePath = Date.now() + "output." + format;

      exec(
        `ffmpeg -i ${req.file.path} -preset ultrafast -qscale 0  ${outputFilePath}`,
        (err, stderr, stdout) => {
          if (err) {
            fs.unlinkSync(req.file.path);
            res.send("Some error occured during conversion Please try Again");
          }
          console.log("video converted");
          res.download(outputFilePath, (err) => {
            if (err) {
              fs.unlinkSync(req.file.path);
              fs.unlinkSync(outputFilePath);
              res.send("Server is unable to download the file");
            }

            fs.unlinkSync(req.file.path);
            fs.unlinkSync(outputFilePath);
          });
        }
      );
    }
  }
);

app.post("/imageconverter", imageconverterupload.single("file"), (req, res) => {
  if (req.file) {
    console.log(req.file.path);

    format = req.body.format;

    outputFilePath = Date.now() + "output." + format;

    exec(
      `convert ${req.file.path} ${outputFilePath}`,
      (err, stderr, stdout) => {
        if (err) {
          fs.unlinkSync(req.file.path);
          res.send("Some error occured during conversion Please try Again");
        }
        console.log("image converted");
        res.download(outputFilePath, (err) => {
          if (err) {
            fs.unlinkSync(req.file.path);
            fs.unlinkSync(outputFilePath);
            res.send("Server is unable to download the file");
          }

          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
        });
      }
    );
  }
});

app.post("/audioconverter", audioconverter.single("file"), (req, res) => {
  if (req.file) {
    console.log(req.file.path);

    format = req.body.format;

    outputFilePath = Date.now() + "output." + format;

    exec(
      `ffmpeg -i ${req.file.path} -preset ultrafast ${outputFilePath}`,
      (err, stderr, stdout) => {
        if (err) {
          fs.unlinkSync(req.file.path);
          res.send("Some error occured during conversion Please try Again");
        }
        console.log("video converted");
        res.download(outputFilePath, (err) => {
          if (err) {
            fs.unlinkSync(req.file.path);
            fs.unlinkSync(outputFilePath);
            res.send("Server is unable to download the file");
          }

          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
        });
      }
    );
  }
});

app.post(
  "/removeaudiofromvideo",
  videotomp3upload.single("file"),
  (req, res) => {
    if (req.file) {
      console.log(req.file.path);

      outputFilePath =
        Date.now() + "output." + path.extname(req.file.originalname);

      exec(
        `ffmpeg -i ${req.file.path} -preset ultrafast -c copy -an ${outputFilePath}`,
        (err, stderr, stdout) => {
          if (err) {
            fs.unlinkSync(req.file.path);
            res.send("Some error occured during conversion Please try Again");
          }
          console.log("video converted");
          res.download(outputFilePath, (err) => {
            if (err) {
              fs.unlinkSync(req.file.path);
              fs.unlinkSync(outputFilePath);
              res.send("Server is unable to download the file");
            }

            fs.unlinkSync(req.file.path);
            fs.unlinkSync(outputFilePath);
          });
        }
      );
    }
  }
);

app.post("/resizeimage", imageconverterupload.single("file"), (req, res) => {
  if (req.file) {
    console.log(req.file.path);
    var width = parseInt(req.body.width);
    var height = parseInt(req.body.height);

    outputFilePath =
      Date.now() + "output." + path.extname(req.file.originalname);

    exec(
      `convert ${req.file.path} -resize ${width}x${height} ${outputFilePath}`,
      (err, stderr, stdout) => {
        if (err) {
          fs.unlinkSync(req.file.path);
          res.send("Some error occured during conversion Please try Again");
        }
        console.log("image converted");
        res.download(outputFilePath, (err) => {
          if (err) {
            fs.unlinkSync(req.file.path);
            fs.unlinkSync(outputFilePath);
            res.send("Server is unable to download the file");
          }

          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
        });
      }
    );
  } else {
    fs.unlinkSync(req.file.path);
  }
});

app.post("/imagetopdf", imageconverterupload.array("file", 100), (req, res) => {
  if (req.files) {
    var list = "";
    req.files.forEach((file) => {
      list += `${file.path}`;
      list += " ";
    });

    console.log(list);

    outputFilePath = Date.now() + "output.pdf";

    exec(`convert ${list} ${outputFilePath}`, (err, stderr, stdout) => {
      if (err) {
        if (req.files) {
          req.files.forEach((file) => {
            fs.unlinkSync(file.path);
          });
        }
        res.send("Some error occured during conversion Please try Again");
      }
      console.log("pdf converted");
      res.download(outputFilePath, (err) => {
        if (err) {
          if (req.files) {
            req.files.forEach((file) => {
              fs.unlinkSync(file.path);
            });
          }
          fs.unlinkSync(outputFilePath);
          res.send("Server is unable to download the file");
        }

        if (req.files) {
          req.files.forEach((file) => {
            fs.unlinkSync(file.path);
          });
        }
        fs.unlinkSync(outputFilePath);
      });
    });
  }
});

const pdfFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (ext !== ".pdf") {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

const pdfconverterupload = multer({ storage: storage, fileFilter: pdfFilter });

app.post("/encryptpdf", pdfconverterupload.single("file"), (req, res) => {
  if (req.file) {
    var password = req.body.password;

    console.log(req.file.path);

    outputFilePath = Date.now() + "output.pdf";

    exec(
      `qpdf --encrypt ${password} ${password} 40 -- ${req.file.path} ${outputFilePath}`,
      (err, stderr, stdout) => {
        if (err) {
          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);

          res.send("Some error occured during conversion Please try Again");
        }
        console.log("pdf converted");
        res.download(outputFilePath, (err) => {
          if (err) {
            fs.unlinkSync(req.file.path);

            fs.unlinkSync(outputFilePath);
            res.send("Server is unable to download the file");
          }
          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
        });
      }
    );
  }
});

app.post("/increasevideospeed", videotomp3upload.single("file"), (req, res) => {
  if (req.file) {
    console.log(req.file.path);

    var speed = req.body.speed;

    outputFilePath =
      Date.now() + "output" + path.extname(req.file.originalname);

    exec(
      `ffmpeg -i ${req.file.path} -preset ultrafast -filter_complex "[0:v]setpts=${speed}*PTS[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]" -qscale 0 ${outputFilePath}`,
      (err, stderr, stdout) => {
        if (err) {
          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
          res.send("Some error occured during conversion Please try Again");
        }
        console.log("video converted");
        res.download(outputFilePath, (err) => {
          if (err) {
            fs.unlinkSync(req.file.path);
            fs.unlinkSync(outputFilePath);
            res.send("Server is unable to download the file");
          }

          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
        });
      }
    );
  }
});

app.post("/decreasevideospeed", videotomp3upload.single("file"), (req, res) => {
  if (req.file) {
    console.log(req.file.path);

    var speed = req.body.speed;

    outputFilePath =
      Date.now() + "output" + path.extname(req.file.originalname);

    exec(
      `ffmpeg -i ${req.file.path} -preset ultrafast -filter:v "setpts=${speed}*PTS" -qscale 0 ${outputFilePath}`,
      (err, stderr, stdout) => {
        if (err) {
          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
          res.send("Some error occured during conversion Please try Again");
        }
        console.log("video converted");
        res.download(outputFilePath, (err) => {
          if (err) {
            fs.unlinkSync(req.file.path);
            fs.unlinkSync(outputFilePath);
            res.send("Server is unable to download the file");
          }

          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
        });
      }
    );
  }
});



app.post("/compressvideo", videotomp3upload.single("file"), (req, res) => {
  if (req.file) {
    console.log(req.file.path);


    outputFilePath =
      Date.now() + "output" + path.extname(req.file.originalname);

    exec(
      `ffmpeg -i ${req.file.path} -preset ultrafast ${outputFilePath}`,
      (err, stderr, stdout) => {
        if (err) {
          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
          res.send("Some error occured during conversion Please try Again");
        }
        console.log("video converted");
        res.download(outputFilePath, (err) => {
          if (err) {
            fs.unlinkSync(req.file.path);
            fs.unlinkSync(outputFilePath);
            res.send("Server is unable to download the file");
          }

          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
        });
      }
    );
  }
});



app.post("/compressaudio", audioconverter.single("file"), (req, res) => {
  if (req.file) {
    console.log(req.file.path);

    var bitrate = parseInt(req.body.bitrate)

    console.log(bitrate)


    outputFilePath =
      Date.now() + "output" + path.extname(req.file.originalname);

    exec(
      `ffmpeg -i ${req.file.path} -preset ultrafast -ab ${bitrate}k -ar 44100 ${outputFilePath}`,
      (err, stderr, stdout) => {
        if (err) {
          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
          res.send("Some error occured during conversion Please try Again");
        }
        console.log("video converted");
        res.download(outputFilePath, (err) => {
          if (err) {
            fs.unlinkSync(req.file.path);
            fs.unlinkSync(outputFilePath);
            res.send("Server is unable to download the file");
          }

          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
        });
      }
    );
  }
});


const imageFiltercompress = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".png" &&
    ext !== ".jpg" &&
    ext !== ".jpeg" &&
    ext !== ".bmp" &&
    ext !== ".tiff" &&
    ext !== ".gif" &&
    ext !== ".wmf"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var compressimageupload = multer({storage:storage,fileFilter:imageFiltercompress})


app.post("/compressimage", compressimageupload.single("file"), (req, res) => {
  if (req.file) {
    console.log(req.file.path);

    var quality = req.body.quality


    outputFilePath =
      Date.now() + "output" + path.extname(req.file.originalname);

    exec(
      `convert ${req.file.path} -quality ${quality} ${outputFilePath}`,
      (err, stderr, stdout) => {
        if (err) {
          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
          res.send("Some error occured during conversion Please try Again");
        }
        console.log("video converted");
        res.download(outputFilePath, (err) => {
          if (err) {
            fs.unlinkSync(req.file.path);
            fs.unlinkSync(outputFilePath);
            res.send("Server is unable to download the file");
          }

          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
        });
      }
    );
  }
});



app.post("/changevideoresolution", videotomp3upload.single("file"), (req, res) => {
  if (req.file) {
    console.log(req.file.path);

    var quality = req.body.quality


    outputFilePath =
      Date.now() + "output" + path.extname(req.file.originalname);

    exec(
      `ffmpeg -i ${req.file.path} -preset ultrafast -vf scale=${quality} -qscale 0 ${outputFilePath}`,
      (err, stderr, stdout) => {
        if (err) {
          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
          res.send("Some error occured during conversion Please try Again");
        }
        console.log("video converted");
        res.download(outputFilePath, (err) => {
          if (err) {
            fs.unlinkSync(req.file.path);
            fs.unlinkSync(outputFilePath);
            res.send("Server is unable to download the file");
          }

          fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
        });
      }
    );
  }
});





const addwatermarkupload = 
multer({storage:storage}).fields([{
  name:'file'},{name:'image'}
])

app.post("/addwatermarktovideo", addwatermarkupload, (req, res) => {
  if (req.files['file'] && req.files['image']) {
    console.log(req.files['file'][0].path)
    console.log(req.files['image'][0].path)




    outputFilePath =
      Date.now() + "output" + path.extname(req.files['file'][0].filename);

    exec(
      `ffmpeg -i ${req.files['file'][0].path} -i ${req.files['image'][0].path} \-filter_complex "overlay=x=(main_w-overlay_w)/2:y=(main_h-overlay_h)/2" ${outputFilePath}`,
      (err, stderr, stdout) => {
        if (err) {
          fs.unlinkSync(req.files['file'][0].path);
          fs.unlinkSync(req.files['image'][0].path)
          fs.unlinkSync(outputFilePath);
          res.send("Some error occured during conversion Please try Again");
        }
        console.log("video converted");
        res.download(outputFilePath, (err) => {
          if (err) {
            fs.unlinkSync(req.files['file'][0].path);
          fs.unlinkSync(req.files['image'][0].path)
            fs.unlinkSync(outputFilePath);
            res.send("Server is unable to download the file");
          }

          fs.unlinkSync(req.files['file'][0].path);
          fs.unlinkSync(req.files['image'][0].path)
          fs.unlinkSync(outputFilePath);
        });
      }
    );
  }
});

const webpFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".webp"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var webtoimagesupload = multer({storage:storage,fileFilter:webpFilter})


app.post("/webptoimages", webtoimagesupload.single("file"), (req, res) => {
  if (req.file) {
    console.log(req.file.path);

    const format = req.body.format

    outputFilePath =
      Date.now() + "output." + format;

  const result = webp.dwebp(req.file.path,outputFilePath,"-o");

  result.then((response) => {
    console.log(response)
    res.download(outputFilePath,(err) => {
      if(err){
        fs.unlinkSync(req.file.path)
        fs.unlinkSync(outputFilePath)
        res.send("Error in downloading the file")
      }

      fs.unlinkSync(req.file.path)
      fs.unlinkSync(outputFilePath)
    })
  })

    
  }
});




const webpFilter2 = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".png" &&
    ext !== ".jpg" &&
    ext !== ".jpeg" &&
    ext !== ".bmp" &&
    ext !== ".tiff" &&
    ext !== ".gif" &&
    ext !== ".wmf"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var imagestowebpupload = multer({storage:storage,fileFilter:webpFilter2})


app.post("/imagestowebp", imagestowebpupload.single("file"), (req, res) => {
  if (req.file) {
    console.log(req.file.path);

    outputFilePath =
      Date.now() + "output.webp";

  const result = webp.cwebp(req.file.path,outputFilePath,"-q 80");

  result.then((response) => {
    console.log(response)
    res.download(outputFilePath,(err) => {
      if(err){
        fs.unlinkSync(req.file.path)
        fs.unlinkSync(outputFilePath)
        res.send("Error in downloading the file")
      }

      fs.unlinkSync(req.file.path)
      fs.unlinkSync(outputFilePath)
    })
  })

    
  }
});



app.post("/mergeimages", imageconverterupload.array("file", 100), (req, res) => {
  if (req.files) {
    var list = "";
    req.files.forEach((file) => {
      list += `${file.path}`;
      list += " ";
    });

    var position = req.body.position

    console.log(list);

    outputFilePath = Date.now() + "output.png";

    exec(`convert ${list} ${position} ${outputFilePath}`, (err, stderr, stdout) => {
      if (err) {
        if (req.files) {
          req.files.forEach((file) => {
            fs.unlinkSync(file.path);
          });
        }
        res.send("Some error occured during conversion Please try Again");
      }
      console.log("image merged");
      res.download(outputFilePath, (err) => {
        if (err) {
          if (req.files) {
            req.files.forEach((file) => {
              fs.unlinkSync(file.path);
            });
          }
          fs.unlinkSync(outputFilePath);
          res.send("Server is unable to download the file");
        }

        if (req.files) {
          req.files.forEach((file) => {
            fs.unlinkSync(file.path);
          });
        }
        fs.unlinkSync(outputFilePath);
      });
    });
  }
});




app.post("/mergevideos", videotomp3upload.array("file", 100), (req, res) => {
  var list = ""
  var listFilePath = "public/uploads/" + Date.now() + "list.txt";

var outputFilePath = Date.now() + "output.mp4";
  if (req.files) {
    req.files.forEach((file) => {
      list += `file ${file.filename}`;
      list += "\n";
    });

    var writeStream = fs.createWriteStream(listFilePath);

    writeStream.write(list);

    writeStream.end();

    exec(
      `ffmpeg -safe 0 -f concat -i ${listFilePath} -c copy ${outputFilePath}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          req.files.forEach((file) => {
            fs.unlinkSync(file.path);
          });

          fs.unlinkSync(listFilePath);
          fs.unlinkSync(outputFilePath);
          return;
        } else {
          console.log("audio are successfully merged");
          res.download(outputFilePath, (err) => {
            if (err) {
              req.files.forEach((file) => {
                fs.unlinkSync(file.path);
              });
  
              fs.unlinkSync(listFilePath);
              fs.unlinkSync(outputFilePath);

              res.send("Some error takes place in merging audio")
            }

            req.files.forEach((file) => {
              fs.unlinkSync(file.path);
            });

            fs.unlinkSync(listFilePath);
            fs.unlinkSync(outputFilePath);
          });
        }
      }
    );
  }
});





app.post("/mergeaudio", audioconverter.array("file", 100), (req, res) => {
  var list = ""
  var listFilePath = "public/uploads/" + Date.now() + "list.txt";

var outputFilePath = Date.now() + "output.mp3";
  if (req.files) {
    req.files.forEach((file) => {
      list += `file ${file.filename}`;
      list += "\n";
    });

    var writeStream = fs.createWriteStream(listFilePath);

    writeStream.write(list);

    writeStream.end();

    exec(
      `ffmpeg -safe 0 -f concat -i ${listFilePath} -c copy ${outputFilePath}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          req.files.forEach((file) => {
            fs.unlinkSync(file.path);
          });

          fs.unlinkSync(listFilePath);
          fs.unlinkSync(outputFilePath);
          return;
        } else {
          console.log("videos are successfully merged");
          res.download(outputFilePath, (err) => {
            if (err) {
              req.files.forEach((file) => {
                fs.unlinkSync(file.path);
              });
  
              fs.unlinkSync(listFilePath);
              fs.unlinkSync(outputFilePath);

              res.send("Some error takes place in merging videos")
            }

            req.files.forEach((file) => {
              fs.unlinkSync(file.path);
            });

            fs.unlinkSync(listFilePath);
            fs.unlinkSync(outputFilePath);
          });
        }
      }
    );
  }
});


app.post("/cropimage", imageconverterupload.single("file"), (req, res) => {
  if (req.file) {

    var width = parseInt(req.body.width)

    var height = parseInt(req.body.height)

    outputFilePath = Date.now() + "output.png";

    sharp(req.file.path).extract({ width: width, height: height, left: 0, top: 0 }).toFile(outputFilePath)
    .then(function(new_file_info) {
        console.log("Image cropped and saved");
        res.download(outputFilePath,(err) => {
          if(err){
            fs.unlinkSync(req.file.path)
            fs.unlinkSync(outputFilePath)
            res.send("Some error in cropping the image")
          }
          fs.unlinkSync(req.file.path)
          fs.unlinkSync(outputFilePath)
        })
    })
    .catch(function(err) {
       fs.unlinkSync(req.file.path)
       fs.unlinkSync(outputFilePath)
        console.log("An error occured");
    });

    
  }
});


var compressfilesupload = multer({ storage: storage,limits:{fileSize:maxSize}});

app.post("/compressfiles", compressfilesupload.array("file", 100), (req, res) => {
  var zip = new admzip();
var outputFilePath = Date.now() + "output.zip";
  if (req.files) {
    req.files.forEach((file) => {
      console.log(file.path)
      zip.addLocalFile(file.path)
    });
    fs.writeFileSync(outputFilePath, zip.toBuffer());
    res.download(outputFilePath,(err) => {
      if(err){
        req.files.forEach((file) => {
          fs.unlinkSync(file.path)
        });
        fs.unlinkSync(outputFilePath) 
      }

      req.files.forEach((file) => {
        fs.unlinkSync(file.path)
      });

      fs.unlinkSync(outputFilePath)
    })
  }
});


app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});
