import React, {useEffect, useState} from 'react';
import { io } from 'socket.io-client';
export default function TailorDashboard({}){
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')||'null');
  const [socket, setSocket] = useState(null);
  const [orders, setOrders] = useState([]);
  const [photos, setPhotos] = useState(user?.photos || []);

  useEffect(()=>{
    if(!token || !user) return;
    const s = io((import.meta.env.VITE_API_URL_SOCKET||'http://localhost:5000'));
    s.on('connect', ()=>{ s.emit('registerTailor', user.id || user._id); });
    s.on('newOrder', (o)=>{ alert('New order: ' + JSON.stringify(o)); setOrders(prev=>[o,...prev]); });
    setSocket(s);
    return ()=> s.disconnect();
  },[token]);

  const upload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/upload/tailor', { method:'POST', body: fd, headers: { 'authorization':'Bearer '+token } });
    const j = await res.json();
    if(j.url){ setPhotos(prev=>[j.url,...prev]); alert('Uploaded'); } else alert(j.msg||JSON.stringify(j));
  }

  return <div className='card'>
    <h3>Tailor Dashboard</h3>
    <p className='small'>Logged in as {user?.name}</p>
    <div><h4>Upload Work Photos</h4>
      <input type='file' onChange={upload} />
      <div className='row' style={{marginTop:12}}>{photos.map((p,i)=><img key={i} src={p} style={{width:120,height:120,objectFit:'cover',borderRadius:8,marginRight:8}}/>)}</div>
    </div>
    <div><h4>Incoming Orders</h4>{orders.map(o=> <div key={o.orderId} className='card'><p>Service: {o.service}</p><p>Price: {o.price}</p><p>Address: {o.address}</p></div>)}</div>
  </div>
}
