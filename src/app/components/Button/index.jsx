import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledButton = styled.button`
    color: ${props => props.theme.fg};
    border: 2px solid ${props => props.theme.fg};
    background: ${props => props.theme.bg};

    cursor: pointer;
    margin: 1em;
    outline: 0;
    padding: 0.25em 1em;
    font-size: 1em;
    border-radius: 3px;
`;

const Button = function({ children, onClick }) {
    return (
        <StyledButton onClick={onClick}>
            {children}
        </StyledButton>
    )
}

Button.propTypes = {
    theme: PropTypes.objectOf({
        fg: PropTypes.string,
        bg: PropTypes.string
    }),
    onClick: PropTypes.function,
    children: PropTypes.string
}

Button.defaultProps = {
    theme: {
        fg: '#000000',
        bg: '#ffffff'
    },
    onClick: () => {},
    children: 'Default button'
}

export default Button
