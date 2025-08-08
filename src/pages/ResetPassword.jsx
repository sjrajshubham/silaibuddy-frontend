import React, {useState} from 'react';
export default function ResetPassword(){
  const token = new URLSearchParams(window.location.search).get('token');
  const [pw,setPw] = useState('');
  const submit=async ()=>{
    const r = await fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/auth-extra/reset-password',{ method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ token, password: pw }) });
    const j = await r.json(); alert(j.msg || JSON.stringify(j));
  };
  return <div className='card'><h3>Reset Password</h3><input type='password' value={pw} onChange={e=>setPw(e.target.value)} /><button onClick={submit}>Reset</button></div>;
}
