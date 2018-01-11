import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";


class ShowDept extends Component {
    
      constructor(){
        super();
        this._onButtonClick = this._onButtonClick.bind(this);
        this.salvare = this.salvare.bind(this);
        this.updateSalvare = this.updateSalvare.bind(this);

    }
    
    
    
    componentDidMount() {
        //creare functie de update pentru butoanele de pe rand
    const scriptus = document.createElement('script');
    scriptus.src="https://unpkg.com/axios/dist/axios.min.js";

    // const jq = document.createElement('script');
    // jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
    // const bs = document.createElement("script");
    // bs.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js";

    // const bst = document.createElement("script");
    // bst.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";

    // document.head.appendChild(bst);
    // document.head.appendChild(bs);
    // document.head.appendChild(jq);
   document.head.appendChild(scriptus);
    
     const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    
    s.innerHTML = "function updateRow(id){console.log('sdfsdsd'); let me = 'https://interfata-proiect-antonia1696.c9users.io/departments/'+id;" +
        " axios.get(me, {withCredentials: true}).then((results) => {if(results.status == 200) {console.log(results.data.depName); document.getElementById('nameu').value = results.data.depName;"
        +"document.getElementById('manageru').value = results.data.manager; document.getElementById('telefonu').value = results.data.phone; $('#update_record_modal').modal('show'); document.getElementById('idu').value=results.data.id;}"+
        "}).catch((error) => { console.log(error)})}";
    document.head.appendChild(s); 
    
   

    }
    

        
    
    //post pe butonul de salvare
    salvare(){
        if(document.getElementById('idLog').value=='aaa' && document.getElementById('pasLog').value=='aaa'){
        let me = 'https://interfata-proiect-antonia1696.c9users.io/departments';
        var den = document.getElementById("name").value;
        var mng = document.getElementById('manager').value;
        var tel = document.getElementById('telefon').value;
        axios.post(me, { depName: den, manager: mng, phone: tel})
  .then(function(response){
    console.log('saved successfully')
  });  
        
    }
    else{
        alert('Nu ai drept de acces')
    }
    
    }
    
    updateSalvare(){
        var idul = document.getElementById('idu').value;
        var depN = document.getElementById('nameu').value;
        var tel = document.getElementById('telefonu').value;
        var manag = document.getElementById('manageru').value;
        console.log('s-a updatat'+idul);
        let me = 'https://interfata-proiect-antonia1696.c9users.io/departments/'+idul;
        axios.put(me, {
    depName: depN,
    manager: manag,
    phone: tel
    
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
        //schimbare dinamica si in tabel
        document.getElementById('row'+idul).childNodes[1].innerHTML = depN;
        document.getElementById('row'+idul).childNodes[2].innerHTML = manag;
        document.getElementById('row'+idul).childNodes[3].innerHTML = tel;
    }

    
      _onButtonClick() {
          if(document.getElementById('idLog').value=='aaa' && document.getElementById('pasLog').value=='aaa'){
     let me = 'https://interfata-proiect-antonia1696.c9users.io/departments';
    
    axios.get(me, {withCredentials: true}).then((results) => {
        if(results.status == 200) {
            for(var i = 0; i < results.data.length; i++){


        var xTable=document.getElementById('articles');

        var tr=document.createElement('tr');
        tr.id = "row"+results.data[i].id;
        tr.innerHTML ='<td>'+ results.data[i].id+'</td><td>'+results.data[i].depName+'</td>'+'<td>'+results.data[i].manager+'</td>'
                        +'<td>'+results.data[i].phone+'</td>'+'<td><button class="btn btn-edit" onclick=updateRow('+results.data[i].id+')>Update</button></td>'
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
       
  <div className="ShowDept">
  
 <script type = "text/javascript"> 
 
 </script>
    <div>


    <div class="row" >
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <div class="records_content">
                <br/>
                <h3><br/>Departamente</h3>
                
                 <div class="records_content">
                <table id="articles" class="table table-bordered table-striped">
						<tr>
							<th>ID</th>
							<th>Denumire</th>
							<th>Manager departament</th>
							<th>Telefon</th>
							<th>Actualizeaza</th>
							
						</tr>
						<tr> 
						    <td>100</td>
						    <td>IT</td>
						    <td>Antonia Birlog</td>
						    <td>0734520301</td>
						    <td>test</td>
						    
						
						</tr>
						<tr> 
						    <td>101</td>
						    <td>HR</td>
						    <td>Manuel Popa</td>
						    <td>0769668141</td>
						    <td>test</td>
						    
						
						</tr>
				</table>
				</div>
            </div>
        </div>
        <br/><br/>
        <div class="pull-left">
        <br/> <br/> <br/> <br/> <br/> <button class="btn btn-info" data-toggle="modal" data-target="#add_new_record_modal" >Adauga departament</button>
                      <br/> <br/>       <button class="btn btn-info" onClick={this._onButtonClick}>Arata departamente</button>
        </div>
        <div class="col-md-2"> </div>
    </div>
    
    
    
    
    
   <div class="modal fade" id="add_new_record_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Adauga departament</h4>
            </div>
            <div class="modal-body">
                <form id="record_form">
                    <input type="hidden" name="id" id="id" />
                    <div class="form-group">
                        <label for="name">Denumire departament</label>
                        <input type="text" name="name" id="name" placeholder="Descriere" class="form-control"/>
                    </div>
    
                    <div class="form-group">
                        <label for="abstract">Manager</label>
                        <input name="description" id="manager" placeholder="Descriere" class="form-control"></input>
                    </div>
                    <div class="form-group">
                        <label for="abstract">Telefon intern</label>
                        <input name="description" id="telefon" placeholder="Descriere" class="form-control"></input>
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
    
    
    
    
    
    
    
    
    

    
       <div class="modal fade" id="update_record_modal" tabindex="-1" role="dialog" aria-labelledby="updateLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="updateLabel">Update departament</h4>
            </div>
            <div class="modal-body">
                <form id="record_update">
                    <input type="hidden" name="id" id="idu" />
                    <div class="form-group">
                        <label for="name">Denumire departament</label>
                        <input type="text" name="name" id="nameu" placeholder="Descriere" class="form-control"/>
                    </div>
    
                    <div class="form-group">
                        <label for="abstract">Manager</label>
                        <input name="description" id="manageru" placeholder="Descriere" class="form-control"></input>
                    </div>
                    <div class="form-group">
                        <label for="abstract">Telefon intern</label>
                        <input name="description" id="telefonu" placeholder="Descriere" class="form-control"></input>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" onClick={this.updateSalvare}>Salveaza</button>
                
            </div>
        </div>
    </div>
</div>
    
</div>
  
  
  </div>
    );
  }
}

export default ShowDept;
