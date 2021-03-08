import React, { useEffect, useState } from 'react';
import SkillBar from './SkillBar.styled';

export default ({ skillName, skill, highlight }) => {

    const [width, setWidth] = useState(0);
    useEffect(() => {
        const percentage = (Math.abs(skill) - Math.floor(skill)) * 100;

        setWidth(Math.round(percentage));
    }, [skill])

    return (
        <SkillBar highlight={highlight}>
            <span className="skill-level shadow">
                {Math.floor(skill)}
            </span>

            <div className="info-wrapper">
                {skillName}
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${width}%` }}></div>
                </div>
            </div>
        </SkillBar>
    )
}