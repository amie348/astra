import { useEffect, useState } from 'react';
import SignInForm from './change-password-components/change-password-form/set-password-form.component';

import logo from '../../assets/logo/astra-logo-transparent.png'

import './change-password.styles.scss'
import Spinner from '../../components/spinner/spinner.component';

const SetPassword = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const pageDoneLoading = () => {
            setTimeout(() => { setIsLoading(false) }, 2000)
        }

        pageDoneLoading()
    }, [])

    return (
        isLoading ? <Spinner /> :
            <div className="login-container">
                <div className="astra-logo-container">
                    <img src={logo} alt="" />
                </div>
                <div className="login-body">
                    <div className='login-form'>
                        <SignInForm />
                    </div>
                </div>
            </div>
    )
}

export default SetPassword