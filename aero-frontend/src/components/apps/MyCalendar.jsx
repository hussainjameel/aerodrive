import { useState } from "react";
import Calendar from "react-calendar";
import "./MyCalendar.css";
import moment from "moment";

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const mountainImage = "/img/ui/mountain-snow.jpg";
  const currentDate = moment(date).format("DD");
  const currentMonth = moment(date).format("MMMM");
  return (
    <div className="control-section w-100 h-100">
      <div className="container">
        <div className="row">
          <div className="col-sm-0 col-md-3 p-0 image-container">
            <div
              className="image-overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
              }}
            ></div>
            <img
              className="imgg"
              style={{ height: "550px", width: "100%", objectFit: "cover" }}
              src={mountainImage}
              alt="Mountain"
            />
            <div
              style={{
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "80px",
                color: "#fff",
              }}
            >
              {currentDate}
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "50px",
                color: "#fff",
              }}
            >
              {currentMonth}
            </div>
          </div>
          <div className="col-sm-12 col-md-9 p-0 calendar-container">
            <Calendar onChange={setDate} value={date} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;
