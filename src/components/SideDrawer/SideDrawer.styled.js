import styled from 'styled-components';

export default styled.div`
    background-color: red;
    height: 800px;
    width: 300px;


    #drawer-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        width: 300vw;
        height: 100vh;
        background-color: #0000004A;
        transition: opacity 0.2s ease-out;
    }
`;