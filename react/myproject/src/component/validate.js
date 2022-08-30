export function validateEmail(randomEmail){
    let emailPattern=/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if(emailPattern.test(randomEmail)){
        return 1;
    }else{
        return 0;
    }
}


export function validatePwd(randompwd){
    let pwdpattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if(pwdpattern.test(randompwd)){
        return 1;
    }else{
        return 0;
    }
}