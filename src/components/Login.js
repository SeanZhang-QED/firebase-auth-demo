import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import GoogleButton from 'react-google-button'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, loginWithGoogle } = useAuth()

    const[error, setError] = useState('')
    const[loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
            console.log("login success")
        } catch(err) {
            setError(err.message)
        }

        setLoading(false)
    }

    async function handleGoogleLogin() {
        try {
            setError('')
            setLoading(true)
            await loginWithGoogle()
            navigate('/')
            console.log("login success")
        } catch (err) {
            console.log(err.message.substring(0, 8))
            console.log(err.message.substring(9))
            if(err.message.substring(0,8) === 'Firebase') {
                setError(err.message.substring(9))
            }
        }
        setLoading(false)
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Log In</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button className="w-100 mt-2" type="submit" disabled={loading}
                    >
                        Log In
                    </Button>
                    <div className='w-100 text-center mt-3'>
                        <Link to="/forgot-password">Forgot password</Link>
                    </div>
                </Form>
                <div className='d-flex align-items-center justify-content-center mt-3'>
                    <GoogleButton
                        disabled={loading}
                        onClick={handleGoogleLogin}
                    />
                </div>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'> 
            Need an account? <Link to="/signup">Sign up</Link>
        </div>
    </>
  )
}
