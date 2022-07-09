import { useState } from "react";
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import axios from 'axios'

import { useNavigate } from 'react-router'
import { useDispatch } from "react-redux";

import FormInput from "../../../../components/form-input/form-input.component";

import './set-password-form.styles.scss'
import { BASE_API_URL } from "../../../../assets/config";

const defaultFormFields = {
    email: '',
    password: '',
}

const SetPasswordForm = () => {
    const dispatch = useDispatch();
    const [singingIn, setSigningIn] = useState(false)
    const [isError, setisError] = useState({ 401: false, 404: false });

    const navigate = useNavigate()

    const validate = Yup.object({
        password: Yup.string()
            .min(5, 'Password must be atleast 5 characters')
            .required('Password is required'),
        passwordConfirmation: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    const handleSubmit = ({ password }) => {
        setSigningIn(true)
        axios.post(`${BASE_API_URL}/api/user/signin`, {
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
            console.log(response);
            setSigningIn(false)
            navigate('/')
        }).catch(error => {
            setSigningIn(false)
            console.log(`SetPasswordComponent: ${error.response.status}`);
        })
    }

    return <Formik
        initialValues={{
            password: '',
            passwordConfirmation: ''
        }}

        validationSchema={validate}

        onSubmit={values => { handleSubmit(values) }}
    >

        {
            form => (
                <div className="sign-in-container">
                    <h4>Set Password</h4>
                    <span> Enter Password and Confirm Password </span>
                    <Form onSubmit={form.handleSubmit}>

                        <FormInput label='Password' type="password" name="password" />
                        <FormInput label='Confirm Password' type="password" name="passwordConfirmation" />

                        <button type="submit" className="btn btn-danger" disabled={!(form.isValid && form.dirty)}>
                            {
                                singingIn ?
                                    <div className="spinner-border spinner-border-sm text-light" role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                    : `Set Password`
                            }
                        </button>
                    </Form>
                </div>
            )
        }
    </Formik>
}

export default SetPasswordForm;