module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
     
    }
     console.log("3");
     res.redirect('/dashboard-instructor');   
  }, 
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
      
    }
    console.log("4");
    res.redirect('/dashboard-instructor');      
  }
};






module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
     
    }
     console.log("1");
     res.redirect('/dashboard-student');   
  }, 
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
      
    }
    console.log("2");
    res.redirect('/dashboard-student');      
  }
};






