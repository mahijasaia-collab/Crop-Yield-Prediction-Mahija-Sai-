import { useEffect, useState } from "react";

const BASE_URL = "http://127.0.0.1:8000";

export default function Users() {

  const [users,setUsers]=useState([]);

  async function fetchUsers(){

    const res = await fetch(`${BASE_URL}/users`);

    const data=await res.json();

    setUsers(data);

  }

  useEffect(()=>{
    fetchUsers();
  },[]);

  async function deleteUser(id){

    if(!window.confirm("Delete this user?"))
      return;

    await fetch(`${BASE_URL}/users/${id}`,{
      method:"DELETE"
    });

    fetchUsers();

  }

  return(

<div style={{padding:"40px"}}>

<h1>Registered Users</h1>

<br/>

<table
style={{
width:"100%",
borderCollapse:"collapse",
background:"white"
}}
>

<thead>

<tr
style={{
background:"#16a34a",
color:"white"
}}
>

<th>Name</th>

<th>Email</th>

<th>Role</th>

<th>Actions</th>

</tr>

</thead>

<tbody>

{

users.map(user=>(

<tr key={user._id}>

<td>{user.full_name}</td>

<td>{user.email}</td>

<td>{user.role}</td>

<td>

<button
style={{
background:"#2563eb",
color:"white",
border:"none",
padding:"8px 15px",
marginRight:"10px",
borderRadius:"8px"
}}
>
Edit
</button>

<button
onClick={()=>deleteUser(user._id)}
style={{
background:"#ef4444",
color:"white",
border:"none",
padding:"8px 15px",
borderRadius:"8px"
}}
>
Delete
</button>

</td>

</tr>

))

}

</tbody>

</table>

</div>

);

}