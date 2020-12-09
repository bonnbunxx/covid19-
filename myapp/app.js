var createError = require('http-errors');
const mysql = require('mysql');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {check,validationResult} = require("express-validator")
const bodyPase = require("body-parser")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const {search} = require('./routes/search');

var app = express();
app.use(bodyPase.urlencoded({extended:false}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get("/",function (req,res) {
  res.rander("index");

});

const formDatavalidator = [
  check("csearch").not().isEmpty().withMessage("Please input Search Country"),
  check("datemax").not().isEmpty().withMessage("Please input Date")
];
app.post("/",function (req,res) {
  const errors = validationResult (req);
  if (! errors.isEmpty()){
    res.rander("index",{
      errorData : errors.mapped(),
      initData : req.body ,
      
    }) ;

  }
  else{

var sqlCommand = "SELECT Country/Region,?,Lat,Long FROM death WHERE Country/Region = ? ";
              var sqlValue = [ ];
              sqlValue.push ( req.body.datemax );
	            sqlValue.push ( req.body.csearch );
	            
	            var sql = mysql.format ( sqlCommand, sqlValue );
	            connectionMySQL.query ( sql, function ( error, results, fields )
	                {
	                    if ( error ) 
	                    {
	                        console.log ( error );
	                    }
	                    else 
	                    {
	                        return res.redirect ( "/" );
	                    }
	                }
	            );
	        }
	}
);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
