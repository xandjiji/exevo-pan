import React, { useState, useEffect, memo } from 'react';
import RangeSlider from './RangeSlider.styled';

export default memo(({ initialValue, min, max, onChange }) => {
    const [value, setValue] = useState(initialValue);
    const [percentage, setPercentage] = useState(normalizePercentage(initialValue, max));

    const handleChange = (event) => {
        const value = Number(event.target.value);

        if (value <= max) {
            setValue(value);
            setPercentage(normalizePercentage(value, max));
        }
    }

    useEffect(() => {
        const timeOutObj = setTimeout(() => onChange(value), 500);
        return () => clearTimeout(timeOutObj);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[value]);

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
})

const normalizePercentage = (value, max) => {
    let calculedPercentage = value / max * 100;

    if (calculedPercentage > 90) {
        return calculedPercentage - 2;
    } else if (calculedPercentage < 1) {
        return 0;
    } else if (calculedPercentage < 5) {
        return 4;
    } else {
        return calculedPercentage;
    }
}