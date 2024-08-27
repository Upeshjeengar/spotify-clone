import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { url } from "../Admin";
import { toast } from "react-toastify";

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [color, setColor] = useState("#000000");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("bgColor", color);

      const response = await axios.post(`${url}/api/album/add`, formData);

      if (response.data.success) {
        toast.success("Album Added");
        setDescription("");
        setImage(false);
        setName("");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error Occured");
    }
    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            accept="image/*"
            hidden
          />
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="w-24 cursor-pointer"
              alt=""
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p>Album Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          style={{ width: "450px" }}
          className="bg-transparent outline-green-600 border border-gray-400 p-2.5 w-[max(40vw, 250px)]"
          type="text"
          placeholder="Type here..."
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album description</p>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          style={{ width: "450px" }}
          className="bg-transparent outline-green-600 border border-gray-400 p-2.5 w-[max(40vw, 250px)]"
          placeholder="type here"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Background Color</p>
        <input
          onChange={(e) => setColor(e.target.value)}
          value={color}
          type="color"
          style={{ width: "70px" }}
        />
      </div>

      <button
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default AddAlbum;
