import React, { useState } from 'react';
import RangeSlider from './RangeSlider.styled';

export default ({ initialValue, min, max }) => {
    const [value, setValue] = useState(initialValue);
    const [percentage, setPercentage] = useState(initialValue / max);

    const handleChange = (event) => {
        const value = event.target.value;

        if (value >= min && value <= max) {
            setValue(value);

            let calculedPercentage = value / max * 100
            if (calculedPercentage > 90) {
                calculedPercentage -= 2;
            } else if (calculedPercentage < 1) {
                calculedPercentage = 0;
            } else if (calculedPercentage < 5) {
                calculedPercentage = 4;
            }

            setPercentage(calculedPercentage);
        }
    }

    const stopBubbling = (event) => {
        event.stopPropagation();
    }

    return (
        <RangeSlider
            percentage={percentage}
            onMouseDown={stopBubbling}
            onMouseUp={stopBubbling}
            onMouseMove={stopBubbling}
        >
            <div className="input-wrapper">
                <input
                    type="range"
                    value={value}
                    min={min}
                    max={max}
                    onChange={handleChange}
                />

                <div className="track-fill" style={{ width: `${percentage}%` }}></div>
            </div>

            <input className="counter" type="number" min={min} max={max} value={value} onChange={handleChange} />
        </RangeSlider>
    )
}