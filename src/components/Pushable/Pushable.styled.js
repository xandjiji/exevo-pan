import styled from 'styled-components';

export default styled.div`
    user-select: none;
    outline: none;
    transition: transform 0.2s ease-out;

    #drawer-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        width: 300vw;
        height: 100vh;
        background-color: #0000004A;
        outline: none;
        transition: opacity 0.2s ease-out;
    }

    &:not(.active) #drawer-backdrop {
        opacity: 0;
        pointer-events: none;
    }
`;