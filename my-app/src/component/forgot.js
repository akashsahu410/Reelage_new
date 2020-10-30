import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import   { Link,Redirect } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

class Forgot extends React.Component{
//for register
  state={
    forgetemailValid:"",
    FORGETEMAIL:"",
  }
     initialstate={
        forgetemailValid:"",
        FORGETEMAIL:"",
      }
 
  changedata=(e)=>{
    this.setState({[e.target.name]:e.target.value.toLowerCase()})
  }
 

  //for forget
forgetSubmit = e => {
    e.preventDefault();
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
    if (this.state.FORGETEMAIL==="") {
      this.setState({forgetemailValid:'Email is required*'})
       
    }else{
      
      if(reg.test(this.state.FORGETEMAIL) === false){
      this.setState({forgetemailValid:'Invalid Email'})
      
      }else{
       this.setState({loginemailValid:''})
      }
    }
    
    
   /*console.log(JSON.stringify(this.state));*/
   if(this.state.FORGETEMAIL==="" || reg.test(this.state.FORGETEMAIL) === false){
     
   }else{
   
    let options={
           method:"POST",
           headers:{
            Accept:"application/json",
             "Content-Type":"application/json"
           },
           body:JSON.stringify(this.state)
         }
         fetch(`http://localhost:8080/forgetform`,options)
         .then(res=>{
           
           return res.json();
         })
         .then(data=>{
           
           if(data.status === true){
            console.log('login')
           toast("Please check your email!");
          
            this.setState(this.initialstate)
           }
           else{
            console.log('login fail')
               toast("Credentials not exists!");
           }
         })
         .catch(err=>{
           console.log("error",err)
         })
   }
       
  
  }
  render(){
    return(
      <div>
      {this.state.loginflag ? <Redirect to ='/profile'/> : ""}
     <ToastContainer />
         <section class="login-page wrapper pd-50">
 <div id="particles-js"></div>
 <div class="container">
   <div class="row">
     <div class="col-md-6">
       <div class="lgn-sec-form">
         <div class="lgn-fom-logo">  
         <img alt="" src={require('../images/head-logo.png')} />
         </div>
         <div class="lgn-inr-form">
           <div class="panel with-nav-tabs panel-default">
             <div class="panel-heading">
                 <ul class="nav nav-tabs">
                   
                   <li><Link to ="/login"><a href="javascript:void(0);">Login</a></Link></li>
                   <li><Link to ="/signup"><a href="javascript:void(0);">Signup</a></Link></li>
                   
                 </ul>
             </div>
             <div class="panel-body">
               <div class="tab-content">
                   
                 
                 
                   <div class="lgn-fom-sec">
                     <div class="login pass">
                       <div class="Lgn-heaad-sec">
                         <h3>For recover your password</h3>
                       </div>
                       <div class="login-frm-blk">
                         
                         <div class="login-frm">
                           <form id="" onSubmit={this.forgetSubmit}>
                             <div class="form-group">
                               <label>Email</label>
                               <input class="form-control" required="" onChange={this.changedata} value={this.state.FORGETEMAIL} name="FORGETEMAIL" type="text" placeholder="Email address" />
                             <label >{this.state.forgetemailValid}</label>
                             </div>
                             <div class="Lgm-fom-btn">
                               <button class="cmmn-bt" type="submit">Send Me Email</button>
                             </div>
                           </form>
                         </div>
                       </div>
                     </div>
                 </div>
               </div>
             </div>
            </div>
         </div>
       </div>
     </div>
     <div class="col-md-6">
     </div>
   </div>
 </div>
</section>  
     </div>
      )
  }
}

export default Forgot