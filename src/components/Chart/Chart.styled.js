import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 16px;
    border-radius: 5px;
    background-color: var(--surface);
    box-shadow: 2px 2px 4px 2px rgba(0,0,0,0.14);

    @media(max-width: 712px) {
        margin-left: auto;
        margin-right: auto;
    }
`;