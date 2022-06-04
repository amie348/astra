import './form-input.styles.scss'

const FormInput = ({ label, ...inputOptions }) => (
    <div className='group'>
        <label className={`form-input-label`}>{label}</label>
        <input className=' form-input' {...inputOptions} />
    </div>
)

export default FormInput;