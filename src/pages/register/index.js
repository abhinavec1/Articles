import React from 'react'
import "./register.scss"
import { Button, Checkbox, Col, Form, Input, Row, message } from 'antd'
import { KeyOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import CryptoJS from 'crypto-js'
import API_MANAGER from '../../API'
import loginIllustration from "../../Assests/loginIllustration.svg"
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate()

    const signupUser = async (data) => {
        const salt = CryptoJS.lib.WordArray.random(128/8).toString()
        const saltedPassword = salt + data?.password
        const hash = CryptoJS.SHA256(saltedPassword).toString()
        try {
            const parsedData = {
                ...data,
                salt: salt,
                password: hash,
                phone: "8234234823"
            }
            console.log(parsedData)
            const response = await API_MANAGER.signup(parsedData)
            message.success("Signup successfull")
        }
        catch (err) {
            message.error("An error has occured")
            console.log(err)
        }
      }

    return (
        <Row className='register-form-container'>
            <Col lg={12} xs={24} className='align-center form-container'>
                <Form
                    className='input-form'
                    onFinish={signupUser}
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
                        name="email"
                    >
                        <Input 
                            placeholder='Email'
                            type='email'
                            prefix={<MailOutlined />}
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
                    <div className='align-center space-btw register-btn-container'>
                        <span>
                            Already a member?
                            <span className='login-now' onClick={() => navigate("/login")}>Login here</span>
                        </span>
                        <Form.Item>
                            <Button
                                htmlType='submit'
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Col>
            <Col lg={12} className="image-container">
                <img src={loginIllustration} alt={"Register Illustration"} />
            </Col>
        </Row>
    )
}

export default RegisterPage