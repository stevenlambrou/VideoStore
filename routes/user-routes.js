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