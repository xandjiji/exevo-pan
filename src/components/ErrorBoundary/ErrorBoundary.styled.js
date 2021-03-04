import styled from 'styled-components';

export default styled.div`
    position: relative;
    z-index: 99;
    width: 100vw;
    height: 100vh;

    .top {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        width: 100%;
        height: 50%;
        background-color: #FFFFFF;

        span {
            font-size: 64px;
            font-weight: 700;
            letter-spacing: 8px;
            color: #3F51B5;
        }
    }

    .bottom {
        padding-top: 6px;
        width: 100%;
        height: 50%;
        background-color: #3F51B5;
        text-align: center;

        svg {
            margin-bottom: 64px;
            width: 128px;
            height: 128px;
            fill: #FFFFFF;
        }

        p {
            margin-bottom: 8px;
            font-size: 14px;
            letter-spacing: 1.5px;
            color: #FFFFFF;
        }
    }
`;