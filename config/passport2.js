const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User model
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
/*
Stud = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      Student.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered hello' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Student.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
*/

Inst = function(passport2) {
    
  passport2.use(
     
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      Instructor.findOne({
        email: email
      }).then(user => {
           console.log("Instructor passport");
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport2.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport2.deserializeUser(function(id, done) {
    Instructor.findById(id, function(err, user) {
      done(err, user);
    });
  });
};


module.exports=Inst;
