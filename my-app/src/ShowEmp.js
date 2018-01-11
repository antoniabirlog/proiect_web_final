import React, { Component } from 'react';
import logo from './logo.svg';
import 'jquery/src/jquery';
import axios from "axios"
import "axios/dist/axios.js"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';

class ShowEmp extends Component {
    
    
    componentWillMount(){
         const scriptus = document.createElement('script');
    scriptus.src="https://unpkg.com/axios/dist/axios.min.js";
   document.head.appendChild(scriptus);
    
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    
    s.innerHTML = "function sterge(id){ let me = 'https://interfata-proiect-antonia1696.c9users.io/contacts/'+id;"+
   " axios.delete(me);  $('#row'+id).remove();}";
    document.head.appendChild(s); 
    
        
    }


 constructor(){
        super();
        this.arata = this.arata.bind(this);
        this.adauga = this.adauga.bind(this);
    }



    adauga(){
        if(document.getElementById('idLog').value=='aaa' && document.getElementById('pasLog').value=='aaa'){
        var prenume = document.getElementById('firstName').value;
        var nume = document.getElementById('lastName').value;
        var tel = document.getElementById('phone').value;
        var idp = document.getElementById('posId').value;
        
        let me = 'https://interfata-proiect-antonia1696.c9users.io/contacts';
        var posAssigned = '';
        let other = 'https://interfata-proiect-antonia1696.c9users.io/positions/'+idp;
        axios.get(other, {withCredentials: true}).then((results) => {
        if(results.status == 200) {
            posAssigned = results.data.posName;
            console.log(results)
        }
    }).catch((error) => {
      console.log(error)
    })
       
       
       
        axios.post(me, { firstName: prenume,lastName: nume,phoneNumber: tel, posId:idp})
        
  .then(function(response){
    console.log('saved successfully');
     var xTable=document.getElementById('articole');
     var tr=document.createElement('tr');
        
        tr.innerHTML ='<td>'+ response.data.id+'</td><td>'+nume+'</td>'+
        '<td>'+prenume+'</td>'+'<td>'+tel+'</td>'+'<td>'+posAssigned+'</td>'+'<td>'+idp+'</td>'+'<td><button class="btn btn-edit" onClick=sterge('+response.data.id+')>Sterge</button></td>';
        xTable.appendChild(tr);
  });  
  
        
        
        
    }
    else{
        alert('Nu ai drept de modificare')
    }


}

    arata(){
        if(document.getElementById('idLog').value=='aaa' && document.getElementById('pasLog').value=='aaa'){
         let me = 'https://interfata-proiect-antonia1696.c9users.io/contacts';
    
    axios.get(me, {withCredentials: true}).then((results) => {
        if(results.status == 200) {
            for(var i = 0; i < results.data.length; i++){


        var xTable=document.getElementById('articole');

        var tr=document.createElement('tr');
        tr.id = "row"+results.data[i].id;
        tr.innerHTML ='<td>'+ results.data[i].id+'</td><td>'+results.data[i].lastName+'</td>'+'<td>'+results.data[i].firstName+'</td>'
                        +'<td>'+results.data[i].phoneNumber+'</td>'+'<td>'+results.data[i].position.posName+'</td>'+'<td>'+results.data[i].position.id+'</td>'+
                        '<td><button class="btn btn-edit" onClick=sterge('+results.data[i].id+')>Sterge</button></td>';
                        
        xTable.appendChild(tr);

                console.log(results.data[i])
            }
        }
    }).catch((error) => {
      console.log(error)
    })
        
    }
    else{
        alert('Nu ai drept de acces')
    }
    
} 
  render() {
    return (
  <div className="ShowEmp">

<div>
    <div class="row" >
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <div class="records_content">
                <br/>
                <h3><br/>Contacte</h3>
                
                 <div class="records_content">
                <table id="articole" class="table table-bordered table-striped">
						<tr>
							<th>ID</th>
							<th>Nume</th>
							<th>Prenume</th>
							<th>Telefon</th>
							<th>Descriere job</th>
							<th>ID Job</th>
							<th>Stergere</th>
							
						</tr>
						<tr> 
						    <td>1</td>
						    <td>Birlog</td>
						    <td>Antonia</td>
						    <td>0734520301</td>
						    <td>Cea mai tare</td>
						     <td>10</td>
						     <td>test</td>
						     
						
						</tr>
						<tr> 
						    <td>1</td>
						    <td>Ion</td>
						    <td>Ion</td>
						    <td>0769668141</td>
						    <td>simply the best</td>
							<td>10</td>
							<td>test</td>
							
						</tr>
				</table>
				</div>
            </div>
        </div>
        <br/><br/>
        <div class="pull-left">
        <br/> <br/> <br/> <br/> <br/> <button class="btn btn-info" data-toggle="modal" data-target="#add_new_record_modal">Adauga contact</button>
        <br/> <br/><button class="btn btn-info" onClick={this.arata} >Arata contactele</button>
        </div>
        <div class="col-md-2"> </div>
    </div>
    
    
    
    
    
   <div class="modal fade" id="add_new_record_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Adauga angajat</h4>
            </div>
            <div class="modal-body">
                <form id="record_form">
                    <input type="hidden" name="id" id="id" />
                    <div class="form-group">
                        <label for="name">Prenume</label>
                        <input type="text" name="name" id="firstName" placeholder="Descriere" class="form-control"/>
                    </div>
                    
                    <div class="form-group">
                        <label for="name">Nume</label>
                        <input type="text" name="name" id="lastName" placeholder="Descriere" class="form-control"/>
                    </div>
                    
                    <div class="form-group">
                        <label for="name">Telefon</label>
                        <input type="text" name="name" id="phone" placeholder="Descriere" class="form-control"/>
                    </div>
                    
                    <div class="form-group">
                        <label for="name">ID Job</label>
                        <input type="text" name="name" id="posId" placeholder="Descriere" class="form-control"/>
                    </div>
                    
                
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" onClick={this.adauga}>Save Record</button>
            </div>
        </div>
    </div>
</div>

    
    
</div>
  </div>
  
    );
  }
}


export default ShowEmp;
