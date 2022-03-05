const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();


exports.getAllData = function (params, callback) {
  //When DynamoDB returns data there is a limit to the size. If the data is too large there will be
  //a `LastEvaluatedKey` which allows to user to grab more data from where the last batch left off
  // this function will recursively pull and aggregate the data until it has all been returned
}

exports.buildQuery = function (tableName, indexColumn, sort_key, ScanIndexForward = false, limit = false, ExclusiveStartKey = false, filterExpression = false) {
 //This function will use the a generate a `filterExpression` which can then be used with the getAllData() function to retrieve the data from DynamoDB
}
