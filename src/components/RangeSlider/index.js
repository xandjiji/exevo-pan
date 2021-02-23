import React, { useState, useEffect, memo, useCallback } from 'react';
import RangeSlider from './RangeSlider.styled';

export default memo(({ labelFor, counterLabel, initialValue, min, max, onChange, overrideValue }) => {
    const [value, setValue] = useState(initialValue);
    const [percentage, setPercentage] = useState(normalizePercentage(initialValue, max));

    const handleChange = (event) => {
        const value = Number(event.target.value);

        if (value <= max) {
            setValue(value);
            setPercentage(normalizePercentage(value, max));
        }
    }

    const callbackChange = useCallback(() => onChange(value), [onChange, value]);

    useEffect(() => {
        const timeOutObj = setTimeout(() => callbackChange(value), 500);
        return () => clearTimeout(timeOutObj);

    }, [value, callbackChange]);

    useEffect(() => {
        if (overrideValue) {
            setValue(overrideValue);
            setPercentage(normalizePercentage(overrideValue, max));
        }
    }, [overrideValue, setPercentage, max]);

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
                    id={labelFor}
                    type="range"
                    value={value}
                    min={min}
                    max={max}
                    onChange={handleChange}
                />

                <div className="track-fill" style={{ width: `${percentage}%` }}></div>
            </div>

            <input id={counterLabel} className="counter" type="number" min={min} max={max} value={value} onChange={handleChange} />
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