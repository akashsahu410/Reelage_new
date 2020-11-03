const express = require("express");
const app = express.Router();
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const ejs = require("ejs");
const session = require("express-session");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const path = require('path');
const multer  = require('multer')
const moment = require('moment')
app.use(bodyParser.urlencoded({ extended: true }));
const backendUrl = "http://localhost:8080/";
const siteUrl = "http://localhost:3000/";
const admin = require("firebase-admin");
const firebase = require("firebase");
const serviceAccount = require("./reelage-1746a-firebase-adminsdk-1oz3n-6f5182a793");
const { result } = require("underscore");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://reelage-1746a.firebaseio.com",
});

var db = admin.firestore(); //cloud firebase
var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "nstnst179@gmail.com",
    pass: "mkmanish490@",
  },
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads')
  },
  filename: function (req, file, cb) {
      // You could rename the file name
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))

      // You could use the original name
      // cb(null, file.originalname)
  }
});

var upload = multer({storage: storage})


app.post("/registerform", async (req, res) => {
  const registerRef = db.collection("register");
  const snapshot = await registerRef.where("email", "==", req.body.EMAIL).get();
  if (snapshot.empty) {
    const data = {
      datetime: moment().format('LLLL'),
      email: req.body.EMAIL,
      location: "0",
      name: req.body.NAME,
      no_followers: "0",
      no_following: "0",
      no_post: "0",
      password: req.body.PASSWORD,
      total_competition: "0",
      user_banner_img: "",
      user_img: "",
      user_status: 1,
      verify_status: "0",
      about_me:""
    };

    const res1 = db
      .collection("register")
      .add(data)
      .then((docRef) => {
        const id = docRef.id;
        const name = req.body.NAME;
        ejs.renderFile(
          __dirname + "/views/emailTemplate.ejs",
          { url: backendUrl, id: id, name: name },
          function (err, data) {
            if (err) {
              console.log(err);
            } else {
              var mainOptions = {
                from: "nstnst179@gmail.com",
                to: req.body.EMAIL,
                subject: "Email Verify",
                html: data,
              };
              //console.log("html data ======================>", mainOptions.html);
              transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Message sent: " + info.response);
                }
              });
            }
          }
        );
      });

    res.json({
      status: true,
    });
  } else {
    res.json({
      status: false,
    });
  }
});

// fetch the posts
app.post("/showPhotos", async (req, res) => {
  const registerRef = db.collection("posts");
  const snapshot = await registerRef.where("id", "==", req.body.id).get();
  // const snapshot1 = await registerRef.where("image", "!=", "").get();
  // console.log("fetch",snapshot)
  let result = []
  if (snapshot.empty) {
    console.log('No matching documents.');
  }  
  else{
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      if(doc.data().image != ""){
        result.push(doc.data())
      }
    });
  }
  res.json({
    result,
  });
  
})


// fetch the videos
app.post("/showVideos", async (req, res) => {
  const registerRef = db.collection("posts");
  const snapshot = await registerRef.where("id", "==", req.body.id).get();
  // const snapshot1 = await registerRef.where("image", "!=", "").get();
  // console.log("fetch",snapshot)
  let result = []
  if (snapshot.empty) {
    console.log('No matching documents.');
  }  
  else{
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      if(doc.data().video != ""){
        result.push(doc.data())
      }
    });
  }
  res.json({
    result,
  });
})

// fetch the about me
app.post("/show_about_me", async (req, res) => {
  const registerRef = db.collection("register");
  const snapshot = await registerRef.where("email", "==", req.body.email).get();
  // const snapshot1 = await registerRef.where("image", "!=", "").get();
  // console.log("fetch",snapshot)
  let about_me = ""
  if (snapshot.empty) {
    console.log('No matching documents.');
  }  
  else{
    snapshot.forEach((doc) => {
      about_me = doc.data().about_me
    })
  }
  res.json({
    about_me,
  });
  
})
// login with google
app.post("/registerwithlogin", async (req, res) => {
  const registerRef = db.collection("register");
  const snapshot = await registerRef.where("email", "==", req.body.EMAIL).get();
  if (snapshot.empty) {
    const data = {
      datetime: moment().format('LLLL'),
      email: req.body.EMAIL,
      location: "0",
      name: req.body.NAME,
      no_followers: "0",
      no_following: "0",
      no_post: "0",
      password: req.body.PASSWORD,
      total_competition: "0",
      user_banner_img: "",
      user_img: req.body.IMAGE,
      user_status: 1,
      verify_status: "1",
      about_me:""
    };

    const res1 = db
      .collection("register")
      .add(data)
      .then((docRef) => {
        const id = docRef.id;
        res.json({
          status: true,
          id:id
        });
      });
    
  } else {
    snapshot.forEach((doc) => {
      console.log("inside fetch info ",doc.id, " => ", doc.data());
      res.json({
        status: false,
      id:doc.id
      });
    });
  }
});


// Upload Image
app.post("/upload_photo", upload.single('image'), async (req, res) => {
  console.log("req.body",req.body)
  console.log("req.file",req.file)
  req.body.image = req.file.filename
  req.body.datetime = moment().format('LLLL')
    const res1 = db
      .collection("posts")
      .add(req.body)
      .then((docRef) => {
        const id = docRef.id;
      });
    res.json({
      status: true,
      msg:"Uploaded Successfully"
    });
});

// upload post
app.post("/upload_post", async (req, res) => {
  console.log("inside upload post",req.body)
  req.body.datetime = moment().format('LLLL')
    const res1 = db
      .collection("posts")
      .add(req.body)
      .then((docRef) => {
        const id = docRef.id;
      });
    res.json({
      status: true,
      msg:"Uploaded Successfully"
    });
});

// fetch account status
app.post("/fetchAccountStatus", async (req, res, next) => {
  const registerRef = db.collection("register");
  const snapshot = await registerRef
    .where("email", "==", req.body.LOGINEMAIL)
    .get();
 
    snapshot.forEach((doc) => {
      console.log("inside fetch info ",doc.id, " => ", doc.data());
      res.json({
        account_status: doc.data().user_status,
        id: doc.id
      });
});
})

// fetch user data
app.post("/fetchUserInfo", async (req, res, next) => {
  db.collection("register").doc(req.body.id)
  .get()
  .then((docRef) => {
    console.log(docRef.data())
    res.json({
      data: docRef.data()
    });
  });
  
})

// change the user status of account
app.post("/changeAccountStatus", async (req, res, next) => {
  const docRef = db.collection("register").doc(req.body.uId);

  await docRef.update({
    user_status: req.body.user_status,
  });
  res.json({
    msg: "Account status changed successfully",
  });
});

app.post("/loginform", async (req, res, next) => {
  const registerRef = db.collection("register");
  const snapshot = await registerRef
    .where("email", "==", req.body.LOGINEMAIL)
    .where("password", "==", req.body.LOGINPASSWORD)
    .get();
  if (snapshot.empty) {
    console.log("login false");
    res.json({
      message: "Credentials not exists!",
      status: false,
    });
  } else {
    console.log("login true");
    snapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      if (doc.data().verify_status == "0") {
        res.json({
          message: "Verify your email!",
          status: false,
        });
      } else {
        res.json({
          message: "Thank you for login",
          status: true,
          name:doc.data().name,
          id:doc.id
        });
      }
    });
  }
});
app.post("/forgetform", async (req, res, next) => {
  const registerRef = db.collection("register");
  const snapshot = await registerRef
    .where("email", "==", req.body.FORGETEMAIL)
    .get();

  if (snapshot.empty) {
    console.log("login");
    res.json({
      status: false,
    });
  } else {
    snapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());

      const id = doc.id;
      const name = doc.data().name;
      ejs.renderFile(
        __dirname + "/views/forgetemail.ejs",
        { url: siteUrl, id: id, name: name },
        function (err, data) {
          if (err) {
            console.log(err);
          } else {
            var mainOptions = {
              from: "nstnst179@gmail.com",
              to: req.body.FORGETEMAIL,
              subject: "Email Verify",
              html: data,
            };
            //console.log("html data ======================>", mainOptions.html);
            transporter.sendMail(mainOptions, function (err, info) {
              if (err) {
                console.log(err);
              } else {
                console.log("Message sent: " + info.response);
              }
            });
          }
        }
      );

      res.json({
        status: true,
      });
    });
  }
});
app.post("/changePassword_request", async (req, res, next) => {
  const data = {
    password: req.body.CONFIRMPASSWORD,
  };

  const docRef = db.collection("register").doc(req.body.uId);

  await docRef.update({
    password: req.body.CONFIRMPASSWORD,
  });
  res.json({
    status: true,
  });
});
app.get("/verfiyEmail_request", async (req, res, next) => {
  var id = req.query.Uid;
  const docRef = db.collection("register").doc(id);

  await docRef.update({
    verify_status: "1",
  });
  res.redirect(siteUrl);
});

module.exports = app;
