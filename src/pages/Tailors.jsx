import React, {useState} from 'react';
export default function Tailors(){ 
  const [tailors,setTailors]=useState([]); const [lat,setLat]=useState(''); const [lng,setLng]=useState('');
  const find = async ()=>{
    const url = (import.meta.env.VITE_API_URL||'http://localhost:5000') + `/api/tailors/nearby?lat=${lat||0}&lng=${lng||0}&km=50`;
    const res = await fetch(url); const j = await res.json(); setTailors(j);
  };
  const placeOrder = async (t) => {
    const price=prompt('Offer price'); const addr=prompt('Address');
    const token=localStorage.getItem('token'); if(!token){ return alert('Login as customer to place order'); }
    const res=await fetch((import.meta.env.VITE_API_URL||'http://localhost:5000')+'/api/orders',{method:'POST',headers:{'content-type':'application/json','authorization':'Bearer '+token},body:JSON.stringify({tailorId:t._id,service:t.services?.[0]||'stitch',price:price||100,address:addr||'NA'})});
    const j=await res.json(); alert(j.msg||JSON.stringify(j));
  };
  const submitReview = async (tailorId) => {
    const token=localStorage.getItem('token'); if(!token) return alert('Login as customer to review');
    const rating = parseInt(prompt('Rating 1-5')); const comment = prompt('Comment');
    const res = await fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/reviews', { method:'POST', headers:{'content-type':'application/json','authorization':'Bearer '+token}, body: JSON.stringify({ tailorId, rating, comment }) });
    const j = await res.json(); alert(j.msg || JSON.stringify(j));
  };
  return <div>
    <div className='card'><h3>Find Tailors Near You</h3>
      <p className='small'>Enter coords or use browser geolocation</p>
      <div className='row'>
        <input placeholder='Lat' value={lat} onChange={e=>setLat(e.target.value)}/>
        <input placeholder='Lng' value={lng} onChange={e=>setLng(e.target.value)}/>
        <button onClick={async ()=>{ if(navigator.geolocation){ navigator.geolocation.getCurrentPosition(p=>{ setLat(p.coords.latitude); setLng(p.coords.longitude); }); } }}>Use My Location</button>
        <button onClick={find}>Search</button>
      </div>
    </div>
    {tailors.map(t=> <div className='card' key={t._id}><h4>{t.name} {t.rating?`(${t.rating.toFixed(1)})`:''}</h4><p className='small'>{t.services?.join(', ')}</p><p className='small'>Status: {t.status}</p><div className='row'><button onClick={()=>placeOrder(t)}>Place Order</button><button onClick={()=>submitReview(t._id)}>Leave Review</button></div></div>)}
  </div>
}
