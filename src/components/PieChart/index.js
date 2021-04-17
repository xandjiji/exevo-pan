import React from 'react';
import { Wrapper, Title, ChartWrapper } from './PieChart.styled';
import { Doughnut } from 'react-chartjs-2';

export default ({ data, chartLabel }) => {

    const isLightTheme = localStorage.getItem('theme') === 'light-theme';
    const onSurface = isLightTheme ? '#000000' : '#FFFFFF';

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 400,
            easing: 'easeOutCubic'
        },
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontColor: onSurface,
                boxWidth: 12
            }
        },
        tooltips: {
            displayColors: false,
            callbacks: {
                label: (tooltipItem, data) => {
                    const index = tooltipItem.index;
                    return `${data.labels[index]}: ${data.datasets[0].data[index]}%`
                }
            },
        }
    }

    const dataObj = {
        labels: Object.keys(data).map(capitalizeFirstLetter),
        datasets: [{
            label: chartLabel,
            data: Object.keys(data).map(item => Number(data[item])),
            fill: false,
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 0
        }]
    }

    return (
        <Wrapper>
            <Title>Vocation distribution</Title>
            <ChartWrapper>
                <Doughnut data={dataObj} options={options} />
            </ChartWrapper>
        </Wrapper>
    )
}

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);