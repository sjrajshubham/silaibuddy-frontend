import React, {useEffect, useState} from 'react';
export default function Verify(){ 
  const [msg,setMsg]=useState('Verifying...');
  useEffect(()=>{
    const token = new URLSearchParams(window.location.search).get('token');
    if(!token){ setMsg('No token'); return; }
    fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/auth-extra/verify?token='+token)
      .then(r=>r.json()).then(j=> setMsg(j.msg || JSON.stringify(j))).catch(e=> setMsg('Error'));
  },[]);
  return <div className='card'><h3>Verify</h3><p>{msg}</p></div>;
}
