For this project I will be outlining the basic design of the backend for a beach recommendation system. I will design a restful API which will allow for utilization by iOS, Android, and Web apps.

# Frontend Requirements
- The apps will display a scrollable list of beaches, sorted by rating.
- Users can click on a beach to see more details. This includes a picture, the aggregate rating, and any comments.
- Users can rate and comment on beaches.

# Outline
To meet the frontend requirements above I will outline architectural choices for the different components of the backed and discuss the reasoning. PLEASE Check individual files for comments!

## Assumptions
I will make a few assumptions to help explain some of the design choices I make below:
1. Users do not have to login to leave a comment or a rating.
2. There is no functionality for users to edit previous comments.
3. Beaches would not be added to the database by users. Instead a seperate console would be used to add and update the list of beaches.

## Cloud Provider
Choice: AWS

Reason: I am most familiar with AWS. Other providers could be a fine choice.

## Database
Choice: DynamoDB

Reason: There are two obvious databasing paradigms that come to mind to solve this challenge. 
- Relational DB (mySQL): One could reasonable design a mySQL database with a one to many relationship between beaches and rating/comments. I would likely use this option if there were more complex relationships or greater functionality in the app. 
- NoSQL DB (DynamoDB): For this project I prefer a NoSQL database due to the [assumptions](#assumptions) made above. The JSON stored in the DB could look like `exampleBeachData.json` file. Each `beach` record will have its base information and an array of objects with rating and comment information. The DynamoDB will need to be set up with Global Secondary Indexes on `aggregated_rating` and `name` to allow for sorting by rating.

## Server
Choice: Express with a lambda wrapper

Reason: Express is a light weight server written in node.js. Wrapping it in a lambda may seem a bit counter intuitive because "lambdas are serverless," but this combination allows for the best of both worlds. We get the clean routing and readability of express, and the convenience of integrated AWS services. lambda-local is a helpful dev tool that can be used to mimic many aws triggers.

## Image Storage
Choice: AWS S3

Reason: Easy to manage with everything else being on AWS
  
   
