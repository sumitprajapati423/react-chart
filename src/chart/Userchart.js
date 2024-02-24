import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
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
      position: "right",
    },
    title: {
      display: true,
      text: "Pie Chart _____ satisfaction by country",
    },
  },
};

const Userchart = () => {
  const dispatch = useDispatch();

  const data2 = useSelector((state) => state.Reducerjson.listdata);

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
    const dataSet3 = [];
    const dataSet4 = [];
    const dataSet5 = [];
    await fetch("http://localhost:3000/data")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(reduxData(data));
        dataSet1.push(data.usage_statistics?.by_country.USA);
        dataSet2.push(data.usage_statistics?.by_country.India);
        dataSet3.push(data.usage_statistics?.by_country.Germany);
        dataSet4.push(data.usage_statistics?.by_country.Japan);
        dataSet5.push(data.usage_statistics?.by_country.Brazil);
      });
    setValue({
      labels: ["USA", "India", "Germany", "Japan", "Brazil"],
      datasets: [
        {
          label: "country",
          data: [dataSet1, dataSet2, dataSet3, dataSet4, dataSet5],
          borderColor: "rgb(290, 80, 136)",
          backgroundColor: ["pink", "green", "yellow", "lightblue", "red"],
        },
      ],
    });
  };

  useEffect(() => {
    getValue();
  }, []);

  return (
    <div style={{ width: "30%", height: "30%" }}>
      <Pie data={value} options={options} />
    </div>
  );
};

export default Userchart;