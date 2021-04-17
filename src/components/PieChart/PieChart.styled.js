import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 20px;
    margin-bottom: 16px;
    width: calc(100% - 210px);
    border-radius: 5px;
    background-color: var(--surface);
    box-shadow: 2px 2px 4px 2px rgba(0,0,0,0.14);
`;

export const Title = styled.h2`
    margin-bottom: 8px;
    font-weight: 300;
    text-align: center;
    color: var(--onSurface);
    font-size: 16px;
`;

export const ChartWrapper = styled.div`
    width: 100%;
`;