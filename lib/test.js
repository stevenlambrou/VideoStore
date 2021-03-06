var model = require('../lib/model');
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

var newUser = new user('joe','eoj','city','address','joe@gmail.com',4);




model.addUser(newUser,function(err){
	if(err){
		console.log('USER ALREADY EXISTS');
	}
	else {
		
		console.log('USER ADDED');
	}
});

model.userLookup(newUser.name,newUser.pass,function(err,user){
	if(err){
		console.log('BAD LOGIN');
	}
	else{
		console.log(user);
		console.log('USER CREDENTIALS MATCH');
	} 
});


model.movieLookup('TRON',function(err){
	if(err){
		console.log('MOVIE NOT IN DATABASE');
	}
	else console.log('MOVIE EXISTS');
});

model.rent(newUser.name,1,function(err){
	if(err){
		console.log('MOVIE ALREADY RENTED');
	}
	else {
		
		console.log('MOVIE RENTED');
	}
});

model.rentalCount(newUser.name,function(err,count){
	if(err){
		console.log('ERROR CALCULATING RENTALS');
	}
	else console.log('RENTAL COUNT: ' + count);
});
model.returnMovie(newUser.name,1,function(err){
	if(err){
		console.log('MOVIE NOT RENTED BY THIS USER');
	}
	else console.log('MOVIE RETURNED');
});

model.rentalCount(newUser.name,function(err,count){
	if(err){
		console.log('ERROR CALCULATING RENTALS');
	}
	else console.log('RENTAL COUNT: ' + count);
});



model.planLookup(newUser.name,function(err,plan){
	if(err){
		console.log('ERROR');
	}
	else console.log('PLAN ID: ' + plan);
})
