import React, { useEffect, useState } from "react";
import { reduxData } from "../Redux/Action";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from "chart.js";
import { Bar,  } from "react-chartjs-2";
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
      text: "Chart bar___ number of queries per category",
    },
  },
};

const Barchat = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Reducerjson.listdata);
  console.log(data);

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
    const totalqueries = [];
    await fetch("http://localhost:3000/data")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(reduxData(data));
        dataSet1.push(data.category_distribution?.small_talk);
        dataSet2.push(data.category_distribution?.technical_support);
        dataSet3.push(data.category_distribution?.sales_inquiries);
        dataSet4.push(data.category_distribution?.customer_service);
        totalqueries.push(data.insight_summary?.total_queries);
      });
    setValue({
      labels: [
        "small_talk",
        "technical_support",
        "sales_inquiries",
        "customer_service"
      ],
      datasets: [
        {
          label: "total_queries",
          data: [totalqueries,totalqueries,totalqueries,totalqueries],
          borderColor: "rgb(259, 80, 123)",
          backgroundColor: "blue",
        },
        {
          label: "category_distribution",
          data: [dataSet1, dataSet2, dataSet3, dataSet4],
          borderColor: "rgb(259, 80, 123)",
          backgroundColor: "aqua",
        },
        ],
    });
  };

  useEffect(() => {
    getValue();
  }, []);

  return (
    <div style={{ width: "50%", height: "100%" }}>
      <Bar data={value} options={options} />
    </div>
  );
};

export default Barchat;