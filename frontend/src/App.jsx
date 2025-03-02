import { useEffect, useState } from 'react'



import './output.css';

import { Navigate,Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';

import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

import Navbar from './componets/Navbar';
import React from "react";
import { Toaster } from "react-hot-toast";
import { useUserStore } from './stores/userUserStore';
import LoadingSpinner from './componets/LoadingSpinner';
import './index.css';

import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import { useCartStore } from './stores/useCartStore';
import DummyPaymentPage from './pages/DummyPaymentPage';
import ThanksPage from './pages/ThanksPage';



function App(){
  // const [count, setCount] = useState(0)
  const { user, checkAuth, checkingAuth } = useUserStore();
  const {getCartItems} = useCartStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth]);

  useEffect(() => {
    if(!user) return;

    getCartItems()
  },[getCartItems,user])

  // useEffect(() => {
	// 	if (!user) return;

	// 	getCartItems();
	// }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_rgba(54,162,235,0.3)_0%,_rgba(54,162,235,0.3)_50%,_rgba(153,102,255,0.1)_100%)]'>
          </div>
        </div>
        <div className='realtive z-50 pt-20'>
      
        <Navbar />
          <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='/signup' element={!user ?<SignUpPage/> :<Navigate to='/'/>} />
              <Route path='/login' element={!user ? <LoginPage /> :<Navigate to='/'/>} />
              <Route path='/secret-dashboard' element={user?.role === "admin" ? <AdminPage />: <Navigate to='/login'/>} />
              <Route path='/category/:category' element={<CategoryPage />} />
              <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
              <Route path="/payment" element={<DummyPaymentPage />} />
              <Route path="/thanks" element={<ThanksPage />} />
              
          </Routes>
         </div>
         <Toaster />
      </div>

    </>
  )
}

export default App
