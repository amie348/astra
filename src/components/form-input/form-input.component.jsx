import './form-input.styles.scss'

import { useField, ErrorMessage } from 'formik'

const FormInput = ({ label, ...inputOptions }) => {
    const [field, meta] = useField(inputOptions)

    return (
        <div className='group form-group '>
            <label htmlFor={field.name} className={`form-input-label`}>{label}</label>
            <input className={`form-input form-control ${meta.touched && meta.error && 'is-invalid'}`} {...inputOptions} {...field} />
            <ErrorMessage component='div' name={field.name} className='error' />
        </div>
    )
}

export default FormInput;