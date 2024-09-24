const passport = require('passport');

exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt')
};

exports.sanitizeUser = (user)=>{
    return {id:user.id, role:user.role}
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  //TODO : this is temporary token for testing without cookie //koi bhi order krega par register isi token k user par hoga
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjJjMTQ2ZTgxOWVjNzMxN2UxMjY1MyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI3MTg1MjIyfQ.ApUCYGvRnAOytI9s1t7OElbSs2O8sRbaMrqcb_H8jqA"
  return token;
};