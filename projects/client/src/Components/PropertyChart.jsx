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

function PropertyChart(props) {
    const labels = props.propertydatachart.date;
    const data = {
        labels,
        datasets: [
            {
                label: "Value",
                data: props.propertydatachart.total,
                barPercentage: 0.3,
                backgroundColor: "#66BB6A",
                borderRadius: 5,
                borderCapStyle: "",
                borderDashOffset: 0.0,
            },
        ],
    };
    return (
        <>
            <Bar options={options} data={data} {...props} />
        </>
    );
}

export default PropertyChart;
