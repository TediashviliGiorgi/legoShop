import React from 'react'; 
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
 
import Home from './pages/Home'
import Admin from './pages/Admin'
import Contact from './pages/Contact'
import About from './pages/About' 
import Item from './pages/Item' 

function App() {
  return (
    <div className="App"> 

        <Router>   
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/admin" component={Admin}/>
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/about" component={About}/> 
            <Route exact path="/item/:id" exact={true} component={Item}/>
          </Switch> 
        </Router> 
    </div>
  );
}

export default App;