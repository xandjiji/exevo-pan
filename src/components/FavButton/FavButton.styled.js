import styled from 'styled-components';

export default styled.div`
    user-select: none;

    svg {
        width: 32px;
        height: 32px;
        padding: 4px;
        .filled {
            fill: var(--red);
            opacity: 0;
            transition: opacity 0.2s ease-out;
        }
    }

    &.active {
        svg {
            .filled {
                opacity: 0.5;
            }
        }
    }
`;