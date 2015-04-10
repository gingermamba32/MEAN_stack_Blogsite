//MONGOOSE.js file ... will be used to create 

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');  //connect to the database
var express = require('express');
var router = express.Router();              // get an instance of the express Router


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	var userSchema = mongoose.Schema({
		username: String,
		password: String,
		email: String
	})
	var User = mongoose.model('User', userSchema);


    // dont need to make a post schema
	var postSchema = mongoose.Schema({
		author: String,
		text: String
	})
	var Post = mongoose.model('Post', postSchema);

	router.param('user_id', function (req, res, next, user_id) {
		req.user = user_id;
		next();
	});

     //delete doesnt work
	router.post('/delete', function(req, res) {
	    Post.findOneAndRemove({"_id": 'ObjectId("54f0feaf3d0a17730bd8375a")'}, function (err, post) {
	    	console.log(post);
	    	res.json(post);
	    });
	});

	//not needed
	router.get('/posts', function(req, res) {
	    Post.find(function (err, posts) {
	    	res.json(posts);
	    }); 
	});
 	
 	
 	//*************************************
 	//register 
	router.post('/register', function(req, res) {
		User.find(function (err, users) {
			if (!users.some(function (elem) {
				return elem.username === req.body.username;
			})) {
				var newUser = new User({ username: req.body.username, password: req.body.password, email: req.body.email });
				newUser.save(function (err, newUser) {
				  if (err) {return console.error(err);}
				  else {
				  	console.log('User Added');
				  	res.json({added: true});
				  }
				});
			} else {
			  	console.log('User not added, username already exists');
				res.json({added: false});
			}
		});	
	});
	
	router.post('/login', function(req, res) {
		User.find(function (err, users) {
			if (users.some(function (elem) {
				return elem.username === req.body.username && elem.password === req.body.password;
			})) {
				console.log('Logged in')
				res.json({loggedIn: true});
			} else {
			  	console.log('Not logged in');
				res.json({loggedIn: false});
			}
		});	
	});
	//****************************************

    //not needed
	router.post('/makePost', function(req, res) {
		var newPost = new Post(req.body);
		newPost.save(function (err, newPost) {
			console.log('Post added');
			res.json(newPost);
		});
	});

	//not needed
	router.get('/getPosts', function(req, res) {
		Post.find(function (err, posts) {
			res.json(posts);
		});	
	});

	

});

module.exports = router;


