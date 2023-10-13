const express = require("express");
const useragent = require('express-useragent');
const app = express();

app.use(express.static("Public"));
app.use(express.static("Images"));
app.use(express.json());

// Very important line - not too sure what exactly it does but it makes req.body actually work
app.use(useragent.express());
app.use(express.urlencoded({ extended : true}));

let mobileDevice;

app.get('/', (req, res) => {
	if (req.useragent.isMobile) {
		// User is on a mobile device
		mobileDevice = true;
		res.send('You are using a mobile device.');
	} else {
		// User is not on a mobile device
		mobileDevice = false;
		res.send('You are not on a mobile device.');
	}
});

console.log(mobileDevice);


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

if (mobileDevice) {
	app.get("/contact", function (req, res) {
		res.render("contact_mobile.ejs")
	})
} else {
	app.get("/contact", function (req, res) {
		res.render("contact_desktop.ejs")
	})
}

app.get("/contact", function(req, res) {
	res.render("contact.ejs");
});


app.get("/news", function(req, res) {
	res.render("news.ejs");	
});

const port = 3000;

app.listen(port, function(err, success) {
	if(err) {
		console.error("ERROR!!!");
		console.error(err.error);
	} else {
		console.log("The server has started");
	}
});