import { useState } from "react";
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import axios from 'axios'

import { useNavigate } from 'react-router'

import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/user/user.selectors';

import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}


const baseUrl = 'https://script.google.com/macros/s/AKfycbxhSRVV91B2ajFKO_dVk1GYUaTyZP-PjVAQJfEWzNBgl-S7-1_-mvMPWuANuO5MB_E/exec'

const SignInForm = () => {
    const [singingIn, setSigningIn] = useState(false)
    const currentUser = useSelector(currentUserSelector)
    const [isError, setisError] = useState(false);

    const naviagte = useNavigate()

    const { user, accessToken } = currentUser;

    const validate = Yup.object({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),

        password: Yup.string()
            .min(6, 'Password must be atleast 6 characters')
            .required('Password is required')
    })


    const handleLoginError = () => {

        setisError(!isError)

    }

    const handleSigningIn = () => {

        setSigningIn(!singingIn);

    }

    const handleSubmit = ({ email, password }) => {

        handleSigningIn()

        // axios.post(baseUrl, {
        //     operation: "SIGNIN",
        //     email,
        //     password
        // }, {mode: 'no-cors',
        //     headers: {
        // 	'Access-Control-Allow-Origin': '*',
        // 	Accept: 'application/json',
        // 	'Content-Type': 'application/json',
        // },}
        // ).then((response) => {
        //     console.log(response.data);
        //     handleSigningIn()
        //     naviagte('/dashboard')
        // }).catch(error => {

        //     console.log(`SignInComponent: ${error}`);
        //     handleLoginError()
        //     handleSigningIn()
        //     naviagte('/dashboard')  // for temporary purpose untill the api issue is not resolved
        // })

        const data = {
            operation: "SIGNIN",
            email,
            password
        }

        fetch(baseUrl, {
            method: 'POST',
            mode: 'no-cors',
            cache: "no-cache",
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json' },
            // redirect: "manual",
            body: JSON.stringify(data)
        }).then(async (response) => {

            const string = await response.text();
            const json = string === "" ? {} : JSON.parse(string);
            console.log(`json`, json)

        })
            .catch(error => { console.log(error) })

        // fetch(baseUrl).then(response => response.json()).then(response =>   {

        //     console.log(response)

        // })

    }

    return <Formik
        initialValues={{
            email: '',
            password: ''
        }}

        validationSchema={validate}

        onSubmit={values => { handleSubmit(values) }}
    >

        {
            form => (
                <div className="sign-in-container">
                    <h4>Login Account</h4>
                    <span> Enter Email and Password to login </span>
                    <Form onSubmit={form.handleSubmit}>

                        {isError ?
                            <div class="alert alert-danger py-1 mt-3 text-center" role="alert">
                                The Login correct
                            </div>
                            : null
                        }

                        <FormInput label='Email' type="email" name="email" />
                        <FormInput label='Password' type="password" name="password" />

                        <button type="submit" className="btn btn-danger" disabled={!(form.isValid && form.dirty)}>
                            {
                                singingIn ?
                                    <div className="spinner-border spinner-border-sm text-light" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    : `Sign in`
                            }
                        </button>
                    </Form>
                </div>
            )
        }
    </Formik>
}

export default SignInForm;