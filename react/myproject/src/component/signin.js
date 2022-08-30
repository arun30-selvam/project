import React from 'react';
import axios from 'axios';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
}from "react-router-dom";
import swal from 'sweetalert';
class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            your_name:'',
            your_pass:'' ,
            token:''
        }
        this.submitlogin=this.submitlogin.bind(this);
        this.handelchange=this.handelchange.bind(this);
    }
    submitlogin(){

        let your_name=this.state.your_name;
        let your_pass=this.state.your_pass;
        let formData={
            your_name:your_name,
            your_pass:your_pass,
        }
        let test=this;

        axios({
            method:'post',
            url:'http://localhost:3001/api/signin',
            data:formData,
          
          })
          .then(function (response) {
            console.log('---------response-----------------', response.data);
            if (response.data.status == 1) {
                test.setState({ token: response.data.id })
                localStorage.setItem('authToken', response.data.id)
                window.location = '/'
            } else {
                swal(response.data.msg);
            }
        });
          
    }
    handelchange(event){
        let name=event.target.name;
        let value=event.target.value;
        
        if(name=='your_name'){
            this.setState({your_name:value})
        }
        if(name=='your_pass'){
            this.setState({your_pass:value})
        }
    }
  render(){
    return(
    <section >
    <div class="container">
        <div class="signin-content">
            <div class="signin-image">
                <figure><img src="images/signin-image.jpg" alt="sing up image"/></figure>
                 <Link to='/Signup' > <a href='' class="signup-image-link">Create an account</a></Link>
            </div>
            <div class="signin-form" >
                <h2 class="form-title">Sign in</h2>
              
                    <div class="form-group">
                        <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                        <input type="text" name="your_name" id="your_name" onChange={this.handelchange} placeholder="Your Name"/>
                    </div>
                    <div class="form-group">
                        <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                        <input type="password" name="your_pass" id="your_pass" onChange={this.handelchange} placeholder="Password"/>
                    </div>
                   
                    <div class="form-group form-button">
                     <input type="submit" name="signin" id="signin" onClick={this.submitlogin} class="form-submit" value="Log in"/>
                    </div>
                <div class="social-login">
                    <span class="social-label">Or login with</span>
                    <ul class="socials">
                        <li><a href="#"><i class="display-flex-center zmdi zmdi-facebook"></i></a></li>
                        <li><a href="#"><i class="display-flex-center zmdi zmdi-twitter"></i></a></li>
                        <li><a href="#"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
    )
  }
}

export default Signin;