import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UploadProducts from '../components/Categories/UploadProducts';
import { CircularProgress } from '@mui/material';
import Axios from '../utilitis/Axios';
import SummaryAPI from '../common/SummaryAPI';
import NoData from '../components/Categories/NoData';
import EditCategory from '../components/Categories/EditCategory';
import ConfirmBox from '../components/Categories/ConfirmBox';
import toast from 'react-hot-toast';
import AxiosToastError from '../utilitis/AxiosToastError';
import { useSelector } from 'react-redux'; // Import useSelector to get user data

const Category = () => {
  const [openUploadProducts, setOpenUploadProducts] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({ id: "" });
  const [selectedCategory, setSelectedCategory] = useState();
  const [editData, setEditData] = useState({ name: "", image: "" });

  const user = useSelector((state) => state?.user); // Get user data from Redux store
  const isAdmin = user?.role === "Admin"; 

  const fetchCategory = async () => {
    try {
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

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryAPI.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        setOpenDeleteConfirmBox(false);
        fetchCategory();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <Container>
      <section>
        <div className="category">
          <p>Category</p>
          
          {/* Show "Add Category" button only for admin */}
          {isAdmin && (
            <button onClick={() => setOpenUploadProducts(true)}>Add Category</button>
          )}
        </div>

        {openUploadProducts && isAdmin && (
          <UploadProducts
            close={() => setOpenUploadProducts(false)}
            setCategories={setCategories}
            categories={categories}
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
                <div key={category.id || category.name} className="category-item">
                  <img src={category.image} alt={category.name} />

                  {/* Show Edit and Delete buttons only for admin */}
                  {isAdmin && (
                    <div className='btns'>
                      <button onClick={() => {
                        setSelectedCategory(category);
                        setOpenEdit(true);
                        setEditData(category);
                      }}>
                        Edit
                      </button>

                      <button onClick={() => {
                        setOpenDeleteConfirmBox(true);
                        setDeleteCategory(category);
                      }}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <NoData />
            )}
          </div>
        )}

        {openEdit && selectedCategory && isAdmin && (
          <EditCategory
            data={editData}
            close={() => setOpenEdit(false)}
            setCategories={setCategories}
            categories={categories}
            fetchCategory={fetchCategory}
          />
        )}

        {openDeleteConfirmBox && isAdmin && (
          <ConfirmBox
            close={() => setOpenDeleteConfirmBox(false)}
            cancel={() => setOpenDeleteConfirmBox(false)}
            confirm={handleDeleteCategory}
          />
        )}
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
    border-radius: 10px;

    button {
      width: 140px;
      height: 36px;
      background-color: orange;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s ease;

      &:hover {
        background-color: darkorange;
      }
    }
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }

  .category-list {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 20px;
  }

  .category-item {
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
    border-radius: 12px;
    text-align: center;
    padding: 15px;
    transition: 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    &:hover {
      transform: translateY(-3px);
      box-shadow: rgba(0, 0, 0, 0.15) 0px 6px 12px;
    }

    img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: 8px;
    }

    .btns {
      display: flex;
      justify-content: center;
      gap: 10px;
      width: 100%;
    }

    .btns button {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: 0.3s ease;
    }

    .btns button:nth-child(1) {
      background-color: transparent;
      border: 1px solid green;
      color: green;
      font-weight: bold;
    }

    .btns button:nth-child(1):hover {
      background-color: green;
      color: white;
    }

    .btns button:nth-child(2) {
      background-color: orangered;
      color: white;
      font-weight: bold;
    }

    .btns button:nth-child(2):hover {
      background-color: darkorange;
    }
  }
`;
