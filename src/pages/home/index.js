import {Col, Row, message, Button} from 'antd'
import React, {useEffect, useState} from 'react'
import BlogCard from '../../components/BlogCard'
import "./homePage.scss"
import API_MANAGER from '../../API'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
    const [blogsList, setBlogsList] = useState([])
    const [blogsToDisplay, setBlogsToDisplay] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [showFilters, setShowFilters] = useState(false)
    const [pageNo, setPageNo] = useState(1)

    const categories = [
        {
            label: "News",
            value: "news"
        },
        {
            label: "Politics",
            value: "politics"
        },
        {
            label: "Opinion",
            value: "opinion"
        },
        {
            label: "Sports",
            value: "sports"
        },
        {
            label: "Entertainment",
            value: "entertainment"
        },
        {
            label: "Nature",
            value: "nature"
        },
        {
            label: "Space",
            value: "space"
        },
        {
            label: "Technology",
            value: "tech"
        },
        {
            label: "Sex",
            value: "sex"
        },
        {
            label: "Other",
            value: "other"
        },
    ]

    useEffect(() => {
        getBlogsList()
    }, [])

    const getBlogsList = async () => {
        try {
            const response = await API_MANAGER.getBlogsList(pageNo)
            console.log(response, '-------blogs-list------')
            setBlogsList(response?.data?.articles)
            setBlogsToDisplay(response?.data?.articles)
        } catch (err) {
            message.error("Something went wrong")
        }
    }

    const renderBlogCategories = () => {
        return blogsToDisplay.map((item, idx) => {
            if (idx % 3 === 0) {
                return (
                    <Row
                        className={(idx / 3) % 2 === 0 ? 'blog-category-container grey-background' : 'blog-category-container'}
                        key={item.value}
                        gutter={32}
                    >
                        {/*<Col lg={24} className="blog-category-name">*/}
                        {/*    {item.label}*/}
                        {/*</Col>*/}
                        <Col lg={8}>
                            <BlogCard blog={item}/>
                        </Col>
                        <Col lg={8}>
                            <BlogCard blog={blogsToDisplay[idx + 1]}/>
                        </Col>
                        <Col lg={8}>
                            <BlogCard blog={blogsToDisplay[idx + 2]}/>
                        </Col>
                    </Row>
                )
            }
            return null
        }).filter((item) => item !== null)
    }

    const renderBlogFilters = () => {
        return (
            <Row className={"blog-filters-container"} gutter={[0, 16]}>
                <Col lg={3} xs={24}>
                    <Button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`filter-button align-center ${showFilters ? "show-filters" : ""}`}
                    >
                        Quick Filters
                        {selectedTags.length > 0 && <div className={"selected-count flex-center"}>{selectedTags.length}</div>}
                        <FontAwesomeIcon icon={faFilter}/>
                    </Button>
                </Col>
                {showFilters && <Col lg={21} xs={24} className={"inner-container align-center"}>
                    {categories?.map((item, idx) => (
                        <Button
                            onClick={() => filterBlogs(item.value)}
                            key={item.value}
                            className={selectedTags.includes(item?.value) && "selected"}
                        >
                            {item?.label}
                        </Button>
                    ))}
                </Col>
                }
            </Row>
        )
    }

    const filterBlogs = (value) => {

        const shouldRemoveBlog = (blog) => {
            return !blog?.Tags.some((item) => updatedTags.includes(item))
        }

        const isItemPresent = selectedTags.find((tag) => tag === value) !== undefined
        const updatedTags = selectedTags.filter((tag) => tag !== value)
        if (isItemPresent) {
            if (selectedTags?.length === 1) {
                setBlogsToDisplay(blogsList)
            } else {
                setBlogsToDisplay(blogsToDisplay.filter((blog) => !shouldRemoveBlog(blog)))
            }
            setSelectedTags(updatedTags)
        } else {
            const additionalBlogs = blogsList.filter((blog) => blog?.Tags.includes(value))
            if (selectedTags?.length === 0) {
                setBlogsToDisplay(additionalBlogs)
            } else {
                const updatedBlogsToDisplay = [...blogsToDisplay, ...additionalBlogs]
                setBlogsToDisplay(updatedBlogsToDisplay.filter((item, idx) => updatedBlogsToDisplay.indexOf(item) === idx))
            }
            setSelectedTags([...selectedTags, value])
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
            duration: 5000
        });
    }

    return (
        <div className='home-page-container'>
            {renderBlogFilters()}
            {renderBlogCategories()}
            <div
                className='back-to-top-button'
                onClick={() => scrollToTop()}
            >
                Back to Top
            </div>
        </div>
    )
}

export default HomePage