import styled from 'styled-components';

export default styled.div`
    position: relative;

    input {
        padding: 10px 16px;
        outline: none;
        border-radius: 5px;
        border: solid 1px var(--separator);
        font-size: 12px;
        transition: border-color 0.2s ease-out;

        &:focus {
            border-color: var(--primary);
        }

        &::-webkit-calendar-picker-indicator {
            color: var(--primary);
        }
    }
`;