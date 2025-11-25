import React from 'react';
import { useForm } from 'react-hook-form';

const SendParcel = () => {

   const {register,handleSubmit,formState: {errors}}= useForm();

     const handleSendParcel = data =>{
       console.log(data);
       
     }
    return (
        <div>
            <h2 className='text-4xl font-bold'>Send A Parcel</h2>

          <form onSubmit={handleSubmit(handleSendParcel)} className='mt-12 p-5 text-black'>
              {/* parcel type */}

            <div>
               <label className='label mr-4'>
                <input type="radio" value="document" className='radio' 
                {...register('parcelType')}
                defaultChecked />Document
               </label>
                 <label className='label'>
                <input type="radio" value="non-document" className='radio' 
                {...register('parcelType')}
                 />Non-Document
               </label>
            </div>

            {/* parcel info */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-16 my-8'>
                <fieldset>
                    <label className='lebel'>Parcel Name</label>
                    <input type="text" {...register('parcelName')}
                    className='input w-full' placeholder='Parcel Name' />
                </fieldset>
                 <fieldset>
                    <label className='lebel'>Parcel Weight(kg)</label>
                    <input type="number" {...register('parcelWeight')}
                    className='input w-full' placeholder='Parcel Weight' />
                </fieldset>
            </div>

            {/* two column */}

            <div>
                {/* sender information */}
                <div>

                </div>
                {/* receiver information */}
                <div>

                </div>
            </div>
            <input type="submit" value="Send Parcel" className='btn btn-primary text-black' />
          </form>
        </div>
    );
};

export default SendParcel;