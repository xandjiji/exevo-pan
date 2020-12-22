import styled from 'styled-components';

export default styled.div`
    display: flex;
    align-items: flex-end;

    .skill-level {
        padding: 3px;
        margin-right: 6px;
        flex: none;
        width: 32px;
        border-radius: 5px;
        font-size: 14px;
        letter-spacing: 0.6px;
        background-color: var(--primary);
        color: var(--onPrimary);
        text-align: right;
        font-weight: 600;
    }

    .info-wrapper {
        width: 100%;
        text-transform: capitalize;
        font-size: 12px;
        font-weight: 300;

        .progress-bar {
            margin-top: 1px;
            height: 4px;
            background-color: var(--primaryVariant);

            .progress {
                height: 100%;
                background-color: var(--primary);
                transition: 0.4s ease-out;
            }
        }
    }
`;