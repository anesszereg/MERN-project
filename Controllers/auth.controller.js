const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpError, loginError } = require("../utils/errors.utils");



const maxAge = 3 * 24 * 60 * 60 * 1000



const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge});
};

// singUp

module.exports.signUp = async (req, res) => {
  // console.log(req.body);
  const { pseudo, Email, Password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, Email, Password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors =signUpError(err)
    res.status(200).send({errors});
  }
};

//SingIn
module.exports.signIn = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await UserModel.login(Email, Password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });

  } catch (err) {
    const errors = loginError(err);
    res.status(200).send({errors});
  }
};

// logout

module.exports.logOut = (req,res)=>{
    
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');

}
