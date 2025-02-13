import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UploadProducts from '../components/Categories/UploadProducts';
import { CircularProgress } from '@mui/material';
import Axios from '../utilitis/Axios';
import SummaryAPI from '../common/SummaryAPI';
import NoData from '../components/Categories/NoData';
import EditCategory from '../components/Categories/EditCategory';

const Category = () => {
  const [openUploadProducts, setOpenUploadProducts] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios(SummaryAPI.getAllCategory);
      const { data: responseData } = response;

      if (responseData.success) {
        setCategories(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Container>
      <section>
        <div className="category">
          <p>Category</p>
          <button onClick={() => setOpenUploadProducts(true)}>Add Category</button>
        </div>

        {openUploadProducts && (
          <UploadProducts
            close={() => setOpenUploadProducts(false)}
            setCategories={setCategories} // ✅ Pass setCategories
            categories={categories} // ✅ Pass categories for updating
          />
        )}

        {loading ? (
          <div className="loader">
            <CircularProgress size={50} thickness={3} style={{ color: "orange" }} />
          </div>
        ) : (
          <div className="category-list">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.id} className="category-item">
                  <img src={category.image} alt={category.name} />
                  {/* <p>{category.name}</p> */}

                  <div className='btns'>
                    <button onClick={() => {
                      setOpenEdit(true)
                    }}>Edit</button>

                    <button>Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <NoData />
            )}
          </div>
        )}

        {
          openEdit && (
            <EditCategory 
            close={() => {setOpenEdit(false)}}
            />
          )
        }

      </section>
    </Container>
  );
};


export default Category;

const Container = styled.div`
  .category {
    background-color: #ffffff;
    padding: 1rem;
    box-shadow: rgba(207, 207, 207, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    display: flex;
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

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px; /* Ensures it takes up enough space */
  }

  .category-list {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Responsive */
    gap: 15px;
}


.category-item {
  width: 150px;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  padding: 10px; /* Add padding to give space */

  /* &:hover {
    transform: scale(1.1, 1.05);
    transition: 0.3s ease-in-out;
  } */

  .btns {
    display: flex;
    justify-content: space-around;
    /* margin-top: 10px; */
  }

  
  .btns button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    font-family: 'Poppins';
    cursor: pointer;
    font-size: 14px;
  }

  /* First button (Edit) */
  .btns button:nth-child(1) {
    background-color: transparent;
    border: 1px solid green;
    color: black;
    
  }

  /* Second button (Delete) */
  .btns button:nth-child(2) {
    background-color: orangered;
    color: white;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
  }
}
`
