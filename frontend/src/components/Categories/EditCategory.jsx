import React, { useState } from 'react';
import styled from 'styled-components';
import SummaryAPI from '../../common/SummaryAPI';
import Axios from '../../utilitis/Axios';
import toast from 'react-hot-toast';
import { IoCloseSharp } from "react-icons/io5";
import uploadImage from '../../utilitis/uploadImage';

const EditCategory = ({ close, data: categoryData, fetchCategory }) => {

  const [data, setData] = useState({
    _id: categoryData._id,
    name: categoryData.name,
    image: categoryData.image,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevD) => ({
      ...prevD,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await Axios({
        ...SummaryAPI.updateCategory,
        data: data,
      });
  
      if (response.status === 200 && response.data.success) {
        const updatedCategory = response.data.data;

        // Fetch categories again to ensure updates are reflected
        await fetchCategory();
  
        toast.success(response.data.message);
        setTimeout(() => close(), 300);
      } else {
        toast.error(response.data.message || "Failed to update category");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update category");
    } finally {
      setLoading(false);
    }
  };
  
  const handleUploadImageCloud = async (e) => {
    const file = e.target.files[0];
  
    if (!file) return;
  
    setLoading(true);
  
    try {
      const response = await uploadImage(file);
      const { data: imageResponse } = response;
  
      if (imageResponse?.data?.url) {
        // Update state to trigger re-render
        setData((prevD) => ({
          ...prevD,
          image: imageResponse.data.url,
        }));
  
        // **No Direct Mutation of `categoryData`**
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="subCateg">
          <h4>Edit Category</h4>
          <button>
            <IoCloseSharp size={24} onClick={close} />
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              placeholder="Enter category name"
              onChange={handleChange}
            />
          </div>

          <div className="divImage">
            <p>Image</p>

            <div className="image">
              <div className="imageCont">
                {data.image ? <img src={data.image} alt="category" /> : <p>No Image</p>}
              </div>

              <label htmlFor="uploadCategoryImage">
                {loading ? (
                  "Uploading..."
                ) : (
                  <div className={`upload-btn ${!data.name ? "disabled" : ""}`}>
                    Upload Image
                  </div>
                )}
                <input
                  disabled={!data.name}
                  onChange={handleUploadImageCloud}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button className={`categoryBtn ${!data.image ? "disabled" : ""}`}>
            Update Category
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default EditCategory;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    background-color: white;
    width: 50%;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    .subCateg {
      display: flex;
      align-items: center;
      justify-content: space-between;

      button {
        background: none;
        display: block;
        border: none;
        margin-left: auto;
        cursor: pointer;
        color: red;
      }
    }
  }

  form {
      display: flex;
      flex-direction: column;

      label {
        .hidden {
          display: none;
        }
      }

      .categoryBtn {
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #ffbb00;
        border: none;
        color: #000000;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #eea907;
        }
      }
      .categoryBtn.disabled {
        background-color: #8080805c;
        cursor: not-allowed;
      }

      .image {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px; /* Ensures spacing between imageCont and button */
      }

      div {
        display: flex;
        flex-direction: column;
        gap: 5px;

        input {
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ccc;
          outline: none;

          &:focus {
            border-color: #ffbb00;
          }
        }

        .imageCont {
          border: 1px solid #ccc;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8f8f8;
          overflow: hidden;

          img {
            object-fit: contain;
            width: 100%;
            height: 100%;
          }

          p {
            font-size: 12px;
          }
        }

        .upload-btn {
          padding: 8px 12px;
          background-color: #ffb300;
          font-size: 12px;
          /* border: 1px solid #ffbb00;  */
          color: #000000;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #fcc52e;
          }
        }

        .upload-btn.disabled {
          background-color: #8080805c;
          cursor: not-allowed;
        }

      }
    }

  `;
