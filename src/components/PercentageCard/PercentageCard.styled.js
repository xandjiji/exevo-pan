import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 20px;
    margin-right: 16px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;
    background-color: var(--surface);
    box-shadow: 2px 2px 4px 2px rgba(0,0,0,0.14);

    @media(max-width: 440px) {
        width: 100%;
        margin-right: 0;
        align-items: center;
    }
`;

export const Title = styled.h2`
    font-size: 16px;
    color: var(--onSurface);
    font-weight: 300;
`;

export const Percentage = styled.span`
    font-size: 46px;
    color: ${props => props.positive ? 'var(--green)' : 'var(--red)'};
    font-weight: 700;
`;