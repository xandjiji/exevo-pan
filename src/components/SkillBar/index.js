import React, { useEffect, useState } from 'react';
import SkillBar from './SkillBar.styled';

export default ({ skillName, skill, highlight }) => {

    const [width, setWidth] = useState(0);
    useEffect(() => {
        setWidth(skill.percentage);
    }, [skill.percentage])

    return (
        <SkillBar highlight={highlight}>
            <span className="skill-level shadow">
                {skill.level}
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