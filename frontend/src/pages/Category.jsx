import React, { useState } from 'react'
import styled from 'styled-components'
import UploadProducts from '../components/Categories/UploadProducts'

const Category = () => {
  const [openUploadProducts, setOpenUploadProducts] = useState(false)
  return (
    <Container>
      <section>
      <div className="category">
        <p>Category</p>
        <button onClick={() => setOpenUploadProducts(true)}>Add Category</button>
      </div>

    {
      openUploadProducts && <UploadProducts close={() => {setOpenUploadProducts(false)}}/>
    }
    </section>
    </Container>
  )
}

export default Category

const Container = styled.div`
  
  .category {
    background-color: #ffffff;
    padding: 1rem;
    box-shadow: rgba(207, 207, 207, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    display:  flex;
    align-items: center;
    justify-content: space-between;

    button {
      width: 120px;
      height: 30px;
      background-color: transparent;
      color: black;
      border: 1px solid orange;
      border-radius: 4px;
      cursor: pointer;
      display: block;

      &:hover {
        background-color: orange;
        color: white;
        border: none;
        transition: background-color 0.3s ease;
      }
    }
  }
`