import {Button, Col, Input, message, Row, Select} from 'antd'
import React, {useEffect, useState} from 'react'
import SubHeader from '../../components/SubHeader'
import {UserIcon} from '../../utils/svg'
import {
    FacebookFilled,
    HeartFilled,
    HeartOutlined,
    MoreOutlined,
    TwitterOutlined,
    YoutubeOutlined
} from "@ant-design/icons"
import "./blogDetail.scss"
import BlogCard from '../../components/BlogCard'
import API_MANAGER from '../../API'
import {useParams} from 'react-router-dom'
import moment from "moment";
import {IsUserAuthenticated} from "../../utils/middlewares";

const BlogDetailpage = () => {
    const [showButtons, setShowButtons] = useState(false)
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState([])
    const [isBlogLiked, setIsBlogLiked] = useState(false)
    const [blogDetail, setBlogDetail] = useState({})

    const isUserAuthenticated = IsUserAuthenticated()

    const commentsSortOptions = [
        {
            label: "Newest",
            value: "newest"
        },
        {
            label: "Oldest",
            value: "oldest"
        },
    ]

    const comments = [
        {
            author: "Unknown Member",
            value: "I am a comment",
            publishedOn: "31 March 2023"
        },
        {
            author: "Unknown Member",
            value: "I am a comment",
            publishedOn: "31 March 2023"
        },
        {
            author: "Unknown Member",
            value: "I am a comment",
            publishedOn: "31 March 2023"
        },
        {
            author: "Unknown Member",
            value: "I am a comment",
            publishedOn: "31 March 2023"
        },
    ]

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

    const {id} = useParams()

    useEffect(() => {
        getBlogDetail()
        getComments()
        checkIsCommentLiked()
    }, [])

    const getBlogDetail = async () => {
        try {
            const response = await API_MANAGER.getBlogDetail(id)
            setBlogDetail(response?.data?.article)
        } catch (err) {
            console.log("Something went wrong")
        }
    }

    const getComments = async () => {
        try {
            const response = await API_MANAGER.getComments(id)
            const parsedData = response?.data?.comments?.map((item, idx) => (
                {
                    author: item?.Username,
                    publishedOn: moment(item?.CreationTime).format("DD MMM YYYY"),
                    timeStamp: item?.CreationTime,
                    value: item?.Content
                }
            ))
            parsedData.sort((a, b) => moment(b?.timeStamp).diff(moment(a?.timeStamp)))
            setAllComments(parsedData)
        }
        catch (err) {
            const error = err?.response?.data?.error
            message.error(error || "Something went wrong")
        }
    }

    const postComment = async () => {
        try {
            const parsedData = {
                content: comment
            }
            const response = await API_MANAGER.postComment(id, parsedData)
            message.success("Comment added successfully")
            setComment("")
            getComments()
        }
        catch (err) {
            const error = err?.response?.data?.error
            message.error(error || "Something went wrong")
        }
    }

    const checkIsCommentLiked = async () => {
        try {
            const response = await API_MANAGER.isArticleLiked(id)
            setIsBlogLiked(response?.data?.is_liked)
        }
        catch (err) {
            const error = err?.response?.data?.error
            message.error(error || "Something went wrong")
        }
    }

    const likeBlog = async () => {
        try {
            const resposnse = await API_MANAGER.likeArticle(id)
            setIsBlogLiked(true)
        }
        catch (err) {
            const error = err?.response?.data?.error
            message.error(error || "Something went wrong")
        }
    }

    const unlikeBlog = async () => {
        try {
            const resposnse = await API_MANAGER.unLikeArticle(id)
            setIsBlogLiked(false)
        }
        catch (err) {
            const error = err?.response?.data?.error
            message.error(error || "Something went wrong")
        }
    }

    const reorderComments = (order) => {
        const comments = [...allComments]
        if (order === "newest")
            comments.sort((a, b) => moment(b?.timeStamp).diff(moment(a?.timeStamp)))
        else if (order === "oldest")
            comments.sort((a, b) => moment(a?.timeStamp).diff(moment(b?.timeStamp)))
        setAllComments(comments)
    }

    const renderDetailContent = () => {
        return (
            <div className='content-container'>
                <Row className="content-header" justify="space-between">
                    <Col>
                        <Row gutter={14} align="middle">
                            <Col className='align-center'>
                                <UserIcon className="user-icon"/>
                                <span className='author'>{blogDetail?.Author}</span>
                            </Col>
                            <Col className='seperator-dots'/>
                            <Col className='created-date'>{moment(blogDetail?.creationTime).format("DD MMM YYYY")}</Col>
                            <Col className='seperator-dots'/>
                            <Col className='reading-time'>2 min read</Col>
                        </Row>
                    </Col>
                    <Col className='align-center'>
                        <MoreOutlined style={{fontSize: "20px"}} className="more-icon"/>
                    </Col>
                </Row>
                <div className='content-body'>
                    <h1 className='blog-title'>{blogDetail?.Title}</h1>
                    <div className='blog-content'>
                        {blogDetail?.Text}
                    </div>
                </div>
                <Row gutter={[0, 16]} className="content-footer">
                    <Col lg={24} xs={24}>
                        {blogDetail?.Tags?.map((item, idx) => (
                            <span
                                className='blog-tag'
                                key={idx}
                            >
                                {categoriesMap[item]}
                            </span>
                        ))}
                    </Col>
                    <Col lg={24} xs={24} className="dflex space-btw bordered-box">
                        <div className='icons-container'>
                            <FacebookFilled className="social-icons"/>
                            <TwitterOutlined className="social-icons"/>
                            <YoutubeOutlined className="social-icons"/>
                        </div>
                        <div>
                            News
                        </div>
                    </Col>
                    <Col lg={24} xs={24} className="dflex space-btw">
                        <div className='blog-stats'>
                            <span>{blogDetail?.Reads} views</span>
                            <span>{allComments?.length} comments</span>
                        </div>
                        <div>
                            {isUserAuthenticated && (
                                isBlogLiked ?
                                <HeartFilled
                                    style={{color: "rgb(232, 74, 67)"}}
                                    onClick={unlikeBlog}
                                /> :
                                <HeartOutlined
                                    style={{color: "rgb(232, 74, 67)"}}
                                    onClick={likeBlog}
                                />
                                )
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

    const renderRecentPosts = () => {
        return (
            <Row className="recent-posts-container" gutter={[32, 25]}>
                <Col lg={24} xs={24} className="align-center space-btw">
                    <span style={{fontSize: "18px"}}>Recent Posts</span>
                    <span>See All</span>
                </Col>
                <Col lg={8}>
                    <BlogCard/>
                </Col>
                <Col lg={8}>
                    <BlogCard/>
                </Col>
                <Col lg={8}>
                    <BlogCard/>
                </Col>
            </Row>
        )
    }

    const renderCommentsSection = () => {
        return (
            <div className='comments-main-container'>
                <Row gutter={[0, 25]}>
                    <Col lg={24} xs={24} className="comments-heading">
                        Comments
                    </Col>
                    <Col lg={24} xs={24}>
                        <Input
                            placeholder='Write a comment...'
                            onFocus={() => setShowButtons(true)}
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                        />
                    </Col>
                    {showButtons &&
                        <Col lg={24} xs={24} className="dflex">
                            <div className='comment-button-container'>
                                <Button
                                    className='cancel-button'
                                    onClick={() => setComment("")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className='success-button'
                                    disabled={comment?.length === 0}
                                    onClick={postComment}
                                >
                                    Publish
                                </Button>
                            </div>
                        </Col>
                    }
                </Row>
                <div className='comments-display-container'>
                    <Row>
                        <Col lg={24} xs={24}>
                            <span style={{marginRight: ".5rem"}}>Sort by:</span>
                            <Select
                                options={commentsSortOptions}
                                defaultValue="newest"
                                style={{width: "10rem"}}
                                onChange={(e) => reorderComments(e)}
                            />
                        </Col>
                        {allComments.map((item, idx) => (
                            <Col lg={24} xs={24} className="comment-item">
                                <Row gutter={8}>
                                    <Col>
                                        <UserIcon className="user-icon" style={{marginTop: ".5rem"}}/>
                                    </Col>
                                    <Col className='comments-inner-container'>
                                        <div>{item?.author}</div>
                                        <div>{item?.publishedOn}</div>
                                        <div style={{marginTop: "1rem"}}>{item.value}</div>
                                    </Col>
                                </Row>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        )
    }

    return (
        <div className="blog-detail-main-container">
            <SubHeader/>
            {renderDetailContent()}
            {renderRecentPosts()}
            {isUserAuthenticated && renderCommentsSection()}
        </div>
    )
}

export default BlogDetailpage