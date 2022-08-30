import react from 'react'
class Landing extends react.Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
    this.submitlogout=this.submitlogout.bind(this);
    
}
submitlogout(){
  window.localStorage.clear();
  window.location = '/'
}
  
  render(){
   
    return(
      <>
      <h2 class="mx-auto" style={{width: "200px"}}>project</h2>
      <h1 style={{color: "red"}}>bye.. bye...</h1>
     <input type="submit" class="text-center" name="logout" id="logout" onClick={this.submitlogout} class="form-submit" value="Logout"/>
     </>
    )

  }
}

export default Landing;
