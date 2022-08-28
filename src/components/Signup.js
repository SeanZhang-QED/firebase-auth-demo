import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordComfirmRef = useRef()
    const { signup, currentUser } = useAuth()

    const[error, setError] = useState('')
    const[loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        // validation
        if(passwordRef.current.value !== passwordComfirmRef.current.value) {
            return setError('Password do not match')
        }
        
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/login")
        } catch(err) {
            setError(err.message)
        }

        setLoading(false)
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                {currentUser && currentUser.email}
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
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Comfirmation</Form.Label>
                        <Form.Control type="password" ref={passwordComfirmRef} required />
                    </Form.Group>
                    <Button className="w-100 mt-2" type="submit" disabled={loading}
                    >
                        Sign Up
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'> 
            Already have an account? <Link to="/login">Log In</Link>
        </div>
    </>
  )
}
