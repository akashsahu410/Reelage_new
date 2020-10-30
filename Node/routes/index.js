var express = require("express");
var app = express();
var router = express.Router();
var mysql = require('mysql');

app.set('view engine', 'ejs');

/* aut database */
var connectiondb = mysql.createConnection({
 
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_nodepro1'
});
/* GET home page contact section data. */
function getContact(req, res, next) {
  var CON = "SELECT * FROM TBL_CONTACT";
  connectiondb.query(CON, function (err, rows) {
    req.contact = rows;
    return next();
  });
}
/* GET home page about section data. */
function getAbout(req, res, next) {
  var ABOUT = "SELECT * FROM TBL_ABOUT";
  connectiondb.query(ABOUT, function (err, result) {
    req.about = result
    next();
  }); 
}
/* GET home page feature section data. */
function getFeature(req, res, next) {
  var FEATURE = "SELECT * FROM TBL_FEATURES";
  connectiondb.query(FEATURE, function (err, result) {
    req.feature = result
    next();
  });
}
/* render data to index page. */
function renderData(req, res) {
  res.render('index', {
    contact: req.contact,
    about: req.about,
    feature: req.feature,
  });
}

/* GET home page data. */
router.get('/', getContact, getAbout, getFeature,renderData);

module.exports = router;
