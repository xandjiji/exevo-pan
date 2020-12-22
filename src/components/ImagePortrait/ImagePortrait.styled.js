import styled from 'styled-components';

export default styled.div`
    position: relative;
    padding: 8px;
    border-radius: 5px;
    background-color: var(--primaryVariant);
    user-select: none;

    img {
        margin-top: -24px;
        position: relative;
        z-index: 1;
        margin-left: -24px;
        user-select: none;
        transition: opacity 0.2s ease-out;

        &.loading {
            opacity: 0;
        }
    }

    .loader {
        position: absolute;
        top: calc(50% - 12px);
        left: calc(50% - 12px);
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: linear-gradient(to right, var(--primary) 10%, rgba(255, 255, 255, 0) 42%);
        animation: load3 1.4s infinite ease-out;
        transform: translateZ(0);
        transition: opacity 0.2s ease-out;

        &.hidden {
            opacity: 0;
        }
    }

    .loader:before {
        content: '';
        width: 50%;
        height: 50%;
        background: var(--primary);
        border-radius: 100% 0 0 0;
        position: absolute;
        top: 0;
        left: 0;
    }

    .loader:after {
        content: '';
        background: var(--primaryVariant);
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