// import React, { use } from "react";
import { useForm, useWatch } from "react-hook-form";
import {   useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth"

const SendParcel = () => {
  const {
    register,
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const {user} = useAuth()
  const axiosSecure = useAxiosSecure();


  const serviceCenters = useLoaderData();

  const allRegions = serviceCenters.map((index) => index.region);
  // console.log(allRegions);

  const regions = [...new Set(allRegions)];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((s) => s.region === region);

    const districts = regionDistricts.map((d) => d.district);

    return districts;
  };

  // console.log(regions);

  const handleSendParcel = (data) => {
    console.log(data);

    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }

    // console.log("Cost ", cost);

    data.cost = cost;
    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I agree!",
    }).then((result) => {
      if (result.isConfirmed) {
         
        // save the parcel info to the database

        axiosSecure.post('/parcels', data)
        .then(res =>{
          console.log('after saving parcel ',res.data);
          
        })

        

        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };
  return (
    <div>
      <h2 className="text-4xl font-bold">Send A Parcel</h2>

      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-12 p-5 text-black"
      >
        {/* parcel type */}

        <div>
          <label className="label mr-4">
            <input
              type="radio"
              value="document"
              className="radio"
              {...register("parcelType")}
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              value="non-document"
              className="radio"
              {...register("parcelType")}
            />
            Non-Document
          </label>
        </div>

        {/* parcel info */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 my-8">
          <fieldset>
            <label className="lebel">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset>
            <label className="lebel">Parcel Weight(kg)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>

        {/* two column */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender information */}

          <fieldset>
            <h3 className="text-2xl font-semibold">Sender Details</h3>
            {/* sender name  */}

            <label className="lebel">Sender Name</label>
            <input
            defaultValue={user?.displayName}
              type="text"
              {...register("senderName")}
              className="input w-full my-2"
              placeholder="Sender Name"
            />

            {/* Sender Email  */}

            <label className="lebel">Sender Email</label>
            <input
            defaultValue={user?.email}
              type="email"
              {...register("senderEmail")}
              className="input w-full my-2"
              placeholder="Sender Email"
            />

            {/* sender region */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">
                Sender Regions
              </legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a browser"
                className="select"
              >
                <option disabled={false}>Pick a region</option>

                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Sender District */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">
                Sender Districts
              </legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={false}>Pick a district</option>

                {districtsByRegion(senderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Sender address */}

            <label className="lebel ">Sender Address</label>
            <input
              type="text"
              {...register("senderAddress")}
              className="input w-full my-2"
              placeholder="Sender Address"
            />
          </fieldset>
          {/* receiver information */}
          <fieldset>
            <h3 className="text-2xl font-semibold">Receiver Details</h3>

            {/* Receiver name  */}

            <label className="lebel">Receiver Name</label>
            <input
              type="text"
              {...register("receiverName")}
              className="input w-full my-2"
              placeholder="Receiver Name"
            />

            {/* Receiver Email  */}

            <label className="lebel">Receiver Email</label>
            <input
              type="email"
              {...register("receiverEmail")}
              className="input w-full my-2"
              placeholder="Receiver Email"
            />

            {/* receiver region */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">
                Receiver Regions
              </legend>
              <select
                {...register("receiverRegion")}
                defaultValue="Pick a region"
                className="select"
              >
                <option disabled={false}>Pick a region</option>

                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Receiver District */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">
                Receiver District
              </legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={false}>Pick a district</option>

                {districtsByRegion(receiverRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Receiver address */}

            <label className="lebel mt-4">Receiver Address</label>
            <input
              type="text"
              {...register("receiverAddress")}
              className="input w-full my-2"
              placeholder="Receiver Address"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          value="Send Parcel"
          className="mt-20 btn btn-primary text-black"
        />
      </form>
    </div>
  );
};

export default SendParcel;
