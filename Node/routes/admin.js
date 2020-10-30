var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var recursive = require("recursive-readdir");
var url = require('url');


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
// const urls = 'mongodb://akashsahu410:fbhacker1@ds353378.mlab.com:53378/mainelection'
const urls = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mainElection';
// const dbName = 'mainelection';



// get dis data 
 function mainEletion(req, res, next){
   
   MongoClient.connect(urls, function (err, client) {
     assert.equal(null, err);
     console.log("Connected successfully with mongo server");
     const db = client.db(dbName);
 
      db.collection('dis').aggregate([
       {
         $lookup:
         {
           from: 'counts',
           localField: 'dis_id',
           foreignField: 'dis_id',
           as: 'orderdetails'
         }
       },
     ]).toArray(function (err, res) {
       if (err) throw err;
       req.vlist = res;
       client.close();
       next();
     });
  });
}
//Main dashboard view
function electionView(req, res, next) {
  MongoClient.connect(urls, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection("counts").find().sort({name:1}).toArray(function (err, result) {
      if (err) throw err;
      console.log("console data", result);
      res.render('admin/election', { data: result });
      client.close();
    });
  });
}
//get ac data
/* function acdata(req, res, next) {
  var id = req.query.disId;
  MongoClient.connect(urls, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
  
    db.collection('ac').aggregate([
      {
        $match:
        {
          "dis_id": parseInt(id)
        }
      },
      {
        $lookup:
        {
          from: 'acCount',
          localField: 'ac_id',
          foreignField: 'ac_id',
          as: 'orderdetails'
        }
      }
    ]).toArray(function (err, result) {
      if (err) throw err;
      //console.log(JSON.stringify(result));
      res.render('admin/acElection', { data: result, });
      client.close();
    });
});
} */

//get demo ac data
function acdemodata(req, res, next) {
  var id = parseInt(req.query.disId);
  MongoClient.connect(urls, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    var query = {dis_id:id}
    db.collection("demoAcCount").find(query).toArray(function (err, result) {
      if (err) throw err;
      console.log("console data",result);
      res.render('admin/acElection', { data: result });
      client.close();
    }); 

  });
}



//get data from booth 
function boothData(req, res, next) {
  var id = req.query.acId;
  var qus = req.query.qus;
  MongoClient.connect(urls, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    var query = { ac_id: parseInt(id) };
    db.collection("demoAnswers").find(query).toArray(function (err, result) {
      if (err) throw err;
      // console.log(result);
      res.render('admin/booth', { data: result, cur_ques: parseInt(qus)});
      client.close();
    }); 
  /*   db.collection('booth').aggregate([
      {
        $match:
        {
          "ac_id": parseInt(id)
        }
      },
        {
          $lookup:
          {
            from: "answers",
            let: { post_likes: "$ac_id", post_title: "$booth_id" },
            pipeline: [
              {
                $match:
                {
                  $expr:
                  {
                    $and:
                      [
                        { $eq: ["$$post_likes", "$ac_id"] },
                        { $eq: ["$$post_title", "$booth_id"] },
                        { $eq: [parseInt(qus),"$question"] }
                      ]
                  }
                }
              }
            ],
            as: "orderdetails"
          }
        }
    ]).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.render('admin/booth', { data: result, });
      client.close();
    }); */
    
  });
}
//insert data in answer 
function insertData(req, res, next) {
  var id = req.query.acId;
  var qus = req.query.qus;
  MongoClient.connect(urls, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);

    res.render('admin/socket', { data: [], });

  });
}
 
//find data in district 
function districtData(req, res, next) {
  MongoClient.connect(urls, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection("district").find().sort({name:1}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.render('admin/addDistrict', { data: result, });
      client.close();
    });

  });
  
}

//edit data in districts
function editDistrict(req, res, next) {
  var id = parseInt(req.query.disId)
  MongoClient.connect(urls, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    var query = {dis_id:id}
    db.collection("district").findOne(query, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.render('admin/editDistrict', { data: result, });
      client.close();
    });
  });
}
function getDisforAc(req, res, next) {
  MongoClient.connect(urls, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection("district").find().toArray(function (err, result) {
      if (err) throw err;

      req.disList = result
      client.close();
    });

  });
  next();
}
//insert data in ac 
function acData(req, res, next) {
  MongoClient.connect(urls, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection("ac").find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.render('admin/addAc', { data: result, dis:req.disList });

      client.close();
    });

  });
}

// //get ac
// function getAc(req, res, next) {
//   MongoClient.connect(urls, function (err, client) {
//     assert.equal(null, err);
//     const db = client.db(dbName);
//     db.collection("ac").find().toArray(function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       req.acList = result;
//       client.close();
//     });

//   });
//   next();
// }
//get district
function getDis(req, res, next) {
  MongoClient.connect(urls, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection("district").find().toArray(function (err, result) {
      if (err) throw err;
     
      req.disList = result
      client.close();
    });

  });
  next();
}
//insert data in booth 
function boothData(req, res, next) {
  MongoClient.connect(urls, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection("booth").find().toArray(function (err, result) {
      if (err) throw err;
      
      res.render('admin/addBooth', { data: result,  disdata: req.disList });

      client.close();
    });
  });
}
//load test
function testData(req, res, next) {
  MongoClient.connect(urls, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection("booth").find().toArray(function (err, result) {
      if (err) throw err;

      res.render('admin/test', { data: result });

      client.close();
    });
  });
}
/* GET home page data. */
/* router.get('/', renderData);
router.get('/dashboard', dashboard);
router.get('/resultList', rList,ruId,resultData); */
router.get('/election', electionView);
router.get('/ac', acdemodata);
router.get('/booth', boothData);
router.get('/socket', insertData);
router.get('/addDistrict', districtData);
router.get('/addAc', getDisforAc,acData);
router.get('/editDistrict', editDistrict);
router.get('/addBooth', getDis,boothData);
router.get('/test',testData);

module.exports = router;
