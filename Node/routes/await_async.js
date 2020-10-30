var express = require("express");
var app = express();
var router = express.Router();

var bodyParser = require('body-parser');
var recursive = require("recursive-readdir");
var url = require('url');


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const admin = require("firebase-admin");
const firebase = require('firebase');
//const serviceAccount = require("../nsttable-firebase-adminsdk-z2w6y-7a06ad82fd.json");//for nst
const serviceAccount = require("../election-test-c8802-firebase-adminsdk-j38u3-1e4376a310.json");//for election
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: "https://nsttable.firebaseio.com/"//for nst
 databaseURL: "https://election-test-c8802.firebaseio.com/"//for election
});
//const Fdb=admin.firestore();
//var db = admin.database();//realtime database
var db = admin.firestore();//cloud firebase
/* var ref = db.ref("/Post/1");
ref.once("value", function (snapshot) {
  console.log(snapshot.val().key);
}); */



//order by inc or dec
function decrement(a, b) { if (a.date > b.date) { return -1; } if (a.date > b.date) { return 1; } return 0; } 

/* render data to login page. */
function renderData(req, res) {
    res.render('admin/page-login', {contact: "data" });
}

/* render data to index page. */
function dashboard(req, res,next) {
  /* for (let index = 0; index < 1000; index++) {

   

  }  */ 
  let addDoc = db.collection('questionCount').doc('Bhiwani').set({
    one: '1',
    two: '1',
    

  }).then(ref => {
    console.log('Added document with ID: ', ref.id);

  });
  let cityRef = db.collection('questionCount').get();
   cityRef.then(snapshot => {
     var list=[]
    snapshot.forEach(doc => {
      console.log(doc.data(), doc.id);
      var obj1 = doc.data();
      var obj3 = { dis: doc.id } ;
     
      obj2 = Object.assign({}, obj1, obj3);
      list.push(obj2);
    });
     console.log(list);
  })
    .catch(err => {
      console.log('Error getting documents', err);
    });
    res.render('admin/index', { data: list });
 
}

function rList(req, res, next) {
  
  let cityRef1 = db.ref("answer")
  var id = req.query.uid;
  //console.log(req.connection.remoteAddress);
  cityRef1.orderByChild("uId").equalTo(id).once("value", function (snapshot) {
    let list = [];
    snapshot.forEach(function (data) {
      //console.log(data.val().qId);
       db.ref('question').child(data.val().qId).on('value', function (snap) {
         //console.log(snap.val().title);
         var obj1 = { 'key': data.key, 'rightAnswer': snap.val().rightAnswer, 'title':snap.val().title };
        var obj3 = data.val()
        obj2 = Object.assign({}, obj1, obj3);
        list.push(obj2);
      });
    });
    list.sort(decrement)
    //console.log(list);
    req.ulist = list
    next();
  });
}
function ruId(req, res, next) {
  var id = req.query.uid;
  req.UIDS = id;
  next();
}
function resultData(req, res, next) {
  res.render('admin/resultlist', { data: req.ulist, ids: req.UIDS });
}

async function queryLog(cityRef, item) {
  var obj=[];
  await cityRef.then(snapshot => {
    var obj1={}
    var one = 0;
    snapshot.forEach(doc => {
      one += 1;
      //console.log(item + '=' + doc.id, '=>', doc.data());
    });
    obj1['dis']=item
    obj1['qone'] = one
    obj.push(obj1)
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
  //console.log(obj);
}

async function delayedLog(item, item1) {
  var list=[];
  var one = 0;
  var two = 0;
    let cityRef = db.collection('Users').doc(item).collection(item1).where('status', '==', '1').get();
    await cityRef.then(snapshot => {
      snapshot.forEach(doc => {
        if (item1=='one'){
          one += 1;
        } else if (item1 == 'two'){
          two += 1;
        }
      });
    })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  //console.log(list);
  if (item1 == 'one') {
    return new Promise(function (resolve, reject) {
      resolve({ 'one': one, 'dis': item, });
    });

  } else if (item1 == 'two') {
    return new Promise(function (resolve, reject) {
      resolve({ 'two': two, 'dis': item, });
    });

  }

}
   // console.log(',hi');
   
     /* for (let index = 0; index <1; index++) {
     
     let addDoc = db.collection('Users').add({
       name: 'Manish',
       district: '1',
       state: '1',

     acNumber :"106",
    bFemale: "496",
    bMale: "545",
    bNri :"0",
    bPwd: "2",
    bTotalVotes :"1041",
    bTrans: "0",
    bfirstVoters: "25",
    created: "1557048991",
    department: "LIFE INSURANCE , LIC SANGRUR",
    designation: "AAO",
    deviceId :"addd5f60f517f122",
    district: "SANGRUR(ਸੰਗਰੂਰ)",
    fcm: "",
    lastUpdated: "1557048991",
    latitude: "default",
    longitude: "default",
    mobile :"9988881551",
    name: "ARUN CHOUDHARY",
    partNumber: "1",
    serverId: "1",
    userType: "blo",
     }).then(ref => {
       console.log('Added document with ID: ', ref.id);
        db.collection('Users').doc(ref.id).update({
        
          'one.status': '1',
          'one.test': '1',
         'two.status': '1',
         'three.status': '1',
         'four.status': '1',
         'five.status': '1',
         'six.status': '1',
         'seven.status': '1',
         'eight.status': '1',
         'nine.status': '1',
        'ten.status': '1',
        'eleven.status': '1',
        'twelve.status': '1',
        'thirteen.status': '1',
          'fourteen.status': '1',
          'fiveteen.status': '1',
        'sixteen.status': '1',
       });
     });
     
   }  */
   
  async function processArray(array, array1) {
      var ob = []
      let i=0;
      for (const item of array) {
        ob.push({})
        for (const item1 of array1) {
          await delayedLog(item, item1).then(res => 
            {
              ob[i]["dis"] = item;
              if (item1 == 'one'){

                ob[i]["one"]=res.one
              }
              else{

                ob[i]["two"] = res.two
              }
              
            }
          )
        }
        i += 1;
      }
      //console.log(ob);
    return new Promise(function (resolve, reject) {
      resolve(ob);
    });
      console.log('Done!');
      
    }

async function mainEletion(req, res, next){
  var array =['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurgaon', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Mewat', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar']

  var array1 = ['one', 'two'];
  let data = await processArray(array, array1).then(res => 
    {
      return res
    })
  req.vlist = data;
    
    next();
}
function electionView(req, res, next) {
  res.render('admin/election', { data: req.vlist, });
}
function snapshotView(req, res, next) {
  var id = req.query.uid;
  
  recursive("../images/snapshot/" + id, function (err, files) {
    // `files` is an array of file paths
    console.log(files);
    res.render('admin/snapshot', { data: files, });
  });
}
function postData(req, res, next) {
 console.log(res);
}
/* GET home page data. */
router.get('/', renderData);
router.get('/dashboard', dashboard);
router.get('/resultList', rList,ruId,resultData);
router.get('/election', mainEletion, electionView);
router.get('/snapshot.html', snapshotView);
router.get('/login', postData);





module.exports = router;
