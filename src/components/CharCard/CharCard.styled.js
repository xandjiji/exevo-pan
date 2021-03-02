import styled from 'styled-components';

export default styled.div`
    padding: 16px;
    border-radius: 5px;
    background-color: var(--surface);

    .card-head {
        position: relative;
        margin-bottom: 16px;
        display: flex;
        align-items: center;

        > *:first-child {
            width: 56px;
            height: 56px;
        }

        .head-info {
            margin-left: 16px;
            flex-grow: 1;

            .nickname {
                margin-bottom: 2px;
                width: calc(100% - 42px);
                display: flex;
                align-items: center;
                font-size: 16px;
                font-weight: 600;
                color: var(--primary);
                filter: brightness(130%);

                a {
                    margin-left: 4px;
                    font-size: 0;
                    
                    svg {
                        height: 28px;
                        width: 28px;
                        fill: var(--onSurface);
                    }
                }
            }

            .level-vocation {
                font-size: 12px;
                font-weight: 300;
                letter-spacing: 0.5px;
                color: var(--onSurface);
            }
        }

        .fav-button {
            position: absolute;
            top: 2px;
            right: 0;
        }
    }

    .overview {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .item-wrapper {
            width: 100%;
            display: flex;
            justify-content: space-around;

            > * {
                width: 48px;
                height: 48px;

                img {
                    margin: 0;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }

        > * {
            width: calc(50% - 4px);
            margin-bottom: 12px;
        }

        .overview-content {
            font-size: 14px;
            color: var(--onSurface);
        }

        .row {
            display: flex;
            align-items: center;
            
            > *:first-child {
                margin-right: 4px;
            }
        }

        .flag, .coin {
            box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.14);
        }

        .battleye {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: solid 1px #00000020;
            box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.14);
        }

        .coin {
            border-radius: 50%;
        }

        .auction * {
            font-size: 16px;
        }

        .bid {
            font-size: 16px;
            letter-spacing: 0.6px;
        }

        .server-info {
            justify-content: space-between;

            .server-text {
                font-size: 14px;
                color: var(--onSurface);

                img {
                    margin-right: 4px;
                }
            }

            > div {
                height: 16px;
                width: 16px;
                min-width: unset;
                min-height: unset;
                border: none;

                svg {
                    fill: var(--onSurface);
                }

                > div {
                    width: 236px;
                    text-align: center;
                    z-index: 1;
                }
            }
        }
    }

    .card-footer {
        .skills-wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            > * {
                width: calc(50% - 8px);
                margin-bottom: 8px;
            }
        }

        .charms-wrapper {
            margin-top: 8px;
            margin-bottom: -8px;
            display: flex;
            flex-wrap: wrap;

            > * {
                margin-bottom: 8px;

                &:not(:last-child) {
                    margin-right: 8px;
                }
            }
        }

        .imbuement-wrapper {
            margin-top: 8px;
            padding-top: 6px;
            width: 100%;
            border: none;
            border-radius: unset;
            border-top: solid 1px var(--separator);

            align-items: flex-end;

            font-size: 12px;
            color: var(--onSurface);
            font-weight: 400;
            justify-content: unset;

            z-index: 1;
            user-select: none;

            svg {
                margin-right: 4px;
                width: 18px;
                height: 18px;
                fill: var(--onSurface);
            }

            > div {
                bottom: 100%;
                left: 0;
                transform: none;

                span {
                    display: block;
                    font-size: 12px;
                    color: var(--onSurface);
                    font-weight: 400;

                    &.highlight {
                        color: var(--primary);
                        font-weight: 600;
                    }

                    &::before {
                        content: '·';
                        margin-right: 4px;
                        font-weight: 800;
                    }

                    &:not(:last-child) {
                        margin-bottom: 2px;
                    }
                }
            }
        }
    }
`;