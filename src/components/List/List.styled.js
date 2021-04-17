import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 16px;
    margin-bottom: 16px;
    margin-right: 16px;
    width: 320px;
    border-radius: 5px;
    background-color: var(--surface);
    box-shadow: 2px 2px 4px 2px rgba(0,0,0,0.14);

    @media(max-width: 712px) {
        margin-left: auto;
        margin-right: auto;
    }
`;

export const Title = styled.h2`
    margin-bottom: 14px;
    text-align: center;
    color: var(--primary);
    font-weight: 400;
`;

export const Table = styled.div`
    
`;

export const TableHead = styled.div`
    padding-bottom: 4px;
    margin-bottom: 4px;
    border-bottom: solid 1px var(--separator);
`;

export const TableRow = styled.div`
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`;

export const Column = styled.div`
    text-align: left;
    font-size: 12px;
    font-weight: 300;
    color: var(--onSurface);
`;

export const MainColumn = styled(Column)`
    flex-grow: 1;
`;

export const FadeColumn = styled(Column)`
    margin-right: 6px;
    width: 12px;
    opacity: 0.5;
    text-align: center;
`;

export const TableBody = styled.div`
    
`;

export const TableLink = styled.a`
    font-size: 12px;
    color: var(--primary);
`;