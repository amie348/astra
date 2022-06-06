import './spinner.styles.scss'

import logo from '../../assets/logo/astraLogo.png'

const Spinner = () => {
    return <>
        <div className="SpinnerOverlay">
            <div className="astra-logo-container">
                <img src={logo} alt="" />
            </div>
            <div className="spinner-border text-danger mt-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </>
}

export default Spinner