import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions'

const Login = (props) => {
    const [creds, setCreds] = useState({username: '', password: ''})

    const onSubmit = (e) => {
        e.preventDefault();
        props.login(creds)
    }

    const handleChange = event => {
        setCreds({...creds, [event.target.name]: event.target.value})
        console.log(creds)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' name='username' placeholder='Username' onChange={handleChange}/>
                <input type='password' name='password'  placeholder='Password' onChange={handleChange}/>
                <button>Login</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(
    mapStateToProps,
    { login }
)(Login);