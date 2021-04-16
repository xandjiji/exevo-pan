import React from 'react';
import * as S from './List.styled';

export default ({ label, data, keyName, rowLabel, format }) => {
    if (!data || data.length === 0) return null
    return (
        <S.Wrapper>
            <S.Title>{label}</S.Title>

            <S.Table>
                <S.TableHead>
                    <S.TableRow>
                        <S.FadeColumn>#</S.FadeColumn>
                        <S.MainColumn>Nickname</S.MainColumn>
                        <S.Column>{rowLabel}</S.Column>
                    </S.TableRow>
                </S.TableHead>

                <S.TableBody>
                    {data.map((char, index) => {
                        return (
                            <S.TableRow className="highlight" key={char.id}>
                                <S.FadeColumn>{index + 1}</S.FadeColumn>
                                <S.MainColumn>
                                    <S.TableLink href={`https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${char.id}&source=overview`} target="_blank" rel="noreferrer">
                                        {char.nickname}
                                    </S.TableLink>
                                </S.MainColumn>
                                <S.Column>
                                    {format ? format(char[keyName]) : char[keyName]}
                                </S.Column>
                            </S.TableRow>
                        )
                    })}
                </S.TableBody>
            </S.Table>
        </S.Wrapper>
    )
}