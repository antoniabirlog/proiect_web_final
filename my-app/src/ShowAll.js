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
class ShowAll extends Component {


 constructor(){
        super();
        this.arata = this.arata.bind(this);
        this.modifica = this.modifica.bind(this);
        this.verifica = this.verifica.bind(this);

    }

    verifica(e){
        
        //verificare disponibilitate contact cu un anume id
         e.preventDefault();//prevenire reload pe pagina
        var idVer = document.getElementById('idEmp').value;
        if(document.getElementById('row'+idVer)!=null){
        var nume = document.getElementById('row'+idVer).childNodes[1].innerHTML;
        var prenume = document.getElementById('row'+idVer).childNodes[2].innerHTML;
        var tel = document.getElementById('row'+idVer).childNodes[3].innerHTML;
        
        document.getElementById('nume').value = nume;
        document.getElementById('prenume').value = prenume;
        document.getElementById('telefon').value = tel;
   
        }
        else {
            $('#update_record_modal').modal('hide');
             document.getElementById('idEmp').value = '';
        }
    }


    modifica(){
        if(document.getElementById('idLog').value=='aaa' && document.getElementById('pasLog').value=='aaa'){
         var idVer = document.getElementById('idEmp').value;
         let me = 'https://interfata-proiect-antonia1696.c9users.io/contacts/'+idVer;
        var nume =  document.getElementById('nume').value;
        var prenume = document.getElementById('prenume').value;
        var tel = document.getElementById('telefon').value;
        var pos = document.getElementById('job').value;
         axios.put(me, { firstName: prenume, lastName: nume, phoneNumber: tel, posId: pos })
    .then(function(response){
        console.log('saved successfully')
         $('#update_record_modal').modal('hide');
});
        document.getElementById('row'+idVer).childNodes[1].innerHTML = nume;
        document.getElementById('row'+idVer).childNodes[2].innerHTML = prenume;
        document.getElementById('row'+idVer).childNodes[3].innerHTML = tel;
        
    }
    else{
        alert('Nu ai drept de update')
    }
}
    arata(){
   
if(document.getElementById('idLog').value=='aaa' && document.getElementById('pasLog').value=='aaa'){
        //----------------
        
         let me = 'https://interfata-proiect-antonia1696.c9users.io/contacts/all';
    
    axios.get(me, {withCredentials: true}).then((results) => {
        if(results.status == 200) {
            for(var i = 0; i < results.data.length; i++){


        var xTable=document.getElementById('articole');

        var tr=document.createElement('tr');
        tr.id='row'+results.data[i].id;
        tr.innerHTML ='<td>'+ results.data[i].id+'</td><td>'+results.data[i].lastName+'</td>'+'<td>'+results.data[i].firstName+'</td>'
                        +'<td>'+results.data[i].phoneNumber+'</td>';
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
  <div className="ShowAll">

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
							
						</tr>
						<tr> 
						    <td>1</td>
						    <td>Birlog</td>
						    <td>Antonia</td>
						    <td>0734520301</td>
						</tr>
						<tr> 
						    <td>1</td>
						    <td>Covrig</td>
						    <td>Manuel</td>
						    <td>0769668141</td>

						
						</tr>
				</table>
				</div>
            </div>
        </div>
        <br/><br/>
        <div class="pull-left">

        <br/> <br/> <br/> <br/> <br/> <button class="btn btn-info" onClick={this.arata} >Arata contactele</button>
        <br/> <br/> <button class="btn btn-info" data-toggle="modal" data-target="#update_record_modal" >Update contact</button>
        </div>
        <div class="col-md-2"> </div>
    </div>

















 <div class="modal fade" id="update_record_modal" tabindex="-1" role="dialog" aria-labelledby="updateLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="updateLabel">Update contact</h4>
            </div>
            <div class="modal-body">
                <form id="record_update">
                    
                    <div class="form-group">
                        <label for="abstract">ID contact</label>
                        <input name="description" id="idEmp" placeholder="ID Contact" class="form-control"></input>
                        <br/>
                        <button id = "check"  onClick={this.verifica} class="btn btn-primary">Verifica</button>
                    </div>
                    
                    <div class="form-group">
                        <label for="name">Nume</label>
                        <input type="text" name="name" id="nume" placeholder="Descriere" class="form-control"/>
                    </div>
    
                    <div class="form-group">
                        <label for="abstract">Prenume</label>
                        <input name="description" id="prenume" placeholder="Descriere" class="form-control"></input>
                    </div>
                    <div class="form-group">
                        <label for="abstract">Telefon</label>
                        <input name="description" id="telefon" placeholder="Descriere" class="form-control"></input>
                    </div>
                    <div class="form-group">
                        <label for="abstract">ID Job</label>
                        <input name="description" id="job" placeholder="ID Job" class="form-control"></input>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" onClick={this.modifica}>Salveaza</button>
                
            </div>
        </div>
    </div>
</div>







    
</div>
  </div>
  
    );
  }
}


export default ShowAll;
