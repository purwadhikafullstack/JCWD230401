import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    animation: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        x: {
            display: true,
            title: {
                display: true,
                text: "Date",
            },
        },
        y: {
            display: true,
            title: {
                display: true,
                text: "Value",
            },
        },
    },
};

function MyChart(props) {
    const labels = props.datachart.date;
    const data = {
        labels,
        datasets: [
            {
                label: "Value",
                data: props.datachart.total, // income per date here
                lineTension: 0.4,
                backgroundColor: "#000000",
                borderColor: "#2196F3",
                borderCapStyle: "",
                borderDashOffset: 0.0,
                borderWidth: 10,
                borderJoinStyle: "#B57295",
                pointStyle: "circle",
                pointBorderColor: "#D3212D",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 8,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#D3212D",
                pointHoverBorderColor: "#D3212D",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
            },
        ],
    };
    return <Line options={options} data={data} {...props} />;
}

export default MyChart;
