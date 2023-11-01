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

const validQueries = ["landing", "home", "news", "leadership", "projects", "contact", "about"];

function handlePostRequest(req, res) {
	const query = (req.body.query || '').toLowerCase();

	if (validQueries.includes(query)) {
		return res.redirect(`/${query}`);
	}

	// Handle search error. You might want to redirect or render a different template here.
	res.status(400).render("homepage.ejs", {searcherror: true});
}

app.get("/", function(req, res) {
	res.render("landing.ejs");
});

app.get("/projects", function(req, res) {
	res.render("projects.ejs");
});

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

validQueries.forEach(query => {
	app.post(`/${query}`, handlePostRequest);
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
