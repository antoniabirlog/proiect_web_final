import React, { Component } from 'react';
import logo from './logo.svg';
import 'jquery/src/jquery';
import axios from "axios"
import $ from 'jquery/src/jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import 'google-contacts-crud'
class Agenda extends Component {


 constructor(){
        super();
        this.arata = this.arata.bind(this);

    }

    

    arata(){
   if(document.getElementById('idLog').value=='aaa' && document.getElementById('pasLog').value=='aaa'){
    let metoo = 'https://interfata-proiect-antonia1696.c9users.io/google';
        axios.get(metoo, {withCredentials: true}).then((results) => {
        if(results.status == 200) {
            for(var i = 0; i < results.data.length; i++){
                console.log(results.data[i])
                 var prs = JSON.parse(JSON.stringify(results.data[i].phoneNumber))
                 var tel = (JSON.parse(JSON.stringify(prs))[0].$t)
                  var prenume = JSON.parse(JSON.stringify(results.data[i].name.gd$givenName.$t))
                  var nume = JSON.parse(JSON.stringify(results.data[i].name.gd$familyName.$t))
                console.log(prenume)
                
        var xTable=document.getElementById('articles');
        var tr=document.createElement('tr');

        tr.innerHTML ='<td>'+ nume+'</td><td>'+prenume+'</td>'+'<td>'+tel+'</td>';
        xTable.appendChild(tr);
                
            }
        }
    }).catch((error) => {
      console.log(error)
    })
    

    }
    else{
        alert('Nu ai acces la date!')
    }
    
}
    
  render() {
    return (
  <div className="Agenda">
  
  
   <div class="row" >
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <div class="records_content">
                <br/>
                <h3><br/>Informatii job-uri</h3>
                
                 <div class="records_content">
                <table id="articles" class="table table-bordered table-striped">
						<tr>
							<th>Nume</th>
							<th>Prenume</th>
							<th>Telefon</th>
						</tr>
						<tr> 
						    <td>Popescu</td>
						    <td>Loredana</td>
						    <td>2431453100</td>
						</tr>
						<tr> 
						    <td>Mihai</td>
						    <td>Iulian</td>
						    <td>1235234600</td>

						</tr>
				</table>
				</div>
            </div>
        </div>
        <br/><br/>
        <div class="pull-left">
        <br/> <br/> <br/>  <br/> <br/> <button class="btn btn-info" onClick = {this.arata}>Agenda telefonica</button>
        </div>
        <div class="col-md-2"> </div>
    </div>
    
    

       
       
       
       </div>
    
    );
  }
}


export default Agenda;
