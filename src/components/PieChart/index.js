import React from 'react';
import { Wrapper, Title, ChartWrapper } from './PieChart.styled';
import { Doughnut } from 'react-chartjs-2';

const colorArray = [
    '#8338EC',
    '#FFD166',
    '#118AB2',
    '#06D6A0',
    '#EF476F'
]

export default ({ data, chartLabel }) => {

    const currentTheme = localStorage.getItem('theme') || 'light-theme';
    const isLightTheme = currentTheme === 'light-theme';
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
            backgroundColor: colorArray,
            borderColor: colorArray,
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