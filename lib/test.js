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
console.log(newUser.name + newUser.pass + newUser.city + newUser.planid);


model.showUsers();
model.addUser(newUser,function(err){
	if(err){
		console.log('USER ALREADY EXISTS');
	}
	else console.log('USER ADDED');
});
