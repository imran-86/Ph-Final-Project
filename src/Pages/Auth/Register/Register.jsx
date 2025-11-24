import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';

const Register = () => {

    const { register, handleSubmit, formState:{errors} } = useForm();

    const {createUser,updateUserProfile} = useAuth()

    const handleRegistration = (data)=>{
        
     const profileImg = data.photo[0];

        createUser(data.email,data.password)
        .then(result=>{
          console.log(result.user);
          // update user profile here
          const formData = new FormData();
          formData.append('image',profileImg);
          const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;

          axios.post(image_API_URL,formData)
          .then(res =>{
            console.log("after image upload ",res.data.data.url);

            const userProfile={
              displayName : data.name,
              photoURL : res.data.data.url
            }
            updateUserProfile(userProfile)
            .then(()=>{
              console.log("User profile updated done");
              
            })
            .catch(err=>{
              console.log(err);
              
            })
            
          })

          
        })
        .catch(err =>{
          console.log(err);
          
        })
        
    }
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
           <h1 className='text-center text-3xl font-semibold pt-5'>Register Now</h1>
            <form
            className='card-body'
            onSubmit={handleSubmit(handleRegistration)}
            >
                    <fieldset className="fieldset">
          
            <label className="label">Name</label>
          <input type="text" 
          {...register('name',{required:true})}
          className="input" placeholder="Your Name" />
          {errors.name?.type==='required'&&<p className='text-red-500'>
            Name is required
            </p>}
            
           <label className="label">Photo</label>

          <input type="file" 
          {...register('photo',{required:true})}
          className="file-input" placeholder="Your Photo" />
          {errors.name?.type==='required'&&<p className='text-red-500'>
            Photo is required
            </p>}
          
          
          
          <label className="label">Email</label>
          <input type="email" 
          {...register('email',{required:true})}
          className="input" placeholder="Email" />
          {errors.email?.type==='required'&&<p className='text-red-500'>
            Email is required
            </p>}

          <label className="label">Password</label>
          <input type="password" className="input" 
          {...register('password',{
            required: true,
            minLength: 6,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
          })}
          placeholder="Password" />

          {
            errors.password?.type==="required"&& <p className='text-red-500'>Password is required</p>
          }
            {
            errors.password?.type==="minLength"&& <p className='text-red-500'>Password must be at least 6 characters or longer</p>
          }
          {
            errors.password?.type==='pattern'&& <p className='text-red-500'>Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character needed</p>
          }

          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
         <p className='text-center pt-5'>Already have an account? Please <Link
          to="/login"
          className='underline text-blue-500'>Login</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;