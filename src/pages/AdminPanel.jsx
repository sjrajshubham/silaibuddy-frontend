import React, {useEffect, useState} from 'react';
export default function AdminPanel({token}){
  const [pending, setPending] = useState([]);
  const fetchPending = async ()=>{
    const res = await fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/admin/pending-tailors', { headers: { 'authorization':'Bearer '+token } });
    const j = await res.json(); setPending(j);
  };
  useEffect(()=>{ if(token) fetchPending(); },[token]);
  const act = async (id, a)=>{
    const res = await fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + `/api/admin/${a}/${id}`, { method:'POST', headers:{ 'authorization':'Bearer '+token } });
    const j = await res.json(); alert(j.msg||JSON.stringify(j)); fetchPending();
  };
  return <div className='card'><h3>Admin Panel</h3><p className='small'>Pending Tailors</p>
    {pending.map(p=> <div key={p._id} className='card'><h4>{p.name}</h4><p className='small'>{p.email}</p><p className='small'>Services: {p.services?.join(', ')}</p><button onClick={()=>act(p._id,'approve')}>Approve</button><button onClick={()=>act(p._id,'reject')}>Reject</button></div>)}
  </div>
}
