import { useState } from "react";

import FormInput from "../form-input/form-input.component";
// import Button from "../button/button.component";

import Button from "@mui/material/Button";

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {

        } catch (error) {
            console.log(`SignInComponent: ${error}`);
        }
    }

    return <>
        <div className="sign-in-container">
            <h2>Welcome Back!</h2>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type="email" name="email" onChange={changeHandler} value={email} required />

                <FormInput label='Password' type="password" name="password" onChange={changeHandler} value={password} required />

                <div className="buttons-container">

                    
                    <Button variant="contained"  color = "error" disabled  > SIgn in </Button>
                    
                    {/* <Button variant="contained"  color = "error"  > Sign in    </Button> */}
                    

                
                    {/* <Button type="submit">Sign In</Button> */}
                
                </div>
            </form>
        </div>
    </>
}

export default SignInForm;