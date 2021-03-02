import styled from 'styled-components';

export default styled.div`
    position: absolute;
    top: 26px;
    left: 50%;
    z-index: 60;
    transform: translate(-50%);

    padding: 6px 16px;
    display: flex;
    align-items: center;

    border-radius: 5px;
    background-color: var(--alert);

    font-size: 12px;
    font-weight: 600;

    .data-loader {
        margin-right: 8px;
        position: relative;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: linear-gradient(to right, var(--primary) 10%, rgba(255, 255, 255, 0) 42%);
        animation: load3 1.4s infinite ease-out;
        transform: translateZ(0);
        transition: opacity 0.2s ease-out;
    }

    .data-loader:before {
        content: '';
        width: 50%;
        height: 50%;
        background: var(--primary);
        border-radius: 100% 0 0 0;
        position: absolute;
        top: 0;
        left: 0;
    }

    .data-loader:after {
        content: '';
        background: var(--alert);
        width: 75%;
        height: 75%;
        border-radius: 50%;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    @keyframes load3 {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
`;