
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
//var io = require('socket.io')(http);
var http = require('http');
var path = require('path');
var path2 = require('path');
var app = express();
var pg = require("pg");
var fs = require('fs');
var nodemailer = require('nodemailer');



/*io.on('connection', function(socket){
    socket.on('event:new:image',function(data){
        socket.broadcast.emit('event:incoming:image',data);
    });
});
*/
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'lostfound.uprm@gmail.com',
        pass: 'DBlostfound04'
    }
});
var base64image = require('base64-image');
app.use(express.bodyParser({
    uploadDir: __dirname + '/public',
    keepExtensions: true
}));



var conString = "pg://postgres:postgres@localhost:5432/lostfoundDB";

var client = new pg.Client(conString);
client.connect();

app.configure(function() {
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
    app.use(express.bodyParser());
    app.use(express.static(path2.join(__dirname, 'public'))); 
    
});


// all environments


app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.all('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  next();
 });



function base64ToImage(dir) {
   console.log(req.body);
        console.log(req.body.base64);
  return function(req, res, next) {
   
    var raw = req.body.base64;
    var filename = req.params.filename ? req.params.filename : 'demo.png';
    if (!checkBase64(raw)) return next();
    var base64 = raw.replace(/^data:image\/png;base64,/, "");
    var abs = path.join(dir, filename);
    fs.writeFile(abs, base64, 'base64', function(err) {
      if (err) return next(err);
      res.locals.image = {
        name: filename,
        abs: abs
      };

          console.log("termino disque biennn");
      return next();
    });
  }
}

function checkBase64(raw) {
  return raw && typeof(raw) == 'string' && raw.match(/^data:image\/png;base64,/)
}
//gets
app.get('/', routes.index);
app.get('/allUsers', routes.getUsers);
app.get('/allAdmins', routes.getAdmins);
app.get('/allItems', routes.getItems);
app.get('/allItemsAdmin', routes.getItemsAdmin);
// app.get('/allCategories', routes.getCategories);
app.get('/allLostItems', routes.getLostItems);
app.get('/allFoundItems', routes.getFoundItems);
app.get('/allComments/:id', routes.getComments);
app.get('/anUser/:id', routes.getUserAdmin);
app.get('/anItem/:id', routes.getItemsAdminSearchBar);
app.get('/myPostsItems/:email/:key', routes.getMyPosts);
app.get('/anLostItem/:id', routes.getLostItemsSearch);
app.get('/anFoundItem/:id', routes.getFoundItemsSearch);
app.get('/allAdminComments/:id', routes.getAdminComments);
app.get('/get10Items/:offset',routes.get10Items);
app.get('/get10LostItems/:offset',routes.get10LostItems);
app.get('/get10FoundItems/:offset',routes.get10FoundItems);
app.get('/get5Items/:offset',routes.get5Items);
app.get('/get5LostItems/:offset',routes.get5LostItems);
app.get('/get5FoundItems/:offset',routes.get5FoundItems);

//posts
// app.post('/aCategories',routes.postCategories);
app.post('/newUser',routes.postUser);
app.post('/addComment',routes.postComment);
app.post('/addFeedback/',routes.postFeedback);
app.get('/getAuth/:email',routes.getAuth);

app.post('/postItem',routes.postItem);
app.post('/putThumbsdown/', routes.putThumbsdown);
app.get('/itemId/:id',routes.getItemId);
app.post('/blockAdminUser/', routes.blockAdminUser);
app.post('/unblockAdminUser/', routes.unblockAdminUser);
app.post('/blockAdminItem/', routes.blockAdminItem);
app.post('/unblockAdminItem/', routes.unblockAdminItem);
app.post('/blockAdminComment/', routes.blockAdminComment);
app.post('/unblockAdminComment/', routes.unblockAdminComment);
app.post('/removeAdmin/', routes.removeAdmin);
app.post('/updateUser/', routes.updateUser);
app.post('/updateItem/', routes.updateItem);
app.post('/resetKey/', routes.resetKey);
app.post(/addSeen/, routes.addSeen);
app.get('/getUserEmail/:email',routes.getUserEmail);


// base64 str will be saved into ./public/uploads dir,
// check res.locals.image in the next router.
app.post('/base64/:filename', base64image(path.join(__dirname, 'public/images')));
//app.post('/images', routes.addImage); // endpoint to post new images
//block

app.post('/upload', function(req, res) {
	console.log(req.files.file);
	
	var image =  req.files.file;
    var newImageLocation = path.join(__dirname, 'public/images', image.name);
    
    fs.readFile(image.path, function(err, data) {
        fs.writeFile(newImageLocation, data, function(err) {
            res.json(200, { 
                src: 'images/' + image.name,
                size: image.size
            });
        });
    });
});




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



