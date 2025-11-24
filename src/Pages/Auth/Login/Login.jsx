import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    
    const { register , handleSubmit, formState: {errors}} = useForm();
    const {signInUser} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogin = (data) =>{
       console.log('form data ',data);
       signInUser(data.email,data.password)
       .then(result =>{
        console.log(result);
        navigate(location?.state || '/')
        
       })
       .catch(err =>{
        console.log(err);
        
       })
       
    }
    

    return (
         <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      
      <h1 className='text-center text-3xl font-semibold pt-5'>Please Login</h1>
      <form
      onSubmit={handleSubmit(handleLogin)}
      className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input 
          {...register('email',{
            required: true,

          })}
          type="email" className="input" placeholder="Email" />

          {
            errors.email?.type==='required'&&<p className='text-red-500'>
                Email is required
            </p>
          }

          <label className="label">Password</label>
          <input 
          
          type="password"
          {...register('password',{
            required:true,
            
          })}
          className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
          <p className='text-center pt-5'>New to website? Please <Link
          to="/register"
          className='underline text-blue-500'>Register</Link></p>
        </fieldset>
      </form>
      <SocialLogin></SocialLogin>
    </div>
    );
};

export default Login;