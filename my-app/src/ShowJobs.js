import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";


class ShowJobs extends Component {
    
      constructor(){
        super();
        this._onButtonClick = this._onButtonClick.bind(this);
        this.salvare = this.salvare.bind(this);
    }
    
    
    
   
        
    
    //post pe butonul de salvare
    salvare(){
        if(document.getElementById('idLog').value=='aaa' && document.getElementById('pasLog').value=='aaa'){
        let me = 'https://interfata-proiect-antonia1696.c9users.io/positions';
        var den = document.getElementById("name").value;
        var dep = document.getElementById("dep").value;
        var depAssigned = '';
        let other = 'https://interfata-proiect-antonia1696.c9users.io/departments/'+dep;
        axios.get(other, {withCredentials: true}).then((results) => {
        if(results.status == 200) {
            depAssigned = results.data.depName;
            console.log(results)
        }
    }).catch((error) => {
      console.log(error)
    })
       
       
       
        axios.post(me, { posName: den,depId:dep})
        
  .then(function(response){
    console.log('saved successfully');
     var xTable=document.getElementById('articles');
     var tr=document.createElement('tr');
        
        tr.innerHTML ='<td>'+ response.data.id+'</td><td>'+den+'</td>'+
        '<td>'+dep+'</td>'+'<td>'+depAssigned+'</td>';
        xTable.appendChild(tr);
  });  
  
       
    }
    else{
        alert('Incercare esuata! Nu te-ai logat')
    }
    
}
    
      _onButtonClick() {
          if(document.getElementById('idLog').value=='aaa' && document.getElementById('pasLog').value=='aaa'){
     let me = 'https://interfata-proiect-antonia1696.c9users.io/positions/dep';
    
    axios.get(me, {withCredentials: true}).then((results) => {
        if(results.status == 200) {
            for(var i = 0; i < results.data.length; i++){


        var xTable=document.getElementById('articles');
        var tr=document.createElement('tr');
        tr.id = "row"+results.data[i].id;
        
        tr.innerHTML ='<td>'+ results.data[i].id+'</td><td>'+results.data[i].posName+'</td>'+
        '<td>'+results.data[i].depId+'</td>'+'<td>'+results.data[i].department.depName+'</td>';
        xTable.appendChild(tr);

                console.log(results.data[i]);
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
       
  <div className="ShowJobs">
  
 <script type = "text/javascript"> 
 
 </script>
    <div>


    <div class="row" >
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <div class="records_content">
                <br/>
                <h3><br/>Informatii job-uri</h3>
                
                 <div class="records_content">
                <table id="articles" class="table table-bordered table-striped">
						<tr>
							<th>ID</th>
							<th>Denumire</th>
							<th>ID departament</th>
							<th>Denumire departament</th>
							
						</tr>
						<tr> 
						    <td>100</td>
						    <td>IOS developer</td>
						    <td>100</td>
						    <td>IT</td>
						</tr>
						<tr> 
						    <td>101</td>
						    <td>Android developer</td>
						    <td>100</td>
						    <td>IT</td>
						</tr>
				</table>
				</div>
            </div>
        </div>
        <br/><br/>
        <div class="pull-left">
        <br/> <br/> <br/> <br/> <br/> <button class="btn btn-info" data-toggle="modal" data-target="#add_new_record_modal" >Adauga job</button>
                      <br/> <br/>       <button class="btn btn-info" onClick={this._onButtonClick}>Arata job-uri active</button>
        </div>
        <div class="col-md-2"> </div>
    </div>
    
    
    
    
    
   <div class="modal fade" id="add_new_record_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Adauga job</h4>
            </div>
            <div class="modal-body">
                <form id="record_form">
                    <input type="hidden" name="id" id="id" />
                    <div class="form-group">
                        <label for="name">Denumire job</label>
                        <input type="text" name="name" id="name" placeholder="Descriere" class="form-control"/>
                    </div>
                     <div class="form-group">
                        <label for="name">ID departament</label>
                        <input type="text" name="name" id="dep" placeholder="Descriere" class="form-control"/>
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" onClick={this.salvare}>Salveaza</button>
            </div>
        </div>
    </div>
</div>
    

</div>
  
</div>
    );
  }
}

export default ShowJobs;
