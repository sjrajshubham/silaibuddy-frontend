import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Tailors from './pages/Tailors';
import TailorDashboard from './pages/TailorDashboard';
import AdminPanel from './pages/AdminPanel';
import Verify from './pages/Verify';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';

export default function App(){
  const user = JSON.parse(localStorage.getItem('user')||'null');
  return (
    <BrowserRouter>
      <header className="bg-indigo-700 text-white p-4 flex items-center gap-4">
        <img src="/assets/logo_main.jpg" className="logo" alt="logo"/>
        <nav className="ml-auto flex gap-2">
          <Link to="/" className="px-3 py-1 rounded hover:bg-indigo-600">Home</Link>
          <Link to="/tailors" className="px-3 py-1 rounded hover:bg-indigo-600">Find Tailors</Link>
          {!user && <Link to="/signup" className="px-3 py-1 rounded hover:bg-indigo-600">Signup</Link>}
          {!user && <Link to="/login" className="px-3 py-1 rounded hover:bg-indigo-600">Login</Link>}
          {user && user.role==='tailor' && <Link to="/tailor-dashboard" className="px-3 py-1 rounded hover:bg-indigo-600">Tailor Dashboard</Link>}
          {user && user.role==='admin' && <Link to="/admin" className="px-3 py-1 rounded hover:bg-indigo-600">Admin</Link>}
          {user && <button onClick={()=>{ localStorage.clear(); window.location.href='/' }} className="px-3 py-1 rounded hover:bg-indigo-600">Logout</button>}
        </nav>
      </header>
      <div className='container p-4'>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/tailors' element={<Tailors/>} />
          <Route path='/tailor-dashboard' element={<ProtectedRoute roles={['tailor']}><TailorDashboard/></ProtectedRoute>} />
          <Route path='/admin' element={<ProtectedRoute roles={['admin']}><AdminPanel/></ProtectedRoute>} />
          <Route path='/verify' element={<Verify/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
