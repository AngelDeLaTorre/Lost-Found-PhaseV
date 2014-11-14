
// var pg = require('pg');
// var conString = "pg://postgres:postgres@localhost:5432/lostfoundDB";
// /*
//  * GET home page.
//  */

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' });
// };

// exports.uploadImg =function(req, res) {
//     var image =  req.files.image;
//     var newImageLocation = path.join(__dirname, 'public/images', image.name);
    
//     fs.readFile(image.path, function(err, data) {
//         fs.writeFile(newImageLocation, data, function(err) {
//             res.json(200, { 
//                 src: 'images/' + image.name,
//                 size: image.size
//             });
//         });
//     });
// };

// exports.getItemId = function(req, res) {
//     console.log("GET");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   var client = new pg.Client(conString);
    
//   client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query("SELECT * FROM public.item, public.users WHERE item.itemid =$1",[id], function(err, result) {
                               
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "foundItems" : result.rows
//                                 };
//                                 res.status(200);
//                                 res.json(response);
//                                 console.log(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });

// };


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



// exports.getUsers = function(req, res) {
//     console.log("GET");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	var client = new pg.Client(conString);
    
// 	client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query("SELECT  *  FROM public.users ORDER BY users.firstname ASC", function(err, result) {
                               
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "users" : result.rows
//                                 };
//                                 res.status(200);
//                                 res.json(response);
//                                 console.log(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });

// };

// exports.getItems = function(req, res) {
//     console.log("GET");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   var client = new pg.Client(conString);
    
//   client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query("SELECT * FROM public.item, public.users WHERE item.userid = users.userid", function(err, result) {
                               
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "items" : result.rows
//                                 };
//                                 res.status(200);
//                                 res.json(response);
//                                 console.log(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });

// };

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
//                                 res.status(200);
//                                 res.json(response);
//                                 console.log(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });

// };

// exports.getLostItems = function(req, res) {
//     console.log("GET");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   var client = new pg.Client(conString);
    
//   client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query("SELECT * FROM public.item WHERE item.itemstatus = 'Lost'", function(err, result) {
                               
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "lostItems" : result.rows
//                                 };
//                                 res.status(200);
//                                 res.json(response);
//                                 console.log(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });

// };

// exports.getFoundItems = function(req, res) {
//     console.log("GET");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   var client = new pg.Client(conString);
    
//   client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query("SELECT * FROM public.item WHERE item.itemstatus = 'Found'", function(err, result) {
                               
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "foundItems" : result.rows
//                                 };
//                                 res.status(200);
//                                 res.json(response);
//                                 console.log(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });

// };

// exports.getDoctorById = function(req, res){
//     console.log("GET");
//     res.setHeader("Content-Type", "application/json");
    
//     var id =req.params.id;
//     console.log(id);
    
//     var client = new pg.Client(conString);
// 	client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query('SELECT  * FROM public.doctors WHERE doctors.doctor_id  =$1',[id], function(err, result) {
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
                               
//                                 var response = {
//                                 "doctors" : result.rows
//                                 };
                              
//                                 //res.write('hiola');
//                                 res.status('200');
//                                 res.json(response);
//                                 console.log(id);
//                                 console.log(response);
//                                 //res.end();
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });

// };
// exports.getDoctorsFromPatient = function(req,res){
//     console.log("GET");
//     var id=req.params.idP;
// 	var client = new pg.Client(conString);
// 	client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query('SELECT  doctors.doctor_id,                                doctor_name, doctor_last ,                                doctor_phone ,                                 doctor_direction ,                                doctor_link , doctor_email ,                                doctor_type , doctor_especialidad ,doctor_pueblo ,                               doctor_zipcode FROM public.doctors,public.patients JOIN public.appointments on  appointments.patient_id = patients.patient_id WHERE appointments.doctor_id  =$1 Group BY doctors.doctor_id;',[id], function(err, result) {
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "doctors" : result.rows
//                                 };
//                                 res.json(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });

// };
// ////Patients
// exports.getPatient = function(req, res) {
//     console.log("GET");
//     var id=req.params.idP;
// 	var client = new pg.Client(conString);
// 	client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query('SELECT  *  FROM public.patients where patients.patient_id  =$1',[id], function(err, result) {
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "patient" : result.rows
//                                 };
//                                 res.json(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });

// };

// exports.getPatientById = function(req, res){
//     console.log("GET");
//     var id=req.params.idP;
// 	var client = new pg.Client(conString);
// 	client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query('SELECT  *  FROM public.patients where patients.patient_id =$1; ',[id], function(err, result) {
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "patient" : result.rows
//                                 };
//                                 res.json(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });
// };

// exports.getPatientFromDoctor = function(req, res){
//     console.log("GET");
//     var id=req.params.idP;
// 	var client = new pg.Client(conString);
// 	client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query('SELECT  *  FROM public.doctors,public.patients,public.appointments WHERE appointments.doctor_id= doctors.doctor_id and doctors.doctor_id =$1 GROUP BY patients.patient_id; ',[id], function(err, result) {
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "patient" : result.rows
//                                 };
//                                 res.json(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });
// };




// exports.getAppointmentsFromDoc = function(req, res) {
//     console.log("GET");
//     var id=req.params.idD;
// 	var client = new pg.Client(conString);
// 	client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query('SELECT  *  FROM public.appointments JOIN public.patients on  appointments.patient_id = patients.patient_id WHERE appointments.doctor_id  =$1; ',[id], function(err, result) {
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "appointment" : result.rows
//                                 };
//                                 res.json(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });
// };

// exports.getAppointmentsFromPatient = function(req, res) {
//     console.log("GET");
//     var id=req.params.idP;
// 	var client = new pg.Client(conString);
// 	client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query('SELECT  *  FROM public.appointments JOIN public.doctors on  appointments.doctor_id =doctors.doctor_id  WHERE appointments.patient_id  =$1; ',[id], function(err, result) {
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "appointment" : result.rows
//                                 };
//                                 res.json(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });};

// exports.getAppointmentById = function(req, res){
//     console.log("GET");
//     var id=req.params.idA;
// 	var client = new pg.Client(conString);
// 	client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query('SELECT * FROM public.appointments WHERE appointments.app_id = $1',[id], function(err, result) {
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "appointment" : result.rows
//                                 };
//                                 res.json(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });
// };

// exports.getAppointmentsByIdAndDate = function(req, res){
//    /* console.log("GET");
//     var id=req.params.idD;
// 	var client = new pg.Client(conString);
// 	client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                   client.query('SELECT * FROM  public.appointments  JOIN public.patients on  appointments.patient_id = patients.patient_id   WHERE  appointments.app_fecha >= '2014-03-03 00:00:00' AND  appointments.app_fecha < '2014-03-04 00:00:00' AND appointments.doctor_id=1 ;    ',[id], function(err, result)* {
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "appointment" : result.rows
//                                 };
//                                 res.json(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });
// };

// exports.getAppointmentsPendingFromDoctor = function(req, res){
//     console.log("GET");
//     var id=req.params.idD;
// 	var client = new pg.Client(conString);
// 	client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query('SELECT  * FROM   public.appointments   JOIN public.patients on  appointments.patient_id = patients.patient_id     WHERE  appointments.app_statusdoc = 0 AND appointments.doctor_id=$1  ;',[id], function(err, result) {
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "appointment" : result.rows
//                                 };
//                                 res.json(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });
// };

// exports.getAppointmentsCanceledFromDoctor = function(req, res){
//   /*  console.log("GET");
//     var id=req.params.idD;
// 	var client = new pg.Client(conString);
// 	client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query('SELECT  * FROM   public.appointments   JOIN public.patients on  appointments.patient_id = patients.patient_id     WHERE  appointments.app_cancel = 1 AND appointments.doctor_id=1  ;',[id], function(err, result) {
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "appointment" : result.rows
//                                 };
//                                 res.json(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });
// };

