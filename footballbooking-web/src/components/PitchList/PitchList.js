import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import "../PitchReq/pitchrequest.css";
import axiosClientPost from "../../api/axiosClientPost";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: auto;
  background: linear-gradient(
      rgba(255, 255, 255, -0.4),
      rgba(255, 255, 255, -0.4)
    ),
    url("https://images5.alphacoders.com/571/thumb-1920-571559.jpg") center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom:20px;
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
  justify-content: space-between;
`;

const Action = styled.div`
  display: flex;
  flex-direction: column;
`;

const PitchList = () => {
  const navigate = useNavigate();
  const [pitchList, setPitchList] = useState([]);
  const getPitchList = async () => {
    var data = new FormData();
    var config = {
      url: "/pitchservice/getMyPitch",
      method: "GET",
      data,
      headers: {
        Authorization: localStorage.getItem("token"),
        ...data.getHeaders,
      },
    };

    axiosClientPost(config)
      .then((response) => {
        setPitchList(response.data);
      })
      .catch(() => {
        navigate("/login");
      });
  };
  useEffect(() => {
    getPitchList();
  }, []);

  const createNewPitch = () => {
    navigate("/pitchowner/createNewPitch");
  }

  const addMiniPitch = (pitchId) => {
    navigate(`/pitchowner/addMiniPitch/${pitchId}`);
  }

  const deletePitch = (pitchId)=> {
    var data = new FormData();
    var config = {
      url: `/pitchservice/deletePitch/${pitchId}`,
      method: "POST",
      data,
      headers: {
        Authorization: localStorage.getItem("token"),
        ...data.getHeaders,
      },
    };

    axiosClientPost(config)
      .then(() => {
        getPitchList();
      })
      .catch(() => {
      });
  }
  return (
    <div>
      <Container>
        <Title style={{ marginBottom: "10px", marginTop: "65px" }}>DANH SÁCH SÂN BÓNG</Title>
        <Wrapper>
          <Menu>
            <div>
              <a style={{ marginRight: "30px" }}>Yêu cầu đặt sân</a>
              <a>Danh sách sân</a>
            </div>
            <button onClick={createNewPitch} className="btn btn-success">Tạo sân mới</button>
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
            <tbody>
              {pitchList.map((pitch, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>Bóng đá</td>
                    <td>
                      {pitch.name} <br />
                      {`${pitch.address.number} ${pitch.address.street}, ${pitch.address.commune}, ${pitch.address.district}, ${pitch.address.city}`}
                    </td>
                    <td>
                      <img style={{ width: 120, height: 120 }} src={pitch.coverAvatarLink}></img>
                    </td>
                    <td>
                      <Action>
                        <button style={{marginBottom :5}} className="btn btn-success" onClick={()=> addMiniPitch(pitch.pitchId)}>Thêm sân thành phần</button>
                        <button style={{marginBottom :5}} className="btn btn-danger" onClick={()=> deletePitch(pitch.pitchId)}>Xóa</button>
                      </Action>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Wrapper>
      </Container>
    </div>
  );
};

export default PitchList;
