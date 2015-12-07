var express = require('express');

var model = require('../lib/model');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// Provides a login view

function user(name,pass,city,mailAddress,email,planid){
  return{

    name: name,
    pass: pass,
    city: city,
    mailAddress: mailAddress,
    email: email,
    planid: planid

  };
}


router.post('/rent' , (req,res) => {
  var user = req.session.user;

});


router.get('/login', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  // Redirect to main if session and user is online:
   
    var message = req.flash('login') || '';
    res.render('login', {
    	message:message  });
  
});

router.get('/create-account', (req,res) => {

  var message = req.flash('create-account') || '';
  res.render('create-account',{
    title : 'Create-Account',
    message:message
  });
});

// Performs **basic** user authentication.
router.post('/auth', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

    // Redirect to main if session and user is online:
    if (user) {
      res.redirect('/user/home');
    }
    else {
      // Pull the values from the form:
      var name = req.body.name;
      var pass = req.body.pass;

      if (!name || !pass) {
        req.flash('login', 'did not provide the proper credentials');
        res.redirect('/user/login');
      }
      else {
        model.userLookup(name, pass, function(error, user) {
          if (error) {
            // Pass a message to login:
            req.flash('login', error);
            res.redirect('/user/login');
          }
          else {
            // add the user to the map of online users:
            


            // create a session variable to represent stateful connection
            req.session.user = user;

            // Pass a message to main:
            req.flash('login', 'Authentication Successful');
            res.redirect('/user/profile');
          }
        });
      }
    }
  });

router.get('/rentals',function(req,res){
	

	var message = req.flash('rentview') || ''
	res.render('rentview',{
		message: message
	});
});

router.get('/returns', function(req,res){

	
	var message = req.flash('returnview') || ''
	res.render('returnview',{
		message: message
	});
});
router.get('/faq', function (req, res) {
  res.render('FAQ', {
    title : 'FAQ',
  });
});
// Performs logout functionality - it does nothing!
router.get('/logout', function(req, res) {
  // Grab the user session if logged in.
  var user = req.session.user;

  // If the client has a session, but is not online it
  // could mean that the server restarted, so we require
  // a subsequent login.
  if (user) {
    delete req.session.user;
  }
    res.redirect('/user/login');
});


router.get('/profile', function (req, res) {

  // Grab the user session if it exists:
  var user = req.session.user;

  // If no session, redirect to login.
  if (!user) {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  else {
    var admin = "";

    if (user.admin === true) {
      admin = "Administrator";
    }

    res.render('profile', {
      name: user.name
     
    	});
  	}


});

router.get('/about', function (req, res) {
  res.render('about', {
    title : 'About',
  });
});

router.post('/signup', function (req, res) {
 var name = req.body.name;
  var pass = req.body.pass;
  var mailAddress = req.body.mail;
  var city = req.body.city;
  var email = req.body.email;
  var cpass = req.body.confirm;
  var plan = req.body.plan;

  

  if (!name || !pass || !mailAddress || !cpass || !email || !city || !plan) {
    req.flash('login', 'Sign up unsuccessful. Please provide valid credentials.');
    res.redirect('/user/login');
  }

  else {
	var u = user(name,pass,city,mailAddress,email,plan);
	
	
	model.addUser(u,function(err) {
		if(err){
				console.log(err);
				req.flash('login', "duplicate username");
				res.redirect('/user/login');
			}
			
		else{

			req.flash('landing-page', 'Sign Up Complete!');
			res.redirect('/user/profile');
			}
		});
	}
});

router.post('/return',function(req,res){
	
	var user = req.session.user;
	if(!user){
		req.flash('login','You must login to return a movie!');
		res.redirect('/user/login');
		return;
	}
	
	var mname = req.body.MovieName;
	
	if(!mname){
		req.flash('returnview',"Please enter a Movie Name");
		res.redirect('/user/returns');

	}
	else{
		model.movieLookup(mname,function(err,result){
			if(err){
				
				req.flash('returnview','Movie Name not in our Collection');
				res.redirect('/user/returns');
				
			}
			else{
				var id = result.rows[0].movieid;
				model.returnMovie(user.name,id,function(err){

					if(err){
						
				req.flash('returnview','You are not currently renting this movie');
				res.redirect('/user/returns');
				
					}
					else{
						
						req.flash('returnview','Movie Returned yay!');
						res.redirect('/user/returns');
					}
				});
				

			}
		});
	}

});

router.post('/rent', function(req,res){
	console.log("POST REQUEST MADE");
	var user = req.session.user;
	if(!user){
		req.flash('login','You must login to rent a movie!');
		res.redirect('/user/login');
		return;
	}
	var mname = req.body.MovieName;
	if(!mname){
		req.flash('rentview',"Please enter a Movie Name");
		res.redirect('/user/rentals');

	}
	else{
		model.movieLookup(mname,function(err,result){
			if(err){
				
				req.flash('rentview','Movie Name not in our Collection');
				res.redirect('/user/rentals');
				
			}
			else{
				var id = result.rows[0].movieid;
				movie.rent(user.name,id,function(err){
					if(err){
						req.flash('rentview','Someone is already renting this movie');
						res.redirect('/user/rentals');					
			}
			else{
				req.flash('rentview','Movie Rented yay');
				res.redirect('/user/rentals')
			}
				});
	}

});
	}
});
	/*
				if(e){
					req.flash('login','error adding');
					res.redirect('/user/login');
				}
				else{
					req.flash('home','user added');
					res.redirect('/user/home');
				}
			});
			}
			else{
				req.flash('login', 'duplicate username');
				res.redirect('/user/login');
			}

		}

		else{
			console.log(person);
			req.flash('login','username already exits');
			res.redirect('/user/login');
		}

    //Check if username has already been taken. If so, flash appropriate message;
    */
 
module.exports = router;