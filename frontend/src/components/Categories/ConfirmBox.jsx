import React from 'react'
import styled from 'styled-components'
import { IoCloseSharp } from "react-icons/io5";

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <Wrapper>
        <div className="container">
            <div className="subCateg">
                <h4>Permanent Delete</h4>
                <button>
                    <IoCloseSharp size={24} onClick={close} />
                </button>
            </div>
            <p>Are you sure you want to delete this category?</p>
            <div className="btns">
                <button onClick={cancel}>Cancel</button>
                <button onClick={confirm}>Delete</button>
            </div>
        </div>
    </Wrapper>
  )
}

export default ConfirmBox

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
    width: 30%;
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

    p {
      margin: 20px 0;
      /* text-align: center; */
      font-size: 14px;
      
    }

    .btns {
      display: flex;
      justify-content: flex-end;
      gap: 20px;

      button {
        padding: 8px 16px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        font-size: 14px;
      }

      button:nth-child(1) {
        background-color: transparent;
        border: 1px solid green;
        color: black;
        transition: all 0.3s ease;

        &:hover {
            background-color: green;
            color: white;
        }
      }

      button:nth-child(2) {
        background-color: transparent;
        border: 1px solid red;
        color: black;
        transition: all 0.3s ease;
        
        &:hover {
            background-color: red;
            color: white;
        }
    }
 

  }
}

`