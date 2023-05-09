import { Button, Col, Form, Input, Row } from 'antd'
import {FacebookFilled, TwitterOutlined, YoutubeFilled} from "@ant-design/icons"
import React from 'react'
import "./footer.scss"

const Footer = () => {
  return (
    <div className='footer-main-container'>
        <Row 
            className="footer-main-row"
            align="middle"
            justify="center"
            gutter={32}
        >
            <Col>
                <div className='subscribe-heading'>Subscribe to Our Newsletter</div>
                <div>
                    <Form className="footer-form">
                        <Form.Item
                            name="email"
                            className='subscribe-input'
                        >
                        <Input
                            placeholder='Enter your email here *'
                        />
                        </Form.Item>
                        <Form.Item
                            className='subscribe-button'
                        >
                            <Button
                                htmlType='submit'
                            >
                                Subscribe
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <FacebookFilled style={{color: "#fff", fontSize: "20px"}} />
                    <TwitterOutlined style={{color: "#fff", fontSize: "20px", margin: "0 1rem"}}/>
                    <YoutubeFilled style={{color: "#fff", fontSize: "20px"}}/>
                </div>
            </Col>
            <Col>
                <Row className='footer-sections-container' gutter={[0, 16]}>
                    <Col>Home</Col>
                    <Col>About</Col>
                    <Col>All News</Col>
                    <Col>Contact</Col>
                    <Col>Advertise</Col>
                </Row>
            </Col>
            <Col lg={24} style={{textAlign: "center"}}>© 2035 by TheHours. Powered and secured by Wix</Col>
        </Row>
    </div>
  )
}

export default Footer