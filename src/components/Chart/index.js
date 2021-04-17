import React from 'react';
import { Wrapper } from './Chart.styled';
import { Line } from 'react-chartjs-2';

import formatNumberWithCommas from '../../utils/formatNumberWithCommas';

export default ({ data, chartLabel }) => {

    const theme = localStorage.getItem('theme');
    const primaryColor = theme === 'light-theme' ? '#3F51B5' : '#9857E7';
    const onSurface = theme === 'light-theme' ? '#000000' : '#FFFFFF';
    const separator = theme === 'light-theme' ? '#B4B4B440' : '#72767D40';

    const options = {
        elements: {
            line: {
                tension: 0
            }
        },
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: onSurface
                },
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                ticks: {
                    callback: (value) => formatNumberWithCommas(value),
                    fontColor: onSurface,
                },
                gridLines: {
                    color: separator
                }
            }]
        },
        tooltips: {
            callbacks: {
                title: (tooltipItem) => {
                    return `Day ${tooltipItem[0].xLabel}`
                },
                label: (tooltipItem) => {
                    return `${chartLabel}: ${formatNumberWithCommas(tooltipItem.yLabel)} TC`
                }
            },
            displayColors: false
        }
    }

    const dataObj = {
        labels: data.lastMonth.map((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() - index);
            return `${date.getDate()}/${date.getMonth() + 1}`;
        }).reverse(),
        datasets: [{
            label: chartLabel,
            data: data.lastMonth,
            fill: false,
            backgroundColor: primaryColor,
            borderColor: primaryColor,
        }]
    }

    return (
        <Wrapper>
            <Line data={dataObj} options={options} />
        </Wrapper>
    )
}