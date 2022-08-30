import React from 'react'
import{
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  }from "react-router-dom";
  import { validateEmail,validatePwd } from './validate'
  import axios from 'axios';
  import swal from 'sweetalert';
class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            pass:'',
            re_pass:'',
            nameError:false,
            lengthError:false,
            emailError:false,
            emailpatterError:false,
            passwordError:false,
            passwordpatternError:false ,
            conformpasswordError:false,
            conformpasswordError1:false,
        }
      // this.submitsignup=this.submitsignup.bind(this);
        this.handelchange=this.handelchange.bind(this);
        this.validateform=this.validateform.bind(this);
    }



    handelchange(event){
        const fieldName = event.target.name;
        var string_length = event.target.value;
        var result = string_length.length;
        if (fieldName == 'name'){
            if(event.target.value){
                this.setState({nameError:false})
            }else{
                this.setState({nameError:true})
            }
            if(result>=3){
                this.setState({lengthError:false})
            }else{
                this.setState({lengthError:true})
            }
            this.setState({name:event.target.value }) 
        }
        if (fieldName == 'email'){
            if(event.target.value){
                if(validateEmail(event.target.value) == 1){
                  this.setState({ emailpatterError:false})
                }else{
                  this.setState({ emailpatterError:true})
                }
                this.setState({ emailError:false,})
                }else{
                  this.setState({ emailError:true,emailpatterError:false})
                }
            this.setState({email:event.target.value })
        }
        if (fieldName == 'pass'){
            if(event.target.value){
                if(validatePwd(event.target.value) == 1){
                    this.setState({ passwordpatternError:false})
                }
                else{
                    this.setState({passwordpatternError:true})
                }
                this.setState({passwordError:false})                
            }else{
                this.setState({passwordError:true, passwordpatternError:false})
            }
            this.setState({pass:event.target.value })
        }
        if (fieldName == 're_pass'){
             if(event.target.value){
                if(event.target.value === this.state.pass ){
                    this.setState({ conformpasswordError1:false})
                }
                else{
                    this.setState({conformpasswordError1:true})
                }
                this.setState({conformpasswordError:false})   
             }
            this.setState({re_pass:event.target.value })
        }
       
    
    }
    validateform(e){
        let name = this.state.name;
        let email = this.state.email;
        let pass = this.state.pass;
        let re_pass = this.state.re_pass;
        if(name){
            this.setState({nameError:false})
        }else{
            this.setState({nameError:true})
        }
        if(email){
            this.setState({emailError:false})
        }else{
            this.setState({emailError:true})
        }
        if(pass){
            this.setState({passwordError:false})
        }else{
            this.setState({passwordError:true})
        }
        if(re_pass){
            this.setState({conformpasswordError:false})
        }else{
            this.setState({conformpasswordError:true})
        }
        var formData ={
            name:name,
            email:email,
            pass:pass,
            re_pass:re_pass
          }
  
            let test=this;
    
            axios({
                method:'post',
                url:'http://localhost:3001/api/register',
                data:formData,
              
              })
              .then(function (response) {
                console.log('---------response-----------------', response.data);
                if (response.data.status == 1) {
                    test.setState({ token: response.data.id })
                    localStorage.setItem('authToken', response.data.id)
                   // window.location = '/'
                   swal("Register successfully");
                } else {
                    swal(response.data.msg);
                }
            });
    }
    
    render(){
        
        return(
            <>
        <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title">Sign up</h2>
                        <form  class="register-form" id="register-form">
                            <div class="form-group">
                                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="name" id="name" onChange={this.handelchange} placeholder="Your Name"/>
                                {  this.state.nameError ?
                                        <span style={{color:'red'}}>Firstname Required</span>
                                        : ''
                                    }
                                    {   this.state.lengthError ?
                                        <span style={{color:'red'}} > Min 3 character</span>
                                        :''
                                    }
                            </div>
                            <div class="form-group">
                                <label for="email"><i class="zmdi zmdi-email"></i></label>
                                <input type="email" name="email" id="email" onChange={this.handelchange} placeholder="Your Email"/>
                                {  this.state.emailError ?
                                    <span style={{color:'red'}}>Email Required</span>
                                    : ''
                                    }
                                    {  this.state.emailpatterError ?
                                            <span style={{color:'red'}}> Enter Valid Email  </span>
                                            : ''
                                    }
                            </div>
                            <div class="form-group">
                                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="pass" id="pass" onChange={this.handelchange} placeholder="Password"/>
                                {  this.state.passwordError ?
                                    <span style={{color:'red'}}>Password Required</span>
                                        : ''
                                    }
                                    {  this.state.passwordpatternError ?
                                            <span style={{color:'red'}}>password Should Contain Atleast 8 Characters And One Numeric </span>
                                            : ''
                                    }
                            </div>
                            <div class="form-group">
                                <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" name="re_pass" id="re_pass" onChange={this.handelchange} placeholder="Repeat your password"/>
                                {  this.state.conformpasswordError ?
                                        <span style={{color:'red'}}>Password Required</span>
                                        : ''
                                    }
                                    {  this.state.conformpasswordError1 ?
                                            <span style={{color:'red'}}>Password Does Not Match </span>
                                            : ''
                                    }
                            </div>
                            <div class="form-group form-button">
                                <input type="button" name="signup" id="signup" class="form-submit" onClick={this.validateform} value="Register"/>
                            </div>
                        </form>
                    </div>
                    <div class="signup-image">
                        <figure><img src="images/signup-image.jpg" alt="sing up image"/></figure>
                      <Link to='/' >  <a href =''class="signup-image-link">I am already member</a></Link>
                    </div>
                </div>
            </div>
        </section>
        </>
        )

    }

}
export default Signup;