import React from "react";
import styled from "styled-components";
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
  background-color: #f7f5f2;
`;

const Action = styled.div`
    display: flex;
    flex-direction: column;
`

const Add = styled.button`
    background-color: rgb(54, 131, 64);
  color: white;
  border-radius: 5px;
  padding: 5px;
  border: none;
  `;

const Cancel = styled.button`
background-color: #ff6363;
color: white;
border-radius: 5px;
padding: 5px 15px 5px 15px;
border: none;
`;  

const PitchList = () => {
  return (
    <div>
      <Container>
        <Title style={{ marginBottom: "100px" }}>XỬ LÝ ĐẶT SÂN</Title>
        <Wrapper>
          <Menu>
            <a style={{ marginRight: "30px" }}>Yêu cầu đặt sân</a>
            <a>Danh sách sân</a>
          </Menu>
          <Table className="list">
            <thead>
              <tr>
                <th>#</th>
                <th>Loại</th>
                <th>Thông tin sân</th>
                <th>Ảnh đại diện</th>
                <th>Tác vụ</th>
              </tr>
            </thead>
            <Tbody>
              <tr>
                <td>1</td>
                <td>Bóng đá</td>
                <td>
                  Sân Chuyên Việt <br />
                  Địa chỉ <br /> 09111111 <br />
                  tronaugust@gmail.com
                </td>
                <td>
                  <img></img>
                </td>
                <td>
                  <Action>
                  <Add style={{ marginBottom: "10px" }}>Đặt sân</Add>
                  <Add style={{ marginBottom: "10px" }}>Sửa thông tin</Add>
                    <Cancel>Xoá</Cancel>
                  </Action>
                </td>
              </tr>
            </Tbody>
          </Table>
        </Wrapper>
      </Container>
    </div>
  );
};

export default PitchList;
