import styled from 'styled-components';

export default styled.div`
    display: flex;
    align-items: center;

    .input-wrapper {
        position: relative;

        input[type=range] {
            -webkit-appearance: none;
            width: 160px;
            background: var(--primaryVariant);
            outline: none;
            box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.09);
            height: 4px;
            cursor: pointer;

            &::-webkit-slider-runnable-track {
                transform: translateY(-1px);
            }

            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 16px;
                width: 16px;
                border-radius: 50%;
                border: none;
                background: var(--primary);
                box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.14);
                transition: box-shadow 0.2s ease-out;

                &:hover {
                    box-shadow: 2px 2px 4px 2px rgba(0,0,0,0.14);
                }
            }

            &::-moz-range-track {
                background: var(--primaryVariant);
            }

            &::-moz-range-thumb {
                -webkit-appearance: none;
                height: 16px;
                width: 16px;
                border-radius: 50%;
                border: none;
                background: var(--primary);
                box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.14);
                transition: box-shadow 0.2s ease-out;

                &:hover {
                    box-shadow: 2px 2px 4px 2px rgba(0,0,0,0.14);
                }
            }
        }

        .track-fill {
            position: absolute;
            top: 50%;
            left: 0;
            height: 4px;
            background-color: var(--primary);
            pointer-events: none;
        }
    }

    .counter {
        padding: 7px 0;
        width: 40px;
        margin: 0 0 0 6px;
        border-radius: 8px;
        border: none;
        outline: none;
        background-color: var(--primaryVariant);

        font-size: 12px;
        font-weight: 400;
        text-align: center;
        color: var(--onSurface);

        -moz-appearance: textfield;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
`;