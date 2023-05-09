import { Button, Col, Row, Select } from 'antd'
import React from 'react'
import "./SubHeader.scss"
import {IsUserAuthenticated} from "../../utils/middlewares";
import {useNavigate} from "react-router-dom";

const SubHeader = () => {
    const navigate = useNavigate()
    const isUserAuthenticated = IsUserAuthenticated()

    const postCategories = [
        {
            name: "All Posts",
            value: "all posts"
        },
        {
            name: "News",
            value: "news"
        },
        {
            name: "Politics",
            value: "politics"
        },
        {
            name: "Opinion",
            value: "opinion"
        },
        {
            name: "Sport",
            value: "sport"
        },
        {
            name: "Entertainment",
            value: "entertainment"
        },
    ]

    const categoriesOptions = postCategories.map((item) => (
        {
            label: item?.name,
            value: item?.value
        }
    ))

  return (
    <>
        <Row className='subheader-main-container' justify="space-around">
            <Col>
                <Row className='categories-container' gutter={32}>
                    {postCategories.map((item, idx) => (
                        <Col key={item.value} className="category-item">
                            {item.name}
                        </Col>
                    ))}
                </Row>
            </Col>
            <Col>
                {!isUserAuthenticated &&
                    <Button className='login-button' onClick={() => navigate("/login")}>
                        Log In/Sign up
                    </Button>
                }
            </Col>
        </Row>
        <Row className='subheader-main-container-mobile' gutter={[0,16]}>
            <Col xs={24} className="dflex space-btw action-container">
                <span>Post</span>
                <span>Log In/Sign up</span>
            </Col>
            <Col xs={24} className="dropdown-container">
                <Select
                    options={categoriesOptions}
                    style={{width: "100%"}}
                    defaultValue={categoriesOptions[0]?.value}
                />
            </Col>
        </Row>
    </>
  )
}

export default SubHeader