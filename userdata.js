var mongoose =require('mongoose');
/*var photos=mongoose.Schema({
	usern:String,
	fname:String,
});*/
var userschema=mongoose.Schema({
	regno:String,
    	 name:String,	
    		subject1:String,
    		 grade1:String,
    		 subject2:String,
    		 grade2:String,
    		 subject3:String,
    		 grade3:String

});

module.exports=mongoose.model('user',userschema);