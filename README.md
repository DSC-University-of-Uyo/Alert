----------


Alartify is a Scam reporting and emergency tool.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

 1. [Nodejs and npm/yarn](https://nodejs.org)
 2. [MongoDB](https://www.mongodb.com/)
 3. [Git](https://git-scm.com)


### How to install:

* Clone or fork this repo
* Install NodeJS and MongoDB
* Run `npm install` 
* run `mongoimport --db Alert --collection cops --drop --file ./db/cops.json` to import sample cop information in MongoDB
* run `mongoimport --db Alert --collection requests --drop --file ./db/crime-data.json` to import sample crime information in MongoDB
* run `mongoimport --db Alert --collection scam --drop --file ./db/scam-data.json` to import sample scams information in MongoDB

### How to run:

* run `node app.js` 
* Open a demo civilian page by going to http://localhost:5000/civilian.html?
* Open 3 or more cop pages from the imported cop profiles on separate tabs - [01](http://localhost:5000/cop.html), [02](http://localhost:5000/cop.html), [03](http://localhost:5000/cop.html), [04](http://localhost:5000/cop.html), [05](http://localhost:5000/cop.html), [06](http://localhost:5000/cop.html), [07](http://localhost:5000/cop.html)

