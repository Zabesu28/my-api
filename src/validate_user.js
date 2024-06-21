"use strict";

const validateUser = (userName, password, callback) => {
    if(!userName || !password){
        callback("Massing user/password", null);
    } else if(userName === "syaob" && password === "161100"){
        callback(null, "syaob");
    } else {
        callback("Not a valid user", null);
    }
};

module.exports = validateUser;