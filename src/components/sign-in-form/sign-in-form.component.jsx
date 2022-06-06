import { useState } from "react";
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

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

    const handleSubmit = (values) => {
        try {
            console.log(values);
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

                        <div class="alert alert-danger py-1 mt-3 text-center" role="alert">
                            Invalid Email!
                        </div>

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