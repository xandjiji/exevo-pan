import styled from 'styled-components';

export default styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--surface);
    user-select: none;
    transition: box-shadow 0.2s ease-out;

    &:hover:not(:active) {
        box-shadow: 3px 3px 5px 3px rgba(0,0,0,0.14);
    }

    svg {
        padding: 4px;
        width: 32px;
        height: 32px;
        fill: var(--onSurface);

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
                opacity: 0.65;
            }
        }
    }
`;