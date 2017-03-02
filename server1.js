var express = require("express");
var app     = express();
var path    = require("path");
var bodyparser=require("body-parser");
var util = require('util');
var mongoose=require('mongoose');
var user=require('./conifg/user2.js');//user schema
var fs = require('fs');
mongoose.connect('mongodb://127.0.0.1/test');
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
var upp='C:/Users/teja/Desktop/webtechp/uploads/';

app.set('view engine','ejs');

///////////

var formidable = require('formidable');
var session_username;
var h=0;

//var k='file://C:/Users/teja/Desktop/webtechp/uploads/';

var k;

var filenames=new Array("a","a","a","a","a","a","a","a","a","a","a","a","a","b","a","a","a","a","a","a","a","a","a"); 
var frnd=[];
/////////////////////
////////////
/////////
/////
//

app.post('/upload', function(req, res){
	var z=0;

  // create an incoming form object
  console.log("upload request recieved");
  var form = new formidable.IncomingForm();
form.multiples = true;
  form.uploadDir = path.join('C:/Users/teja/Desktop/webtechp/uploads/', session_username); //upload directory 
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    console.log(file.name);
    k=file.name;
    //storing in database
    console.log("file info stored in database");
     var abc={"usern":session_username,"fname":k};
     console.log("abc is ");
     console.log(abc);
     user.findOne({ username: session_username }, function(err, mongo_document) {
  if (err) return console.error(err);
  z=mongo_document.no;
  console.log("no of files in directory");
  console.log(z);
  z=z+1;
  
    user.findOneAndUpdate({username: session_username},{$push: {media: abc}},{ new: true }, function(err, doc){
    	console.log("update entered");
console.log(doc);
doc.save();
    });
    console.log("file no being changed");
    console.log("\n");
        user.findOneAndUpdate({username: session_username},{$set: {no: z}},{ new: true }, function(err, doc){
    	console.log("updated no is ");
console.log(doc.no);
doc.save();
    });
        });
    console.log("file name of uploaded file is ");
    console.log(k);


  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // client response 
  form.on('end', function() {
    app.use(express.static('C:/Users/teja/Desktop/webtechp/uploads')); //upload directory
    console.log("page being resent with uploaded file then being displayed");
      res.contentType('application/json');
var data = JSON.stringify('http://localhost:3000/de')
res.header('Content-Length', data.length);
res.end(data);
    
  });

  // parse the incoming request containing the form data
  form.parse(req);

});
app.get('/de',function(req,res)
{
	  //upload directory being refred to display image 
	  console.log("de page entered");
  user.findOne({ username: session_username }, function(err, mongo_document) {
  if (err) return console.error(err);
  console.log("database of the user is being reffered");
  var hs,hd,frnos;var yy;
 
  frnos=mongo_document.fno;
  var fileno;
  fileno=mongo_document.no;
  var noleft=15;
  noleft=noleft-frnos;
  if(noleft<0)
    {noleft=0;}
  var i;
  for(i=0;i<noleft;i++)
  {
var bvd=Math.random()*fileno;
bvd=Math.floor(bvd);
filenames[i]=mongo_document.media[bvd].fname; 
hd=mongo_document.media[bvd].usern;
 hd=hd+'/';
 filenames[i]=hd+filenames[i];
console.log(filenames[i]);
yy=i;
  }
  yy=yy+1;
  console.log("the value of yy="+yy);
  var zz=0;
  console.log(mongo_document.friendlist);
  var frarr=new Array(frnos);  
for(i=0;i<frnos;i++)
{
frarr[i]=mongo_document.friendlist[i].funame;
console.log("fname is "+ frarr[i]);
}
var zzrr=[];
user.find({username:{$in:frarr}},function(err,abc){
 var j;
 for(j=0;j<frnos;j++)
{
var ffss=abc[j].no;
var bvd=Math.random()*ffss;
bvd=Math.floor(bvd);
var eh;
eh=abc[j].media[bvd].fname; 
hd=abc[j].media[bvd].usern;
 hd=hd+'/';
 eh=hd+eh;
 console.log("eh value is" + eh);
 //eh will have the file name with its directory
filenames[yy]=eh;
yy++;
}  
h=h+1;
 var jj=upp;
 console.log(jj);
   app.use(express.static(jj));
res.render('finalpage.ejs',{user:session_username,img0:filenames[0],img1:filenames[1],img2:filenames[14],img3:filenames[3],img4:filenames[4],img5:filenames[5],img6:filenames[6],img7:filenames[7],img8:filenames[8],img9:filenames[9],img10:filenames[10],img11:filenames[11],img12:filenames[12],img13:filenames[13],img14:filenames[2]});


});

 /* for(zz=0;zz<frnos;zz++)
  {
var ufn;
ufn=mongo_document.friendlist[zz].funame;
console.log("loop entered");
user.findOne({ username: ufn }, function(err, fooof) {
  var ee=zz+yy;
  var ffss=fooof.no;
  var bvd=Math.random()*ffss;
bvd=Math.floor(bvd);
console.log("in find zz value"+ zz);
filenames[ee]=fooof.media[bvd].fname; 
hd=fooof.media[bvd].usern;
 hd=hd+'/';
 filenames[ee]=hd+filenames[ee];
 console.log("ee value is" + ee);
console.log(filenames[ee]);
});

  }*/
if( frnos==0)
 {h=h+1;
 var jj=upp;
 console.log(jj);
   app.use(express.static(jj));
res.render('finalpage.ejs',{user:session_username,img0:filenames[0],img1:filenames[1],img2:filenames[2],img3:filenames[3],img4:filenames[4],img5:filenames[5],img6:filenames[6],img7:filenames[7],img8:filenames[8],img9:filenames[9],img10:filenames[10],img11:filenames[11],img12:filenames[12],img13:filenames[13],img14:filenames[14]});}
});
});


////////
//////////
/////
app.get('/',function(req,res){
app.use(express.static('C:/Users/teja/Desktop/webtechp/views'));//ejs file directory containing ejs file 
  res.render('form.ejs');
});

/*...............................
...Login..............
...........*/
app.post('/login',function(req,res)
{
console.log('login requested through ajax');
 var uname = req.body.user;
var up =req.body.password;
console.log("uname and password entered are:")
console.log(uname);
console.log(up);

 //query to match username password , first user has to be created before accessing login page.
 user.findOne({$and:[{ username: uname },{password:up}]}, function(err, mongo_document) {
  if(mongo_document)
  {console.log("user authenticated");
 session_username=mongo_document.username;
 h=h+1;

 //to redirect and render bellow code is required
  res.contentType('application/json');
var data = JSON.stringify('http://localhost:3000/in')
res.header('Content-Length', data.length);
res.end(data);}

else{

	console.log("no user found");
	res.contentType('application/json');
var data = JSON.stringify('err');
res.header('Content-Length', data.length);
res.end(data);
}
});
});

//redirected webpage
app.get('/in',function(req,res)
{
	if(h>0)
{
app.use(express.static('C:/Users/teja/Desktop/webtechp/views')); //directory of html file
    res.render('finalpage.ejs',{user:session_username,img0:filenames[0],img1:filenames[1],img2:filenames[2],img3:filenames[3],img4:filenames[4],img5:filenames[5],img6:filenames[6],img7:filenames[7],img8:filenames[8],img9:filenames[9],img10:filenames[10],img11:filenames[11],img12:filenames[12],img13:filenames[13],img14:filenames[14]});

}
});
/*...............................
...SIGNUP..............
...........*/


app.post('/signup',function(req,res)
{
console.log("user being created");
var uname = req.body.username;
var up =req.body.password;
var em=req.body.email;
var fn=req.body.firstname;
var ln=req.body.lastname;
var ph=req.body.phoneno;
console.log(ph);

 var nuser=new user();
var g='uploads/';
 nuser.username=uname;
 nuser.firstname=fn;
 nuser.password=up;
 nuser.lastname=ln;
 nuser.emailid=em;
 nuser.phno=ph;
 nuser.no=0;
 nuser.fno=0;
 g=g+uname;
 fs.mkdirSync(g);
console.log("user name of user created is ");
 console.log(nuser.username);
 res.end('yes');
 nuser.save();

/*user.find(function (err, founddata) {
  if (err) return console.error(err);
  console.log(founddata);
})*/
});



//friend add /////
///
app.post('/friendadd',function(req,res)
{
	var z=0;
console.log("friend is being added");
var fname = req.body.friend;
console.log(fname);
var abd={"funame":fname};


  user.findOne({ username: session_username }, function(err, mongo_document) {
  if (err) return console.error(err);
  z=mongo_document.fno;
  console.log("no of friends");
  console.log(z);
  z=z+1;
   user.findOneAndUpdate({username: session_username},{$push: {friendlist: abd}},{ new: true }, function(err, doc){
    	console.log("friend added succesfully");
console.log(abd);
doc.save();
    });

    console.log("friends no being changed");
    console.log("\n");
        user.findOneAndUpdate({username: session_username},{$set: {fno: z}},{ new: true }, function(err, doc){
    	console.log("updated no is ");
console.log(doc);
doc.save();
    });
        });

 res.end('yes');
});



app.listen(3000);

console.log("Running at Port 3000");