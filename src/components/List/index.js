import React from 'react';
import { Wrapper } from './List.styled';

export default ({ label, data, keyName, rowLabel }) => {
    if (!data || data.length === 0) return null
    return (
        <Wrapper>
            <h2>{label}</h2>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nickname</th>
                        <th>{rowLabel}</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((char, index) => {
                        return (
                            <tr key={char.id}>
                                <td>{index}</td>
                                <td>
                                    <a href={`https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${char.id}&source=overview`}>
                                        {char.nickname}
                                    </a>
                                </td>
                                <td>{char[keyName]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Wrapper>
    )
}