import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {LogIn,Mail,Lock,User,ArrowRight,Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserStore } from '../stores/userUserStore';

const LoginPage = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const {login,loading} = useUserStore();

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(email,password);
    login(email,password);
  }
  return (
    <div className='min-h-screen flex  justify-center py-12 sm:px-6 lg:px-8'>
    <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
      <motion.div 
          className='sm:mx-auto sm:w-full sm:max-w-md'
          initial={{opacity:0,y:-20}} 
          animate={{opacity:1,y:0}} 
          transition={{duration:0.8,delay:0.2}}>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-300'>Login your account</h2>

      </motion.div>
      <motion.div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'initial={{opacity:0,y:20}} animate={{opacity:1,y:1}} transition={{duration:0.8,delay:0.2}}>
        <div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form onSubmit={handleSubmit}className='space-y-6'>
            
            <div>
              <label htmlFor='email'className='block text-sm font-medium text-gray-300'>Email address</label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='h-5 w-5 text-gray-400 align-middle' aria-hidden='true' />
                </div>
                <input
                id='email'
                type='email'
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className='block w-full px-3 py-2  pl-10 bg-gray-700 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:barder-blue-500 sm:text-sm'
                placeholder='youExample@gmail.com' />
            </div>
            </div>
            <div>
              <label htmlFor='password'className='block text-sm font-medium text-gray-300'>Password</label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='h-5 w-5 text-gray-400 ' aria-hidden='true' />
                </div>
                <input
                id='password'
                type='password'
                required
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className='block w-full px-3 py-2  pl-10 bg-gray-700 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:barder-blue-500 sm:text-sm'
                placeholder='••••••••' />
            </div>
            </div>
            
            <button
							type='submit'
							className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-blue-700
							 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50'
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
									Loading...
								</>
							) : (
								<>
									<LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
									Login
								</>
							)}
						</button>
          </form>
            <p className='mt-8 text-center text-sm text-gray-400'>
            Create new account?{" "}
            <Link to='/signup' className='font-medium text-blue-700 hover:text-blue-800'>
              SignUp <ArrowRight className='inline h-3 w-3' /> </Link>
            
          </p>
          
        </div>

      </motion.div>
    </div>
    </div>

  )
}

export default LoginPage
