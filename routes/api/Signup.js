const express = require("express");
const router = express.Router();
const Signup = require("../../models/SignupModel");

// Only for file upload -start

const multer = require("multer");

const { v4: uuidv4 } = require("uuid");

let path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

let upload = multer({ storage });

// Only for file upload -End

router.route("/create").post(upload.single("photo"), (req, res) => {
  const { name, email, password } = req.body;

  const photo = req.file.filename;

  const pckgData = {
    name,
    email,
    password,
    photo,
  };

  const pckg = new Signup(pckgData);

  pckg
    .save()
    .then(() => res.status(200).json({ msg: "Your Created Successfully" }))
    .catch((err) => res.status(400).json({ err: "Error is " + err }));
});

// Verify user

router.get("/verify/:email", (req, res) => {
  const {email} = req.body;
  Signup.findOne({ email:email })
    .then((res) => res.json(res))
    .catch((err) => res.status(404).json({ err: "Data not found" }));
});

router.get("/all", (req, res) => {
  Signup.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ err: "Data not found" }));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Signup.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        if (password === user.password) {

          const sessUser={usrId:user.id,usrName:user.name,usrEmail:user.email,usrPhoto:user.photo,usrAccCreDate:user.created_date}

          res.status(200).json(sessUser);
        } else {
          res.status(400).json({ error: "Incorrect Password" });
        }
      }
    })
    .catch((er) => res.status(400).json({ error: "Error is " + err }));
});
module.exports = router;