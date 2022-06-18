import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClientPost from "../../api/axiosClientPost";
import "../FormNewPitch/formNewPitch.css";

const FormNewPitch = () => {
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const onChangeInput = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  const createNewPitch = () => {
    var data = new FormData();
    data.append("name", info.name);
    data.append("description", info.description);
    data.append("city", info.city);
    data.append("commune", info.commune);
    data.append("district", info.district);
    data.append("street", info.street);

    var config = {
      url: "/pitchservice/addNewPitch",
      method: "POST",
      data,
      headers: {
        Authorization: localStorage.getItem("token"),
        ...data.getHeaders,
      },
    };

    axiosClientPost(config)
      .then(() => {
        navigate("/pitchowner/pitchList");
      })
      .catch(() => {
      });
  };

  const navigateToMyPitchPage = ()=> {
    navigate("/pitchowner/pitchList");
  }

  return (
    <div className="formNewPitch container">
      <form>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label for="name">Tên sân</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Tên sân..."
                value={info.name}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label for="description">Mô tả</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Mô tả..."
                value={info.description}
                onChange={onChangeInput}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label for="city">Thành phố</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="City..."
                value={info.city}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label for="district">Quận</label>
              <input
                type="text"
                className="form-control"
                id="district"
                name="district"
                placeholder="District..."
                value={info.district}
                onChange={onChangeInput}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label for="commune">Phường</label>
              <input
                type="text"
                className="form-control"
                id="commune"
                name="commune"
                placeholder="Commune..."
                value={info.commune}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label for="street">Đường</label>
              <input
                type="text"
                className="form-control"
                id="street"
                name="street"
                placeholder="Street..."
                value={info.street}
                onChange={onChangeInput}
              />
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-success"
            onClick={createNewPitch}
          >
            Tạo
          </button>
          <button type="reset" className="btn btn-primary">
            Reset
          </button>
          <button type="button" className="btn btn-danger" onClick={navigateToMyPitchPage}>
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormNewPitch;
