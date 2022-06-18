import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClientPost from "../../api/axiosClientPost";
import "../FormAddNewMiniPitch/formAddNewMiniPitch.css";
function FormAddNewMiniPitch() {
  const navigate = useNavigate();
  const [pitchType, setPitchType] = useState([]);
  const {pitchId} = useParams();
  const getPitchTypes = async () => {
    var data = new FormData();
    var config = {
      url: "/pitchservice/pitchTypes",
      method: "GET",
      data,
      headers: {
        Authorization: localStorage.getItem("token"),
        ...data.getHeaders,
      },
    };

    axiosClientPost(config)
      .then((response) => {
        setPitchType(response.data);
      })
      .catch(() => {
      });
  };
  useEffect(()=> {
    getPitchTypes();
  }, []);
  const [pitchInfo, setPitchInfo] = useState({
    pitchId: pitchId,
    pitchType : 1,
    quantity : 1
  });
  const [timeSlot, setTimeSlot] = useState([]);
  const dayOfWeek = [
    {
      value : 1,
      dow: "Thứ 2"
    },
    {
      value : 2,
      dow: "Thứ 3"
    },
    {
      value : 3,
      dow: "Thứ 4"
    },
    {
      
      value : 4,
      dow: "Thứ 5"
    },
    {
      value : 5,
      dow: "Thứ 6"
    },
    {
      value : 6,
      dow: "Thứ 7"
    },
    {
      value : 7,
      dow: "Chủ nhật"
    },
  ]
  const addRowTimeSlot = ()=> {
      let newTimeSlot = timeSlot.concat({
        startDOW : 1,
        endDOW: 7,
        startHour: "05:00:00",
        endHour: "21:00:00",
        cost: null
      });
      setTimeSlot(newTimeSlot);
  }

  const removeTimeSlot = (timeSlotId) => {
    let newTimeSlot = [];
    for (let i= 0; i < timeSlotId; i++){
      newTimeSlot.push(timeSlot[i])
    }
    for (let i= timeSlotId + 1; i < timeSlot.length; i++){
      newTimeSlot.push(timeSlot[i])
    }
    setTimeSlot(newTimeSlot);
  }

  const changeTimeSlot = (event, id)=> {
    let name = event.target.name;
    let value = event.target.value;
    let object = timeSlot[id];
    let slot = {
      ...object,
      [name] : value
    };    
    let newTimeSlot = timeSlot.slice(0,id);
    newTimeSlot = newTimeSlot.concat(slot);
    if ((id +1) < timeSlot.length){
      newTimeSlot = newTimeSlot.concat(timeSlot.slice(id+1));
    }
    setTimeSlot(newTimeSlot);
  }

  const changePitchInfo = (event)=> {
    setPitchInfo({
      ...pitchInfo,
      [event.target.name] : event.target.value
    })
  }
  const createNewMiniPitch = ()=> {
    var data = new FormData();
    data.append("pitchId", pitchInfo.pitchId);
    data.append("pitchTypeId", pitchInfo.pitchType);
    data.append("quantity", pitchInfo.quantity);
    timeSlot.forEach((slot)=> {
      data.append("startDOW", slot.startDOW);
      data.append("endDOW", slot.endDOW);
      data.append("startHour", slot.startHour);
      data.append("endHour", slot.endHour);
      data.append("cost", slot.cost);
    });
    var config = {
      url: "/pitchservice/addNewMiniPitch",
      method: "POST",
      data,
      headers: {
        Authorization: localStorage.getItem("token"),
        ...data.getHeaders,
      },
    };

    axiosClientPost(config)
      .then(() => {
        alert("Tạo sân thành công");
        navigate("/pitchowner/pitchList");
      })
      .catch(() => {
      });
  }
  return (
    <div className="formNewMiniPitch container">
      <form>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label for="pitchType">Loại sân</label>
              <select
                type="text"
                className="form-control"
                id="pitchType"
                name="pitchType"
                value={pitchInfo.pitchType}
                onChange={changePitchInfo}
              >
                {
                  pitchType.map((e, index)=> {
                    return <option key={index} value={e.pitchTypeId}>{e.name}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label for="quantity">Số lượng sân</label>
              <input
                type="number"
                min={0}
                className="form-control"
                id="quantity"
                name="quantity"
                placeholder="Số lượng sân..."
                value={pitchInfo.quantity}
                onChange={changePitchInfo}
              />
            </div>
          </div>
        </div>
        <div className="row add-time-slot" onClick={addRowTimeSlot}>
            <span className="glyphicon glyphicon-plus" />
            <p>Thêm khung giờ</p>
        </div>
        {
          timeSlot.map((e, index)=> {
            return <div key={index} className="row timeSlot">
              <div className="col">
                <label for="startDOW">Từ ngày</label>
                <select
                  id="startDOW"
                  className="form-control"
                  name="startDOW"
                  onChange={(event)=> changeTimeSlot(event, index)}
                  value={e.startDOW}
                >
                  {
                    dayOfWeek.map((element, index)=> {
                      return <option key={index} value={element.value}>
                        {element.dow}
                      </option>
                    })
                  }
                </select>
              </div>
              <div className="col">
                <label for="endDOW">Đến ngày</label>
                <select
                  id="endDOW"
                  className="form-control"
                  name="endDOW"
                  onChange={(event)=> changeTimeSlot(event, index)}
                  value={e.endDOW}
                >
                  {
                    dayOfWeek.map((element, index)=> {
                      return <option key={index} value={element.value}>
                        {element.dow}
                      </option>
                    })
                  }
                </select>
              </div>
              <div className="col">
                <label for="startHour">Giờ bắt đầu</label>
                <input
                    id="startHour"
                    type="time"
                    className="form-control"
                    name="startHour"
                    onChange={(event)=> changeTimeSlot(event, index)}
                    value={e.startHour}
                />
              </div>
              <div className="col">
                <label for="endHour">Giờ kết thúc</label>
                <input
                  id="endHour"
                  type="time"
                  className="form-control"
                  name="endHour"
                  onChange={(event)=> changeTimeSlot(event, index)}
                  value={e.endHour}
                />
              </div>
              <div className="col">
                <label for="cost">Giá sân</label>
                <input
                  id="cost"
                  type="number"
                  className="form-control"
                  name="cost"
                  onChange={(event)=> changeTimeSlot(event, index)}
                  value={e.cost}
                />
              </div>
              <span onClick={()=> removeTimeSlot(index)} className="glyphicon glyphicon-remove btn-remove-time-slot" />
            </div>
          })
        }
        <div>
          <button type="button" className="btn btn-success" onClick={createNewMiniPitch}>
            Tạo
          </button>
          <button type="reset" className="btn btn-primary">
            Reset
          </button>
          <button type="button" className="btn btn-danger">
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormAddNewMiniPitch;
