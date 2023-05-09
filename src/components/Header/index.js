import {Button, Col, Drawer, Input, message, Row} from 'antd'
import React, {useState} from 'react'
import {WebsiteIcon} from '../../utils/svg'
import {
    CloseOutlined,
    FacebookFilled,
    MenuOutlined,
    SearchOutlined,
    TwitterOutlined,
    YoutubeFilled
} from "@ant-design/icons"
import "./header.scss"
import API_MANAGER from "../../API";
import {useNavigate} from "react-router-dom";
import HELPERS from "../../utils/helper";
import {IsUserAuthenticated} from "../../utils/middlewares";

const Header = () => {

    const [selectedLink, setSelectedLink] = useState("home")
    const [epxandMobileHeader, setExpandMobileheader] = useState(false)

    const navigate = useNavigate()
    const isUserAuthenticated = IsUserAuthenticated()

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

    const handleLinkClick = (value) => {
        setSelectedLink(value)
    }

    const logoutUser = async () => {
        try {
            const response = await API_MANAGER.logout()
            navigate('/login')
            HELPERS.deleteCookie("X-Session-Id")
        }
        catch (err) {
            message.error("Something went wrong")
        }
    }

    return (
        <>
            <div className='header-main-container'>
                <Row className='links-container' gutter={16} align="middle">
                    <WebsiteIcon className="websiteIcon" onClick={() => navigate("/")} />
                    {links.map((item, idx) => (
                        <Col
                            className={item?.value === selectedLink ? "link selected" : "link"}
                            key={item.value}
                            onClick={() => handleLinkClick(item?.value)}
                        >
                            {item.label}
                        </Col>
                    ))}
                </Row>
                <Row className='icons-container' gutter={16} align="middle">
                    <Col>
                        <Input
                            prefix={<SearchOutlined/>}
                            placeholder="Search..."
                        />
                    </Col>
                    <Col>
                        <FacebookFilled style={{color: "#fff"}}/>
                    </Col>
                    <Col>
                        <TwitterOutlined style={{color: "#fff"}}/>
                    </Col>
                    <Col>
                        <YoutubeFilled style={{color: "#fff"}}/>
                    </Col>
                    {isUserAuthenticated &&
                        <Col>
                            <Button
                                onClick={logoutUser}
                            >
                                Logout
                            </Button>
                        </Col>
                    }
                </Row>
            </div>
            <div className='header-main-container-mobile'>
                <Row gutter={[0, 16]}>
                    <Col xs={24} className="align-center" style={{justifyContent: "space-between"}}>
                        <WebsiteIcon className="websiteIcon"/>
                        <span className='icons-container'>
                        <FacebookFilled style={{color: "#fff"}}/>
                        <TwitterOutlined style={{color: "#fff"}}/>
                        <YoutubeFilled style={{color: "#fff"}}/>
                    </span>
                        <MenuOutlined
                            style={{color: "#fff"}}
                            onClick={() => setExpandMobileheader(true)}
                        />
                    </Col>
                    <Col xs={24} className="justify-center">
                        <Input
                            prefix={<SearchOutlined/>}
                            placeholder="Search..."
                        />
                    </Col>
                </Row>
            </div>
            <Drawer
                open={epxandMobileHeader}
                closable={false}
                className="mobile-expanded-header"
                width="100%"
            >
                <CloseOutlined
                    className="close-button"
                    onClick={() => setExpandMobileheader(false)}
                />
                <Row gutter={[0, 32]}>
                    {links.map((item, idx) => (
                        <Col lg={24} xs={24}>{item.label}</Col>
                    ))}
                </Row>
            </Drawer>
        </>
    )
}

export default Header