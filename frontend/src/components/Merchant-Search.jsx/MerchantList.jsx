import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { BiQrScan } from "react-icons/bi";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { Link } from "react-router-dom";

const MerchantList = () => {
  return (
    <Wrapper>
      <Innerwrapper>
        <h2>Choose Merchants</h2>

        <Merchlist>
        <p>Merchant Lists <Link>View All</Link></p>

       <Table>

        <table>
           <tr>
            <th>NO</th>
            <th>DATE</th>
            <th>BUSINESS NAME</th>
            <th>LOCATION</th>
            
           </tr>
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
  /* min-height: calc(100vh - 100px); */
  background: #edf2ee;
  padding: 100px 0;
`;

const Innerwrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  max-width: 1280px;
  text-align: center;

  h2 {
    margin: 70px 0;
  }
`;

const Merchlist = styled.div``


const Table = styled.div``