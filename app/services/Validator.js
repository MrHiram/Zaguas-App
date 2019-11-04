const validator = {
    email: function(email) {
        email.trim();
        var atIndex = email.indexOf('@');
        var dotIndex = email.indexOf('.', atIndex);
        if(atIndex > 0 && dotIndex > atIndex && dotIndex < email.length-1)
            return true;
        else
            return false; 
    },
    password: function(password){        
        passwordLength = password.length;
        if(passwordLength >= 8)
            return true;
        else
            return false;
    },
    passwordConfirm: function(password, passwordConfirmation){
        if(password === passwordConfirmation && password != '')
            return true;
        else
            return false;
    },
    aboutMe: function (aboutMe) {
        aboutMe.trim();
        if(aboutMe.length>0)
            return true;
        else 
            return false;
        
        
    }
}
export default validator;