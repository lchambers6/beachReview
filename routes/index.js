const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamodb = new AWS.DynamoDB.DocumentClient();
const routes = require("express").Router();
const dynamoService = require("../services/dynamo.js");
const { saveImage } = require("../services/s3.js");

// Get data for a particular beach
routes.get("/beach/:id", (req, res) => {
  try {
    let id = req.params.id;
    let params = dynamoService.buildQuery(process.env.TABLE_NAME, "id", id); //Builds a basic query to pull back the single beach record
    dynamodb.query(params, (err, data) => {
      if (data.Items.length) {
        res.status(200).json(data.Items[0]);
      } else {
        err = { message: `${id} Beach Not Found`, status: 400 };
        res.status(400).send(err);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Retrieve the beaches based on rating
routes.get("/reviews", (req, res) => {
  try {
    let getParams = dynamoService.buildQuery("multiple_arguments"); // builds a complex query that would take advantage of Dynamo's `ScanIndexForward` feature to sort by rating
    dynamoService.getAllData(getParams, (err, data) => {
      //this version will return all the beaches but we could easily limit the response
      if (err) {
        res.status(400).send(err);
      } else {
        responseService.handleDynamoResp(err, res, {
          [`${contentType}_count`]: data.length,
        });
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add a new review to a beach
//example payload:
// {
//   "rating": 5,
//   "comment": "This is a Beautiful Beach",
//   "user_image": "base64 encoded imageData"
// }
routes.post("/review/:id", (req, res) => {
  try {
    let id = req.params.id;
    let payload = req.body;
    //First get the
    let params = dynamoService.buildQuery(process.env.TABLE_NAME, "id", id); //Builds a basic query to pull back the single beach record
    dynamodb.query(params, (err, data) => {
      if (data.Items.length) {
        //Once we have the beach record we can update the review values
        let updateData = getRating(data.Items[0], payload);
        let params = JSON.parse(updateData);
        dynamodb.batchWrite(params, (err, data) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).json(updateData);
          }
        });
      } else {
        res.status(400).send(err);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// update the ratings for a beach
function getRating(data, newReview) {
  let totalRate = 0;
  let imageUrl = saveImage(data, newReview);
  newReview.user_image = imageUrl;
  data.comments.push(newReview);
  data.comments.forEach((review) => {
    totalRate += review.rating;
  });
  data.aggregated_rating = totalRate / data.comments.length;
  return data;
}

//save the image from a review
function saveImage(data, payload) {
  //decode the base64 data, utilize the s3 service to add the image to a bucket
  //the s3 service will have error handling and will return the imgUrl which will be passed back
  return s3Response.imgUrl;
}

// I will assume that creating and updating beach base data will be done by admins and will add the routes

module.exports = routes;
