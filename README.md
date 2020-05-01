----------


Alert is a Scam reporting and emergency tool.
## Links to live interfaces
1. Cop interface= https://agile-reef-60327.herokuapp.com/cop.html
2. Civilian Interface= https://agile-reef-60327.herokuapp.com/civilian.html
## Demo Video
https://youtu.be/R13aGc6fd8Y
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

 1. [Nodejs and npm/yarn](https://nodejs.org)
 2. [MongoDB](https://www.mongodb.com/)
 3. [Git](https://git-scm.com)
 
### Environment variables
##### Ensure to set the following environment
```
GOOGLE_MAP_KEY=XXXXXXXXXXXXXXXXXXXXXXXXX
FIREBASE_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXX
CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXX
MAILCHIMP_API=XXXXXXXXXXXXXXXXXX
MAILCHIMP_LIST_ID=XXXXXXXXXXXXX
PASSWORD_HASH_KEY=XXXXXXXXXX
ADMIN_EMAIL=XXXXXXXXXXXXX
ADMIN_PASSWORD=XXXXXXXXXX
```


### How to install:

##### Clone this repo

``` git clone https://github.com/DSC-University-of-Uyo/Alert.git ```

##### Install NodeJS and MongoDB
##### Install project Dependencies
``` cd Alert && npm install ``` 


### How to run:

* run `node app.js` 
* Open the app go to http://localhost:5000 and http://localhost:5000/admin to access the admin panel
* Open a the  civilian page by going to http://localhost:5000/civilian.html
* Open a the cop page on separate tab preferably on another browser - http://localhost:5000/cop.html


### How to Approve Cop

* Log in to the admin panel - http://localhost:5000/admin
* Click on cop on the side bar
* Search for the user and edit its record, set Approved to yes be checking the check box.
