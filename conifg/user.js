var mongoose =require('mongoose');
var userschema2=mongoose.Schema({
	local:{
	firstname:String,
	username:String,
	password:String,
	lastname:String,
	emailid:String,
	phno:String
	}

});

module.exports=mongoose.model('user',userschema2);