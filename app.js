var express = require("express");
var app = express();

const bodyParser = require(`body-parser`);
app.use( bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mongoose DB stuff
const { MongoClient } = require("mongodb");
const uri =
	"mongodb+srv://ethanleonard821:mIrBb8bdCvxGYAqq@bccomputerprogrammingcl.fwws0ag.mongodb.net/?retryWrites=true&w=majority";;
const client = new MongoClient(uri);
client.connect();

app.use(express.static("Public"));
app.use(express.static("Images"));
app.use(express.json());

// Very important line - not too sure what exactly it does but it makes req.body actually work
app.use(express.urlencoded({ extended : true}));


app.get("/", function(req, res) {
	res.render("landing.ejs");
});

// app.get("/projects", function(req, res) {
	//res.render("projects.ejs");
//});

app.get("/leadership", function(req, res) {
	res.render("leadership.ejs");
});

app.get("/landing", function(req, res) {
	res.redirect("/");
});

app.get("/about", function(req, res) {
	res.render("about.ejs");
});

app.get("/home", function(req, res) {
	
	var searcherror = false;
	
	res.render("homepage.ejs", {searcherror:searcherror});
});

app.post("/home", function(req, res) {
	
	var query = req.body.query;
	
	query = query.toLowerCase();
	
	var queries = ["landing", "home", "news", "leadership", "projects", "contact", "about"]
	
	if (queries.includes(query)) {
		var url = "/" + query;
		res.redirect(url);
	}	
	
	//This is really really bad. Im tired and this works but bad very bad. Fixed at somepoint please. Better way would be to have set search error to true and send that data to /home and have it be so that when searcherror = true then the bootstrap alert goes off, but I don't know how to do that rn but honestly it probably wouldnt be too bad.
	else {
		searcherror = true; 
		res.render("homepage.ejs", {searcherror:searcherror});
	}
});

// app.get("/searcherror", function(req, res) {
	//res.render("searcherror.ejs");
//});

app.get("/contact", function(req, res) {
	res.render("contact.ejs");
});


app.get("/news", function(req, res) {
	res.render("news.ejs");	
});

app.get("/gallery", function(req, res) {
	res.render("gallery.ejs");	
});


app.listen(3000, function(err, success) {
	if(err) {
		console.log(err);
		console.log("ERROR!!!");
	} else {
		console.log("The server has started");
	}
}); 
