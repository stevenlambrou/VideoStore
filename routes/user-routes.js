var express = require('express');

var model = require('../lib/model');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// A list of users who are online:
var online = require('../lib/online').online;
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
router.post('/rentals' , (req.res) => {
  var user = req.session.user;

}



router.get('/login', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  // Redirect to main if session and user is online:
  if (user && online[user.name]) {
    res.redirect('/user/profile'); //Changed from main to home
  }
  else {
    // Grab any messages being sent to us from redirect:
    var message = req.flash('login') || '';
    res.render('login', { title   : 'User Login',
                          message : message });
  }
});

// Performs **basic** user authentication.
router.post('/auth', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  console.log("Anonymous: " + req.query.anon);

    // Redirect to main if session and user is online:
    if (user && online[user]) {
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
            online[user.name] = user;

            // create a session variable to represent stateful connection
            req.session.user = user;

            // Pass a message to main:
            req.flash('home', 'Authentication Successful');
            res.redirect('/user/home');
          }
        });
      }
    }
  }


});

// Renders the main user view.
router.get('/landing-page', function(req, res) {
  // Grab the user session if it exists:
  var user = req.session.user;

  console.log("HELLO" + user);

  // If no session, redirect to login.
  if (!user) {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  else if (user && !online[user.name]) {
    req.flash('login', 'Login Expired');
    delete req.session.user;
    res.redirect('/user/login')
  }
  else {
    // capture the user object or create a default.
    var message = req.flash('home') || 'Login Successful';
    res.render('home', {
      message: message
    });
  }
});


// Performs logout functionality - it does nothing!
router.get('/logout', function(req, res) {
  // Grab the user session if logged in.
  var user = req.session.user;

  // If the client has a session, but is not online it
  // could mean that the server restarted, so we require
  // a subsequent login.
  if (user && !online[user.name]) {
    delete req.session.user;
  }
  // Otherwise, we delete both.
  else if (user) {
    delete online[user.name];
    delete req.session.user;
  }

  // Redirect to login regardless.
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
      name: user.name,
      admin: admin
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
  var confirm = req.body.confirm;

  if (!name || !pass || !confirm) {
    req.flash('login', 'Sign up unsuccessful. Please provide valid credentials.');
    res.redirect('/user/login');
  }

  else {
	var u = user(name,pass,false);
	console.log(u);
	model.userAdd(u,function(err, person) {
		if(err){
			if(err.code == 11000){
				req.flash('login', "duplicate username");
				res.redirect('/user/login');
			}
			else{
				req.flash('login', 'error adding user');
				res.redirect('/user/login');
			}
		}
		else{

			req.flash('login', 'Sign Up Complete!');
			res.redirect('/user/login');
		}
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
  	});
  }
});

module.exports = router;
