import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";  // Import Axios
import { Link } from "react-router-dom";

const MerchantList = () => {
  const [merchants, setMerchants] = useState([]);  // State to store merchants data
  const [loading, setLoading] = useState(true);    // State to track loading status
  const [error, setError] = useState(null);        // State to track errors

  // Fetch merchants data from the API on component mount
  useEffect(() => {
    axios
      .get("YOUR_API_URL_HERE")  // Replace with your API URL
      .then((response) => {
        // Check if the response contains an array of merchants
        if (Array.isArray(response.data)) {
          setMerchants(response.data);  // Set the fetched data to the state
        } else {
          setError("API response is not an array");  // Handle case where data is not an array
        }
        setLoading(false);  // Set loading to false once the data is fetched
      })
      .catch((err) => {
        setError("Failed to fetch merchants data");  // Handle errors
        setLoading(false);  // Set loading to false on error
      });
  }, []);

  return (
    <Wrapper>
      <Innerwrapper>
        <h2>Choose Merchants</h2>

        <Merchlist>
          <p>
            Merchant Lists <Link>View All</Link>
          </p>

          {/* Show loading message if data is still being fetched */}
          {loading && <p>Loading...</p>}

          {/* Show error message if there's an error fetching the data */}
          {error && <p>{error}</p>}

          <Table>
            <table>
              <thead>
                <tr>
                  <th>NO</th>
                  <th>DATE</th>
                  <th>BUSINESS NAME</th>
                  <th>LOCATION</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {/* Only map over merchants if merchants is an array */}
                {Array.isArray(merchants) && merchants.length > 0 ? (
                  merchants.map((merchant, index) => (
                    <tr key={merchant.id}> {/* Assuming the merchant object has a unique `id` */}
                      <td>{index + 1}</td> {/* Serial number (index + 1) */}
                      <td>{new Date(merchant.transactionDate).toLocaleDateString()}</td> {/* Transaction date */}
                      <td>{merchant.businessName}</td> {/* Business Name */}
                      <td>{merchant.location}</td> {/* Location */}
                      <td>
                        <Link>
                          <strong>View Merchant</strong>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No merchants found</td> {/* Display message if no data */}
                  </tr>
                )}
              </tbody>
            </table>
          </Table>
        </Merchlist>
      </Innerwrapper>
    </Wrapper>
  );
};

export default MerchantList;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #edf2ee;
  padding: 100px 0;
`;

const Innerwrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  max-width: 1280px;
  text-align: center;

  h2 {
    margin: 70px 0;
  }
`;

const Merchlist = styled.div`
  p {
    display: flex;
    justify-content: space-between;
  }
`;

const Table = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 10px;
      text-align: left;
      font-size: 14px;
    }

    thead {
      background-color: #fff;
    }

    tbody tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    td a {
      text-decoration: none;
      color: green;
    }
  }
`;
