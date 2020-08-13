module.exports.signUp = function (req, res) {
  return res.render('signUp', {
    title: 'SignUp Page',
  });
};

module.exports.signIn = function (req, res) {
  return res.render('signIn', {
    title: 'SignIn Page',
  });
};

//get the sign-up data
module.exports.create=function (req,res){
  //to do later
}

//sign in and create a session for a user
module.exports.createSession=function (req,res){
  //to do later
}