const express = require("express");

const bodyParser = require("body-parser");

const prettier = require('prettier')

var isJson = require('is-json')

const browser = require('browser-detect');

const prettyFormat = require('pretty-format'); // CommonJS

const SitemapGenerator = require('sitemap-generator');

var moment = require('moment')

var suggest = require('suggestion')

var whoisinfo = require('whois-json')

var json2xls = require('json2xls')

var timeout = require('connect-timeout'); //express v4

const AlexaRank = require('alexa-rank-nodejs').default;

var isValidDomain = require('is-valid-domain');

const translate = require('@vitalets/google-translate-api');

const pdfMerge = require('easy-pdf-merge');

const ifsc = require('ifsc')

const ebookconvert = require('ebook-convert')

const libre = require('libreoffice-convert');

const gtts = require('gtts')

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

app.use(timeout('800s'));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

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

app.get('/encodeurl',(req,res) => {
  res.render('urlencoder',{title:"Encode Website URL Online - Free Media Tools"})
})

app.get('/decodeurl',(req,res) => {
  res.render('urldecoder',{title:"Decode Website URL Online - Free Media Tools"})
})

app.get('/texttospeech',(req,res) => {
  res.render('texttospeech',{title:"Free Text to Speech Online Converter - Free Media Tools"})
})

app.get('/minifyjson',(req,res) => {

res.redirect('https://minifyjson.com')

})

app.get('/speechtotext',(req,res) => {
  res.render('speechtotext',{title:"Free Speech to Text Online Converter - Free Media Tools"})
})

app.get('/mergepdf',(req,res) => {
  res.render('mergepdf',{title:"Concatenate or Merge Multiple PDF Files Online - Free Media Tools"})
})

app.get('/docxtopdf',(req,res) => {
  res.render('docxtopdf',{title:"DOCX to PDF Word to PDF Free Online Converter - Free Media Tools"})
})

app.get('/exceltopdf',(req,res) => {
  res.render('exceltopdf',{title:"XLSX or XLS Excel to PDF Online Converter - Free Media Tools"})
})

/*app.get('/instagramFontGenerator',(req,res)=>{

	res.sendFile(__dirname + "/instagramFontGenerator.html")

})*/

app.get('/epubtopdf',(req,res)=>{

	res.render("epubtopdf",{title:"EPUB to PDF - Convert your EPUB Books to PDF Online For Free - FreeMediaTools.com"})

})


app.get('/pdftoepub',(req,res)=>{

	res.render("pdftoepub",{title:"PDF to EPUB - Convert your PDF Documents to EPUB Books Online For Free - FreeMediaTools.com"})

})

app.get('/htmltopdf',(req,res)=>{

	res.render("htmltopdf",{title:"HTML to PDF - Convert your HTML Documents to PDF Online For Free - FreeMediaTools.com"})

})



app.post(
  "/videotomp3",
  videotomp3upload.single("videotomp3file"),
  (req, res) => {
    if (req.file) {
      console.log(req.file.path);

      outputFilePath = Date.now() + "output.mp3";

      exec(
        `ffmpeg -i ${req.file.path} -preset ultrafast ${outputFilePath}`,
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

    exec(`img2pdf ${list} -o ${outputFilePath}`, (err, stderr, stdout) => {
      if (err) {
        if (req.files) {
          req.files.forEach((file) => {
            fs.unlinkSync(file.path);
          });
        }
        res.send(err);
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



app.post("/pdftoepub", pdfconverterupload.single("file"), (req, res) => {
  if (req.file) {

var pdfoutput = Date.now() + "output.epub"

	var options = {
  input: path.join(__dirname,req.file.path),
  output: path.join(__dirname, pdfoutput),
  //authors: '"Seth Vincent"',
  pageBreaksBefore: '//h:h1',
  chapter: '//h:h1',
  insertBlankLine: true,
  insertBlankLineSize: '1',
  lineHeight: '12',
  marginTop: '50',
  marginRight: '50',
  marginBottom: '50',
  marginLeft: '50'
}
 
/*
* create epub file
*/
ebookconvert(options, function (err) {
  if (err) console.log(err)
  res.download(pdfoutput,(err) => {
	if(err){
          fs.unlinkSync(pdfoutput)
          res.send("Unable to download the file")		
	}

	fs.unlinkSync(pdfoutput)
  })
})

  }
});

const epubfilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (ext !== ".epub") {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

const epubtopdfconverter = multer({ storage: storage, fileFilter: epubfilter });



app.post("/epubtopdf", epubtopdfconverter.single("file"), (req, res) => {
  if (req.file) {

var pdfoutput = Date.now() + "output.pdf"

	var options = {
  input: path.join(__dirname,req.file.path),
  output: path.join(__dirname, pdfoutput),
  //authors: '"Seth Vincent"',
  pageBreaksBefore: '//h:h1',
  chapter: '//h:h1',
  insertBlankLine: true,
  insertBlankLineSize: '1',
  lineHeight: '12',
  marginTop: '50',
  marginRight: '50',
  marginBottom: '50',
  marginLeft: '50'
}
 
/*
* create epub file
*/
ebookconvert(options, function (err) {
  if (err) console.log(err)
  res.download(pdfoutput,(err) => {
	if(err){
          fs.unlinkSync(pdfoutput)
          res.send("Unable to download the file")		
	}

	fs.unlinkSync(pdfoutput)
  })
})

  }
});



const htmlfilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (ext !== ".html" && ext !== ".htm") {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

const htmltopdfconverter = multer({ storage: storage, fileFilter: htmlfilter });



app.post("/htmltopdf", htmltopdfconverter.single("file"), (req, res) => {
  if (req.file) {

var pdfoutput = Date.now() + "output.pdf"

	var options = {
  input: path.join(__dirname,req.file.path),
  output: path.join(__dirname, pdfoutput),
  //authors: '"Seth Vincent"',
  pageBreaksBefore: '//h:h1',
  chapter: '//h:h1',
  insertBlankLine: true,
  insertBlankLineSize: '1',
  lineHeight: '12',
  marginTop: '50',
  marginRight: '50',
  marginBottom: '50',
  marginLeft: '50'
}
 
/*
* create epub file
*/
ebookconvert(options, function (err) {
  if (err) console.log(err)
  res.download(pdfoutput,(err) => {
	if(err){
          fs.unlinkSync(pdfoutput)
          res.send("Unable to download the file")		
	}

	fs.unlinkSync(pdfoutput)
  })
})

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


app.post('/texttospeech',(req,res) => {

  var language = req.body.language

  var text = req.body.text

  console.log(language)

  console.log(text)

  var gttsVoice = new gtts(text,language)

  outputFilePath = Date.now() + "output.mp3"

  gttsVoice.save(outputFilePath,function(err,result){
    if(err){
      fs.unlinkSync(outputFilePath)
      res.send("An error takes place in generating the audio")
    }
    res.download(outputFilePath,(err) => {
      if(err){
        fs.unlinkSync(outputFilePath)
        res.send("An error occured in downloading the audio file")
      }
      fs.unlinkSync(outputFilePath)
    })
  })

})

const mergepdffilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".pdf"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var mergepdffilesupload = multer({storage:storage,fileFilter:mergepdffilter})


app.post('/mergepdf',mergepdffilesupload.array('file',100),(req,res) => {
    const files = []
    outputFilePath = Date.now() + "output.pdf"
    if(req.files){
      req.files.forEach(file => {
        console.log(file.path)
        files.push(file.path)
      });

      pdfMerge(files,outputFilePath,function(err){
	if(err){
	   res.send(err)
           
        }
          res.download(outputFilePath,(err) => {
          if(err){
            res.send(err)   
          }
          fs.unlinkSync(outputFilePath)
        })
      })
}
     
})


const docxtopdffilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".docx" &&
    ext !== ".doc"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};


const docxtopdfupload = multer({storage:storage,fileFilter:docxtopdffilter})

app.post('/docxtopdf',docxtopdfupload.single('file'),(req,res) => {
  if(req.file){
    console.log(req.file.path)
    outputFilePath = Date.now() + "output.pdf"

    const file = fs.readFileSync(req.file.path)

    libre.convert(file,'.pdf', undefined, (err, done) => {
      if (err) {
        fs.unlinkSync(req.file.path)
        fs.unlinkSync(outputFilePath)
        res.send(`Error converting file: ${err}`);
      }
      console.log(done)
      
      // Here in done you have pdf file which you can save or transfer in another stream
      fs.writeFileSync(outputFilePath, done);

      res.download(outputFilePath,(err) => {
        if(err){
          fs.unlinkSync(req.file.path)
          fs.unlinkSync(outputFilePath)
          res.send("Unable to download the file")
        }
        fs.unlinkSync(req.file.path)
        fs.unlinkSync(outputFilePath)
      })
  });
  }
})


const exceltopdffilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".xlsx" &&
    ext !== ".xls"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};


const exceltopdfupload = multer({storage:storage,fileFilter:exceltopdffilter})

app.post('/exceltopdf',exceltopdfupload.single('file'),(req,res) => {
  if(req.file){
    console.log(req.file.path)
    outputFilePath = Date.now() + "output.pdf"

    exec(`libreoffice --convert-to pdf --outputfile ${outputFilePath} ${req.file.path}`,(err,stderr,stdout) => {
      if(err){
        fs.unlinkSync(req.file.path)
        fs.unlinkSync(outputFilePath)
        res.send("Unable to convert the file")
      }

      res.download(outputFilePath,(err) => {
        if(err){
          fs.unlinkSync(req.file.path)
          fs.unlinkSync(outputFilePath)
          res.send("Unable to download the file")
        }
        fs.unlinkSync(req.file.path)
        fs.unlinkSync(outputFilePath)
      })


    })
  }
})


app.get('/speechtranslator',(req,res) => {
  res.render('speechtranslator',{title:"Speech Translator Online to Multiple Languages - Free Media Tools",translated:""})
})

app.post('/speechtranslator',(req,res) => {

  console.log(req.body.speech)

  translate(req.body.speech, {to: req.body.language}).then(response => {
    res.render('speechtranslator',{title:"Speech Translator Online to Multiple Languages - Free Media Tools",translated:response.text})
}).catch(err => {
    console.error(err);
});

})


app.get('/addphototoaudio',(req,res) => {
  res.render('addphototoaudio',{title:"Add Photo to Audio Mp3 and Upload to Youtube - FreeMediaTools.com"})
})

app.get('/reversevideo',(req,res) => {
  res.render('reversevideo',{title:"Reverse a Video Mp4 Online For Free - FreeMediaTools.com"})
})

app.post('/addphototoaudio', addwatermarkupload,(req,res) => {

  if (req.files['file'] && req.files['image']) {
    console.log(req.files['file'][0].path)
    console.log(req.files['image'][0].path)

    const width = 1280

    const height = 720

    var imagePath = Date.now() + path.extname(req.files['image'][0].path)

    var outputFilePath = Date.now() + "output.mp4"


    exec(
      `convert ${req.files['image'][0].path} -resize ${width}x${height} ${imagePath}`,
      (err, stderr, stdout) => {
        if (err) {
          fs.unlinkSync(req.files['image'][0].path);
          res.send("Some error occured during conversion Please try Again");
        }
        console.log("image converted");

        exec(
          `ffmpeg -i ${req.files['file'][0].path} -i ${imagePath} ${outputFilePath}`,
          (err, stderr, stdout) => {
            if (err) {
              fs.unlinkSync(req.files['file'][0].path);
              fs.unlinkSync(imagePath)
              fs.unlinkSync(outputFilePath);
              res.send("Some error occured during conversion Please try Again");
            }
            console.log("video converted");
            res.download(outputFilePath, (err) => {
              if (err) {
                fs.unlinkSync(req.files['file'][0].path);
              fs.unlinkSync(imagePath)
                fs.unlinkSync(outputFilePath);
                res.send("Server is unable to download the file");
              }
    
              fs.unlinkSync(req.files['file'][0].path);
              fs.unlinkSync(imagePath)
              fs.unlinkSync(outputFilePath);
            });
          }
        );
    
      }
    );
  } else {
    fs.unlinkSync(req.files['image'][0].path);
    fs.unlinkSync(req.files['file'][0].path)
  } 
})

app.post('/reversevideo',videotomp3upload.single("file"),(req,res) => {

console.log(req.file.path)

if (req.file) {
console.log("hi")
    console.log(req.file.path);

    outputFilePath =
      Date.now() + "output" + path.extname(req.file.originalname);

    exec(
      `ffmpeg -i ${req.file.path} -preset ultrafast -vf reverse -af areverse ${outputFilePath}`,
      (err, stderr, stdout) => {
        if (err) {
           fs.unlinkSync(req.file.path);
          fs.unlinkSync(outputFilePath);
          res.send(err);
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



})


app.get('/ifsc',(req,res)=> {

res.render('ifscinfo',{title:'IFSC Code Bank Information Finder',response:'',data:false})

})

app.post('/ifsc',(req,res) => {
    var code = req.body.ifsc

    if(ifsc.validate(code)){
        ifsc.fetchDetails(code).then(function(response) {
            console.log(response);
            res.render('ifscinfo',{title:'IFSC Code Bank Information Finder',response:response,data:true})
        });
    }
    else{

    res.send("IFSC Code is wrong")
    }
})



app.get('/jsontoexcel',(req,res) => {
    res.render('jsontoexcel',{title:'Convert Raw JSON to Excel File Free Converter - FreeMediaTools.com'})
})

app.post('/jsontoexcel',(req,res) => {

    var jsondata = req.body.json

    var exceloutput = Date.now() + "output.xlsx"

    if(isJson(jsondata)){
        var xls = json2xls(JSON.parse(jsondata));

        fs.writeFileSync(exceloutput, xls, 'binary');

        res.download(exceloutput,(err) => {
            if(err){
                fs.unlinkSync(exceloutput)
                res.send("Unable to download the excel file")
            }
            fs.unlinkSync(exceloutput)
        })
    }
    else{
        res.send("JSON Data is not valid")
    }

})


app.get('/alexasiteinfo',(req,res) => {
  res.render('alexasiteinfo',{title:"FREE Alexa Rank Of Website Checker Information - FreeMediaTools.com",flag:false,data:''})
})

app.post('/alexasiteinfo',async(req,res) => {

  var site = req.body.url
  console.log(site)

  if(isValidDomain(site)){

    var data = await AlexaRank.siteinfo(site);
    console.log(data);

    if(data.status === 400){
      res.send("Please enter domain without http or https")
    }else if(data.status === 404){
      res.send("Your Website Doesn't have a alexa rank")
    }
    else{
      res.render('alexasiteinfo',{title:"FREE Alexa Rank Of Website Checker Information - FreeMediaTools.com",flag:true,data:data})
    }

  }
  else{
    res.send("Domain name is not valid")
  }

})


app.get('/topalexasites',async(req,res) => {
  var data = await AlexaRank.topsite();
  console.log(data);
  res.render('topalexasites',{title:"FREE Top 50 Alexa Global Websites Rank List  - FreeMediaTools.com",flag:true,data:data,i:0})
})

app.get('/topcountrysites',(req,res) => {
  res.render('topcountrysites',{title:"FREE Top Alexa Website Rank List of all Countries in the World - FreeMediaTools.com",flag:false,data:'',i:''})
})

app.post('/topcountrysites',async(req,res) => {
  var country = req.body.country

  var data = await AlexaRank.topByCountry(country.toLowerCase()); // Indonesia

  console.log(data);

  if(data.status === 404){
    res.send("Your Country Code Doesn't have a alexa ranking")
  }else{

  res.render('topcountrysites',{title:"FREE Top Alexa Website Rank List of all Countries in the World - FreeMediaTools.com",flag:true,data:data,i:0})
  }
})


app.get("/domainwhoisinfo", (req, res) => {
  res.render("domainwhoisinfo", {
    title:
      "Whois Lookup Info Domain Availability & Registrar Checker - FreeMediaTools.com",
    data: "",
    flag: false,
    date: "",
    domainAge: "",
  });
});

app.get("/domainagechecker", (req, res) => {
  res.render("domainagechecker", {
    title:
      "Check Domain Age Online - Website Age Checker - Domain Age Checker - FreeMediaTools.com",
    data: "",
    flag: false,
    date: "",
    domainAge: "",
  });
});



app.get("/rawstringtojson", (req, res) => {
  res.render("rawstringtojson", {
    title:
      "Convert Raw String to JSON Online - Online String to JSON Converter - FreeMediaTools.com"
  });
});

app.post('/rawstringtojson',(req,res) => {
  var string = req.body.string

  var outputFile = Date.now() + "output.json"

  fs.writeFileSync(outputFile,toJSON(string))

  res.download(outputFile,(err) => {
    if(err){
      fs.unlinkSync(outputFile)
      res.send("Some error takes place in downloading the file")
    }

    fs.unlinkSync(outputFile)

  })


})

app.post("/domainwhoisinfo", async (req, res) => {
  var domain = req.body.domain;

  if(!isValidDomain(domain)){
    
    res.send("Invalid Domain please enter only domain without http or https")
   
  }
  else{

  var results = await whoisinfo(domain);

  var date = moment(results.creationDate).format("YYYY-MM-DD");
  var currentDate = moment(new Date()).format("YYYY-MM-DD");

  console.log(date);
  console.log(currentDate);

  var a = moment(date);
  var b = moment(currentDate);

  var years = b.diff(a, "year");
  a.add(years, "years");

  var months = b.diff(a, "months");
  a.add(months, "months");

  var days = b.diff(a, "days");

  var domainAge = years + " years " + months + " months " + days + " days";

  console.log(years);
  console.log(months);
  console.log(days);

  //console.log(year + "-" + month + "-" + dt);

  res.render("domainwhoisinfo", {
    title:
      "Whois Lookup Info Domain Availability & Registrar Checker - FreeMediaTools.com",
    data: results,
    flag: true,
    date: date,
    domainAge: domainAge,
  });

  }
});

app.post("/domainagechecker", async (req, res) => {
  var domain = req.body.domain;

  if(!isValidDomain(domain)){
    
    res.send("Invalid Domain please enter only domain without http or https")
   
  }
  else{  

  var results = await whoisinfo(domain);

  var date = moment(results.creationDate).format("YYYY-MM-DD");
  var currentDate = moment(new Date()).format("YYYY-MM-DD");

  console.log(date);
  console.log(currentDate);

  var a = moment(date);
  var b = moment(currentDate);

  var years = b.diff(a, "year");
  a.add(years, "years");

  var months = b.diff(a, "months");
  a.add(months, "months");

  var days = b.diff(a, "days");

  var domainAge = years + " years " + months + " months " + days + " days";

  console.log(years);
  console.log(months);
  console.log(days);

  //console.log(year + "-" + month + "-" + dt);

  res.render("domainagechecker", {
    title:
      "Check Domain Age Online - Website Age Checker - Domain Age Checker - FreeMediaTools.com",
    data: results,
    flag: true,
    date: date,
    domainAge: domainAge,
  });

  }
});


function toJSON(input) {
  const lines = input.split('\n')
  const result = []

  for (let i = 0; i < lines.length; i++) {        
      if (!lines[i])
          continue;
      const obj = {}
      const currentline = lines[i].split(':')

      obj[currentline[0]] = currentline[1]
      result.push(obj)
  }
  return JSON.stringify(result)
}


app.get('/xmlsitemapgenerator',(req,res) => {

res.render('xmlsitemapgenerator',{title:'Generate XML Sitemap for Domain Online - XML Sitemap Generator Online - FreeMediaTools.com'})

})

app.post('/xmlsitemapgenerator',(req,res) => {

var url = req.body.url

var outputfile = Date.now() + "output.xml"

const generator = SitemapGenerator(url, {
  stripQuerystring: false,
  filepath:outputfile
});

// register event listeners
generator.on('done', () => {

res.download(outputfile,(err) => {

if(err){

fs.unlinkSync(outputfile)

res.download("unable to download the sitemap file")

}

fs.unlinkSync(outputfile)


})
  
});

// start the crawler
generator.start();



})

app.get('/detectbrowser',(req,res) => {

const result = browser(req.headers['user-agent']);
 
// handle the case where we don't detect the browser

  res.render('detectbrowser',{title:'What is my Browser - Detect Your Browser Information Online - FreemMediaTools.com',browser:result,flag:true})


})


app.get('/keywordresearch',(req,res) => {
  
  
  res.render('keywordtool',{title:'FREE Keyword Research Tool For Google and Youtube - FreeMediaTools.com',data:'',flag:false})
})

app.post('/keywordresearch',(req,res) => {
  var keyword = req.body.keyword

  suggest(keyword, { levels: 1,client:'youtube' }, function (err, suggestions) {
    if (err) throw err;
    console.log(suggestions);

    res.render('keywordtool',{title:'FREE Keyword Research Tool For Google and Youtube - FreeMediaTools.com',data:suggestions,flag:true})
  });
})

app.get('/javascriptformatter',(req,res)=> {

  res.render('javascriptformatter',{title:'FREE Javascript Source Code Formatter Online - Format Javascript Source Code Online - FreeMediaTools.com',formatted:''})
  
})

app.post('/javascriptformatter',(req,res) => {
  var code = req.body.code

  var style = req.body.style

  console.log(style)

  var inputfile = Date.now() + "input.js"

  fs.writeFileSync(inputfile,code)
  var formatted


  if(style == "standard"){
    console.log("hi")
    exec(`standard-format ${inputfile}`,(err, stdout, stderr) => {
      if(err){
        fs.unlinkSync(inputfile)
        res.send(err)
      }
      fs.unlinkSync(inputfile)
      formatted = stdout
      console.log(formatted)
      res.render('javascriptformatter',{title:'FREE Javascript Source Code Formatter Online - Format Javascript Source Code Online - FreeMediaTools.com',formatted:formatted})
    })
  }
  if(style == "semicolons"){
    exec(`happiness-format ${inputfile}`,(err, stdout, stderr) => {
      console.log("hi again")
      if(err){
        fs.unlinkSync(inputfile)
        res.send("Unable to format the code")
      }
      fs.unlinkSync(inputfile)
      formatted = stdout
      console.log(formatted)
      res.render('javascriptformatter',{title:'FREE Javascript Source Code Formatter Online - Format Javascript Source Code Online - FreeMediaTools.com',formatted:formatted})
      
    })
  }
  
})


app.get('/javascriptfileformatter',(req,res)=> {

  res.render('javascriptfileformatter',{title:'FREE Javascript File Source Code Formatter Online - Format Javascript File Source Code Online - FreeMediaTools.com'})
  
})

const javascriptfilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (ext !== ".js") {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

const javascriptconverter = multer({ storage: storage, fileFilter: javascriptfilter });

app.post('/javascriptfileformatter',javascriptconverter.single('file'),(req,res) => {

if(req.file){

console.log(req.file.path)

var outputfile = Date.now() + "output.js"

var style = req.body.style

if(style == "standard"){
    console.log("hi")
    exec(`standard-format ${req.file.path}`,(err, stdout, stderr) => {
      if(err){
        fs.unlinkSync(req.file.path)
        res.send(err)
      }
      fs.unlinkSync(req.file.path)
      formatted = stdout
      fs.writeFileSync(outputfile,formatted)

      res.download(outputfile,(err) => {
	if(err) {
	 fs.unlinkSync(outputfile)
	res.send("some error happened in downloading the file")
         }
         fs.unlinkSync(outputfile)
      })
    })
  }
  if(style == "semicolons"){
    exec(`happiness-format ${req.file.path}`,(err, stdout, stderr) => {
      console.log("hi again")
      if(err){
        fs.unlinkSync(req.file.path)
        res.send("Unable to format the code")
      }
      fs.unlinkSync(req.file.path)
      formatted = stdout
      fs.writeFileSync(outputfile,formatted)
      res.download(outputfile,(err) => {
	if(err) {
	 fs.unlinkSync(outputfile)
	res.send("some error happened in downloading the file")
         }
         fs.unlinkSync(outputfile)
      }) 
    })
  }
  



} 

})




app.get('/htmlformatter',(req,res)=> {

  res.render('htmlformatter',{title:'FREE HTML Source Code Formatter Online - Format HTML Source Code Online - FreeMediaTools.com',formatted:''})
  
})

app.post('/htmlformatter',(req,res) => {
  var code = req.body.code

  var style = req.body.style

  console.log(style)

  var inputfile = Date.now() + "input.js"

  fs.writeFileSync(inputfile,code)


  if(style == "standard"){
    console.log("hi")
    exec(`standard-format ${inputfile}`,(err,stdout,stderr) => {
      if(err){
        fs.unlinkSync(inputfile)
        res.send(err)
      }
      fs.unlinkSync(inputfile)
      var formatted = stdout
      res.render('htmlformatter',{title:'FREE HTML Source Code Formatter Online - Format HTML Source Code Online - FreeMediaTools.com',formatted:formatted})
    })
  }
  if(style == "semicolons"){
    exec(`happiness-format ${inputfile}`,(err,stdout,stderr) => {
      console.log("hi again")
      if(err){
        fs.unlinkSync(inputfile)
        res.send("Unable to format the code")
      }
      fs.unlinkSync(inputfile)
      var formatted = stdout
      res.render('htmlformatter',{title:'FREE HTML Source Code Formatter Online - Format HTML Source Code Online - FreeMediaTools.com',formatted:formatted})
    })
  }
})


app.get('/privacypolicygenerator',(req,res) => {
    res.render('privacypolicygenerator',{title:'FREE Privacy Policy Generator Online For Websites - Generate Free Privacy Policy Page For your Domain - FreeMediaTools.com',websitename:'',websiteurl:''})
})

app.post('/privacypolicygenerator',(req,res) => {
    var url = req.body.url
    var name = req.body.name

    res.attachment()
    res.render('privacypolicytemplate',{title:'FREE Privacy Policy Generator Online For Websites - Generate Free Privacy Policy Page For your Domain - FreeMediaTools.com',websitename:name,websiteurl:url})
})


app.get('/contactusgenerator',(req,res) => {
    res.render('contactusgenerator',{title:'FREE Contact Us Generator Online For Websites - Generate Free Contact Us Page For your Domain - FreeMediaTools.com',email:'',websitename:'',websiteurl:''})
})

app.post('/contactusgenerator',(req,res) => {
    var url = req.body.url
    var email = req.body.email
    var name = req.body.name

    res.attachment()
    res.render('contactustemplate',{title:'FREE Contact Us Generator Online For Websites - Generate Free Contact Us Page For your Domain - FreeMediaTools.com',email:email,websitename:name,websiteurl:url})
})






app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});


