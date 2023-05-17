import React from "react";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Title,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
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
        scales: {
            y: {
                display: true,
                title: {
                    display: true,
                    beginAtZero: true,
                    text: "Users",
                },
            },
        },
    },
};

function UserChart(props) {
    const labels = props.userdatachart.date;
    const data = {
        labels,
        datasets: [
            {
                label: "Value",
                data: props.userdatachart.total,
                barPercentage: 0.1,
                backgroundColor: "#66BB6A",
                borderRadius: 5,
                borderCapStyle: "",
                borderDashOffset: 0.0,
            },
        ],
    };
    return <Bar options={options} data={data} {...props} />;
}

export default UserChart;
