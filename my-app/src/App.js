import React, { Component } from 'react';
import ShowAll from "./ShowAll"
import ShowDept from "./ShowDept"
import TabTitle from "./TabTitle"
import logo from './logo.svg';
import ShowEmp from "./ShowEmp"
import ShowJobs from "./ShowJobs"
import Agenda from "./Agenda"
import { Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import{
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Button from 'muicss/lib/react/button';

class App extends Component {
  
 constructor(){
        super();
        this.verifica = this.verifica.bind(this);
    }
    
    verifica(){
      
      if(document.getElementById('idLog').value=='aaa' && document.getElementById('pasLog').value=='aaa') 
      {document.getElementById('idLog').style.visibility='hidden'
      document.getElementById('pasLog').style.visibility='hidden'
      document.getElementById('check').style.visibility='hidden'
        alert('Credentialele se potrivesc')
      }
    }
    
  render() {
    return (
  <div className="App">
  
   <div class="col-md-2">
                        <input name="description" id="idLog" placeholder="ID" class="form-control"></input>
                        <input type="text" name="name" id="pasLog" placeholder="Parola" class="form-control"/>
                        <button id = "check"  onClick={this.verifica} class="btn btn-primary pull-left">Log in</button>
  </div>
                    

  
  
       <div class="container">
            <div class="row">
                <div class="col-md-3"></div>
               <div class="col-md-6">
                  <h1>Contact Manager Employees</h1>
                </div>
               <div class="col-md-3"></div>
             </div>
      </div>
      <br/> <br/> <br/> 
                 <ButonPersonalizat></ButonPersonalizat>
  </div>
    );
  }
}

class ButonPersonalizat extends Component{
  render(){
    return(<div class="btn-group btn-group-justified">
    <HashRouter>
    <div>
    <br/> <br/>
    <Route exact  path="/show" component={() => (<TabTitle name="Toate Departamentele" />)}/>
    <Route   path="/showall" component={() => (<TabTitle name="Toate contactele" />)}/>
    <Route   path="/jobs" component={() => (<TabTitle name="Toate job-urile" />)}/>
    <Route   path="/emp" component={() => (<TabTitle name="Toti angajatii" />)}/>
    <Route  path="/agenda" component={() => (<TabTitle name="Agenda telefonica" />)}/>
    
    
  <Link to = "/showall"><button class="btn btn-primary col-md-2">Toate contactele</button></Link>
  <Link to = "/show"><button class="btn btn-primary col-md-2">Departamentele mele</button></Link>
  <Link to = "/jobs"><button class="btn btn-primary col-md-2">Job-urile mele</button></Link>
  <Link to = "/emp"><button class="btn btn-primary col-md-3">Angajatii mei</button></Link>
  <Link to = "/agenda"><button class="btn btn-primary col-md-3">Agenda telefonica</button></Link>

    <Route   path="/showall" component={ShowAll}/>
    <Route path="/show" component={ShowDept}/>
    <Route path="/emp" component={ShowEmp}/>
    <Route path="/jobs" component={ShowJobs}/>
    <Route path="/agenda" component={Agenda}/>
  </div>
  

  </HashRouter>
</div>)
  }
}






export default App;
