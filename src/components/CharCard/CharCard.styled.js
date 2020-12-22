import styled from 'styled-components';

export default styled.div`
    padding: 16px;
    border-radius: 5px;
    background-color: var(--surface);

    .card-head {
        display: flex;
        align-items: center;

        .head-info {
            margin-left: 16px;
            flex-grow: 1;

            .nickname {
                margin-bottom: 4px;
                display: block;
                color: var(--primary);
                font-weight: 600;
            }

            .level-vocation {
                font-size: 12px;
                font-weight: 300;
                letter-spacing: 0.5px;
            }
        }
    }
`;