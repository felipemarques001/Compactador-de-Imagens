//Getting the packages
const sharp = require('sharp');
const compress_images = require("compress-images");
const fs = require('fs');

//Getting the inputs you defined before running the code
let image = process.argv[2];
let width = Number(process.argv[3]);
//The 'process.argv' is an input you give when calling the code in node.js
//Example: node script.js image.jpg 400


function resize(image, width){
    sharp(image).resize({width:width}).toFile('./Temporary_Images/temp_Image.jpg', (error)=>{
        if(error){
            console.log(error);
        }else{
            console.log('Successful image reduction');
            //After reducing the image, the compress function will be called
            compress('./Temporary_Images/temp_Image.jpg', './Resized_Image/');
        }
    })
}

function compress(inputPath, outputPath){
compress_images(inputPath, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
                { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
                { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
                { svg: { engine: "svgo", command: "--multipass" } },
                { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
  function (error, completed, statistic) {
    console.log("-------------");
    console.log(error);
    console.log(completed);
    console.log(statistic);
    console.log("-------------");

    //This function will delete the temporary image
    fs.unlink(inputPath, (error)=>{
        if(error){
            console.log(error);
        }else{
            console.log(`File ${inputPath} deleted successfully`)
        }
    })
  }
);
}
resize(image, width);
