const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport1 = require('passport');
const passport2 = require('passport');
const passport=require('passport');
const nodemailer = require('nodemailer');
const path = require('path');
// Load User model
const Student = require('../models/Student');
const Instructor=require('../models/Instructor');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/student-login', forwardAuthenticated, (req, res) => res.render('student-login'));

router.get('/instructor-login', forwardAuthenticated, (req, res) => res.render('instructor-login'));

router.get('/student-register', forwardAuthenticated, (req, res) => res.render('student-register'));

router.get('/instructor-register', forwardAuthenticated, (req, res) => res.render('instructor-register'));



router.post('/newCourse', (req, res) => {
        const { idi,iname,cname } = req.body;
        
        
        const newCourse = new Course({
          idi,
          iname,
          cname
        });

        
            newCourse
              .save()
              .then(Course => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
});

// Register
router.post('/student-register', (req, res) => {


   const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('student-register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    Student.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('student-register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new Student({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = password;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                
                let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
     port: 465,
     secure: true,
     auth: {
       user: 'alok5633y@gmail.com',
       pass: 'aloky@1234'
     }
   });
   let mailOptions = {
     from: '"Alok Yadav" <alok5633y@gmail.com>',
     to: "alok5633y@gmail.com",
     subject: "Welcome to Courses.com",
     text: "Welcome fellow student. We are very glad to inform you that you have successfully registered as the student at Courses.com. Enjoy Learning!"
   };

   transporter.sendMail(mailOptions, (error, info) => {
     if (error){
       return console.log(error);
     }
     else{
       console.log("Email sent successfully");
       console.log(mailOptions.to);
     }
   });


                res.redirect('/users/student-login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});


router.post('/instructor-register', (req, res) => {


   const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('instructor-register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    Instructor.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('instructor-register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new Instructor({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = password;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/instructor-login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});



// Login

router.post('/student-login', (req, res, next) => {

  var password = req.body.password;
  var email = req.body.email;

  
  Student.findOne({ "password": password, "email": email} , function (err, result) {
    console.log(result);
    console.log(password);
    if(result){
      res.render('../views/dashboard-student.ejs', result);
    }
    else{
      res.sendFile(path.join(__dirname + '/instructor-login'));
    }
  });
});


router.post('/instructor-login', (req, res, next) => {

  // require('../config/passport2')(passport2);
  //  console.log("Instructor post ");
  // passport.authenticate('local', {
  //   successRedirect: '/dashboard-instructor',
  //   failureRedirect: '/users/instructor-login',
  //   failureFlash: true
  // })(req, res, next);
  // console.log("Done Instructor")
  var password = req.body.password;
  var email = req.body.email;

  
  Instructor.findOne({ "password": password, "email": email} , function (err, result) {
    console.log(result);
    console.log(password);
    if(result){
      res.render('../views/dashboard-instructor.ejs', result);
    }
    else{
      res.sendFile(path.join(__dirname + '/instructor-login'));
    }
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
