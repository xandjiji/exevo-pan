import React, { useState } from 'react';
import { Wrapper, DataItemWrapper, DataItem, Title, TCValue, PercentageValue, ChipWrapper, ChartWrapper } from './Chart.styled';
import { Line } from 'react-chartjs-2';
import Chip from '../Chip';

import { ReactComponent as TrendingIcon } from '../../assets/svgs/trending.svg';

import formatNumberWithCommas from '../../utils/formatNumberWithCommas';

export default ({ data, totalLabel, yesterdayLabel, chartLabel }) => {

    const [dataSize, setDataSize] = useState(7);

    const { current, lastMonth } = data;
    const todayValue = lastMonth[lastMonth.length - 1];
    const yesterdayValue = lastMonth[lastMonth.length - 2];
    const dailyDifference = todayValue - yesterdayValue;

    const isLightTheme = localStorage.getItem('theme') === 'light-theme';
    const primaryColor = isLightTheme ? '#3F51B5' : '#9857E7';
    const onSurface = isLightTheme ? '#000000' : '#FFFFFF';
    const separator = isLightTheme ? '#B4B4B440' : '#72767D40';

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 400,
            easing: 'easeOutCubic'
        },
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
        labels: lastMonth.slice(lastMonth.length - dataSize).map((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() - index);
            return `${date.getDate()}/${date.getMonth() + 1}`;
        }).reverse(),
        datasets: [{
            label: chartLabel,
            data: lastMonth.slice(lastMonth.length - dataSize),
            fill: false,
            backgroundColor: primaryColor,
            borderColor: primaryColor,
        }]
    }

    return (
        <Wrapper>
            <DataItemWrapper>
                <DataItem>
                    <Title>{totalLabel}</Title>
                    <TCValue>
                        {`${formatNumberWithCommas(current)} TC`}
                    </TCValue>
                    <PercentageValue positive>
                        <TrendingIcon />
                        {`${(todayValue / (current - todayValue) * 100).toFixed(2)}%`}
                    </PercentageValue>
                </DataItem>
                <DataItem>
                    <Title>{yesterdayLabel}</Title>
                    <TCValue>
                        {`${formatNumberWithCommas(todayValue)} TC`}
                    </TCValue>
                    <PercentageValue positive={dailyDifference > 0}>
                        <TrendingIcon />
                        {`${(Math.abs(dailyDifference) / yesterdayValue * 100).toFixed(2)}%`}
                    </PercentageValue>
                </DataItem>
            </DataItemWrapper>

            <ChartWrapper>
                <Line data={dataObj} options={options} />
            </ChartWrapper>

            <ChipWrapper>
                <Chip
                    clickable
                    overrideStatus={dataSize === 28}
                    onClick={() => setDataSize(28)}
                >
                    28 days
                </Chip>
                <Chip
                    clickable
                    overrideStatus={dataSize === 7}
                    onClick={() => setDataSize(7)}
                >
                    7 days
                </Chip>
            </ChipWrapper>
        </Wrapper>
    )
}