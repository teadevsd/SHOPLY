import React, { useState } from "react";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";

const UploadProducts = ({ close }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevD) => ({
      ...prevD,
      [name]: value,
    }));
  };

  return (
    <Container>
      <div className="content">
        <div className="subCateg">
          <h4>Category</h4>
          <button>
            <IoCloseSharp size={24} onClick={close} />
          </button>
        </div>

        <form>
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
                <p>No Image</p>
              </div>
              <button className={`upload-btn ${!data.name ? "disabled" : ""}`} disabled={!data.name}>Upload Image</button>

            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default UploadProducts;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    background-color: white;
    width: 60%;
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

    form {
      display: flex;
      flex-direction: column;

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

          p {
            font-size: 12px;
          }
        }

        .upload-btn {
          padding: 8px 12px;
          background-color: #047624;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .upload-btn.disabled {
          background-color: grey;
          cursor: not-allowed;
        }

      }
    }
  }
`;
