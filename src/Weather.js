import { useState, useEffect } from "react";
//import "../node_modules/bootstrap/dist/css/bootstrap";
import "./Weather.css";
let city = "Bhopal";
let arr = [];
export default function Weather() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [unit, setunit] = useState("metric");
  const [endPoint, setEndPoint] = useState(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      " %20&appid=b397b78002a73f76df5d203343188aff&units=metric"
  );
  //console.log(endPoint);
  const [input, setInput] = useState("Enter City...");

  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(endPoint)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((actualData) => {
        console.log(actualData);
        arr = [];

        arr.push(actualData.name);
        arr.push(actualData.main.temp);
        arr.push(actualData.main.temp_min);
        arr.push(actualData.main.temp_max);
        arr.push(actualData.main.feels_like);
        arr.push(actualData.main.pressure);
        arr.push(actualData.main.humidity);
        arr.push(actualData.wind.speed);
        arr.push(actualData.weather[0].icon);
        setData(arr);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setData([]);
        //console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    return function cleanup() {
      setLoading(true);
    };
  }, [endPoint]);
  function handleChange(event) {
    //console.log(event.target.value);
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    city = input;
    let endpoint =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "%20&appid=b397b78002a73f76df5d203343188aff&units=metric";
    setEndPoint(endpoint);
    //console.log(endPoint);

    //console.log("Dee" + city);
    setInput("Enter City...");
  }

  const [name, temp, min, max, feels, press, humid, ws, icn] = data;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-5 ">
            <input type="text" value={input} onChange={handleChange} />

            {loading && <div>Loading . Please wait...</div>}
            {error && <div>{`There is a problem in loading :${error}`}</div>}
          </div>
          <div className="col-2 offset-5">
            <button>&nbsp;&#8451;</button>
          </div>
        </div>
      </form>

      <div className="row " id="one">
        <b>{name}</b>
        <div className="col-2 offset-9">
          <b id="temp">{temp}&nbsp;&#8451;</b>
        </div>
      </div>
      <div className="row two deepak">
        <div className="col-3 margin">
          <i className="fa-sharp fa-solid fa-arrow-down"></i>
          <small>Min</small>
          <br />
          {min} &nbsp;&#8451;
        </div>
        <div className="col-3 offset-1">
          <i className="fa-sharp fa-solid fa-arrow-up"></i>
          <small>Max</small>
          <br />
          {max}&nbsp;&#8451;
        </div>
        <div className="col-3 offset-1">{feels}</div>
      </div>
      <div className="row two deepak">
        <div className="col-3 margin">{press}</div>
        <div className="col-3 offset-1">{humid}</div>
        <div className="col-3 offset-1">{ws}</div>
      </div>
    </>
  );
}
