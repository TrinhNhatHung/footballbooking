import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import "../PitchReq/pitchrequest.css";
import axiosClientPost from "../../api/axiosClientPost";
import { useNavigate } from "react-router-dom";
import '../PitchReq/pitchrequest.css';

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
`;

const PitchRequest = () => {
  const navigate = useNavigate();
  const [listRequest, setListRequest] = useState([]);
  const requestList = async () => {
    var data = new FormData();
    var config = {
      url: "/bookingservice/getRequestBookingList",
      method: "GET",
      data,
      headers: {
        Authorization: localStorage.getItem("token"),
        ...data.getHeaders,
      },
    };

    axiosClientPost(config)
      .then((response) => {
        setListRequest(response.data.reverse());
      })
      .catch(() => {
        navigate("/login");
      });
  };
  useEffect(() => {
    requestList();
  }, []);
  const acceptRequest = (bookingId) => {
    var data = new FormData();
    data.append("bookingId", bookingId);
    var config = {
      url: "/bookingservice/acceptBookingRequest",
      method: "POST",
      data,
      headers: {
        Authorization: localStorage.getItem("token"),
        ...data.getHeaders,
      },
    };

    axiosClientPost(config)
      .then(() => {
        requestList();
      })
      .catch(() => {
      });
  }

  const denyRequest = (bookingId) => {
    var data = new FormData();
    data.append("bookingId", bookingId);
    var config = {
      url: "/bookingservice/rejectBookingRequest",
      method: "POST",
      data,
      headers: {
        Authorization: localStorage.getItem("token"),
        ...data.getHeaders,
      },
    };

    axiosClientPost(config)
      .then(() => {
        requestList();
      })
      .catch(() => {
      });
  }
  return (
    <div>
      <Container>
        <Title style={{ marginBottom: "10px", marginTop: "80px" }}>XỬ LÝ ĐẶT SÂN</Title>
        <Wrapper>
          <Menu>
            <a style={{ marginRight: "30px" }}>Yêu cầu đặt sân</a>
            <a>Danh sách sân</a>
          </Menu>
          <Table className="list">
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
            <tbody>
              {listRequest.map((request, index) => {
                return (
                  <tr>
                    <td>{index}</td>
                    <td>{request?.miniPitch?.pitchName}</td>
                    <td>
                      {`Loại sân:${request?.miniPitch?.pitchType}`}  <br /> {`Sân số: ${request.miniPitch.miniPitchName}`}
                    </td>
                    <td>{request?.bookingUser?.fullname}</td>
                    <td>{request?.hourStart} - {request?.hourEnd} ngày {request?.bookingDate}</td>
                    <td>{request?.message}</td>
                    <td>
                      <button onClick={() => acceptRequest(request?.bookingId)} className="btn btn-success mr-30">Chấp nhận</button>
                      <button onClick={() => denyRequest(request?.bookingId)} className="btn btn-danger">Từ chối</button>
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

export default PitchRequest;
