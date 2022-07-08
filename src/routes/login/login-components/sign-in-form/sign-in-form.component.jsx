import { useState } from "react";
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import axios from 'axios'

import { useNavigate } from 'react-router'
import { useDispatch } from "react-redux";

import FormInput from "../../../../components/form-input/form-input.component";

import './sign-in-form.styles.scss'
import { setCurrentUser } from "../../../../store/user/user.action";
import { BASE_API_URL } from "../../../../assets/config";


const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const dispatch = useDispatch();
    const [singingIn, setSigningIn] = useState(false)
    const [isError, setisError] = useState({ 401: false, 404: false });

    const navigate = useNavigate()

    const validate = Yup.object({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),

        password: Yup.string()
            .min(5, 'Password must be atleast 5 characters')
            .required('Password is required')
    })

    const handleSubmit = ({ email, password }) => {
        setSigningIn(true)
        axios.post(`${BASE_API_URL}/api/user/signin`, {
            email,
            password
        }, {
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
        ).then((response) => {
            dispatch(setCurrentUser(response.data.data))
            setSigningIn(false)
            navigate('/dashboard')
        }).catch(error => {
            setSigningIn(false)
            console.log(`SignInComponent: ${error.response.status}`);
            switch (error.response.status) {
                case 401:
                    console.log('Wrong Password');
                    setisError({ 401: true, 404: false })
                    break;

                case 404:
                    console.log('User Not Found');
                    setisError({ 401: false, 404: true })
                    break;

                default:
                    console.log('UnHandled Error')
                    break;
            }
        })
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

                        {isError[404] ?
                            <div class="alert alert-danger py-1 mt-3 text-center" role="alert">
                                User doesn't exist
                            </div>
                            : null
                        }

                        {
                            isError[401] ?
                                <div class="alert alert-danger py-1 mt-3 text-center" role="alert">
                                    Wrong Password
                                </div> : null
                        }

                        <FormInput label='Email' type="email" name="email" />
                        <FormInput label='Password' type="password" name="password" />

                        <button type="submit" className="btn btn-danger" disabled={!(form.isValid && form.dirty)}>
                            {
                                singingIn ?
                                    <div className="spinner-border spinner-border-sm text-light" role="status">
                                        <span className="sr-only"></span>
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