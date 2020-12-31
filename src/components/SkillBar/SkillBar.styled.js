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
        background-color: ${props => props.highlight ? 'var(--green)' : 'var(--primary)'};
        color: var(--onPrimary);
        text-align: right;
        font-weight: 600;
        transition: background-color 0.2s ease-out;
        transition: color 0.2s ease-out;
    }

    .info-wrapper {
        width: 100%;
        text-transform: capitalize;
        font-size: 12px;
        font-weight: 300;
        color: var(--onSurface);

        .progress-bar {
            margin-top: 1px;
            position: relative;
            height: 4px;
            background-color: var(--primaryVariant);
            box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.1);

            .progress {
                height: 100%;
                background-color: ${props => props.highlight ? 'var(--green)' : 'var(--primary)'};
                transition: width 0.4s ease-out;
            }
        }
    }
`;