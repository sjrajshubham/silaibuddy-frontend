import React, {useState} from 'react';
export default function ForgotPassword(){
  const [email,setEmail]=useState('');
  const submit=async ()=>{
    const r = await fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/auth-extra/forgot-password',{ method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ email }) });
    const j = await r.json();
    alert(j.msg || JSON.stringify(j));
  };
  return <div className='card'><h3>Forgot Password</h3><input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' /><button onClick={submit}>Send reset link</button></div>;
}
