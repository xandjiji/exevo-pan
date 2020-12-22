import styled from 'styled-components';

export default styled.div`
    padding: 10px 14px 8px 14px;
    position: relative;
    border-radius: 5px;
    border: solid 1px ${props => props.warning ? 'var(--red)' : 'var(--separator)'};
    
    .label {
        padding: 0 4px;
        position: absolute;
        top: 0;
        left: 10px;
        transform: translateY(-50%);

        font-size: 9px;
        font-weight: 300;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: ${props => props.warning ? 'var(--red)' : 'var(--onSurface)'};
        background-color: var(--surface);
        user-select: none;

        display: flex;
        align-items: center;

        img {
            margin-left: 1px;
            transform: translateY(-1px) scale(0.75);
        }
    }
`;