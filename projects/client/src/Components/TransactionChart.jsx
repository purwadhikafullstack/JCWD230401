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
        scales: {
            xAxis: {
                display: true,
                title: {
                    display: true,
                    text: "Date",
                },
            },
            yAxs: {
                display: true,
                title: {
                    display: true,
                    text: "Value",
                },
            },
        },
    },
};

function TransactionChart(props) {
    const labels = props.transactiondatachart.date;
    const data = {
        labels,
        datasets: [
            {
                label: "Value",
                data: props.transactiondatachart.total, // income per date here
                lineTension: 0.55,
                backgroundColor: "#000000",
                borderColor: "#66BB6A",
                borderCapStyle: "",
                borderDashOffset: 0.0,
                borderWidth: 5,
                borderJoinStyle: "#B57295",
                color: "#000000",
                pointStyle: "circle",
                pointBorderColor: "#D3212D",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 5,
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

export default TransactionChart;
