import { Button, Checkbox, Col, Form, Input, Row, message } from 'antd'
import React, { useEffect } from 'react'
import "./login.scss"
import { KeyOutlined, UserOutlined } from '@ant-design/icons'
import API_MANAGER from '../../API'
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { IsUserAuthenticated } from '../../utils/middlewares'
import loginIllustration from "../../Assests/loginIllustration.svg"

const Login = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (IsUserAuthenticated()) {
            navigate('/')
        }
    }, [])

    const SigninUser = async (data) => {
        try {
            const response = await API_MANAGER.getSalt({username: data?.username})
            const hashedPassword = response?.data?.password_hash
            const salt = response?.data?.salt
            
            const currentHashedPassword = CryptoJS.SHA256(salt+data?.password).toString()
            if (currentHashedPassword === hashedPassword) {
                const parsedData = {
                    username: data?.username,
                    password: currentHashedPassword
                }
                const loginResponse = await API_MANAGER.login(parsedData)
                message.success("Login successfull")
                Cookies.set("X-Session-Id", loginResponse.headers["x-session-id"])
                navigate("/")
            }
            else {
                message.error("Incorrect password or username")
            }
        } 
        catch (err) {
            message.error("An error has occured")
            console.log(err)
        }
      }

    return (
        <Row className='login-form-container'>
            <Col lg={12} xs={24} className='align-center form-container'>
                <Form
                    className='input-form'
                    onFinish={SigninUser}
                >
                    <Form.Item
                        name="username"
                    >
                        <Input 
                            placeholder='Username'
                            prefix={<UserOutlined />}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                    >
                        <Input 
                            placeholder='Password' 
                            type='password'
                            prefix={<KeyOutlined />}
                        />
                    </Form.Item>
                    <div className='dflex space-btw'>
                        <Form.Item>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                htmlType='submit'
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </div>
                    <div className='dflex space-btw'>
                        <span className='register-now' onClick={() => navigate("/register")}>Register Now</span>
                        <span className='forgot-password'>Forgot password?</span>
                    </div>
                </Form>
            </Col>
            <Col lg={12} className="image-container">
                <img src={loginIllustration} alt={"Login Illustration"} />
            </Col>
        </Row>
    )
}

export default Login