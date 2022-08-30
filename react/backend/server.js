const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express()
const port = 3001
const  RegisterModel = require('./register');
const saltRounds = 10;
//DB connection
mongoose.connect('mongodb://localhost/data',function(err,res){
 if(err){
     console.log('-=-=-=-=err===-==',err);
 }else{
     console.log('----- db connected sucessfully');
 }
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
//
app.post('/api/register', (req, res) => {
   let name=req.body.name;
   let email=req.body.email;
   let pass=req.body.pass;
   let re_pass=req.body.re_pass
   
   if (!name) {
    res.send({ status: 0, msg: 'Name is required' })
} else {
    if (name.length < 3) {
        res.send({ status: 0, msg: 'name length atleast 3 characters' })
    }
}   
if (!email) {
    res.send({ status: 0, msg: 'Email is Required' })
}  else{
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    }else{
        res.send({ status: 0, msg: 'Invaild Email' })
    }
}
if (!pass) {
    res.send({ status: 0, msg: 'Password is Required' })
}
 if (pass == re_pass) {
} else{
    res.send({ status: 0, msg: 'Password Does Not Match' })
}  
   if(name) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.pass, salt);
    var newRegister = new RegisterModel(
        {
            name:name,
            email:email,
            pass:hash,
            
        }
    );
    newRegister.save(function(err,data)
    {
        if(err){
            res.send(err);
        }else{
            res.send({status: 1,id:data._id});
        }
    });}
})


app.post('/api/signin', (req, res) => {
    let your_name = req.body.your_name;
    let your_pass = req.body.your_pass;
    RegisterModel.findOne({ email:your_name }, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            if (data == null) {
                res.send({ status: 0, msg: 'invalid email' })
            } else {
              
                let hashedPwd = data.pass;
                let resultPwd = bcrypt.compareSync(your_pass, hashedPwd);
                if (resultPwd) {
                    res.send({ status: 1, id: data._id });
                } else {
                    res.send({ status: 0, msg: 'invalid password' })
                }
            }
        }
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})