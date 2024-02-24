import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from "chart.js";
import { reduxData } from "../Redux/Action";
import { Bar, } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);

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
      text: "Bar Graph ",
    },
  },
};

const Linecharttwo = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Reducerjson.listdata);
 

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
        backgroundColor: "rgba(56, 78, 20, 0.5)",
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

    await fetch("http://localhost:3000/data")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(reduxData(data));
        dataSet1.push(data.usage_statistics?.by_platform.iOS);
        dataSet2.push(data.usage_statistics?.by_platform.Android);
        dataSet3.push(data.usage_statistics?.by_platform.Web);
      });
    setValue({
      labels: ["ios", "Android", "Web"],
      datasets: [
        {
          label: ["Platform"],
          data: [dataSet1, dataSet2, dataSet3],
          borderColor: "rgb(145, 80, 178)",
          backgroundColor: "pink",
        },
      ],
    });
    // console.log('arrdata',dataSet1,dataSet2);
  };

  useEffect(() => {
    getValue();
  }, []);

  return (
    <div style={{ width: "50%", height: "50%" }}>
      <Bar data={value} options={options} />
    </div>
  );
};

export default Linecharttwo;