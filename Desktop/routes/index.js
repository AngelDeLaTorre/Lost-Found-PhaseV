
var pg = require('pg');
var conString = "pg://postgres:postgres@localhost:5432/lostfoundDB";
/*
 * GET home page.
 */
// setup e-mail data with unicode symbols

/*exports.addImage = function(req, res, next) {

    console.log("upload");

    var file = req.files.file,
        filePath = file.path,
//        fileName = file.name, file name passed by client. Not used here. We use the name auto-generated by Node
        lastIndex = filePath.lastIndexOf("/"),
        tmpFileName = filePath.substr(lastIndex + 1),
        image = req.body,
       

    image.fileName = tmpFileName;
    console.log(tmpFileName);

    

};*/

generateKey = function(){
  return Math.floor((Math.random() * 999) + 1);

};

var nodemailer = require('nodemailer');

sendMail = function(emailto, randomkey){
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'lostfound.uprm@gmail.com',
        pass: 'DBlostfound04'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols

var mailOptions = {
    from: 'LostFound <lostfound.uprm@gmail.com>', // sender address
    to: emailto , // list of receivers
    subject: 'Your secret Key', // Subject line
    text: "Hi User, your secret key is "+randomkey+" " // plaintext body
    //html: '<b>Hola tu secret que es ###</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});

};


exports.resetKey = function(req,res){
  console.log("POST");
  var randkey = generateKey();
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("UPDATE public.users SET passkey = '"+randkey+"'  WHERE email = '"+req.body.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                
                                
                                client.end();
                                });
                   });

  sendMail(req.body.id,randkey);



};


exports.getLostItemsSearch = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.item WHERE item.itemstatus = 'Lost' AND (item.itemname LIKE '%"+req.params.id+"%' OR item.category LIKE '%"+req.params.id+"%') ", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "items" : result.rows
                                };
                                res.json(200,response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};

exports.getFoundItemsSearch = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.item WHERE item.itemstatus = 'Found' AND (item.itemname LIKE '%"+req.params.id+"%' OR item.category LIKE '%"+req.params.id+"%') ", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "items" : result.rows
                                };
                                res.json(200,response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};




exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.getItemId = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.item natural join public.users WHERE item.itemid = '"+req.params.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "item" : result.rows
                                };
                                res.status(200);
                                res.json(response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};


exports.postFeedback= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   console.log(req.body);
                   client.query("INSERT INTO feedback (message, email) VALUES ('"+req.body.message+"','"+req.body.email+"')", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};


exports.postComment= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   console.log(req.body);
                   client.query("INSERT INTO comment (itemid, usercomment, email,isblocked) VALUES ('"+req.body.itemid+"','"+req.body.usercomment+"','"+req.body.email+"','"+req.body.isblocked+"')", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};

exports.postUser= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   
                   client.query("INSERT INTO users (firstname, lastname, email, phone, passkey, isblocked, isadmin) VALUES ('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.email+"','"+req.body.phone+"','"+req.body.passkey+"','"+req.body.isblocked+"','"+req.body.isadmin+"')", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};



exports.updateUser= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   
                   client.query("UPDATE public.users SET firstname = '"+req.body.firstname+"', lastname = '"+req.body.lastname+"', phone = '"+req.body.phone+"' where email = '"+req.body.email+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};




// exports.postCategories= function(req,res){
//   console.log("POST");
//   var client = new pg.Client(conString);
     
//   client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query("INSERT INTO category (categoryname) VALUES ('"+req.body.type+"')", function(err, result) {
                               
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
                                
//                                 res.status(200);
//                                 client.end();
//                                 });
//                    });
// };



exports.getUsers = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var client = new pg.Client(conString);
    
	client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT  *  FROM public.users ORDER BY users.firstname ASC", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "users" : result.rows
                                };
                                
                                res.json(200,response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};


exports.getAdmins = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT  *  FROM public.users WHERE users.isadmin = 'true' ORDER BY users.firstname ASC", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "users" : result.rows
                                };
                                
                                res.json(200,response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};

exports.getItems = function(req, res) {
    
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.item, public.users WHERE item.email = users.email and item.isblocked = 'false' ORDER BY item.itemid DESC", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "items" : result.rows
                                };
                                res.json(200,response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};

// exports.getCategories = function(req, res) {
//     console.log("GET");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   var client = new pg.Client(conString);
    
//   client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query("SELECT  *  FROM public.category", function(err, result) {
                               
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "categories" : result.rows
//                                 };
//                                 res.json(200,response);
//                                 console.log(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });

// };

exports.getLostItems = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.item WHERE item.itemstatus = 'Lost' and item.isblocked = 'false' ORDER BY item.itemid DESC", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "lostItems" : result.rows
                                };
                    
                                res.json(200,response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};

exports.getFoundItems = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.item WHERE item.itemstatus = 'Found' and item.isblocked = 'false' ORDER BY item.itemid DESC", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "foundItems" : result.rows
                                };
                                res.status(200);
                                res.json(response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};

exports.getComments = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query(" SELECT public.comment.commentid, public.comment.usercomment , public.comment.email, public.comment.isblocked FROM public.comment, public.item WHERE comment.itemid = item.itemid AND comment.itemid = "+req.params.id+" AND comment.isblocked = 'false' ", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "comments" : result.rows
                                };
                                res.status(200);
                                res.json(response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};

exports.getAdminComments = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query(" SELECT public.comment.commentid, public.comment.usercomment , public.comment.email, public.comment.isblocked FROM public.comment, public.item WHERE comment.itemid = item.itemid AND comment.itemid = "+req.params.id+" ", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "comments" : result.rows
                                };
                                res.status(200);
                                res.json(response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};


exports.getUserAdmin = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.users WHERE users.email LIKE '%"+req.params.id+"%' OR users.firstname LIKE '%"+req.params.id+"%' OR users.lastname LIKE '%"+req.params.id+"%' ", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "anUser" : result.rows
                                };
                                res.status(200);
                                res.json(response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};



exports.getItemsAdmin = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.item ORDER BY item.itemid DESC", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "items" : result.rows
                                };
                                res.json(200,response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};

exports.getItemsAdminSearchBar = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.item WHERE item.email LIKE '%"+req.params.id+"%' OR item.itemname LIKE '%"+req.params.id+"%' ", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "items" : result.rows
                                };
                                res.json(200,response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};

// exports.deleteCategory = function(req, res) {
//   console.log("DELETE");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   var client = new pg.Client(conString);
    
//   client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query("DELETE FROM public.category WHERE category.categoryname = '"+req.params.id+"' ", function(err, result) {
                               
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "categories" : result.rows
//                                 };
//                                 res.status(200);
//                                 res.json(response);
//                                 console.log(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });

// };

exports.postItem= function(req,res){
  
  
  console.log("POST");
  var client = new pg.Client(conString);
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   console.log(req.body);
                   client.query("INSERT INTO item (itemname,description,locationitem,city,itemstatus,email,category,itempicture) VALUES ('"+req.body.itemname+"','"+req.body.description+"','"+req.body.location+"','"+req.body.city+"','"+req.body.itemStatus+"','"+req.body.email+"','"+req.body.category+"','"+req.body.itempicture+"')", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                });   
                             
                            var randkey = generateKey();    

                   client.query("UPDATE public.users SET firstname = '"+req.body.firstname+"', lastname = '"+req.body.lastname+"', phone = '"+req.body.phone+"', passkey = '"+randkey+"' where email = '"+req.body.email+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                res.status(200);
                                client.end();
                                });


                    
sendMail(req.body.email, randkey)
                   });

};

exports.updateItem= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);

  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("UPDATE item SET itemname = '"+req.body.itemname+"', description = '"+req.body.description+"',locationitem = '"+req.body.locationitem+"',city = '"+req.body.city+"',category = '"+req.body.category+"' ,itempicture = '"+req.body.itempicture+"' WHERE itemid = '"+req.body.itemid+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                               
                                });
                 

                 client.query("UPDATE public.users SET firstname = '"+req.body.firstname+"', lastname = '"+req.body.lastname+"', phone = '"+req.body.phone+"',  where email = '"+req.body.email+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                client.end();
                                });

                     });
};


exports.putThumbsdown= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
            
                   client.query("Update public.item Set thumbsdown = (thumbsdown + 1) Where itemid = '"+req.body.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};



exports.getMyPosts= function(req,res){
  console.log("GET");
   console.log(req.params);
    
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("Select * from public.item, public.users where item.email = users.email and item.email = '"+req.params.email +"' and users.passkey = '"+ req.params.key+"'  ", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "myPosts" : result.rows
                                };
                                res.status(200);
                                res.json(response);
                                console.log(response);
                               
                                client.end();
                                });
                   });


};

exports.getAuth= function(req,res){
  console.log("GET");
  
    
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("Select * from public.users where users.email = '"+req.params.email+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "user" : result.rows

                                };
                                console.log(response.user);
                                res.status(200);
                                res.json(response);
                                console.log(response);
                               
                                client.end();
                                });
                   });


};


exports.blockAdminUser= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
            
                   client.query("Update public.users Set isblocked = 'true' Where email = '"+req.body.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};

exports.unblockAdminUser= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
            
                   client.query("Update public.users Set isblocked = 'false' Where email = '"+req.body.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};


exports.blockAdminItem= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
            
                   client.query("Update public.item Set isblocked = 'true' Where itemid = '"+req.body.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};

exports.unblockAdminItem= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
            
                   client.query("Update public.item Set isblocked = 'false' Where itemid = '"+req.body.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};


exports.removeAdmin= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
            
                   client.query("Update public.users Set isadmin = 'false' Where email = '"+req.body.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};

exports.blockAdminComment= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
            
                   client.query("Update public.comment Set isblocked = 'true' Where commentid = '"+req.body.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};

exports.unblockAdminComment= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
            
                   client.query("Update public.comment Set isblocked = 'false' Where commentid = '"+req.body.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};

exports.addSeen= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
            
                   client.query("Update public.item Set itemviews = (itemviews + 1) Where itemid = '"+req.body.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};
