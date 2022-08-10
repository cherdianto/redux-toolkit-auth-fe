import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        nama: '',
        nim: '',
        email: '',
        password: '',
        // password2: ''
    })

    const { nama, nim, email, password } = formData;

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if (isSuccess || user){
            navigate('/')
            // toast.success(user.message)
        } 

        // reset the state
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // if(password !== password2) {
        //     toast.error('password do not match')
        // } else {
            const userData = { nama, nim, email, password }

            dispatch(register(userData))
        // }
    }

    if (isLoading){
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="nama" name='nama' value={nama} placeholder='Masukkan nama lengkap' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="nim" name='nim' value={nim} placeholder='Masukkan NIM/NIK' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" name='email' value={email} placeholder='Masukkan email' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" name='password' value={password} placeholder='Enter your password' onChange={handleChange} />
                    </div>
                    {/* <div className="form-group">
                        <input type="password" className="form-control" id="password2" name='password2' value={password2} placeholder='Re-enter your password' onChange={handleChange} />
                    </div> */}
                    <div className="form-group">
                        <button className="btn btn-block" type='submit'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register