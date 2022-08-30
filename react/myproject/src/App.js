import react from 'react'
import Signup from './component/signup';
import Signin from './component/signin';
import Landing from './component/landing';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
}from "react-router-dom";


class App extends react.Component{
  render(){
    let authToken = localStorage.getItem('authToken')
    return(
      <Router>
        {authToken ?
        <Switch>
      
        <Route exact path="/"><Landing/></Route>
        </Switch>
        :
        <Switch>
        <Route exact path="/" ><Signin/></Route>
      <Route exact path="/Signup"><Signup/></Route>
      </Switch>
      }
      
      </Router>
      
    )
  }
}

export default App;
