import React from 'react'
import Header from '../components/Header'
import { Col, Row } from 'antd'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home'
import BlogDetailpage from '../pages/details'
import CreateBlogPage from '../pages/createBlog'
import Footer from '../components/Footer'
import "../App.scss"
import ProtectedRoutes from "./ProtectedRoutes";

const CustomRoutes = () => {

    const renderHeading = () => {
        return (
            <Row className='heading-container' justify="center" align="middle" gutter={0}>
                <Col className="website-name">TheHours</Col>
                <Col className='vertical-line'></Col>
                <Col className='website-desc'>News & Opinion Blog</Col>
            </Row>
        )
      }

    return (
        <div className='app-main-container'>
        <Header />
        {renderHeading()}
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/blog/:id" element={<BlogDetailpage />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/write" element={<CreateBlogPage />} />
            </Route>
        </Routes>
        <Footer />
        </div>
    )
}

export default CustomRoutes