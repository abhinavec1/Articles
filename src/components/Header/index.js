import { Col, Input, Row } from 'antd'
import React from 'react'
import { WebsiteIcon } from '../../utils/svg'
import {FacebookFilled, InstagramOutlined, SearchOutlined, TwitterOutlined, YoutubeFilled} from "@ant-design/icons"
import "./header.scss"

const Header = () => {

    const links = [
        {
            label: "Home",
            value: "home"
        },
        {
            label: "About",
            value: "about"
        },
        {
            label: "All News",
            value: "allnews"
        },
        {
            label: "Contact",
            value: "contact"
        },
        {
            label: "Advertise",
            value: "advertise"
        },
    ]
  return (
    <div className='header-main-container'>
        <Row className='links-container' gutter={16} align="middle">
            <WebsiteIcon className="websiteIcon"/>
            {links.map((item, idx) => (
                <Col className='link' key={item.value}>
                    {item.label}
                </Col>
            ))}
        </Row>
        <Row className='icons-container' gutter={16} align="middle">
            <Col>
                <Input
                    prefix={<SearchOutlined />}
                />
            </Col>
            <Col>
                <FacebookFilled />
            </Col>
            <Col>
                <TwitterOutlined />
            </Col>
            <Col>
                <YoutubeFilled />
            </Col>
        </Row>
    </div>
  )
}

export default Header