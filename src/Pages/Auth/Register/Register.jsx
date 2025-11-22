import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';

const Register = () => {

    const { register, handleSubmit, formState:{errors} } = useForm();

    const {createUser} = useAuth()

    const handleRegistration = (data)=>{
        console.log(data);
        createUser(data.email,data.password)
        .then(result=>{
          console.log(result.user);
          
        })
        .catch(err =>{
          console.log(err);
          
        })
        
    }
    return (
        <div>
            <form
            onSubmit={handleSubmit(handleRegistration)}
            >
                    <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" 
          {...register('email',{required:true})}
          className="input" placeholder="Email" />
          {errors.email?.type==='required'&&<p className='text-red-500'>
            Please fill out this field
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
            </form>
        </div>
    );
};

export default Register;