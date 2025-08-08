import React, {useState} from 'react';
export default function Signup({onDone}){
  const [role, setRole] = useState('customer');
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [services, setServices] = useState(''); const [lat, setLat] = useState(''); const [lng, setLng] = useState('');
  const submit = async ()=>{
    const body = { name, email, password, role };
    if(role==='tailor'){ body.services = services.split(',').map(s=>s.trim()); body.location = { type:'Point', coordinates: [ parseFloat(lng||0), parseFloat(lat||0) ] }; }
    const res = await fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/auth/signup', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(body) });
    const j = await res.json();
    if(j.userId) alert('Registered. Await approval if you signed up as tailor.'); 
    // auto login for customers
    if(role==='customer') {
      const r2 = await fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/auth/login', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({email,password}) });
      const jd = await r2.json();
      if(jd.token) onDone(jd.token, jd.user);
    }
  };
  return <div className='card'>
    <h3>Signup</h3>
    <label>Role</label>
    <select value={role} onChange={e=>setRole(e.target.value)}>
      <option value='customer'>Customer</option>
      <option value='tailor'>Tailor</option>
    </select>
    <label>Name</label><input value={name} onChange={e=>setName(e.target.value)}/>
    <label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)}/>
    <label>Password</label><input type='password' value={password} onChange={e=>setPassword(e.target.value)}/>
    {role==='tailor' && <>
      <label>Services (comma separated)</label><input value={services} onChange={e=>setServices(e.target.value)}/>
      <label>Location Lat</label><input value={lat} onChange={e=>setLat(e.target.value)}/>
      <label>Location Lng</label><input value={lng} onChange={e=>setLng(e.target.value)}/>
    </>}
    <button onClick={submit}>Register</button>
  </div>
}
