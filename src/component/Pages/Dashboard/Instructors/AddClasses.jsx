import React from "react";
import Swal from "sweetalert2";
import TitleSubtitle from "../../../Shared/TitleSubtitle/TitleSubtitle";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const img_hosting_token = import.meta.env.VITE_Image;
const AddClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    console.log(img_hosting_token);
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        if (imgRes.success) {
          const imgURL = imgRes.data.display_url;
          const { className, instructorName, email, availableSeats, price } =
            data;
          const newClass = {
            className,
            instructorName: user.displayName,
            email: user.email,
            availableSeats: parseFloat(price),
            price: parseFloat(price),
            classImage: imgURL,
          };
          console.log(newClass);
          axiosSecure.post("/classes", newClass).then((data) => {
            console.log("Data after post", data);
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "New class added successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
  };

  return (
    <div>
      <div className="w-full">
        <TitleSubtitle title="Add New Class" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
        <div className="mb-4">
          <label className="block mb-2">Class name</label>
          <input
            type="text"
            name="className"
            placeholder="Class name"
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
            {...register("className", { required: true, maxLength: 120 })}
          />
          {errors.recipeName && (
            <span className="text-red-500">Class name is required.</span>
          )}
        </div>

        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label className="block mb-2">Instructor Name</label>
            <input
              type="text"
              name="instructorName"
              placeholder={user.displayName}
              readOnly
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              {...register("instructorName", { maxLength: 120 })}
            />
            {errors.recipeName && (
              <span className="text-red-500">Instructor name is required.</span>
            )}
          </div>

          <div className="w-1/2 ml-2">
            <label className="block mb-2">Instructor Email</label>
            <input
              type="email"
              name="email"
              placeholder={user.email}
              readOnly
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              {...register("email", { maxLength: 120 })}
            />
            {errors.recipeName && (
              <span className="text-red-500">
                Instructor email is required.
              </span>
            )}
          </div>
        </div>

        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label className="block mb-2">Available Seats</label>
            <input
              type="number"
              name="availableSeats"
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              {...register("availableSeats", {
                required: true,
                maxLength: 120,
              })}
            />
            {errors.recipeName && (
              <span className="text-red-500">Available seats is required.</span>
            )}
          </div>

          <div className="w-1/2 ml-2">
            <label className="block mb-2">Price</label>
            <input
              type="price"
              name="price"
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-red-500">Price is required.</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Upload Class Image</label>
          <input
            type="file"
            name="fileUpload"
            {...register("image", { required: true })}
            className="max-w-sm border border-gray-300 px-3 py-2 rounded-md"
          />
          {errors.fileUpload && (
            <span className="text-red-500">Class image is required.</span>
          )}
        </div>

        <button type="submit" className="btn btn-gradiant">
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClasses;
