import styled from 'styled-components';

export default styled.div`
    user-select: none;

    svg {
        padding: 4px;
        width: 32px;
        height: 32px;

        path {
            transition: opacity 0.12s ease-out;
        }

        .filled {
            fill: var(--red);
            opacity: 0;
        }
    }

    &.active {
        svg {
            .hollow {
                opacity: 0;
            }
            .filled {
                opacity: 0.6;
            }
        }
    }
`;