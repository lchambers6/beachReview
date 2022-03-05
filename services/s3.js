const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.saveImage = function (imgData, callback) {
    //Take in image data, and save the data to an s3 bucket. Will return a imgUrl to access the image
  }