import React from "react";
import styled from "styled-components";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import "../PitchReq/pitchrequest.css";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, -0.4),
      rgba(255, 255, 255, -0.4)
    ),
    url("https://images5.alphacoders.com/571/thumb-1920-571559.jpg") center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
`;

const Wrapper = styled.div`
  width: 95%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
`;

const Menu = styled.span`
  font-weight: bold;
  display: flex;
  cursor: pointer;
  padding-bottom: 20px;
`;

const Tbody = styled.tbody`
  background-color: #F7F5F2;
`

const Accept = styled.button`
  background-color: rgb(54,131,64);
  color: white;
  border-radius: 5px;
  padding: 5px;
`

const Deny = styled.button`
  background-color: #FF6363;
  color: white;
  border-radius: 5px;
  padding: 5px 15px 5px 15px;
  /* padding-right: 15px; */
  /* padding-left: 15px; */
`

const PitchRequest = () => {
  return (
    <div>
      <Container>
        <Title style={{ marginBottom: "100px" }}>XỬ LÝ ĐẶT SÂN</Title>
        <Wrapper>
          <Menu >
            <a style={{ marginRight: "30px" }}>Yêu cầu đặt sân</a>
            <a>Danh sách sân</a>
          </Menu>
          <Table className="list" >
            <thead>
              <tr>
                <th>#</th>
                <th>Sân bóng</th>
                <th>Vị trí</th>
                <th>Người đặt</th>
                <th>Thời gian</th>
                <th>Nội dung</th>
                <th>Tác vụ</th>
              </tr>
            </thead>
            <Tbody>
              <tr>
                <td>1</td>
                <td>Sân chuyên việt</td>
                <td>Loại sân: 5 <br/> Sân số: 1</td>
                <td>Trọn bùi</td>
                <td>17:00 - 18:00 ngày 28/04/2022</td>
                <td>xin slot</td>
                <td>
                  <Accept style={{ marginRight: "10px" }}>Chấp nhận</Accept>
                  <Deny>Từ chối</Deny> 
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Sân chuyên việt</td>
                <td>Loại sân: 5 <br/> Sân số: 1</td>
                <td>Trọn bùi</td>
                <td>17:00 - 18:00 ngày 28/04/2022</td>
                <td>xin slot</td>
                <td>
                  <Accept style={{ marginRight: "10px" }}>Chấp nhận</Accept>
                  <Deny>Từ chối</Deny> 
                </td>
              </tr>
            </Tbody>
          </Table>
        </Wrapper>
      </Container>
    </div>
  );
};

export default PitchRequest;
