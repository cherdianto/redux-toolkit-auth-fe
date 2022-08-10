import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, isLoading, isSuccess, user, message } = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData;

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if (isSuccess || user){
            navigate('/')
        }
        
        dispatch(reset())
    }, [isLoading, isError, isSuccess, navigate, dispatch])

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login(formData))
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please login</p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" name='email' value={email} placeholder='Enter your email' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" name='password' value={password} placeholder='Enter your password' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block" type='submit'>Login</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login