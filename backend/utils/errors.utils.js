module.exports.signUpError = (err) =>{
    let errors = { pseudo: "", Email: "", Password: "" };
    if (err.message.includes('pseudo') )
    errors.pseudo = "Pseudo already exist";
    if (err.message.includes('Email') )
    errors.Email = "Email already exist";
    if (err.message.includes('Password') )
    errors.Password = "Password must be at least 8 characters";
    
    if (err.code === 11000)
    errors.Email = "Email already exist";
    
    return errors;


}


module.exports.loginError = (err) =>{
    let errors = { Email: "", Password: "" };
    if (err.message.includes('Email') )
    errors.Email = "Email not found";
    if (err.message.includes('Password') )
    errors.Password = "Password is incorrect";
    return errors;
}