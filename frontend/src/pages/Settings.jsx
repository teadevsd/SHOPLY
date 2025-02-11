import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import styled from "styled-components";

const Settings = () => {
  const user = useSelector((state) => state?.user);
  const [image, setImage] = useState(user?.profilePicture || "");
  const [data, setData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_cloudinary_preset");

    // const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
    //   method: "POST",
    //   body: formData,
    // });

    const res = await res.json();
    setImage(res.secure_url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...data, image });
  };

  return (
    <Container>


      <MainContent>
        <div>
          <ProfileImage src={image} alt="Profile" />

          <label className="cursor-pointer">
            <FiEdit className="text-xl" />
            <input type="file" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>

        <div className="space-y-2">
          <label>First Name</label>
          <Input type="text" name="firstName" value={data.firstName} onChange={handleChange} disabled />

          <label>Last Name</label>
          <Input type="text" name="lastName" value={data.lastName} onChange={handleChange} disabled />

          <label>Email</label>
          <Input type="email" name="email" value={data.email} onChange={handleChange} disabled />

          <label>Phone Number</label>
          <Input type="text" name="phoneNumber" value={data.phoneNumber} onChange={handleChange} />

          <label>Address</label>
          <Input type="text" name="address" value={data.address} onChange={handleChange} />

          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </MainContent>
    </Container>
  );
};

export default Settings;

const Container = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;

`;


const MainContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid red;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0; /* Light gray background */
  color: #888; /* Gray text color */
  cursor: not-allowed; /* Show disabled cursor */

  &:disabled {
    background-color: #e0e0e0; /* Even lighter gray */
    color: #aaa; /* More faded text */
    border: 1px solid #ddd;
  }
`;


const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #045104;
  }
`;
