var express = require('express');

var router = express.Router();

function user(name,pass){
	return{
		name: name,
		pass: pass,
		uid: ++nextUID,
		admin: admin
	};
}

router.get('/login',(reg,res) => {

	var user = req.session.user;

	if (user){
		res.redirect('/user/home');
	}
	else {
		var message = req.flash('login') || '';
		res.render('login', {
			title : 'User Login',
			message : message });
		}
	}
});

router.post('/auth', (req,res) =>){

	var user = req.session.user;

}

