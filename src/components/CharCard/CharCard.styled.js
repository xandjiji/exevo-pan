import styled from 'styled-components';

export default styled.div`
    padding: 16px;
    border-radius: 5px;
    background-color: var(--surface);

    .card-head {
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
                display: flex;
                align-items: center;
                font-size: 16px;
                font-weight: 600;
                color: var(--primary);

                a {
                    margin-left: 4px;
                    
                    svg {
                        height: 28px;
                        width: 28px;
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
    }

    .overview {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        > * {
            width: calc(50% - 4px);
            margin-bottom: 12px;
        }

        .overview-content {
            font-size: 14px;
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

        .bid {
            font-size: 16px;
            letter-spacing: 0.6px;
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
    }
`;