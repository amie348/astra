import { useState } from "react";
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import axios from 'axios'

import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const baseUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=PAz5MMLfMy_oS6oyYYxmjxPTCs9jq2mSQO_B4WtmwDoLiwwcfn175MZUMhFzHiDkXEcKNtuPy5OxpZB1vZh0Pnz572wCRHa9m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnD8AB45YMIKdN_xFiIJZiwXEMxjMPCVLsKUaLkKD2pDO9qLeosrNMSNaGIAA-IFU9LulRK4PYyjUBhM62VbDsv5FvnZ3JX3SHg&lib=M-0NAAdT4ZTFWJRgc1zBTW7Ys4wonrQEQ'

const SignInForm = () => {
    const [singingIn, setSigningIn] = useState(false)

    const validate = Yup.object({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),

        password: Yup.string()
            .min(6, 'Password must be atleast 6 characters')
            .required('Password is required')
    })

    const handleSubmit = ({ email, password }) => {
        try {
            axios.post(baseUrl, {
                "operation": "SIGNIN",
                "email": `${email}`,
                "password": `${password}`
            }
            ).then((response) => {
                console.log(response.data);
            });

            // fetch(baseUrl, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     mode: 'no-cors',
            //     body: {
            //         "operation": "SIGNIN",
            //         "email": `${email}`,
            //         "password": `${password}`
            //     }
            // }).then((response) => {
            //     console.log(response.json());
            // })

            setSigningIn(true)
        } catch (error) {
            console.log(`SignInComponent: ${error}`);
        }
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
                    <h2>Welcome Back!</h2>
                    <Form onSubmit={form.handleSubmit}>

                        {/* <div class="alert alert-danger py-1 mt-3 text-center" role="alert">
                            Invalid Email!
                        </div> */}

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