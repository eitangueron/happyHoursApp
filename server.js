'use strict'

/** imports
*/
const express = require('express');
const session = require('express-session');
const {MongoClient} = require("mongodb");
const bodyParser = require('body-parser');

let db = null;

/** init DB
*/
async function main(){
	
	const uri = "mongodb+srv://HappyHour:MilabHappyHour@hhdb.8h86a.mongodb.net/test?retryWrites=true&w=majority";
	const client = new MongoClient(uri);
	 try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        console.log("connected!");
		db = client.db("HappyHourData");
		console.log(`connected to database ${db.databaseName}`);
 
    } catch (e) {
        console.error(e);
    }
}
main().catch(console.error);


/** init app
*/
let app = express();
app.use(bodyParser.json());
app.use(session({
    secret: "shhhh",
    resave: false,
    saveUninitialized: true
}));


/** retrieving all locations
*/
app.get("/all_locations", async (req, res) => {
   
	const locations = db.collection("locations");

    const locationsCursor = await locations.find();
    const locationsRetrieved = await locationsCursor.toArray();

    console.log(locationsRetrieved);
    res.json(locationsRetrieved);
})


/**
 * Express route for user registration.
 * Body parameters: 
 * email (string), 
 * password (string), 
 * user_name (string)
 */
app.get("/signup", async(req, res) => {
        
	const Users = db.collection("Users");
	const emailGiven = req.query.email;
	const usernameGiven = req.query.username;
	const passwordGiven = req.query.password;
	
	//check if username is taken
	let doc = await Users.findOne({"user_name": usernameGiven});

	if (doc) {
		console.log("didnt create user");
		res.status(200).json({status: "username is taken"});
	} else {
		//insert new user to the DB
		try{
			
			let newUser = {
				email: emailGiven,
				user_name: usernameGiven,
				password: passwordGiven,
			}
			
			Users.insertOne(newUser);
			console.log("successfully added the user to the DB");
			res.status(500).json({is_user_added: "user added"});
			
		} catch(err) {
			
			console.log("couldn't sign up the user");
			res.status(200).json({status: "couldn't create user"});
			
		}
	}
})

 
/**
 * Express route for user login.
 * Body parameters: 
 * email (string), 
 * password (string), 
 * user_name (string)
 */
app.get("/login", async (req, res) => {
    
	const Users = db.collection("Users");
    let username = req.query.user_name;
	let password = req.query.password;
    console.log(username);
	console.log(password);

    //search in DB for username got as parameter
    const doc = await Users.findOne({"user_name": username});

    //check if the document contains a user
    if (doc){
        console.log("true");
		//check if password matches to DB
			if (password == doc.password) {
               return res.status(500).json({usernameExists: true, passwordMatches: true});
			} else {
               return res.status(500).json({usernameExists: true, passwordMatches: false});
			}
    } else {
        console.log("false");
		return res.status(500).json({usernameExists: false, passwordMatches: false});
    }
})

app.get('/', (req, res) => {
    res.send(`Welcome to HappyHourApp server!`)
}) 

app.listen(3030, () => {
    console.log("Listening on port 3030");
});