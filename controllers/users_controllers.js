const User=require('../models/user');

module.exports.profile=function(req,res){
  return res.render('profile',{
    title:'profile page'
  });
}


module.exports.signUp = function (req, res) {
  if(req.isAuthenticated()){
     return res.redirect('/users/profile');
  }
  return res.render('signUp', {
    title: 'SignUp Page',
  });
};

module.exports.signIn = function (req, res) {
  if(req.isAuthenticated()){
   return res.redirect('/users/profile');
}
  return res.render('signIn', {
    title: 'SignIn Page',
  });
};

//get the sign-up data
module.exports.create=function (req,res){
  if(req.body.password!=req.body.confirm_password){
     return res.redirect('back');
  }

  User.findOne({email:req.body.email},function(err,user){
    if(err){
      console.log('error in finding user in sign up');
      return;
    }
    if(!user){
      User.create(req.body,function(err,user){
        if(err){
          console.log('error in creating user while sign up');
          return;
        }
        return res.redirect('/users/sign-in');
      });      
    }else{
      return res.redirect('back');
    }

  });
}

//sign in and create a session for a user
module.exports.createSession=function (req,res){
  return res.redirect('/users/profile');
}