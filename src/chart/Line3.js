import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { reduxData } from "../Redux/Action";


const options = {
  indexAxis: "x",

  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Chart bar___ week basis",
    },
  },
};

const Line3= () => {
  const dispatch = useDispatch();

  const data1 = useSelector((state) => state.Reducerjson.listdata);

  const [value, setValue] = useState({
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(25, 90, 13, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  const getValue = async () => {
    const dataSet1 = [];
    const dataSet2 = [];
    await fetch("http://localhost:3000/data")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(reduxData(data));
        for (const entry of data.response_times.week_wise) {
          dataSet1.push(entry.week);
          console.log(entry.week);
        }
        console.log(dataSet1);
        for (const entry of data.response_times.week_wise) {
          dataSet2.push(entry.average_time);
          console.log(entry.average_time);
        }
        console.log(dataSet2);
      });
    setValue({
      labels: dataSet1,
      datasets: [
        {
          label: "average_time",
          data: dataSet2,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "red",
        },
      ],
    });
  };

  useEffect(() => {
    getValue();
  }, []);

  return (
    <div style={{ width: "50%", height: "50%" }}>
      <Line data={value} options={options} />
    </div>
  );
};

export default Line3;