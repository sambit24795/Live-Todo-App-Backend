const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const nodemailer = require("nodemailer");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      fullName: req.body.firstname + " " + req.body.lastname,
      phone: req.body.phone
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "user created successfully!! by" + "" + result.fullName,
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "email alreay exists!!",
          error: err
        });
      });
  });
};

exports.updateFriendsArray = (req, res, next) => {
  const friend = {
    id: req.body.id,
    email: req.body.email,
    fullName: req.body.fullName
  };

  User.updateOne({ _id: req.userData.id }, { $addToSet: { friends: friend } })
    .then(result => {
      const qfriend = {
        id: req.userData.id,
        email: req.userData.email,
        fullName: req.userData.fullName
      };
      User.updateOne(
        { _id: req.body.id },
        { $addToSet: { friends: qfriend } }
      ).then(data => {
        res.status(200).json({
          data: data,
          result: result,
          message:`${req.userData.fullName} is friends with ${req.body.fullName}`
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "error in adding friend",
        error: err
      });
    });
};

exports.userLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.status(401).json({
          message: "Email not found"
        });
      }
      return bcrypt
        .compare(req.body.password, user.password)
        .then(result => {
          if (!result) {
            res.status(401).json({
              message: "unknown credentials"
            });
          }

          const token = jwt.sign(
            {
              email: user.email,
              fullName: user.fullName,
              id: user._id
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: user._id,
            email: user.email,
            fullName: user.fullName,
            message: "this is Auth Token"
          });
        })
        .catch(err => {
          res.status(401).json({
            message: "Auth Failed- Password Wrong"
          });
        });
    })
    .catch(err => {
      res.status(401).json({
        err: err,
        message: "Auth Failed"
      });
    });
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      res.json({
        message: "users retrieved successfully",
        user: users
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "error in getting users",
        error: err
      });
    });
};

exports.checkUserbyEmail = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(result => {
    console.log(result);
    if (result) {
      const token = jwt.sign(
        {
          email: result.email,
          fullName: result.fullName,
          id: result._id
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      resetPasswordBaseUrl = "http://localhost:4200/reset-password";

      var transporter = nodemailer.createTransport({
        service: "gmail",
        /* temporary email */
        auth: {
          user: "vivekedwisor@gmail.com",
          pass: "edvivekxyz"
        },
        tls: { rejectUnauthorized: false }
      });

      var mailOptions = {
        from: '"Todo Admin" <vivekedwisor@gmail.com>',
        to: "sambitnayakcse@gmail.com",
        template: "forgot-password-email",
        subject: "Reset password",
        text: `Dear Sambit,
  Greetings from the Todo App team!
  You requested for a password reset. Click the following link to reset your password:
      
  ${resetPasswordBaseUrl}?authToken=${token}
  Note: Kindly ignore if you have not requested the password reset.
      
  Regards,
  Team Todo App`
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.status(200).json({
        message: "user exists",
        result: result
      });
    } else {
      res.status(401).json({
        message: "no user found"
      });
    }
  });
};

exports.resetPassword = (req, res, next) => {
  const password = req.body.password;
  const authToken = req.body.authToken;

  const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);
  userData = {
    email: decodedToken.email,
    fullName: decodedToken.fullName,
    id: decodedToken.id
  };

  bcrypt.hash(password, 10).then(hash => {
    User.updateOne({ _id: userData.id }, { $set: { password: hash } })
      .then(result => {
        if (result.nModified > 0) {
          res.status(200).json({
            message: "password changed successfully!!"
          });
        } else {
          res.status(401).json({
            message: "user not authorized!!"
          });
        }
      })
      .catch(err => {
        res.json({
          message: "error in hashing the password!!",
          error: err
        });
      });
  });
};
