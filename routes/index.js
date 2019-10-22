const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard-student', ensureAuthenticated, (req, res) =>
  res.render('dashboard-student', {
    user: req.students
  })
);

router.get('/dashboard-instructor', ensureAuthenticated, (req, res) =>
  res.render('dashboard-instructor', {
    user: req.instructors
  })
);

module.exports = router;
