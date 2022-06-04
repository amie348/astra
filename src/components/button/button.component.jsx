import './button.styles.scss'

const buttonTypeClasses = {
    inverted: 'inverted'
}

const Button = ({ children, buttonType, ...otherProps }) => (
    <button className={`button-container ${buttonTypeClasses[buttonType]}`} {...otherProps}>{children}</button>
)

export default Button;