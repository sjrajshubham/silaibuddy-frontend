import React, {useState} from 'react';
export default function Login({onLogin}){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const submit = async ()=>{
    const res = await fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/auth/login', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({email,password}) });
    const j = await res.json();
    if(j.token) onLogin(j.token, j.user); else alert(j.msg||'Error');
  };
  return <div className='card'>
    <h3>Login</h3>
    <label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)}/>
    <label>Password</label><input type='password' value={password} onChange={e=>setPassword(e.target.value)}/>
    <button onClick={submit}>Login</button>
  </div>
}
