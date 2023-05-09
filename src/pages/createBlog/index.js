import React, {useState} from 'react'
import "./create-blog.scss"
import {Button, Col, Form, Input, message, Row} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import API_MANAGER from '../../API'

const CreateBlogPage = () => {
    const [selectedTags, setSelectedTags] = useState([])

    const blogTags = [{
        label: "Sports", value: "sports"
    }, {
        label: "Opinion", value: "opinion"
    }, {
        label: "Politics", value: "politics"
    }, {
        label: "News", value: "news"
    }, {
        label: "Entertainment", value: "entertainment"
    }, {
        label: "Nature", value: "nature"
    }, {
        label: "Sex", value: "sex"
    }, {
        label: "Tech", value: "tech"
    }, {
        label: "Space", value: "space"
    }, {
        label: "Other", value: "other"
    },]


    const submitBlog = async (data) => {
        if (selectedTags?.length === 0) {
            message.error("Please select a tag")
            return
        }
        const parsedData = {
            ...data,
            tags: selectedTags
        }
        try {
            const response = await API_MANAGER.writeBlog(parsedData)
            message.success("Blog submitted successfully")
        } catch (err) {
            message.error("Something went wrong")
        }
    }

    const handleTagSelection = (item) => {
        const isItemPresent = selectedTags.find((tag) => tag === item) !== undefined
        if (isItemPresent) {
            setSelectedTags(selectedTags.filter((tag) => tag !== item))
        } else {
            if (selectedTags.length === 3) {
                message.error("Maximum 3 tags can be selected")
            } else {
                setSelectedTags(([...selectedTags, item]))
            }
        }
    }

    return (<div className='write-blog-main-container'>
        <Form
            onFinish={submitBlog}
        >
            <Form.Item
                name="title"
            >
                <Input
                    placeholder='Title'
                />
            </Form.Item>
            <Form.Item
                name="text"
            >
                <TextArea
                    placeholder='Content'
                    className='content-box'
                />
            </Form.Item>
            <div className="tags-container">
                {blogTags.map((item, idx) => (<span
                    className={"tag-container"}
                >
                            <Button
                                className={
                                    selectedTags.find((tag) => tag === item?.value) ?
                                        "flex-center tag-selected" :
                                        "flex-center"
                                }
                                onClick={() => handleTagSelection(item?.value)}
                            >
                                {item?.label}
                            </Button>
                        </span>))}
            </div>
            <Form.Item>
                <Button
                    htmlType='submit'
                    className='submit-button'
                    size='large'
                >
                    Publish
                </Button>
            </Form.Item>
        </Form>
    </div>)
}

export default CreateBlogPage