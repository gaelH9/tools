const express = require("express");

const API_KEY = "5EjcC1fqxLi5THULGju4fhLM"

const textToImage = require('text-to-image');

const ImageDataURI = require('image-data-uri');

const bodyParser = require("body-parser");

var validateIp = require('ip-validator');

const ip = require("ip")

var geoIP = require('offline-geo-from-ip');

var get_ip = require('ipware')().get_ip;

const puppeteer = require('puppeteer')

var cssToLess = require("gulp-css2less");

var Jimp = require("jimp")

var pngtoico = require("png-to-ico")

var gulp = require("gulp");

const cricData= require('cric-player-info');

const prettier = require('prettier')

var extract = require('pdf-text-extract')

const {spawn} = require('child_process');

var sanitize = require("sanitize-filename");

const $ = require('jquery')

var isJson = require('is-json')

const currencycodes = require('currency-codes/data')

const currencyconverter = require('currency-converter-lt')

const browser = require('browser-detect');

const prependhttp = require('prepend-http')

const prettyFormat = require('pretty-format'); // CommonJS

const SitemapGenerator = require('sitemap-generator');

var lessToScss = require('gulp-less-to-scss');

var moment = require('moment')

var suggest = require('suggestion')

var whoisinfo = require('whois-json')

var json2xls = require('json2xls')

var timeout = require('connect-timeout'); //express v4

const AlexaRank = require('alexa-rank-nodejs').default;

var isValidDomain = require('is-valid-domain');

const translate = require('@vitalets/google-translate-api');

const IP2Region = require('ip2region');
const query = new IP2Region();
const res = query.search('120.24.78.68');

translate(res.country, {to: 'en'}).then(response => {
    console.log(response);
    
}).catch(err => {
    console.error(err);
});

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

var ipdata

app.use(timeout('800s'));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 app.use(function(req, res, next) {
     var ip_info = get_ip(req);
     console.log(ip_info);
     ipdata = ip_info
     // { clientIp: '127.0.0.1', clientIpRoutable: false }
     next();
 });

const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

var rimraf = require('rimraf')

var uploadsDir = __dirname + '/public/uploads';

fs.readdir(uploadsDir, function(err, files) {
  files.forEach(function(file, index) {
    fs.stat(path.join(uploadsDir, file), function(err, stat) {
      var endTime, now;
      if (err) {
        return console.error(err);
      }
      now = new Date().getTime();
      endTime = new Date(stat.ctime).getTime() + 3600000;
      if (now > endTime) {
        return rimraf(path.join(uploadsDir, file), function(err) {
          if (err) {
            return console.error(err);
          }
          console.log('successfully deleted');
        });
      }
    });
  });
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
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
var videotomp3upload2 = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: videoFilter,
}).single('file');

var videotomp3upload3 = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: videoFilter,
}).single('file');
var videotomp3upload4 = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: videoFilter,
}).single('file');
var imageconverter2 = multer({
  storage: storage,
  fileFilter: imageFilter,
}).single('file');
var audioconverter = multer({ storage: storage, fileFilter: audioFilter });
var audioconverter2 = multer({ storage: storage, fileFilter: audioFilter }).single('file');
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


app.get("/texttoimage", (req, res) => {
  res.render("texttoimage",{title:"FREE Text to JPG/PNG Image Online Tool  - Free Media Tools"});
});

app.get("/extracttextfromimage", (req, res) => {
  res.render("extracttextfromimage",{title:"FREE Extract Text or OCR From Image File Online Tool - Free Media Tools"});
});

app.post('/texttoimage',(req,res) => {
    console.log(req.body.text)
    console.log(req.body.width)
    const dataUri = textToImage.generateSync(req.body.text, {
        debug: false,
        maxWidth: parseInt(req.body.width),
        fontSize:parseInt(req.body.fontsize),
        fontFamily: 'Arial',
        lineHeight:parseInt(req.body.height),
        margin: 10,
        bgColor: req.body.backgroundcolor,
        textColor: req.body.textcolor,
      });

      console.log(dataUri)
      ImageDataURI.outputFile(dataUri, "output88.png");
      res.download("output88.png",() => {

      })
})

app.get('/capitalfinder',(req,res) => {


res.render("capitalfinder",{title:"FREE World Countries Capital Finder Online App - Free Media Tools "})


})

app.get('/populationfinder',(req,res) => {


res.render("populationfinder",{title:"FREE World Countries Population Finder Online App - Free Media Tools "})


})

app.get('/drivedownloader',(req,res) => {


res.render("drivedownloader",{title:"FREE Google Drive File Downloader Online Tool to Generate Direct Download Links of Files Generator - Free Media Tools "})


})

app.get('/whatsapplinkgenerator',(req,res) => {


res.render("whatsapplinkgenerator",{title:"FREE Whatsapp Message me Link Generator Using Mobile Number Online Tool - Free Media Tools "})


})


app.get('/percentagecalculator',(req,res) => {


res.render("percentagecalculator",{title:"FREE Percentage Calculator Online Tool to Calculate Percentage of any Number - Free Media Tools "})


})



app.get('/percentagecalculatorwidget',(req,res) => {


res.render("percentagecalculatorwidget",{title:"FREE Percentage Calculator Online Widget Tool in Javascript to Calculate Percentage of any Number - Free Media Tools "})


})


app.get('/drivelinkgenerator',(req,res) => {


res.render("drivelinkgenerator",{title:"FREE Online Tool to Generate Google Drive,OneDrive & Dropbox File Download Direct Links to Download Files Locally - Free Media Tools "})


})


app.get('/blurbackgroundimage',(req,res) => {

res.render("blurbackground",{title:"FREE Tool to Blur Background of Image Online  - Free Media Tools "})


})


app.get('/scientificalculator',(req,res) => {


res.render("scientificalculator",{title:"FREE Advanced Scientific Calculator Online Tool For Students - Free Media Tools "})


})

app.get('/mathscientificalculator',(req,res) => {


res.render("mathscientificalculator",{title:"FREE Advanced Math.js Scientific Calculator Online Tool in Javascript For Students - Free Media Tools "})


})

app.get('/randomnamepicker',(req,res) => {


res.render("randomnamepicker",{title:"FREE Random Name or Choice Giveaway Picker Online Tool- Free Media Tools "})


})


app.post("/capitalfinder",(req,res) => {

var datatoSend

console.log(req.body.country)

var pythoncapitalfinder = spawn('python3', ['capital.py',req.body.country]);

 pythoncapitalfinder.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  datatoSend = data.toString()
 });

 pythoncapitalfinder.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);

 console.log(datatoSend)

 res.json({
   capital:datatoSend
 })

 });

})


app.post("/populationfinder",(req,res) => {

var datatoSend

console.log(req.body.country)

var pythoncapitalfinder = spawn('python3', ['populationfinder.py',req.body.country]);

 pythoncapitalfinder.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  datatoSend = data.toString()
 });

 pythoncapitalfinder.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);

 console.log(datatoSend)

 res.json({
   population:datatoSend
 })

 });

})

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

app.get('/upsidedowntextgenerator',(req,res) => {
  res.render('upsidedowntextgenerator',{title:"FREE Upside Down Text Generator Online Tool - Free Media Tools"})
})

app.get('/youtubeurlshortener',(req,res) => {
  res.render('youtubeurlshortener',{title:"FREE Youtube Video URL Shortener Online Tool - Free Media Tools"})
})

app.get('/compressfiles',(req,res) => {
  res.render('compressfiles',{title:"Compress Files Online - Free Media Tools"})
})

app.get('/jsontojsonschemagenerator',(req,res) => {
  res.render('jsontojsonschemagenerator',{title:"FREE JSON to JSON Schema Generator Online Tool - Free Media Tools"})
})

app.get('/jsonformgenerator',(req,res) => {
  res.render('jsonformgenerator',{title:"FREE JSON Schema Online HTML5 Form Generator Tool - Free Media Tools"})
})

app.get('/recordvideo',(req,res) => {
  res.render('recordvideo',{title:'Record Video From Webcam and Upload to Google Drive Online Tool - Free Media Tools'})
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

app.get('/ezoicadsensecalculator',(req,res) => {
  res.render('ezoicadsensecalculator',{title:"FREE Ezoic Ads or Google Adsense Income Calculator Online Tool by Views & epmv or rpm - Free Media Tools"})
})




app.get('/epubtopdf',(req,res)=>{

	res.render("epubtopdf",{title:"EPUB to PDF - Convert your EPUB Books to PDF Online For Free - FreeMediaTools.com"})

})


app.get('/pdftoepub',(req,res)=>{

	res.render("pdftoepub",{title:"PDF to EPUB - Convert your PDF Documents to EPUB Books Online For Free - FreeMediaTools.com"})

})

app.get('/htmltopdf',(req,res)=>{

	res.render("htmltopdf",{title:"HTML to PDF - Convert your HTML Documents to PDF Online For Free - FreeMediaTools.com"})

})

app.post('/uploadvideotomp3',(req,res) =>{
  videotomp3upload2(req,res,function(err) {
    if(err) {
        return res.end("Error uploading file.");
    }
    res.json({
        path:req.file.path
    })
});
})

app.post('/videotomp3',(req,res) => {
  console.log(req.body)

  output = Date.now() + "output.mp3"

  exec(`ffmpeg -i ${req.body.path} -preset ultrafast ${output}`,(err,stdout,stderr) => {
     if(err){
         res.json({
             error:"some error takes place"
         })
     }
     res.json({
         path:output
     })
  })
});

app.get('/download',(req,res) => {
  var pathoutput = req.query.path
  console.log(pathoutput)
  var fullpath = path.join(__dirname,pathoutput)
  res.download(fullpath,(err) =>{
      if(err){
          fs.unlinkSync(fullpath)
          res.send(err)
      }
      fs.unlinkSync(fullpath)
  })
})

app.post('/uploadvideoconverter',(req,res) =>{
  videotomp3upload3(req,res,function(err) {
    if(err) {
        return res.end("Error uploading file.");
    }
    res.json({
        path:req.file.path
    })
});
})

app.post(
  "/videoconverter",
  (req, res) => {
      console.log(req.body.path);

      format = req.body.format;

      outputFilePath = Date.now() + "output." + format;

      exec(
        `ffmpeg -i ${req.body.path} -preset ultrafast -qscale 0  ${outputFilePath}`,
        (err, stdout,stderr) => {
          if(err){
            res.json({
                error:"some error takes place"
            })
        }
        res.json({
            path:outputFilePath
        })
  })
    
  })


app.post(
    "/imageconverter",
    (req, res) => {
        console.log(req.body.path);
  
        format = req.body.format;
  
        outputFilePath = Date.now() + "output." + format;
  
        exec(
          `ffmpeg -i ${req.body.path} -preset ultrafast ${outputFilePath}`,
          (err, stdout,stderr) => {
            if(err){
              res.json({
                  error:"some error takes place"
              })
          }
          res.json({
              path:outputFilePath
          })
    })
      
    })
  
    app.post('/uploadimageconverter',(req,res) =>{
      imageconverter2(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.json({
            path:req.file.path
        })
    });
    })
      

app.post(
      "/audioconverter",
      (req, res) => {
          console.log(req.body.path);
    
          format = req.body.format;
    
          outputFilePath = Date.now() + "output." + format;
    
          exec(
            `ffmpeg -i ${req.body.path} -preset ultrafast ${outputFilePath}`,
            (err, stdout,stderr) => {
              if(err){
                res.json({
                    error:"some error takes place"
                })
            }
            res.json({
                path:outputFilePath
            })
      })
        
      })
    
      app.post('/uploadaudioconverter',(req,res) =>{
        audioconverter2(req,res,function(err) {
          if(err) {
              return res.end("Error uploading file.");
          }
          res.json({
              path:req.file.path
          })
      });
      })

app.post(
        "/removeaudiofromvideo",
        (req, res) => {
            console.log(req.body.path);
      
            outputFilePath = Date.now() + "output." + path.extname(req.body.path);
      
            exec(
              `ffmpeg -i ${req.body.path} -preset ultrafast -c copy -an ${outputFilePath}`,
              (err, stdout,stderr) => {
                if(err){
                  res.json({
                      error:"some error takes place"
                  })
              }
              res.json({
                  path:outputFilePath
              })
        })
          
        })
      
        app.post('/uploadremoveaudiofromvideo',(req,res) =>{
          videotomp3upload4(req,res,function(err) {
            if(err) {
                return res.end("Error uploading file.");
            }
            res.json({
                path:req.file.path
            })
        });
        })
      
app.post(
          "/resizeimage",
          (req, res) => {
              console.log(req.body.path);
              var width = parseInt(req.body.width);
    var height = parseInt(req.body.height);
        
              outputFilePath = Date.now() + "output." + path.extname(req.body.path);
              console.log(outputFilePath)
        
              exec(
                `convert ${req.body.path} -resize ${width}x${height} ${outputFilePath}`,
                (err, stdout,stderr) => {
                  if(err){
                    res.json({
                        error:"some error takes place"
                    })
                }
                res.json({
                    path:outputFilePath
                })
          })
            
          })
          var resizeimageupload = multer({
            storage: storage,
            fileFilter: imageFilter,
          }).single('file');
        
          app.post('/uploadresizeimage',(req,res) =>{
            resizeimageupload(req,res,function(err) {
              if(err) {
                  return res.end("Error uploading file.");
              }
              res.json({
                  path:req.file.path
              })
          });
          })
        
   app.post(
            "/imagetopdf",
            (req, res) => {

                var list = req.body.list
               
          
                outputFilePath = Date.now() + "output.pdf";
                console.log(outputFilePath)
          
                exec(
                  `img2pdf ${list} -o ${outputFilePath}`,
                  (err, stdout,stderr) => {
                    if(err){
                      res.json({
                          error:"some error takes place"
                      })
                  }
                  res.json({
                      path:outputFilePath
                  })
            })
              
            })
            var imagetopdfupload = multer({
              storage: storage,
              fileFilter: imageFilter,
            }).array('file',100);
          
            app.post('/uploadimagetopdf',(req,res) =>{
              imagetopdfupload(req,res,function(err) {
                if(err) {
                    return res.end("Error uploading file.");
                }
                var list = "";
    req.files.forEach((file) => {
      list += `${file.path}`;
      list += " ";
    });
                res.json({
                    list:list
                })
            });
            })
 
app.post(
              "/encryptpdf",
              (req, res) => {
                  console.log(req.body.path);
                  var password = req.body.password
            
                  outputFilePath = Date.now() + "output.pdf";
                  console.log(outputFilePath)
            
                  exec(
                    `qpdf --encrypt ${password} ${password} 40 -- ${req.body.path} ${outputFilePath}`,
                    (err, stdout,stderr) => {
                      if(err){
                        res.json({
                            error:"some error takes place"
                        })
                    }
                    res.json({
                        path:outputFilePath
                    })
              })
                
              })
              const pdfFilter = function (req, file, callback) {
                var ext = path.extname(file.originalname);
                if (ext !== ".pdf") {
                  return callback("This Extension is not supported");
                }
                callback(null, true);
              };

              var encryptpasswordupload = multer({
                storage: storage,
                fileFilter: pdfFilter,
              }).single('file');
            
              app.post('/uploadencryptpdf',(req,res) =>{
                encryptpasswordupload(req,res,function(err) {
                  if(err) {
                      return res.end("Error uploading file.");
                  }
                  res.json({
                      path:req.file.path
                  })
              });
              })

app.post(
                "/increasevideospeed",
                (req, res) => {
                    console.log(req.body.path);
                    var speed = req.body.speed
              
                    outputFilePath = Date.now() + "output" + path.extname(req.body.path);
                    console.log(outputFilePath)
              
                    exec(
                      `ffmpeg -i ${req.body.path} -preset ultrafast -filter_complex "[0:v]setpts=${speed}*PTS[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]" -qscale 0 ${outputFilePath}`,
                      (err, stdout,stderr) => {
                        if(err){
                          res.json({
                              error:"some error takes place"
                          })
                      }
                      res.json({
                          path:outputFilePath
                      })
                })
                  
                })
          
                var increasevideospeedupload = multer({
                  storage: storage,
                  fileFilter: videoFilter,
                }).single('file');
              
                app.post('/uploadincreasevideospeed',(req,res) =>{
                  increasevideospeedupload(req,res,function(err) {
                    if(err) {
                        return res.end("Error uploading file.");
                    }
                    res.json({
                        path:req.file.path
                    })
                });
                })
              
          
                app.post(
                  "/decreasevideospeed",
                  (req, res) => {
                      console.log(req.body.path);
                      var speed = req.body.speed
                
                      outputFilePath = Date.now() + "output" + path.extname(req.body.path);
                      console.log(outputFilePath)
                
                      exec(
                        `ffmpeg -i ${req.body.path} -preset ultrafast -filter:v "setpts=${speed}*PTS" -qscale 0 ${outputFilePath}`,
                        (err, stdout,stderr) => {
                          if(err){
                            res.json({
                                error:"some error takes place"
                            })
                        }
                        res.json({
                            path:outputFilePath
                        })
                  })
                    
                  })
            
                  var decreasevideospeedupload = multer({
                    storage: storage,
                    fileFilter: videoFilter,
                  }).single('file');
                
                  app.post('/uploaddecreasevideospeed',(req,res) =>{
                    decreasevideospeedupload(req,res,function(err) {
                      if(err) {
                          return res.end("Error uploading file.");
                      }
                      res.json({
                          path:req.file.path
                      })
                  });
                  })

app.post(
                    "/compressvideo",
                    (req, res) => {
                        console.log(req.body.path);
        
                  
                        outputFilePath = Date.now() + "output" + path.extname(req.body.path);
                        console.log(outputFilePath)
                  
                        exec(
                          `ffmpeg -i ${req.body.path} -preset ultrafast ${outputFilePath}`,
                          (err, stdout,stderr) => {
                            if(err){
                              res.json({
                                  error:"some error takes place"
                              })
                          }
                          res.json({
                              path:outputFilePath
                          })
                    })
                      
                    })
              
                    var compressvideoupload = multer({
                      storage: storage,
                      fileFilter: videoFilter,
                    }).single('file');
                  
                    app.post('/uploadcompressvideo',(req,res) =>{
                      compressvideoupload(req,res,function(err) {
                        if(err) {
                            return res.end("Error uploading file.");
                        }
                        res.json({
                            path:req.file.path
                        })
                    });
                    })
                  

                
app.post("/compressaudio", (req, res) => {
  console.log(req.body.path);

  var bitrate = parseInt(req.body.bitrate);

    console.log(bitrate);


  outputFilePath = Date.now() + "output" + path.extname(req.body.path);
  console.log(outputFilePath);

  exec(
    `ffmpeg -i ${req.body.path} -preset ultrafast -ab ${bitrate}k -ar 44100 ${outputFilePath}`,
    (err, stdout, stderr) => {
      if (err) {
        res.json({
          error: "some error takes place",
        });
      }
      res.json({
        path: outputFilePath,
      });
    }
  );
});

var compressaudioupload = multer({
  storage: storage,
  fileFilter: audioFilter,
}).single("file");

app.post("/uploadcompressaudio", (req, res) => {
  compressaudioupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
});




var compressimageupload = multer({
  storage: storage,
  fileFilter: imageFilter,
}).single("file");

app.post("/uploadcompressimage", (req, res) => {
  compressimageupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
});

app.post("/compressimage", (req, res) => {
    console.log(req.body.path);
    console.log("dffds")

    var quality = req.body.quality;

    console.log(quality)

    outputFilePath =
      Date.now() + "output" + path.extname(req.body.path);

    console.log(outputFilePath)

    exec(
      `convert ${req.body.path} -quality ${quality} ${outputFilePath}`,
      (err, stdout,stderr) => {
          
          if (err) {
            res.json({
              error: "some error takes place",
            });
          }
          res.json({
            path: outputFilePath,
          });
      
      });
});

var changevideoresolutionupload = multer({
  storage: storage,
  fileFilter: videoFilter,
}).single("file");

app.post("/uploadchangevideoresolution", (req, res) => {
  changevideoresolutionupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
});

var addwatermarktovideovideoupload = multer({
  storage: storage,
  fileFilter: videoFilter,
}).single("file");

app.post("/uploadvideoaddwatermarktovideo", (req, res) => {
  addwatermarktovideovideoupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
});


var addwatermarktovideowatermarkupload = multer({
  storage: storage,
  fileFilter: imageFilter,
}).single("file");

app.post("/uploadwatermarkaddwatermarktovideo", (req, res) => {
  addwatermarktovideowatermarkupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
});


app.post("/addwatermarktovideo", (req, res) => {

    outputFilePath = Date.now() + "output" + path.extname(req.body.videoPath);

    exec(
      `ffmpeg -i ${req.body.videoPath} -i ${req.body.imagePath} -preset ultrafast \-filter_complex "overlay=x=(main_w-overlay_w)/2:y=(main_h-overlay_h)/2" ${outputFilePath}`,
      (err, stdout,stderr) => {
          
          if (err) {
            res.json({
              error: "some error takes place",
            });
          }
          res.json({
            path: outputFilePath,
          });
      
      });
});
            


            
var webpFilters = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (ext !== ".webp") {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var webptoimage2upload = multer({
  storage: storage,
  fileFilter: webpFilters,
}).single("file");

app.post("/uploadwebptoimage", (req, res) => {
  webptoimage2upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
});


app.post("/webptoimage", (req, res) => {

    const format = req.body.format;

    outputFilePath = Date.now() + "output." + format;

    const result = webp.dwebp(req.body.path, outputFilePath, "-o");

    result.then((response) => {

      res.json({
        path:outputFilePath
      })
      
  })
});

const webpFilter3 = function (req, file, callback) {
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

var imagestowebp2upload = multer({ storage: storage, fileFilter: webpFilter3 }).single('file');

app.post("/uploadimagetowebp", (req, res) => {
  imagestowebp2upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
});


app.post("/imagetowebp",(req, res) => {

    outputFilePath = Date.now() + "output.webp";

    const result = webp.cwebp(req.body.path, outputFilePath, "-q 80");

    result.then((response) => {
      console.log(response);
      res.json({
        path:outputFilePath
      })
    });
});

var mergeimagesupload = multer({ storage: storage, fileFilter: imageFilter }).array('file',100);

app.post("/uploadmergeimages", (req, res) => {
  mergeimagesupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    var list = "";
    req.files.forEach((file) => {
      list += `${file.path}`;
      list += " ";
    });
    res.json({
      list: list,
    });
  });
});


app.post(
  "/mergeimages",
  (req, res) => {

      var position = req.body.position;

      outputFilePath = Date.now() + "output.png";

      exec(`convert ${req.body.path} ${position} ${outputFilePath}`,(err, stderr, stdout) => {
          if (err) {
            
          console.log("image merged");
        }
        res.json({
          path:outputFilePath
        })
      })
    }
);

var mergevideosupload = multer({ storage: storage, fileFilter: videoFilter }).array('file',100);

app.post("/uploadmergevideos", (req, res) => {
  var list = ""
  var listFilePath = "public/uploads/" + Date.now() + "list.txt";
  mergevideosupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }

  //var outputFilePath = Date.now() + "output.mp4";
  if (req.files) {
    req.files.forEach((file) => {
      list += `file ${file.filename}`;
      list += "\n";
    });

    var writeStream = fs.createWriteStream(listFilePath);

    writeStream.write(list);

    writeStream.end();

  }

  res.json({
    list:listFilePath
  })

  });
});


app.post("/mergevideos",(req, res) => {
  var listFilePath = req.body.path
  console.log(listFilePath)
  var outputFilePath = Date.now() + "output.mp4";
    exec(
      `ffmpeg -safe 0 -f concat -i ${listFilePath} -c copy ${outputFilePath}`,
      (error, stdout, stderr) => {
        res.json({
          path:outputFilePath
        })
      }
    );
  })

  
  var mergeaudioupload = multer({ storage: storage, fileFilter: audioFilter }).array('file',100);

  app.post("/uploadmergeaudio", (req, res) => {
    var list = ""
    var listFilePath = "public/uploads/" + Date.now() + "list.txt";
    mergeaudioupload(req, res, function (err) {
      if (err) {
        return res.end("Error uploading file.");
      }
  
    //var outputFilePath = Date.now() + "output.mp4";
    if (req.files) {
      req.files.forEach((file) => {
        list += `file ${file.filename}`;
        list += "\n";
      });
  
      var writeStream = fs.createWriteStream(listFilePath);
  
      writeStream.write(list);
  
      writeStream.end();
  
    }
  
    res.json({
      list:listFilePath
    })
  
    });
  });
    


  app.post("/mergeaudio", (req, res) => {
    var listFilePath = req.body.path
  console.log(listFilePath)
  var outputFilePath = Date.now() + "output.mp3";
    exec(
      `ffmpeg -safe 0 -f concat -i ${listFilePath} -c copy ${outputFilePath}`,
      (error, stdout, stderr) => {
        res.json({
          path:outputFilePath
        })
      }
    );
  });

  var cropimageupload = multer({ storage: storage, fileFilter: imageFilter }).single('file');

app.post("/uploadcropimage", (req, res) => {
  cropimageupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
});

  
  app.post("/cropimage",(req, res) => {
    
      var width = parseInt(req.body.width);
  
      var height = parseInt(req.body.height);
  
      outputFilePath = Date.now() + path.extname(req.body.path);
  
      sharp(req.body.path)
        .extract({ width: width, height: height, left: 0, top: 0 })
        .toFile(outputFilePath)
        .then(function (new_file_info) {
           res.json({
             path:outputFilePath
           })
        })
    
  });

  var compressfiles2upload = multer({
    storage: storage,
    limits: { fileSize: maxSize }
  }).array('file',100);

  app.post("/uploadcompressfiles", (req, res) => {
    var zip,outputFilePath
    compressfiles2upload(req, res, function (err) {
      zip = new admzip();
      outputFilePath = "public/uploads/" + Date.now() + "output.zip";
      if (req.files) {
        req.files.forEach((file) => {
          console.log(file.path);
          zip.addLocalFile(file.path);
        });
        fs.writeFileSync(outputFilePath, zip.toBuffer()); 
      }
      res.json({
        path:outputFilePath
      })
    });
  });
  
  
  app.post(
    "/compressfiles",
    (req, res) => {
     res.json({
       path:req.body.path
     }) 
    });

    const mergepdffilter23 = function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if (ext !== ".pdf") {
        return callback("This Extension is not supported");
      }
      callback(null, true);
    };
    
    var mergepdffiles2upload = multer({
      storage: storage,
      fileFilter: mergepdffilter23
    }).array('file',100);

    app.post("/uploadmergepdf", (req, res) => {
      const files = []
      mergepdffiles2upload(req, res, function (err) {
  
      //outputFilePath = Date.now() + "output.pdf";
      if (req.files) {
        req.files.forEach((file) => {
          console.log(file.path);
          files.push(file.path);
        });
      }
        res.json({
          path:files
        })
      });
    });
    
    app.post("/mergepdf", (req, res) => {
      console.log(req.body.path)
      outputFilePath = Date.now() + "output.pdf";
    
        pdfMerge(req.body.path, outputFilePath, function (err) {
          if(err){
            console.log(err)
          }
          res.json({
            path:outputFilePath
          })
        });
    });
          

const docxtopdffilter2 = function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if (ext !== ".docx" && ext !== ".doc") {
        return callback("This Extension is not supported");
      }
      callback(null, true);
    };
    
    const docxtopdf2upload = multer({
      storage: storage,
      fileFilter: docxtopdffilter2,
    }).single('file');
    
    app.post('/uploaddocxtopdf',(req,res) => {
      docxtopdf2upload(req,res,function(err){
        if(req.file){
          res.json({
            path:req.file.path
          })
        }
      })
    })
    
    app.post("/docxtopdf",(req, res) => {
      
        console.log(req.body.path);
        outputFilePath = Date.now() + "output.pdf";
    
        const file = fs.readFileSync(req.body.path);
        
        console.log(file)
    
        libre.convert(file, ".pdf", undefined, (err, done) => {
          if(err){
           console.log(err)
          }
           fs.writeFileSync(outputFilePath, done);
          res.json({
            path:outputFilePath
          })
        });
    });
    

const pdfconverterupload = multer({ storage: storage, fileFilter: pdfFilter });

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
var input = req.file.path
var output = Date.now() + "output.pdf"

 var dataToSend;
 // spawn new child process to call the python script
 const python = spawn('python3', ['htmltopdf.py',input,output]);
 // collect data from script
 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 res.download(output,(err) =>{

if(err) {

fs.unlinkSync(input)
fs.unlinkSync(output)
res.send(err)

}

fs.unlinkSync(input)
fs.unlinkSync(output)

})
 });

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



app.get('/bulkdomainagechecker',(req,res) => {
  res.render('bulkdomainagechecker',{title:'FREE Bulk Domain Age Checker SEO Tool Online - Check Multiple Website Age Online Tool - FreeMediaTools.com'})
})

var psl = require('psl')

app.post('/getbaseurl',(req,res) =>{

var parsed = psl.parse(req.body.domain);

res.json({

baseurl:parsed.domain

})


})


app.get('/domainagechecker/url/:url', async(req, res) => {
var url = req.params.url;
url = url.replace(/(^\w+:|^)\/\//, '');


if (!isValidDomain(url)) {
    res.json({
      domain:url,
      domainage:"Invalid Domain"
    })
  } else {
    var results = await whoisinfo(url);

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

    res.json({
      domain:url,
      domainage:domainAge
    })
  }

  
});

app.post('/singledomainagechecker',async(req,res) => {
  var url = req.body.domain;


  if (!isValidDomain(url)) {
    res.json({
      domain:url,
      domainage:"Invalid Domain"
    })
  } else {
    var results = await whoisinfo(url);

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

    res.json({
      domain:url,
      domainage:domainAge
    })
  }
})




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







const addwatermarkupload = 
multer({storage:storage}).fields([{
  name:'file'},{name:'image'}
])

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
	   console.log(err)
           
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

    exec(`libreoffice --convert-to pdf --outputfile ${outputFilePath} ${req.file.path}`,(err,stdout,stderr) => {
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

  res.render('htmlformatter',{title:'FREE HTML Source Code Formatter Online - Format HTML Source Code Online - FreeMediaTools.com'})
  
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



app.get('/brokenlinkchecker',(req,res) => {
    res.render('brokenlinkchecker',{title:'FREE Broken Links Checker Tool Online For Website and Domain - Broken Link Checker - FreeMediaTools.com'
,info:''})
})

app.post('/brokenlinkchecker',(req,res) => {
var url = prependhttp(req.body.url)



console.log(url)
    exec(`brkn ${url} --verbose`,(err,stdout,stderr) => {

        console.log(stdout)

        res.render('brokenlinkchecker',{title:'FREE Broken Links Checker Tool Online For Website and Domain - Broken Link Checker - FreeMediaTools.com'
,info:stdout})
    })

})


app.get('/currencyconverter',(req,res) => {
  
  res.render('currencyconverter',{title:'FREE Currency Converter Online Tool to get Convert Currencies Online',codes:currencycodes,response:''})
})

app.post('/currencyconverter',(req,res) => {
  var amount = parseInt(req.body.amount)
  var from = req.body.from
  var to = req.body.to

  console.log(amount)
  console.log(from)
  console.log(to)

  let currencyConverter = new currencyconverter({from:from, to:to, amount:amount})

currencyConverter.convert().then((response) => {

    console.log(response) //or do something else
    res.render('currencyconverter',{title:'FREE Currency Converter Online Tool to get Convert Currencies Online',codes:currencycodes,response:amount + " " + from + " = " + response + " " + to})

})

})


app.get('/ipaddresstolocation',(req,res) => {
    res.render('ipaddresstolocation',{title:'FREE IP Address Or Website to Location Tracker Online Tool - Track IP Address Location Online - FreeMediaTools.com'
,info:''})
})

app.post('/ipaddresstolocation',(req,res) => {
var url = req.body.ipaddress



console.log(url)
    exec(`lookup ${url}`,(err,stdout,stderr) => {

        res.render('ipaddresstolocation',{title:'FREE IP Address Or Website to Location Tracker Online Tool - Track IP Address Location Online - FreeMediaTools.com'
,info:stdout})
    })

})

app.get('/csvtojson',(req,res) => {

res.render('csvtojson',{title:'FREE CSV File to JSON Online Converter Tool - Online CSV File to JSON File Converter Tool - FreeMediaTools.com'})

})

const csvFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".csv"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var csvtojsonupload = multer({
  storage: storage,
  fileFilter: csvFilter
});

app.post('/csvtojson',csvtojsonupload.single('file'),(req,res) => {

var outputpath = Date.now() + "output.json"

if(req.file){

exec(`any-json convert ${req.file.path} ${outputpath}`,(err,stdout,stderr) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)
res.send(err)
}

res.download(outputpath,(err) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)
res.send("Unable to download the file")
}

fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)

})

})

}


})




app.get('/xmltojson',(req,res) => {

res.render('xmltojson',{title:'FREE XML File to JSON Online Converter Tool - Online XML File to JSON File Converter Tool - FreeMediaTools.com'})

})

const xmlFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".xml"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var xmltojsonupload = multer({
  storage: storage,
  fileFilter: xmlFilter
});

app.post('/xmltojson',xmltojsonupload.single('file'),(req,res) => {

var outputpath = Date.now() + "output.json"

if(req.file){

exec(`any-json convert ${req.file.path} ${outputpath}`,(err,stdout,stderr) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)
res.send(err)
}

res.download(outputpath,(err) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)
res.send("Unable to download the file")
}

fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)

})

})

}


})






app.get('/jsontocsv',(req,res) => {

res.render('jsontocsv',{title:'FREE JSON File to CSV Online Converter Tool - Online JSON File to CSV File Converter Tool - FreeMediaTools.com'})

})

const jsonFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".json"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var jsonupload = multer({
  storage: storage,
  fileFilter: jsonFilter
});

app.post('/jsontocsv',jsonupload.single('file'),(req,res) => {

var outputpath = Date.now() + "output.csv"
var inputfile = Date.now() + "input.json"

if(req.file){

var jsonarray = []

jsonarray.push(JSON.parse(fs.readFileSync(req.file.path)))

console.log(fs.readFileSync(req.file.path))

console.log(jsonarray)

fs.writeFileSync(inputfile,JSON.stringify(jsonarray))

exec(`any-json convert ${inputfile} ${outputpath}`,(err,stdout,stderr) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(inputfile)
fs.unlinkSync(outputpath)
res.send(err)
}

res.download(outputpath,(err) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(inputfile)
fs.unlinkSync(outputpath)
res.send("Unable to download the file")
}

fs.unlinkSync(req.file.path)
fs.unlinkSync(inputfile)
fs.unlinkSync(outputpath)

})

})

}


})






app.get('/jsontoxml',(req,res) => {

res.render('jsontoxml',{title:'FREE JSON File to XML Online Converter Tool - Online JSON File to XML File Converter Tool - FreeMediaTools.com'})

})


var jsonupload = multer({
  storage: storage,
  fileFilter: jsonFilter
});

app.post('/jsontoxml',jsonupload.single('file'),(req,res) => {

var outputpath = Date.now() + "output.xml"
var inputfile = Date.now() + "input.json"

if(req.file){

var jsonarray = []

jsonarray.push(JSON.parse(fs.readFileSync(req.file.path)))

console.log(fs.readFileSync(req.file.path))

console.log(jsonarray)

fs.writeFileSync(inputfile,JSON.stringify(jsonarray))

exec(`any-json convert ${inputfile} ${outputpath}`,(err,stdout,stderr) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(inputfile)
fs.unlinkSync(outputpath)
res.send(err)
}

res.download(outputpath,(err) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)
fs.unlinkSync(inputfile)
res.send("Unable to download the file")
 }

fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)
fs.unlinkSync(inputfile)

})

})

}


})








app.get('/jsonfiletoexcel',(req,res) => {

res.render('jsonfiletoexcel',{title:'FREE JSON File to Excel Online Converter Tool - Online JSON File to XLS/XLSX File Converter Tool - FreeMediaTools.com'})

})




var jsonupload = multer({
  storage: storage,
  fileFilter: jsonFilter
});

app.post('/jsonfiletoexcel',jsonupload.single('file'),(req,res) => {

var outputpath = Date.now() + "output.xlsx"
var inputfile = Date.now() + "input.json"

if(req.file){

var jsonarray = []

jsonarray.push(JSON.parse(fs.readFileSync(req.file.path)))

console.log(fs.readFileSync(req.file.path))

console.log(jsonarray)

fs.writeFileSync(inputfile,JSON.stringify(jsonarray))

exec(`any-json convert ${inputfile} ${outputpath}`,(err,stdout,stderr) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(inputfile)
fs.unlinkSync(outputpath)
res.send(err)
}

res.download(outputpath,(err) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(inputfile)
fs.unlinkSync(outputpath)
res.send("Unable to download the file")
}

fs.unlinkSync(req.file.path)
fs.unlinkSync(inputfile)
fs.unlinkSync(outputpath)

})

})

}


})






app.get('/exceltojson',(req,res) => {

res.render('exceltojson',{title:'FREE Excel File to JSON Online Converter Tool - Online XLS/XLSX File to JSON File Converter Tool - FreeMediaTools.com'})

})


const exceltojsonFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".xls" && ext !== ".xlsx"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};


var exceltojsonlatestupload = multer({
  storage: storage,
  fileFilter: exceltojsonFilter
});

app.post('/exceltojson',exceltojsonlatestupload.single('file'),(req,res) => {

var outputpath = Date.now() + "output.json"

if(req.file){

var jsonarray = []


exec(`any-json convert ${req.file.path} ${outputpath}`,(err,stdout,stderr) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)
res.send(err)
}

res.download(outputpath,(err) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)
res.send("Unable to download the file")
}

fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)

})

})

}


})









app.get('/yamltojson',(req,res) => {

res.render('yamltojson',{title:'FREE YAML File to JSON Online Converter Tool - Online YAML File to JSON File Converter Tool - FreeMediaTools.com'})

})


const yamltojsonFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".yaml"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};


var yamltojsonlatestupload = multer({
  storage: storage,
  fileFilter: yamltojsonFilter
});

app.post('/yamltojson',yamltojsonlatestupload.single('file'),(req,res) => {

var outputpath = Date.now() + "output.json"

if(req.file){



exec(`any-json convert ${req.file.path} ${outputpath}`,(err,stdout,stderr) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)
res.send(err)
}

res.download(outputpath,(err) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)
res.send("Unable to download the file")
}

fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)

})

})

}


})





app.get('/jsontoyaml',(req,res) => {

res.render('jsontoyaml',{title:'FREE JSON File to YAML Online Converter Tool - Online JSON File to YAML File Converter Tool - FreeMediaTools.com'})

})




var jsonupload = multer({
  storage: storage,
  fileFilter: jsonFilter
});

app.post('/jsontoyaml',jsonupload.single('file'),(req,res) => {

var outputpath = Date.now() + "output.yaml"
var inputfile = Date.now() + "input.json"

if(req.file){

var jsonarray = []

jsonarray.push(JSON.parse(fs.readFileSync(req.file.path)))

console.log(fs.readFileSync(req.file.path))

console.log(jsonarray)

fs.writeFileSync(inputfile,JSON.stringify(jsonarray))

exec(`any-json convert ${inputfile} ${outputpath}`,(err,stdout,stderr) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(inputfile)
fs.unlinkSync(outputpath)
res.send(err)
}

res.download(outputpath,(err) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(inputfile)
fs.unlinkSync(outputpath)
res.send("Unable to download the file")
}

fs.unlinkSync(req.file.path)
fs.unlinkSync(inputfile)
fs.unlinkSync(outputpath)

})

})

}


})





app.get('/jsontohjson',(req,res) => {

res.render('jsontohjson',{title:'FREE JSON File to HJSON Online Converter Tool - Online JSON File to HJSON File Converter Tool - FreeMediaTools.com'})

})




var jsonupload = multer({
  storage: storage,
  fileFilter: jsonFilter
});

app.post('/jsontohjson',jsonupload.single('file'),(req,res) => {

var outputpath = Date.now() + "output.hjson"
var inputfile = Date.now() + "input.json"

if(req.file){

var jsonarray = []

jsonarray.push(JSON.parse(fs.readFileSync(req.file.path)))

console.log(fs.readFileSync(req.file.path))

console.log(jsonarray)

fs.writeFileSync(inputfile,JSON.stringify(jsonarray))

exec(`any-json convert ${inputfile} ${outputpath}`,(err,stdout,stderr) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(inputfile)
fs.unlinkSync(outputpath)
res.send(err)
}

res.download(outputpath,(err) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(inputfile)
fs.unlinkSync(outputpath)
res.send("Unable to download the file")
}

fs.unlinkSync(req.file.path)
fs.unlinkSync(inputfile)
fs.unlinkSync(outputpath)

})

})

}


})








app.get('/hjsontojson',(req,res) => {

res.render('hjsontojson',{title:'FREE HJSON File to JSON Online Converter Tool - Online HJSON File to JSON File Converter Tool - FreeMediaTools.com'})

})


const hjsontojsonFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".hjson"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};


var hjsontojsonlatestupload = multer({
  storage: storage,
  fileFilter: hjsontojsonFilter
});

app.post('/hjsontojson',hjsontojsonlatestupload.single('file'),(req,res) => {

var outputpath = Date.now() + "output.json"

if(req.file){



exec(`any-json convert ${req.file.path} ${outputpath}`,(err,stdout,stderr) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)
res.send(err)
}

res.download(outputpath,(err) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)
res.send("Unable to download the file")
}

fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)

})

})

}


})







app.get('/initojson',(req,res) => {

res.render('initojson',{title:'FREE INI Configuration File to JSON Online Converter Tool - Online INI Configuration File to JSON File Converter Tool - FreeMediaTools.com'})

})


const initojsonFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".ini"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};


var initojsonlatestupload = multer({
  storage: storage,
  fileFilter: initojsonFilter
});

app.post('/initojson',initojsonlatestupload.single('file'),(req,res) => {

var outputpath = Date.now() + "output.json"

if(req.file){



exec(`any-json convert ${req.file.path} ${outputpath}`,(err,stdout,stderr) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)
res.send(err)
}

res.download(outputpath,(err) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)
res.send("Unable to download the file")
}

fs.unlinkSync(req.file.path)
fs.unlinkSync(outputpath)

})

})

}


})









app.get('/jsontoini',(req,res) => {

res.render('jsontoini',{title:'FREE JSON File to INI Configuration Online Converter Tool - Online JSON File to INI Configuration File Converter Tool - FreeMediaTools.com'})

})




var jsonupload = multer({
  storage: storage,
  fileFilter: jsonFilter
});

app.post('/jsontoini',jsonupload.single('file'),(req,res) => {

var outputpath = Date.now() + "output.ini"
var inputfile = Date.now() + "input.json"

if(req.file){

var jsonarray = []

jsonarray.push(JSON.parse(fs.readFileSync(req.file.path)))

console.log(fs.readFileSync(req.file.path))

console.log(jsonarray)

fs.writeFileSync(inputfile,JSON.stringify(jsonarray))

exec(`any-json convert ${inputfile} ${outputpath}`,(err,stdout,stderr) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(inputfile)
fs.unlinkSync(outputpath)
res.send(err)
}

res.download(outputpath,(err) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(inputfile)
fs.unlinkSync(outputpath)
res.send("Unable to download the file")
}

fs.unlinkSync(req.file.path)
fs.unlinkSync(inputfile)
fs.unlinkSync(outputpath)

})

})

}


})










app.get('/pptxtojson',(req,res) => {

res.render('pptxtojson',{title:'FREE PPTX|PPT Powerpoint File to JSON Online Converter Tool - Online PPT|PPTX to JSON File Converter Tool - FreeMediaTools.com'})

})


const pptxtopdfFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".ppt" && ext !== ".pptx"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};
const PPTX2Json = require('pptx2json');

var pptxtopdflatestupload = multer({
  storage: storage,
  fileFilter: pptxtopdfFilter
});

app.post('/pptxtojson',pptxtopdflatestupload.single('file'),async(req,res) => {

var outputfilepath = Date.now() + "output.json"


if(req.file){


const pptx2json = new PPTX2Json();
 
const json = await pptx2json.toJson(req.file.path);

fs.writeFileSync(outputfilepath,JSON.stringify(json))

res.download(outputfilepath,(err) => {

if(err){
fs.unlinkSync(req.file.path)
fs.unlinkSync(outputfilepath)
res.send(err)
}

fs.unlinkSync(req.file.path)
fs.unlinkSync(outputfilepath)


})


}


})


app.get('/removeemptylines',(req,res) => {

res.render('removeemptylines',{title:'FREE Empty Lines Remover From String or Text - Online Blank Lines Spaces Remover From String Lines - FreeMediaTools.com'})

})


app.get('/removeextraspaces',(req,res) => {

res.render('removeextraspaces',{title:'FREE Extra Spaces Remover From String or Text - Online Extra WhiteSpaces Remover From String Lines - FreeMediaTools.com'})

})

const removeDuplicateLines = require('remove-duplicate-lines');

app.get('/removeduplicatelines',(req,res) => {

res.render('removeduplicatelines',{title:'FREE Extra Duplicate Lines Remover From String or Text Tool - Online Extra Duplicate Lines Remover From String Lines - FreeMediaTools.com',text:''})

})

app.post('/removeduplicatelines',(req,res) => {

removeDuplicateLines(req.body.inputtext,{ unique: true })
    .then(output => {
      
	  res.render('removeduplicatelines',{title:'FREE Extra Duplicate Lines Remover From String or Text Tool - Online Extra Duplicate Lines Remover From String Lines - FreeMediaTools.com',text:output})	
     
  

})
    .catch(error => console.log(error))


})


var verify = require('bulk-email-verifier');


app.get('/domainchecker',(req,res) => {

res.render('domainchecker',{title:'FREE Website Domain Checker Online Tool - Online Domain Checker Tool - FreeMediaTools.com',text:""})

})

app.get('/emailchecker',(req,res) => {

res.render('emailchecker',{title:'FREE Email Address Vaildate Checker Online Tool - Online Email Address Validate Checker - FreeMediaTools.com',text:''})

})

app.post('/domainchecker',(req,res) => {



var domains = []
domains.push(req.body.domain)


verify.verifyDomainsMX(domains).then(function(response) {
    console.log('Domains Status: ', response);
	if(response.verified.length>0){
	  res.render('domainchecker',{title:'FREE Website Domain Checker Online Tool - Online Domain Checker Tool - FreeMediaTools.com',text:"You entered a valid domain"})	
        }
        else{
         res.render('domainchecker',{title:'FREE Website Domain Checker Online Tool - Online Domain Checker Tool - FreeMediaTools.com',text:"You entered a invalid domain"})
        }
    
});



})




app.post('/emailchecker',(req,res) => {



var domains = []
domains.push(req.body.email)


verify.verifyEmails("gmail.com",domains,{},function(err,response) {
    console.log('Domains Status: ', response);
	if(response.verified.length>0){
	  res.render('emailchecker',{title:'FREE Email Address Vaildate Checker Online Tool - Online Email Address Validate Checker - FreeMediaTools.com',text:"You entered a valid email"})	
        }
        else{
         res.render('emailchecker',{title:'FREE Email Address Vaildate Checker Online Tool - Online Email Address Validate Checker - FreeMediaTools.com',text:"You entered a invalid email"})
        }



})
})



app.get('/decimaltobinary',(req,res) =>{


res.render('decimaltobinary',{title:'FREE Decimal to Binary Online Converter Tool - Online Decimal Number to Binary Digits - FreeMediaTools.com'})

})


app.get('/decimaltooctal',(req,res) =>{


res.render('decimaltooctal',{title:'FREE Decimal to Octal Online Converter Tool - Online Decimal Number to Octal Digits - FreeMediaTools.com'})

})


app.get('/decimaltohexadecimal',(req,res) =>{


res.render('decimaltohexadecimal',{title:'FREE Decimal to Hexadecimal Online Converter Tool - Online Decimal Number to Hexadecimal Digits - FreeMediaTools.com'})

})


app.get('/octaltodecimal',(req,res) =>{


res.render('octaltodecimal',{title:'FREE Octal to Decimal Online Converter Tool - Online Octal Number to Decimal Digits - FreeMediaTools.com'})

})



app.get('/octaltobinary',(req,res) =>{


res.render('octaltobinary',{title:'FREE Octal to Binary Online Converter Tool - Online Octal Number to Binary Digits - FreeMediaTools.com'})

})



app.get('/octaltohexadecimal',(req,res) =>{


res.render('octaltohexadecimal',{title:'FREE Octal to Hexadecimal Online Converter Tool - Online Octal Number to Hexadecimal Digits - FreeMediaTools.com'})

})


app.get('/hexadecimaltobinary',(req,res) =>{


res.render('hexadecimaltobinary',{title:'FREE Hexadecimal to Binary Online Converter Tool - Online Hexadecimal Number to Binary Digits - FreeMediaTools.com'})

})


app.get('/hexadecimaltooctal',(req,res) =>{


res.render('hexadecimaltooctal',{title:'FREE Hexadecimal to Octal Online Converter Tool - Online Hexadecimal Number to Octal Digits - FreeMediaTools.com'})

})


app.get('/hexadecimaltodecimal',(req,res) =>{


res.render('hexadecimaltodecimal',{title:'FREE Hexadecimal to Decimal Online Converter Tool - Online Hexadecimal Number to Decimal Digits - FreeMediaTools.com'})

})

app.get('/binarytooctal',(req,res) =>{


res.render('binarytooctal',{title:'FREE Binary to Octal Online Converter Tool - Online Binary Number to Octal Digits - FreeMediaTools.com'})

})

app.get('/binarytodecimal',(req,res) =>{


res.render('binarytodecimal',{title:'FREE Binary to Decimal Online Converter Tool - Online Binary Number to Decimal Digits - FreeMediaTools.com'})

})


app.get('/binarytohexadecimal',(req,res) =>{


res.render('binarytohexadecimal',{title:'FREE Binary to Hexadecimal Online Converter Tool - Online Binary Number to Hexadecimal Digits - FreeMediaTools.com'})

})

app.get('/binarytoascii',(req,res) =>{


res.render('binarytoascii',{title:'FREE Binary to ASCII Online Converter Tool - Online Binary Number to ASCII Digits - FreeMediaTools.com'})

})

app.get('/asciitobinary',(req,res) =>{


res.render('asciitobinary',{title:'FREE ASCII to Binary Online Converter Tool - Online ASCII to Binary Digits - FreeMediaTools.com'})

})


app.get('/findandreplacetext',(req,res) =>{


res.render('findandreplacetext',{title:'FREE Find and Replace Text Online Tool - Online Replace all occurences in String - FreeMediaTools.com'})

})

app.get('/texttodecimal',(req,res) =>{


res.render('texttodecimal',{title:'FREE Text to ASCII Code Decimal Converter Online Tool - Online String to ASCII Code Decimal Value Converter - FreeMediaTools.com'})

})

app.get('/decimaltotext',(req,res) =>{


res.render('decimaltotext',{title:'FREE Decimal or ASCII Code to Text Converter Online Tool - Online Decimal or ASCII Code to Text Converter - FreeMediaTools.com'})

})

app.get('/jsonstringify',(req,res) =>{


res.render('jsonstringify',{title:'FREE JSON Stringify Online Tool - Online Text to JSON Stringify Converter - FreeMediaTools.com'})

})

app.get('/splittext',(req,res) =>{


res.render('splittext',{title:'FREE Split Text with Space,Comma,Dash and Custom Characters Online - Online Text Splitter in New Lines Converter - FreeMediaTools.com'})

})

app.get('/repeattext',(req,res) =>{


res.render('repeattext',{title:'FREE Text Repeater Generator Online Tool - Repeat Text Multiple Times Online Tool Generator - FreeMediaTools.com'})

})


app.get('/countwords',(req,res) =>{


res.render('countwords',{title:'FREE Text Words Counter Tool Online - Online Character and Word Count Tool - FreeMediaTools.com'})

})

app.get('/reversetext',(req,res) =>{


res.render('reversetext',{title:'FREE Reverse Text Generator in Backwards Direction - Spell Words in Backward or Reverse Order - FreeMediaTools.com'})

})


app.get('/addnumberlines',(req,res) =>{


res.render('addlinenumbers',{title:'FREE Add Line Numbers to Text Online Tool - Add Line Numbers to Text or String Online - FreeMediaTools.com'})

})


app.get('/extracttextfromhtml',(req,res) =>{


res.render('extracttextfromhtml',{title:'FREE Extract Text From HTML Code Online Tool - Split out Text From HTML Program Code Online - FreeMediaTools.com'})

})


app.get('/encryptdecrypttext',(req,res) =>{


res.render('encryptdecrypttext',{title:'FREE Encrypt/Decrypt Text or String with Password Online Tool Using CryptoJS AES Encryption & Decryption Library - FreeMediaTools.com'})

})

app.get('/bulkdomainchecker',(req,res) =>{


res.render('bulkdomainchecker',{title:'FREE Bulk Domain Name or Website Validator Checker Online Tool - Free Bulk Domain Validator or Validation Checker Tool - FreeMediaTools.com',text:'',flag:false})

})


app.post('/bulkdomainchecker',(req,res) => {

var domains = req.body.domain
console.log(domains)

var lines = domains.split(/\n/);
  var output = [];
  var outputText = [];
  for (var i = 0; i < lines.length; i++) {
    // only push this line if it contains a non whitespace character.
    if (/\S/.test(lines[i])) {
      outputText.push('"' + lines[i].trim() + '"');
      output.push(lines[i].trim());
    }
  }
  console.log(output);


verify.verifyDomainsMX(output).then(function(response) {
    console.log('Domains Status: ', response);
    res.render('bulkdomainchecker',{title:'FREE Bulk Domain Name or Website Validator Checker Online Tool - Free Bulk Domain Validator or Validation Checker Tool - FreeMediaTools.com',text:response,flag:true})
});


})





app.get('/bulkemailchecker',(req,res) =>{


res.render('bulkemailchecker',{title:'FREE Bulk Email Address Validator or Checker Tool Online - Free Bulk Email Address Validator or Checker Tool Online - FreeMediaTools.com',text:'',flag:false})

})


app.post('/bulkemailchecker',(req,res) => {

var domains = req.body.domain
var provider = req.body.provider
console.log(domains)

var lines = domains.split(/\n/);
  var output = [];
  var outputText = [];
  for (var i = 0; i < lines.length; i++) {
    // only push this line if it contains a non whitespace character.
    if (/\S/.test(lines[i])) {
      outputText.push('"' + lines[i].trim() + '"');
      output.push(lines[i].trim());
    }
  }
  console.log(output);


verify.verifyEmails(provider,output,{},function(err,response) {
    console.log('Domains Status: ', response);
    res.render('bulkemailchecker',{title:'FREE Bulk Email Address Validator or Checker Tool Online - Free Bulk Email Address Validator or Checker Tool Online - FreeMediaTools.com',text:response,flag:true})
});


})

app.get('/convertlinkstohtmlhyperlinks',(req,res) =>{

res.render('convertlinkstohtmlhyperlinks',{title:'FREE URLs Website Links to HTML Hyperlinks Tool Online - URLs Website Links to HTML Anchor Tags Links - FreeMediaTools.com'})


})

app.get('/iframegenerator',(req,res) => {

res.render('iframegenerator',{title:'FREE IFrame Generator to embed Websites and generate HTML Code Online Tool - URL IFrame Generator to generate HTML Code Online - FreeMediaTools.com'})

})

app.get('/youtubevideotimestampgenerator',(req,res) => {

res.render('youtubevideotimestampgenerator',{title:'FREE Youtube Video Timestamp Link Generator Online Tool - Generate Timestamp Links for Youtube Videos - FreeMediaTools.com'})

})

app.get('/youtubevideoid',(req,res) => {

res.render('youtubevideoid',{title:'FREE Youtube Video ID Extractor From Youtube Video URL Online Tool - Extract Youtube Video ID From Youtube Video URL Online - FreeMediaTools.com'})

})

app.get('/youtubetagfinder',(req,res) => {

res.render('youtubetagfinder',{title:'FREE Youtube Video Tag Finder Extractor and Generator Online Tool - Extract Youtube Video Tags From Video URL Online - FreeMediaTools.com',tags:''})

})

app.post('/youtubetagfinder',(req,res) =>{

 var url = req.body.url

 console.log(url)
 
 var dataToSend;
 // spawn new child process to call the python script
 const python = spawn('python3', ['script.py',url]);
 // collect data from script
 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 res.render('youtubetagfinder',{title:'FREE Youtube Video Tag Finder Extractor and Generator Online Tool - Extract Youtube Video Tags From Video URL Online - FreeMediaTools.com',tags:dataToSend})
 });



})


var minify = require('html-minifier').minify;


app.get('/minifyrawhtml',(req,res) => {

res.render('rawhtmlminifier',{title:'FREE Raw HTML Compressor or Minify HTML Online Tool - FREE HTML Minifier to minify or compress HTML Source Code Online - FreeMediaTools.com',result:''})

})

var Minimize = require('minimize')
  , minimize = new Minimize();

app.post('/minifyrawhtml',(req,res) => {

var html = req.body.html

minimize.parse(html, function (error, data) {
  console.log(data);
res.render('rawhtmlminifier',{title:'FREE Raw HTML Compressor or Minify HTML Online Tool - FREE HTML Minifier to minify or compress HTML Source Code Online - FreeMediaTools.com',result:data})

});


})


app.get('/minifyhtmlfile',(req,res) => {

res.render('htmlfileminifier',{title:'FREE HTML Files Compressor or Minify HTML Files Online Tool - FREE HTML Minifier to minify or compress HTML Files Source Code Online - FreeMediaTools.com'})

})

app.get('/pdftodocx',(req,res) => {

res.render('pdftodocx',{title:'FREE PDF to DOCX Word Document Converter Online Tool - PDF Document to Docx Word Document Converter Online - FreeMediaTools.com'})

})

const pdftodocxfilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".pdf"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var pdftodocxstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname
    );
  },
});

var pdftodocxupload = multer({ storage: pdftodocxstorage,fileFilter: pdftodocxfilter });

app.post('/pdftodocx',pdftodocxupload.single('file'),(req,res) => {

if(req.file){

var pdf = req.file.path
console.log(pdf)


var basename = path.basename(req.file.path)

basename = sanitize(basename)

console.log(basename)
 
var htmlpath = `${basename.substr(0, basename.lastIndexOf("."))}.html`

htmlpath = sanitize(htmlpath)
console.log(htmlpath)

var docxpath = `${basename.substr(0, basename.lastIndexOf("."))}.docx`

docxpath = sanitize(docxpath)

console.log(docxpath)

exec(`soffice --convert-to html ${pdf}`,(err,stdout,stderr) => {

if(err){
fs.unlinkSync(pdf)
fs.unlinkSync(htmlpath)
fs.unlinkSync(docxpath)
res.send(err)
}

console.log(htmlpath)



exec(`soffice --convert-to docx:'MS Word 2007 XML' ${htmlpath}`,(err,stdout,stderr) => {

if(err){
fs.unlinkSync(pdf)
fs.unlinkSync(htmlpath)
fs.unlinkSync(docxpath)
res.send(err)
}
console.log("output converted")
console.log(docxpath)
res.download(docxpath,(err) => {

if(err){
fs.unlinkSync(pdf)
fs.unlinkSync(htmlpath)
fs.unlinkSync(docxpath)
res.send(err)

}

fs.unlinkSync(pdf)
fs.unlinkSync(htmlpath)
fs.unlinkSync(docxpath)


})

})

})
 
}

})




app.get('/pdftohtml',(req,res) => {

res.render('pdftohtml',{title:'FREE PDF to HTML Document Converter Online Tool - PDF Document to HTML Document Converter Online - FreeMediaTools.com'})

})

app.get('/cropvideo',(req,res) => {

res.render('cropvideo',{title:'FREE Crop Video or Cut Portion of Video Online Tool - Video Cropping Or Cutter Online Tool - FreeMediaTools.com'})

})

app.post('/cropvideo',videotomp3upload.single('file'),(req,res) => {


if(req.file){

var outputfile = Date.now() + "output." + path.extname(req.file.originalname);

var starttime = req.body.start

var endtime = req.body.end

exec(`ffmpeg -i ${req.file.path} -ss ${starttime} -to ${endtime} -c copy ${outputfile}`,(err,stdout,stderr) =>{

if(err){

fs.unlinkSync(req.file.path)
fs.unlinkSync(outputfile)
res.send("Unable to crop video")

}

res.download(outputfile,(err) =>{

if(err) {

fs.unlinkSync(req.file.path)
fs.unlinkSync(outputfile)
res.send("Unable to download the file")

}

fs.unlinkSync(req.file.path)
fs.unlinkSync(outputfile)

})



})

}

})



app.get('/cropaudio',(req,res) => {

res.render('cropaudio',{title:'FREE Crop Audio or Cut Portion of Audio Online Tool - Audio Cropping Or Cutter Online Tool - FreeMediaTools.com'})

})

app.post('/cropaudio',audioconverter.single('file'),(req,res) => {


if(req.file){

var outputfile = Date.now() + "output." + path.extname(req.file.originalname);

var starttime = req.body.start

var endtime = req.body.end

exec(`ffmpeg -i ${req.file.path} -ss ${starttime} -to ${endtime} -c copy ${outputfile}`,(err,stdout,stderr) =>{

if(err){

fs.unlinkSync(req.file.path)
fs.unlinkSync(outputfile)
res.send("Unable to crop video")

}

res.download(outputfile,(err) =>{

if(err) {

fs.unlinkSync(req.file.path)
fs.unlinkSync(outputfile)
res.send("Unable to download the file")

}

fs.unlinkSync(req.file.path)
fs.unlinkSync(outputfile)

})



})

}

})



const pdftohtmlfilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".pdf"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var pdftohtmlstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname
    );
  },
});

var pdftohtmlupload = multer({ storage: pdftohtmlstorage,fileFilter: pdftohtmlfilter });

app.post('/pdftohtml',pdftohtmlupload.single('file'),(req,res) => {

if(req.file){

var pdf = req.file.path
console.log(pdf)

var basename = path.basename(req.file.path)

console.log(basename)
 
var htmlpath = `${basename.substr(0, basename.lastIndexOf("."))}.html`

console.log(htmlpath)

exec(`soffice --convert-to html ${pdf}`,(err,stdout,stderr) => {

if(err){
fs.unlinkSync(pdf)
fs.unlinkSync(htmlpath)
res.send(err)
}

console.log(htmlpath)

res.download(htmlpath,(err) =>{


if(err){

fs.unlinkSync(pdf)
fs.unlinkSync(htmlpath)

}

fs.unlinkSync(pdf)
fs.unlinkSync(htmlpath)

})


})
 
}

})


app.get('/txttodoc',(req,res) => {

res.render('txttodoc',{title:'FREE TXT Text File to Word DOC File Converter Online Tool - Text to DOC Files Easy Converter Online Tool - FreeMediaTools.com'})

})

app.get('/doctotxt',(req,res) => {

res.render('doctotxt',{title:'FREE Word DOC to TXT Text File Converter Online Tool - Word DOC to TXT Files Easy Converter Online Tool - FreeMediaTools.com'})

})

app.get('/txttopdf',(req,res) => {

res.render('txttopdf',{title:'FREE TXT Text File to PDF File Converter Online Tool - Text to PDF Files Easy Converter Online Tool - FreeMediaTools.com'})

})

const txttodocfilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".txt"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var txttodocupload = multer({ storage: storage,limits:{fileSize:maxSize},fileFilter: txttodocfilter });

app.post('/txttodoc',txttodocupload.single('file'),(req,res) => {

if(req.file){

var file = req.file.path

var output = Date.now() + "output.doc"

var txt = fs.readFileSync(file)

fs.writeFileSync(output,txt)

res.download(output,(err) => {

if(err){

fs.unlinkSync(file)
fs.unlinkSync(output)
res.send("Unable to download the file")
}

fs.unlinkSync(file)
fs.unlinkSync(output)

})

}

})


const doctotxtfilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".doc" && ext !== ".docx"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var doctotxtupload = multer({ storage: storage,limits:{fileSize:maxSize},fileFilter: doctotxtfilter });

app.post('/doctotxt',doctotxtupload.single('file'),(req,res) => {

if(req.file){

var file = req.file.path

var output = Date.now() + "output.txt"

var txt = fs.readFileSync(file)

fs.writeFileSync(output,txt)

res.download(output,(err) => {

if(err){

fs.unlinkSync(file)
fs.unlinkSync(output)
res.send("Unable to download the file")
}

fs.unlinkSync(file)
fs.unlinkSync(output)

})

}

})

app.get('/pdftotext',(req,res) => {

res.render('pdftotext',{title:'FREE PDF to Text or Extract Text From PDF Online Tool - PDF to Text File Converter Tool - FreeMediaTools.com'})

})

app.post('/pdftotext',pdfconverterupload.single('file'),(req,res) =>{

if(req.file){

var outputfile = Date.now() + "output.txt"

extract(req.file.path, { splitPages: false }, function (err, text) {
  if (err) {
    console.dir(err)
    return
  }
  console.dir(text)

  fs.writeFileSync(outputfile,text)

  
  res.download(outputfile,(err) => {

     if(err) {
       
      fs.unlinkSync(outputfile)
      fs.unlinkSync(req.file.path)
      res.send("Unable to download the file")
        
     }
     
     fs.unlinkSync(outputfile)
     fs.unlinkSync(req.file.path)

  }) 
 
})

}

})

app.get('/cricketstats',(req,res) => {

res.render('cricketstats',{title:'FREE Cricket Statistics For Test ODI T20I and IPL Online Web App of World Cricketers of ICC Teams - FreeMediaTools.com'})

})

app.post('/getplayernames',(req,res) => {
    console.log(req.body.input)

    cricData.getMatchingPlayerNames(req.body.input).then((response)=>
    {
        console.log(JSON.stringify(response));

        res.json({
            names:response
        })
    })
    
})

app.post('/getplayerinfo',(req,res) =>{
    console.log(req.body.playername)

    cricData.getPlayerInfoByName(req.body.playername).then((response=>{
 
        console.log(JSON.stringify(response));

    

        res.json({
            info:response
        })
         
        }))
        .catch((err) =>{
            console.log(err)
            res.json({
                info:"Player not found"
            })
        });
})

app.get('/karaokemaker',(req,res) => {

res.render('karaokemaker',{title:'FREE Karaoke MP3 Song Maker | Extract Vocals From Mp3 Song Online - FreeMediaTools.com'})

})

var audioconverter3 = multer({ storage: storage, fileFilter: audioFilter }).single('file');

app.post(
      "/karaokemaker",
      (req, res) => {
          console.log(req.body.path);
    
   
    
          outputFilePath = Date.now() + "output." + path.extname(req.body.path);
    
          exec(
            `ffmpeg -i ${req.body.path} -preset ultrafast -af pan="stereo|c0=c0|c1=-1*c1" -ac 1 ${outputFilePath}`,
            (err, stdout,stderr) => {
              if(err){
                res.json({
                    error:"some error takes place"
                })
            }
            res.json({
                path:outputFilePath
            })
      })
        
      })
    
      app.post('/uploadkaraokemaker',(req,res) =>{
        audioconverter3(req,res,function(err) {
          if(err) {
	      console.log(err)
              return res.end("Error uploading file.");
          }
          res.json({
              path:req.file.path
          })
      });
      })

app.get('/extractbaseurl',(req,res) => {
    res.render('extractbaseurl',{title:"FREE Bulk Base URL Extractor From Subdomains Online Tool - FreeMediaTools.com"})
})

app.post('/getbaseurlwithouthttp',(req,res) =>{

var parsed = psl.parse(req.body.domain);

console.log(parsed.domain)

res.json({

baseurl:parsed.domain

})


})
const channelinfo = require('youtube-channel-info')

app.get('/youtubechannelinfo',(req,res) =>{
    res.render('youtubechannelinfo',{title:"FREE Youtube Channel Information Online Tool - Find Earnings Views Subscribers of Youtube Channel Online - FreeMediaTools.com"})
})

app.post("/getchannelinfo",(req,res) => {
    var name = req.body.channelname

    channelinfo(name, function (channelStats) {
        if (!channelStats) {
          return console.error("Channel not found!")
        }
        res.json({
            stats:channelStats
        }); 
      })
})

app.get('/selectdropdowngenerator',(req,res) => {

res.render('selectdropdowngenerator',{title:"FREE HTML Select Dropdown Option List Generator Online Tool - FreeMediaTools.com"})

})

app.get("/pdftoaudio", (req, res) => {
  res.render("pdftoaudio", {
    title:
      "FREE PDF to Audio Mp3 Online Tool | Convert PDF Text to Audio Mp3 Online - FreeMediaTools.com",
  });
});

var pdftoaudioupload = multer({
  storage: storage,
  fileFilter: pdfFilter,
}).single("file");

app.post("/uploadpdftoaudio", (req, res) => {
  pdftoaudioupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
});

app.post("/pdftoaudio", (req, res) => {
  outputfile = Date.now() + "output.txt"
  extract(req.body.path, { splitPages: false }, function (err, text) {
    if (err) {
      console.dir(err);
      return;
    }
    console.log(text);
    fs.writeFileSync(outputfile, text);

    console.log(fs.readFileSync(outputfile,'utf-8'))

    var gttsVoice = new gtts(fs.readFileSync(outputfile,'utf-8'), req.body.language);

    outputFilePath = Date.now() + "output.mp3";


    gttsVoice.save(outputFilePath, function (err, result) {
      if (err) {
        fs.unlinkSync(outputFilePath);
        res.send("An error takes place in generating the audio");
      }
      res.json({
        path: outputFilePath,
      });
    });
  });
});

app.post('/getcomments',async(req,res) => {
  var url = req.body.url

  const comments = [];
  const browser = await puppeteer.launch({ headless: true,args: ["--no-sandbox"]});
  const page = await browser.newPage();
  process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
    var formattedComments = comments.join("")

  fs.writeFileSync('comments.txt', formattedComments.trim());
    browser.close();
  });
  await page.setViewport({ width: 1280, height: 800 });
  
const navigationPromise = page.waitForNavigation();
await page.goto(url,{
  waitUntil: 'load',
        // Remove the timeout
        timeout: 0
});



await page.waitForSelector('h1.title');

async function getElText(page, selector) {
	return await page.evaluate((selector) => {
		return document.querySelector(selector).innerText
	}, selector);
}

const filterNum = (str) => {
  const numericalChar = new Set([ ".",",","0","1","2","3","4","5","6","7","8","9" ]);
  str = str.split("").filter(char => numericalChar.has(char)).join("");
  return str;
}

await page.evaluate(_ => {
    window.scrollBy(0, window.innerHeight);

  });
  await page.waitFor(2000);
  await page.waitForSelector('#comments');
  const commentSelector = "#count > yt-formatted-string"
  await page.waitForSelector(commentSelector)
  const noOfComments = await getElText(page,commentSelector)
  console.log(noOfComments)

  var correctComments = filterNum(noOfComments)
  while (correctComments.search(",") >= 0) {
    correctComments = (correctComments + "").replace(',', '');
}
  console.log(correctComments)





  await navigationPromise;

  // Write your code here

  const distance = 800; // should be less than or equal to window.innerHeight
  const delay = 2;
  
    for (let i = 1; i < correctComments; i++) {
      console.log(i);
      const authorSelector = `.style-scope:nth-child(${i}) > #comment > #body > #main > #header > #header-author > #author-text > .style-scope`;
      console.log(authorSelector);
      const commentSelector = `.style-scope:nth-child(${i}) > #comment > #body > #main > #expander #content-text`;
      try{
        await page.waitForSelector(commentSelector)
      }catch(error){
          break
      }
      try{
        await page.waitForSelector(authorSelector)
      }catch(error){
          break
      }
      const commentText = await getElText(page, commentSelector);
      const stripped =commentText.replace(/^\s+|\s+$/gm,'');
      const author = await getElText(page, authorSelector);
      console.log(commentText)
      console.log(author)
      await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);
      await page.waitFor(delay);
  
      if (commentText) {
        // write each comment to DB or file
        // or batch the for processing later
        console.log(`${author}: ${commentText}`);
        comments.push(author + ":" + stripped +"\n\n");
  
      }else{
          break;
      }
    }
  
  outputFilePath = Date.now() + "comments.txt"

  var formattedComments = comments.join("")

  fs.writeFileSync(outputFilePath, formattedComments);

  await browser.close();

  res.json({
    path:outputFilePath
  })
})

app.get('/youtubecommentsscraper',(req,res) => {
  res.render("youtubecommentsscraper",{title:"FREE Download Youtube Comments of Any Youtube Video Online Tool - Scrape Youtube Comments of Youtube Video - FreeMediaTools.com"})
})

app.post('/compresspdf',(req,res) => {
  
    var inputFile = req.body.path

     console.log(req.body.path)
  
    outputFilePath = Date.now() + "output" + path.extname(req.body.path);
    console.log(outputFilePath);
  
    exec(
      `gs \ -q -dNOPAUSE -dBATCH -dSAFER \ -sDEVICE=pdfwrite \ -dCompatibilityLevel=1.3 \ -dPDFSETTINGS=/ebook \ -dEmbedAllFonts=true \ -dSubsetFonts=true \ -dAutoRotatePages=/None \ -dColorImageDownsampleType=/Bicubic \ -dColorImageResolution=72 \ -dGrayImageDownsampleType=/Bicubic \ -dGrayImageResolution=72 \ -dMonoImageDownsampleType=/Subsample \ -dMonoImageResolution=72 \ -sOutputFile=${outputFilePath} \ ${inputFile}`,
      (err, stdout, stderr) => {
        if (err) {
          res.json({
            error: "some error takes place",
          });
        }
        res.json({
          path: outputFilePath,
        });
      }
    );
  });

  app.get('/compresspdf',(req,res) => {
    res.render('compresspdf',{title:'FREE PDF File Compressor Tool to Compress PDF Online to Smaller Size 100% Works - FreeMediaTools.com'})
  })

app.post('/uploadcompresspdf',(req,res) => {
  encryptpasswordupload(req,res,function(err){
    if(err){
      return res.end("Error uploading file")
    }
res.json({
    path:req.file.path
  })
  })
})



app.get('/comparetextfiles',(req,res) =>{
  res.render('comparetextfiles',{title:"FREE Text Files String Compare Online Tool - Multiple Text Files String Compare and Difference Tool - FreeMediaTools.com"})
})

const textFileFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".txt"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};


var comparetextfileupload = multer({
  storage: storage,
  fileFilter: textFileFilter,
}).single("file");

app.post('/uploadfirstfilecomparetextfile',(req,res) => {
  comparetextfileupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
})

app.post('/uploadsecondfilecomparetextfile',(req,res) => {
  comparetextfileupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
})

app.post('/comparetextfiles',(req,res) =>{
  var firstfile = req.body.firstfile
  var secondfile = req.body.secondfile
 

  const firstfilecontent = fs.readFileSync(firstfile, 
  {encoding:'utf8', flag:'r'});

  const secondfilecontent = fs.readFileSync(secondfile, 
    {encoding:'utf8', flag:'r'});


console.log(firstfilecontent)
console.log(secondfilecontent)


res.json({
  firstfilecontent:firstfilecontent,
  secondfilecontent:secondfilecontent
})
})

const scssFileFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".scss"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var scsstocssupload = multer({
  storage: storage,
  fileFilter: scssFileFilter,
}).single("file");

app.post('/uploadscsstocss',(req,res) => {
  scsstocssupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
})

app.post('/scsstocss',(req,res) => {

  console.log(req.body.path);

  outputFilePath = Date.now() + "output.css";

  exec(
    `node-sass ${req.body.path} ${outputFilePath}`,
    (err, stdout, stderr) => {
      if (err) {
        res.json({
          error: "some error takes place",
        });
      }
      res.json({
        path: outputFilePath,
      });
    }
  );
  
})

app.get('/scsstocss',(req,res) => {
  res.render('scsstocss',{title:'FREE SCSS (SASS) to CSS Online Converter Tool - Best SASS to CSS Converter - FreeMediaTools.com'})
})


const cssFileFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".css"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var csstoscssupload = multer({
  storage: storage,
  fileFilter: cssFileFilter,
}).single("file");

app.post('/uploadcsstoscss',(req,res) => {
  csstoscssupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
})

var cssConverter = require('styleflux')

app.post('/csstoscss',(req,res) => {

  console.log(req.body.path);

  outputFilePath = path.basename(req.body.path,".css")

  cssConverter.processCSSFile(req.body.path)

  res.json({
    path:"public/uploads/"+outputFilePath+"_clean.scss"
  })
})


app.get('/csstoscss',(req,res) => {
  res.render('csstoscss',{title:'FREE CSS to SCSS (SASS) Online Converter Tool - Best CSS to SCSS Converter - FreeMediaTools.com'})
})

app.post('/uploadcsstojavascript',(req,res) => {
  csstoscssupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
})

app.post('/csstojavascript',(req,res) => {

  console.log(req.body.path);
  
  const css = fs.readFileSync(req.body.path, 
    {encoding:'utf8', flag:'r'});

  outputFilePath = Date.now() + "output.js"

  const outputobject = cssConverter.cssToObject(css)

  console.log(outputobject)

  fs.writeFileSync(outputFilePath, JSON.stringify(outputobject, null, 2) , 'utf-8');

  res.json({
    path:outputFilePath
  })
})


app.get('/csstojavascript',(req,res) => {
  res.render('csstojavascript',{title:'FREE CSS to Javascript Object Online Converter Tool - Best CSS to Javascript Object Converter - FreeMediaTools.com'})
})


app.get('/lesstocss',(req,res) => {
  res.render('lesstocss',{title:'FREE LESS to CSS Online Converter Tool - Best LESS to CSS Converter - FreeMediaTools.com'})
})


const lessFileFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".less"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};


var lesstocssupload = multer({
  storage: storage,
  fileFilter: lessFileFilter,
}).single("file");

app.post('/uploadlesstocss',(req,res) => {
  lesstocssupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
})


app.post('/lesstocss',(req,res) => {

  console.log(req.body.path);

  outputFilePath = Date.now() + "output.css"

  
  exec(
    `lessc ${req.body.path} ${outputFilePath}`,
    (err, stdout, stderr) => {
      if (err) {
        res.json({
          error: "some error takes place",
        });
      }
      res.json({
        path: outputFilePath,
      });
    }
  );
  
})

app.get('/csstoless',(req,res) => {
  res.render('csstoless',{title:'FREE CSS to LESS Online Converter Tool - Best CSS to LESS Converter - FreeMediaTools.com'})
})


var csstolessupload = multer({
  storage: storage,
  fileFilter: cssFileFilter,
}).single("file");

app.post('/uploadcsstoless',(req,res) => {
  csstolessupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
})


app.post('/csstoless',(req,res) => {

  console.log(req.body.path);

  outputFilePath = path.basename(req.body.path,".css")

  
 gulp
  .src(req.body.path)
  .pipe(cssToLess())
  .pipe(gulp.dest(__dirname));


res.json({
      path: outputFilePath + ".less",
    });
  
})

app.get('/lesstoscss',(req,res) => {
  res.render('lesstoscss',{title:'FREE LESS to SCSS Online Converter Tool - Best LESS to SCSS Converter - FreeMediaTools.com'})
})


var lesstoscssupload = multer({
  storage: storage,
  fileFilter: lessFileFilter,
}).single("file");

app.post('/uploadlesstoscss',(req,res) => {
  lesstoscssupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
})


app.post('/lesstoscss',(req,res) => {

  console.log(req.body.path);

  outputFilePath = path.basename(req.body.path,".less")

  
 gulp.src(req.body.path)
        .pipe(lessToScss())
        .pipe(gulp.dest(__dirname));


res.json({
      path: outputFilePath + ".scss",
    });
  
})

app.get('/xmlformatter',(req,res) => {
  res.render('xmlformatter',{title:'FREE XML Formatter or Indentator Online Tool to Format XML Online - Best XML Formatter Online Tool - FreeMediaTools.com'})
})


var xmlformatterupload = multer({
  storage: storage,
  fileFilter: xmlFilter,
}).single("file");

app.post('/uploadxmlformatter',(req,res) => {
  xmlformatterupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
})

var format = require('xml-formatter');


app.post('/xmlformatter',(req,res) => {

  console.log(req.body.path);

  outputFilePath = Date.now() + "output.xml"

  var content = fs.readFileSync(req.body.path, 
  {encoding:'utf8', flag:'r'});

  var formattedcontent = format(content, {
    indentation: '  ', 
    filter: (node) => node.type !== 'Comment', 
    collapseContent: true, 
    lineSeparator: '\n'
});

  fs.writeFileSync(outputFilePath,formattedcontent)


res.json({
      path: outputFilePath
    });
  
})

const isUp = require("is-up");

app.post("/singledomainstatuschecker", async (req, res) => {
  var url = req.body.domain;

    var statusResult = await isUp(url);
    if(statusResult){
      res.json({
        domain: url,
        domainstatus:"Site is Running (200) OK",
      });
    }
    else{
      res.json({
        domain: url,
        domainstatus:"Site is Down (500) Not Ok",
      });
    }
});

app.get("/bulksitedownchecker", (req, res) => {
  res.render("bulksitedownchecker", { title: "FREE Bulk Website Up-Down Status Checker Online Tool - Best Bulk Website Uptime Checker Tool - FreeMediaTools.com" });
});

const pngtoicoFileFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".png"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};


var pngtoicoupload = multer({
  storage: storage,
  fileFilter: pngtoicoFileFilter,
}).single("file");


app.post('/uploadpngtoico',(req,res) => {
  pngtoicoupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
})

app.post("/pngtoico", (req, res) => {
  var size = parseInt(req.body.size)
  console.log(size)
  outputFilePath = Date.now() + "output.ico";
  resizeImage = Date.now() + "resize.png";
  Jimp.read(req.body.path, function (err, test) {
    if (err) throw err;
    test.resize(size,size).quality(100).write(resizeImage);

    pngtoico([resizeImage])
      .then((buf) => {
        fs.writeFileSync(outputFilePath, buf);
        res.json({
          path: outputFilePath,
        });
      })
      .catch(console.error);
  });
});


app.get("/pngtoico",(req,res) => {

res.render("pngtoico",{title:"FREE PNG to ICO Online Tool - Best Tool to Convert PNG to Windows ICON File - FreeMediaTools.com"})

})

const pugFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".pug"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var pugtohtmldir = "public/pug"


var pugtohtmlstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pugtohtmldir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});


var pugtohtmlupload = multer({
  storage: pugtohtmlstorage,
  fileFilter: pugFilter,
}).single("file");


app.post('/uploadpugtohtml',(req,res) => {
  pugtohtmlupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
})

app.post("/pugtohtml", (req, res) => {

  var outputdir = "public/pugdist/"

  exec(`htmlcompile ${pugtohtmldir} ${outputdir}`,(err, stdout, stderr) => {
      if(err){
        res.send("error takes place in conversion")
      }

      res.json({
        path:outputdir + path.basename(req.body.path,".pug") + ".html"
      })
  })
});



const hamlFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".haml"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var hamltohtmldir = "public/haml"


var hamltohtmlstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, hamltohtmldir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});


var hamltohtmlupload = multer({
  storage: hamltohtmlstorage,
  fileFilter: hamlFilter,
}).single("file");


app.post('/uploadhamltohtml',(req,res) => {
  hamltohtmlupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
})

app.post("/hamltohtml", (req, res) => {

  var outputdir = "public/hamldist/"

  exec(`htmlcompile ${hamltohtmldir} ${outputdir}`,(err, stdout, stderr) => {
      if(err){
        res.send("error takes place in conversion")
      }

      res.json({
        path:outputdir + path.basename(req.body.path,".haml") + ".html"
      })
  })
});



const jadeFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".jade"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var jadetohtmldir = "public/jade"


var jadetohtmlstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, jadetohtmldir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});


var jadetohtmlupload = multer({
  storage: jadetohtmlstorage,
  fileFilter: jadeFilter,
}).single("file");


app.post('/uploadjadetohtml',(req,res) => {
  jadetohtmlupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
})


var addtextwatermarkupload = multer({
  storage: storage,
  fileFilter: imageFilter,
}).single("file");


app.post('/uploadaddtextwatermark',(req,res) => {
  addtextwatermarkupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.filename,
    });
  });
})


app.post("/jadetohtml", (req, res) => {

  var outputdir = "public/jadedist/"

  exec(`htmlcompile ${jadetohtmldir} ${outputdir}`,(err, stdout, stderr) => {
      if(err){
        res.send("error takes place in conversion")
      }

      res.json({
        path:outputdir + path.basename(req.body.path,".jade") + ".html"
      })
  })
});


const coffeeFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (
    ext !== ".coffee"
  ) {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};

var coffeescripttojavascriptupload = multer({
  storage: storage,
  fileFilter: coffeeFilter,
}).single("file");


app.post('/uploadcoffeescripttojavascript',(req,res) => {
  coffeescripttojavascriptupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
})

app.post("/coffeescripttojavascript", (req, res) => {

  var outputFile = Date.now() + "output.js"

  exec(`coffee -c -t -o ${outputFile} ${req.body.path}`,(err, stdout, stderr) => {
   
      res.json({
        path:outputFile
      })
  })
});

var removebackgroundimageupload = multer({ storage: storage, fileFilter: imageFilter }).single('file');

app.post('/uploadremovebackgroundfromimage',(req,res) => {
  removebackgroundimageupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
})

const {removeBackgroundFromImageUrl,removeBackgroundFromImageFile} = require("remove.bg")

app.post("/removebackgroundfromimage", (req, res) => {

var outputFile = Date.now() + "output.png"

removeBackgroundFromImageFile({
  path:req.body.path,
  apiKey: API_KEY,
  size: "regular",
  type: "auto",
  outputFile 
}).then((result) => {
 console.log(`File saved to ${outputFile}`);
  res.json({
    path:outputFile
  })
}).catch((errors) => {
 res.send(JSON.stringify(errors));
});


});


app.post("/removebackgroundfromurl", (req, res) => {

var outputFile = Date.now() + "output.png"

removeBackgroundFromImageUrl({
  url:req.body.url,
  apiKey: API_KEY,
  size: "regular",
  type: "auto",
  outputFile 
}).then((result) => {
 console.log(`File saved to ${outputFile}`);
  res.json({
    path:outputFile
  })
}).catch((errors) => {
 res.send(JSON.stringify(errors));
});


});



app.get('/unminifysourcecode',(req,res) =>{

res.render("unminifysourcecode",{title:"FREE Unminify JS, CSS, HTML, XML and JSON Code Online Tool - FreeMediaTools.com"})

})

app.get('/coffeescripttojavascript',(req,res) =>{

res.render("coffeescripttojavascript",{title:"FREE Online Tool to Compile and Convert CoffeeScript to Javascript Code Online Tool For Programmers - FreeMediaTools.com"})

})

app.get("/jsonvalidator",(req,res) =>{

res.render("jsonvalidator",{title:"FREE JSON Validator Linter and Formatter Online Tool For Programmers - FreeMediaTools.com"})

})

app.get("/hamltohtml",(req,res) =>{

res.render("hamltohtml",{title:"FREE Compile HAML Template File to HTML Markup Online Tool For Programmers - FreeMediaTools.com"})

})

app.get("/pugtohtml",(req,res) =>{

res.render("pugtohtml",{title:"FREE Compile PUG Template File to HTML Markup Online Tool For Programmers - FreeMediaTools.com"})

})

app.get("/jadetohtml",(req,res) =>{

res.render("jadetohtml",{title:"FREE Compile JADE Template File to HTML Markup Online Tool For Programmers - FreeMediaTools.com"})

})

app.get("/removebackgroundfromimage",(req,res) =>{

res.render("removebackgroundfromimage",{title:"FREE Tool to Remove Background From Image Automatically Online Tool to Make Image Transparent - FreeMediaTools.com"})

})

app.get("/removebackgroundfromurl",(req,res) =>{

res.render("removebackgroundfromurl",{title:"FREE Tool to Remove Background From URL Image Automatically Online Tool to Make Image Transparent - FreeMediaTools.com"})

})

app.get("/javascriptagecalculator",(req,res) =>{

res.render("javascriptagecalculator",{title:"FREE Javascript Age Calculator From Date of Birth Calendar Widget Online Tool - FreeMediaTools.com"})

})

app.get("/vscodeditor",(req,res) =>{

res.render("vscodeditor",{title:"FREE VS Code Theme Online Code Text Editor With Line Numbers - FreeMediaTools.com"})

})

app.get("/wordtypinggame",(req,res) =>{

res.render("wordtypinggame",{title:"FREE Typeracer Online Word Typing Game to Increase Typing Speed For Beginners - FreeMediaTools.com"})

})

app.get("/addtextwatermark",(req,res) =>{

res.render("addtextwatermark",{title:"FREE Tool to Add Text Watermark to Image Automatically Online Tool to Add Text Watermark - FreeMediaTools.com"})

})

app.get("/ipaddressvalidator",(req,res) =>{

res.render("ipaddressvalidator",{title:"FREE IP Address Validator Online Tool to Validate Both IPV4 and IPV6 IP Addresses - FreeMediaTools.com"})

})

app.post("/validateip",(req,res) => {

if(validateIp.ipv4(req.body.address)){

res.json({
message:"Valid IP Address"
})

}

else{
res.json({
message:"Invalid IP Address"
})


}

})

const domainPing = require("domain-ping");

app.get("/whatismyipaddress",(req,res) =>{

var data = geoIP.allData(ipdata.clientIp)

res.render("whatismyipaddress",{title:"FREE Online Tool to Find your Public IP Address and Location Details - What is my IP Address  - FreeMediaTools.com",ip:ipdata.clientIp,data:data})

})

app.get("/websitetoipaddress",(req,res) =>{

res.render("websitetoipaddress",{title:"FREE IP Address Finder of Website and Server Online Tool - Best Website IP Address LookUp Online Tool  - FreeMediaTools.com"})

})

app.get("/addbordertoimage",(req,res) =>{

res.render("addbordertoimage",{title:"FREE Online Tool to Add Colorful Border Frames to Photo or Picture Online - Best Tool to Add Border to Images Online  - FreeMediaTools.com"})

})

app.get("/youtubethumbnailgenerator",(req,res) =>{

res.render("youtubethumbnailgenerator",{title:"FREE Youtube Video Thumbnail Image Generator - Generate Custom Youtube Thumbnail Templates For Free  - FreeMediaTools.com"})

})

app.get("/covid19tracker",(req,res) => {

res.render("covidtracker",{title:"FREE Coronavirus Global COVID-19 Tracker Online Tool - FreeMediaTools.com"})

})

app.get("/handcricket",(req,res) => {

res.render("handcricket",{title:"Play FREE Hand Cricket Multiplayer Game Online With Computer - FreeMediaTools.com"})

})

app.get("/carpool",(req,res) => {

res.render("carpool",{title:"Play FREE 8 Ball Pool Billiards Multiplayer Game With Computer Online - FreeMediaTools.com"})

})

app.get("/chessgame",(req,res) => {

res.render("chessgame",{title:"Play FREE Chess Multiplayer Game Online With Computer - FreeMediaTools.com"})

})

app.post('/getipdetails',(req,res) => {

var ip = ""

domainPing(req.body.address) // Insert the domain you want to ping
    .then((response) => {
        ip = response.ip

        res.json({
         ip:ip,
         data:geoIP.allData(ip)
        })
    })
    .catch((error) => {
        console.error(error);
    });

})

app.post('/uploadaddbordertoimage',(req,res) => {
  addtextwatermarkupload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      path: req.file.path,
    });
  });
})


app.post('/addbordertoimage',(req,res) => {

var input = req.body.path

var size = req.body.size

var color = req.body.color

var output = Date.now() + "output.png"

const python = spawn('python3', ['addborderstoimage.py',input,size,color,output]);
 // collect data from script
 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
    res.json({
      path:output
    })
  })
})

app.get('/alexarankchecker/:url',async(req,res) => {
   

        var site = req.params.url
        console.log(site)
      
        if(isValidDomain(site)){
      
          var data = await AlexaRank.siteinfo(site);
          console.log(data);
      
          if(data.status === 400){
            res.send("Please enter domain without http or https")
          }else if(data.status === 404){
            res.json({
                rank:"Your website doesn't have a alexa rank"
            })
          }
          else{
            res.json({
                rank:data.data.site_rank
            })
          }
      
        }
        else{
          res.json({
              rank:"Domain name is not invalid"
          })
        }
      
      
})



app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});


