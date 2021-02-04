import React, { useEffect, useState } from 'react';
import SkillBar from './SkillBar.styled';

import { characterDictionary } from '../../utils/dataDictionary';

export default ({ skillName, skill, highlight }) => {

    const [width, setWidth] = useState(0);
    useEffect(() => {
        setWidth(skill[characterDictionary['percentage']]);
    }, [skill])

    return (
        <SkillBar highlight={highlight}>
            <span className="skill-level shadow">
                {skill[characterDictionary['level']]}
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