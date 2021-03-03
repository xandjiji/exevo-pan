import styled from 'styled-components';

export default styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;

    .toggle {
        position: relative;
        margin-right: 8px;
        width: ${props => props.hasIcon ? '52px' : '28px'};
        height: ${props => props.hasIcon ? '16px' : '8px'};
        border-radius: 16px;
        background-color: var(--separator);
        transition: background 0.2s ease-out;

        svg, &::after {
            position: absolute;
            top: 50%;
            left: 0;
            transition: 0.2s ease-out;
        }

        svg {
            fill: var(--onSurface);
            z-index: 1;
            transform: translate(4px, -50%);
        }

        &::after {
            content: '';
            width: ${props => props.hasIcon ? '32px' : '16px'};
            height: ${props => props.hasIcon ? '32px' : '16px'};
            border-radius: 50%;
            background-color: var(--surface);
            transform: translateY(-50%);
            box-shadow: 0px 2px 4px 2px rgba(0,0,0,0.3);
        }
    }

    &.active {
        .toggle {
            background-color: var(--primaryVariant);

            svg, &::after {
                left: 100%;
            }

            svg {
                fill: var(--onPrimary);
                transform: translate(calc(-100% - 4px), -50%);
            }

            &::after {
                transform: translate(-100%, -50%);
                background-color: var(--primary);
                box-shadow: 0px 2px 4px 1px rgba(0,0,0,0.3);
            }
        }
    }
`