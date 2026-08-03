import {useState} from "react";

const BASE_URL="http://127.0.0.1:8000";

export default function AddUser(){

const [name,setName]=useState("");

const [email,setEmail]=useState("");

async function save(){

await fetch(`${BASE_URL}/users/`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

full_name:name,

email:email,

password:"",

role:"farmer"

})

});

alert("User Added");

}

return(

<div style={{padding:"40px"}}>

<h1>Add Farmer</h1>

<input
placeholder="Name"
value={name}
onChange={e=>setName(e.target.value)}
/>

<br/><br/>

<input
placeholder="Email"
value={email}
onChange={e=>setEmail(e.target.value)}
/>

<br/><br/>

<button onClick={save}>
Save
</button>

</div>

);

}