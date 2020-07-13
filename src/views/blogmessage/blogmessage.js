import React from 'react';
import Nav from 'components/nav/nav'
import AboutLeft from 'components/about-news/about-left/about-left'
import CommentItem from 'components/commentitem/commentitem'
import { message } from 'antd'
import './blogmessage.css'
import { getCommonAriticleList, getBlogComment, addBlogCommentLike, addBlogCommentDisLike, getBlogCommentCount, addBlogComment } from '@/api'
import Header from 'views/header/header.js'
import CopyRight from 'components/copyright/copyright'

export default class BlogMessage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newestAriticleList: [], pageIndex: 0, pageSize: 10, total: 0, comment_count: 0, commentuser_count: 0
        }
    }

    componentWillMount() {
        document.title = '博客留言-当时一样雨';

        let _params = new URLSearchParams();
        _params.append('pageSize', '6')
        this.getNewestAriticleList(_params);

        let param = new URLSearchParams();
        const { pageIndex, pageSize } = this.state;
        param.append('pageIndex', pageIndex);
        param.append('pageSize', pageSize);
        this.getBlogComment(param);

        this.getBlogCommentCount();

    }

    getBlogCommentCount() {
        getBlogCommentCount().then(data => {
            if (data.code === 0) {
                var commentuser_count = data.data.commentuser_count;
                var comment_count = data.data.comment_count
                this.setState({ commentuser_count, comment_count })
            }
        })
    }

    getNewestAriticleList(params) {
        getCommonAriticleList(params).then(data => {
            if (data.code === 0) {
                this.setState({ newestAriticleList: data.data })
            }
        });
    }

    addDisLike = (id) => {
        addBlogCommentDisLike(id).then(data => {

        })
    }

    addLike = (id) => {
        addBlogCommentLike(id).then(data => {

        })
    }


    onPageChange = (pageIndex, pageSize) => {

        let params = new URLSearchParams();
        params.append('pageIndex', pageIndex)
        params.append('pageSize', pageSize)


        this.getBlogComment(params);

        this.setState({ pageIndex, pageSize })
    }

    addComment = (value) => {
        let parmas = new URLSearchParams();
        parmas.append('comment', value)
        addBlogComment(parmas).then(data => {
            if (data.code === 0) {
                //window.location.reload();

                const { pageIndex, pageSize } = this.state;

                let commentParams = new URLSearchParams();
                commentParams.append("pageIndex", pageIndex);
                commentParams.append("pageSize", pageSize);
                this.getBlogComment(commentParams);
                this.getBlogCommentCount();
            } else {
                message.error('发布评论失败')
            }
        });
    }


    getBlogComment(param = null) {
        getBlogComment(param).then(data => {
            if (data.code === 0) {
                this.setState({ commentList: data.data, total: data.totalnum });
            }
        });
    }


    render() {

        const { newestAriticleList, commentList, pageIndex, pageSize, total, comment_count, commentuser_count } = this.state;

        return (
            <div style={{ minHeight: 'calc(100vh)' }}>
                <Header>
                </Header>
                <Nav currentId={6}></Nav>
                <article>
                    <div className="l_box f_l">
                        <div className="topnews">
                            <h2 className="wzh2">您现在的位置是：
                                <a href="#/index">首页</a>&nbsp;&gt;&nbsp;
                                <a href="#/blogmessage">博客留言</a>&nbsp;&gt;&nbsp;
                            </h2>
                        </div>
                        <CommentItem commentList={commentList} current={pageIndex} pageSize={pageSize} onPageChange={this.onPageChange} total={total} addLike={this.addLike} addDisLike={this.addDisLike} comment_count={comment_count} commentuser_count={commentuser_count} addComment={this.addComment} />
                    </div>
                    <AboutLeft newestAriticleList={newestAriticleList} />
                </article>
                <CopyRight></CopyRight>
            </div>
        )
    }
}