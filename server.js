//1
//2
const express=require('express');
const app = express();

//3
app.use('/', express.static('./website'));

app.use(express.urlencoded({extended:false}));

const{check, validationResult}=require('express-validator');

const formValidating=formValidate();
app.post('/server', formValidating, (request, response)=>{
    const errors=validationResult(request);

    if(!errors.isEmpty()){
        const msg = "<h1>Your submission contains errors</h1>"+printErrors(errors.array());
        response.send(msg);
    }
    else{
    const fname = request.body.fname;
    const lname = request.body.lname;
    const mobile = request.body.mobile;
    const gender = request.body.gender;
    const email = request.body.email;   
    const comments = request.body.comments;
    


    addUser(fname, lname, mobile, gender, email , comments);
    const msg="<h1>Your Information Has Been Successfully Submitted!</h1><p>Full Name: "
    +fname+ " "+lname+ "</p><p>Mobile Number: "+mobile+"</p><p>Gender: "+gender+"</p><p>Email: "+email+"</p><p>Your comments: "
    +comments+"</p>";
    response.send(msg);
}
});

//4
app.listen(2500, ()=>{
    console.log("the server is listening on provided port");
});


function printErrors(errArray){
    let errors = [];
    for (let index = 0; index < errArray.length; index++) {
        let err = errArray[index]["msg"];
        let msg = "<p>-"+err+"</p>";
        errors.push(msg);
    }
    return errors.join("");
}


//validation
function formValidate(){
    return[
        check('fname').isLength({min:1, max:100}).withMessage('Invalid Name')
        .isString().withMessage('first name must be letters only')
        .matches('[A-Za-z]+').withMessage('Your name must be english letters only')
        .trim().escape(),

        check('lname').isLength({min:1, max:100}).withMessage('Invalid Name')
        .isString().withMessage('first name must be letters only')
        .matches('[A-Za-z]+').withMessage('Your name must be english letters only')
        .trim().escape(),

        check('mobile').isLength({min:9,max:9}).withMessage('Mobile must be exactly 9 digits')
        .isNumeric().withMessage('Mobile must consist of numbers only')
        .matches('[0-9]{9}').withMessage('Mobile must be exactly 9 digits')
        .trim().escape(),

        check('gender').custom(val => {   
            const radio = ['Male', 'Female'];
            if(radio.includes(val)) 
                return false;
               return true;
             
        }).withMessage("Choose a gender")
        .trim().escape(),

        check('email').isLength({min:2,max:200}).withMessage('Email must be between 2 and 200 chars in length')
        .isString().withMessage("Email must be of type string")
        .isEmail().withMessage('Email must be in the correct email format e.g., x@y.com')
        .trim().escape(),

        check('comments').isLength({min:5,max:100}).withMessage('You have to add a comment')
        .isString().withMessage('Use only string')
        .matches('[A-Za-z]+').withMessage('Your paragraph must be english letters only')

    ];
}

//7
function addUser(fname, lname, mobile, gender ,email, comments){
    
    //create connection with mysql
    const mysql = require("mysql2");
    let db =  mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'webproject'
    });

    //connect to db
    db.connect(function(err) {
        //check for errors
        if (err) throw err;
        //create SQL command
        var sql = "INSERT INTO user (fname, lname, mobile, gender, email, comments) VALUES ('"+fname+"', '"
        +lname+ "','"+mobile+"', '"+gender+"', '"+email+"', '"+comments+"')";
        //execute SQL command
        db.query(sql, function (err, result) {
            //check for errors
          if (err) throw err;
          //if no errors, then successful
         db.query('SELECT * FROM user',function(err,rows){
            if(err) throw err;     
 
            console.log('Data received');
            console.log(rows);
            alert(rows);
          });
        
        });
      });
}
