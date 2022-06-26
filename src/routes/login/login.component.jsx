import { useEffect, useState } from 'react';
import ImageSideBar from './login-components/image-side-bar/imageSideBar.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import logo from '../../assets/logo/astra-logo-transparent.png'

import './login.styles.scss'
import Spinner from '../../components/spinner/spinner.component';

const Login = () => {
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [imageUrl, setImageUrl] = useState('')

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fecthQuote = async () => {
            await fetch('https://type.fit/api/quotes')
                .then(response => response.json())
                .then(response => {
                    const randomQuote = Math.floor(Math.random() * 200)
                    setQuote(response[randomQuote])
                })
                .catch(err => console.error(err));
        }

        const fetchImage = async () => {
            await fetch('https://api.unsplash.com/collections/1033542/photos?client_id=0xMKUO9w0C3-VPqnQK6qEOWu3D3RHjyBElZkYiQVA64')
                .then(response => response.json())
                .then(response => {
                    setImageUrl(response[Math.floor(Math.random() * 10)].urls.regular)
                })
        }

        const pageDoneLoading = () => {
            setTimeout(() => { setIsLoading(false) }, 3000)
        }

        fetchImage()
        fecthQuote()
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
                    <ImageSideBar imageUrl={imageUrl} quote={quote} />
                </div>
            </div>
    )
}

export default Login