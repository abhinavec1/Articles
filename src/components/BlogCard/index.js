import {Col, message, Row} from 'antd'
import {EyeOutlined, MessageOutlined, HeartOutlined, HeartFilled} from "@ant-design/icons"
import React, {useState} from 'react'
import "./BlogCard.scss"
import BlogImage from "../../Assests/blogImage.webp"
import { IsUserAuthenticated } from '../../utils/middlewares';
import API_MANAGER from "../../API";
import {useNavigate} from "react-router-dom";
import NatureImg from "../../Assests/nature.jpg";
import NewsImg from "../../Assests/news.jpg";
import OpinionImg from "../../Assests/opinion.jpg"
import OtherImg from "../../Assests/other.jpg"
import PoliticsImg from "../../Assests/politics.jpg"
import SexImg from "../../Assests/sex.jpg"
import SpaceImg from "../../Assests/space.jpg"
import SportsImg from "../../Assests/sports.jpg"
import TechImg from "../../Assests/tech.jpg"
import EntertainmentImg from "../../Assests/entertainment.jpg"

const BlogCard = ({blog}) => {
    const [isBlogLiked, setIsBlogLiked] = useState(blog?.isLiked)

    const navigate = useNavigate()

    const categoriesMap = {
        news: "News",
        politics: "Politics",
        opinion: "Opinion",
        sports: "Sports",
        entertainment: "Entertainment",
        space: "Space",
        nature: "Nature",
        other: "Other",
        sex: "Sex",
        tech: "Tech"
    }
    const imagesMap = {
        nature: NatureImg,
        news: NewsImg,
        opinion: OpinionImg,
        other: OtherImg,
        politics: PoliticsImg,
        sex: SexImg,
        space: SpaceImg,
        sports: SportsImg,
        tech: TechImg,
        entertainment: EntertainmentImg
    }

    const likeBlog = async () => {
        try {
            const resposnse = await API_MANAGER.likeArticle()
            setIsBlogLiked(true)
        }
        catch (err) {
            const error = err?.response?.data?.error
            message.error(error || "Something went wrong")
        }
    }

    const unlikeBlog = async () => {
        try {
            const resposnse = await API_MANAGER.unLikeArticle()
            setIsBlogLiked(false)
        }
        catch (err) {
            const error = err?.response?.data?.error
            message.error(error || "Something went wrong")
        }
    }

    if (blog) {
        return (
            <Row
                className="blog-card-container hover-pointer"
                onClick={() => navigate(`/blog/${blog.UUID}`)}
            >
            <Col lg={24} xs={24}>
                <img src={imagesMap[blog?.Tags[0]]} alt="image" className='blog-image'/>
            </Col>
            <Col lg={24} xs={24} className="blogs-heading">
                {blog?.Title}
            </Col>
            <Col lg={24} xs={24} className={"tags-container"}>
                {blog?.Tags.map((item, idx) => (<div className={"blog-tag flex-center"}>
                    {categoriesMap[item]}
                </div>))}
            </Col>
            <Col lg={24} xs={24} className="icons-container dflex">
                <div>
                    <EyeOutlined/>
                    <span className='icon-count'>{blog?.Reads}</span>
                </div>
                <div style={{marginLeft: ".5rem"}}>
                    <MessageOutlined/>
                    <span className='icon-count'>{blog?.comment_count}</span>
                </div>
                {IsUserAuthenticated() && (
                    <div style={{marginLeft: "auto"}}>
                        {isBlogLiked ?
                            <HeartFilled
                                style={{color: "rgb(232, 74, 67)"}}
                                onClick={unlikeBlog}
                            /> :
                            <HeartOutlined
                                style={{color: "rgb(232, 74, 67)"}}
                                onClick={likeBlog}
                            />
                        }
                    </div>
                )
                }
            </Col>
        </Row>)
    }
    return <></>
}

export default BlogCard