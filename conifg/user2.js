var mongoose =require('mongoose');
/*var photos=mongoose.Schema({
	usern:String,
	fname:String,
});*/
var userschema2=mongoose.Schema({
	
	firstname:String,
	username:String,
	password:String,
	lastname:String,
	emailid:String,
	phno:String,
	media:[{usern:String,
	fname:String
}
],
no: Number,
friendlist:[{funame:String}],
fno:Number,
});

module.exports=mongoose.model('user',userschema2);