import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 20px 16px 20px 26px;
    margin-bottom: 16px;
    width: 100%;
    border-radius: 5px;
    background-color: var(--surface);
    box-shadow: 2px 2px 4px 2px rgba(0,0,0,0.14);

    @media(min-width: 768px) {
        width: calc(50% - 8px);
    }

    canvas {
        margin-left: -6px;
    }
`;

export const DataItemWrapper = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    > *:not(:last-child) {
        margin-right: 48px;
    }
`;

export const DataItem = styled.div`

`;

export const Title = styled.h2`
    font-size: 14px;
    font-weight: 300;
    color: var(--onSurface);
`;

export const TCValue = styled.span`
    margin: 6px 0 4px 0;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    color: var(--onSurface);

    img {
        margin-right: 6px;
    }
`;

export const PercentageValue = styled.span`
    display: flex;
    align-items: center;

    font-size: 12px;
    font-weight: 600;
    color: ${props => props.positive ? 'var(--green)' : 'var(--red)'};

    svg {
        margin-right: 4px;
        width: 16px;
        height: 16px;
        fill: ${props => props.positive ? 'var(--green)' : 'var(--red)'};
        transform: ${props => props.positive ? 'none' : 'scaleY(-1)'};
    }
`;

export const ChipWrapper = styled.div`
    margin-top: 22px;
    display: flex;

    > *:not(:last-child) {
        margin-right: 8px;
    }
`;

export const ChartWrapper = styled.div`
    width: 100%;
    height: 260px;
`;