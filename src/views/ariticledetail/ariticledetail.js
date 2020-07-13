import React from 'react';
import Nav from 'components/nav/nav'
import './ariticledetail.css'
import AboutLeft from 'components/about-news/about-left/about-left'
import CommentItem from 'components/commentitem/commentitem'
import { getCommonAriticleById, getAriticleCommentList, getCommonAriticleList, addLikeCount, addDisLikeCount, addAriticleComment } from '@/api'
import Header from 'views/header/header.js'
import CopyRight from 'components/copyright/copyright'
import Prism from 'prismjs';

export default class AriticleDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1, pageSize: 10, total: 0, id: 0,
            data: { 'current': { content: '' }, id: 0, commentList: [], navId: -1, link: <a href='#/index'> </a>, newestAriticleList: [] }
        }
    }


    componentWillMount() {

        let id = this.props.match.params.id

        if (id === undefined) {
            id = 0;
        }
        this.setState({ id });

        let params = new URLSearchParams();
        params.append("getNext", true)

        this.getCommonAriticleById(id, params);


        const { pageIndex, pageSize } = this.state;
        let commentParams = new URLSearchParams();
        commentParams.append("pageIndex", pageIndex);
        commentParams.append("pageSize", pageSize);
        this.getAriticleCommentList(id, commentParams);

        params.append('pageSize', 6)
        this.getNewestAriticleList(params);

    }

    getNewestAriticleList(params) {
        getCommonAriticleList(params).then(data => {
            if (data.code === 0) {
                this.setState({ newestAriticleList: data.data })
            }
        });
    }

    getCommonAriticleById(id, params) {
        getCommonAriticleById(id, params).then(data => {
            if (data.code === 0) {

                var navId = -1;

                var link = (<a href='/#index'> </a>);

                if (data.data.current) {
                    const { type_id } = data.data.current;

                    if (type_id === 1) {
                        navId = 2   //韶华追忆
                        link = (<a href='/#past'>{data.data.current.type_name}</a>);
                    }

                    if (type_id === 2) {
                        navId = 3;  //技术分享
                        link = (<a href='/#tech'>{data.data.current.type_name}</a>);
                    }

                    if (type_id === 3) {
                        navId = 7   //关于我
                        link = (<a href='/#about'>{data.data.current.type_name}</a>)
                    }
                }

                this.setState({ data: data.data, navId, link })
                Prism.highlightAll();
            }
        });
    }

    getAriticleCommentList(id, params) {
        getAriticleCommentList(id, params).then(data => {
            if (data.code === 0) {
                this.setState({ commentList: data.data, total: data.totalnum })
            }
        });
    }


    onPageChange = (pageIndex, pageSize) => {

        const { id } = this.state;

        let params = new URLSearchParams();
        params.append('pageIndex', pageIndex)
        params.append('pageSize', pageSize)


        this.getAriticleCommentList(id, params);

        this.setState({ pageIndex, pageSize })
    }

    componentDidMount() {
        Prism.highlightAll();
    }

    componentWillReceiveProps(newProps) {


        let id_ = newProps.match.params.id

        if (id_ === undefined) {
            return;
        }
        let { id } = this.state;
        if (id_ !== id) {
            this.setState({ id: id_ })
            let params = new URLSearchParams();
            params.append("getNext", true)
            this.getCommonAriticleById(id_, params);
        }

        this.setState({ pageIndex: 1, pageSize: 10 })

        let commentParams = new URLSearchParams();
        commentParams.append("pageIndex", 1);
        commentParams.append("pageSize", 10);

        this.getAriticleCommentList(id, commentParams);


    }


    addLike = (id) => {
        addLikeCount(id).then(data => {
            if (data.code === 0) {

            }
        })
    }

    addDisLike = (id) => {
        addDisLikeCount(id).then(data => {
            if (data.code === 0) {

            }
        })

    }

    addComment = (value) => {

        const { id } = this.state;

        let params = new URLSearchParams();
        params.append('comment', value)
        params.append('ariticleId', id)

        addAriticleComment(params).then(data => {
            if (data.code === 0) {

                let commentParams = new URLSearchParams();
                commentParams.append("pageIndex", 1);
                commentParams.append("pageSize", 10);

                this.getAriticleCommentList(id, commentParams);


                let params = new URLSearchParams();
                params.append("getNext", true)

                this.getCommonAriticleById(id, params);

            }
        })

    }



    render() {

        const { data, commentList, navId, link, newestAriticleList, pageIndex, pageSize, total } = this.state

        if (data.current && data.current.title) {
            document.title = data.current.title + '-当时一样雨'
        }

        return (
            <div className="ariticleDetail" style={{ minHeight: 'calc(100vh - 250px)' }}>
                <Header>
                </Header>
                <Nav currentId={navId}></Nav>
                <article>
                    <div className="l_box f_l">
                        <div className="topnews">
                            <h2 className="wzh2">您现在的位置是：
                                <a href="#/index">首页</a>&nbsp;&gt;&nbsp;
                                {link}&nbsp;&gt;&nbsp;
                            </h2>
                        </div>
                        <div className="news_title">{data.current ? data.current.title : ''}</div>
                        <div className="news_author">
                            <span className="au01">{data.current ? data.current.user_name : ''}</span>
                            <span className="au02">{data.current ? data.current.add_time : ''}</span>
                        </div>
                        <div className="news_content" dangerouslySetInnerHTML={{ __html: data.current.content ? data.current.content : '' }}>
                        </div>
                        <div className="copyright_author">
                            <p><strong>版权声明：</strong>本站原创文章，于{data.current ? data.current.add_time : ''}，由<a href="#/ariticle/detail/1" >{data.current ? data.current.user_name : ''}</a>发表</p>
                            <p className="p-hidden"><strong>转载请注明：</strong><a href={`#/ariticle/detail/${data.curren ? data.current.id : 0}`} >{data.curren ? data.current.title : ''}</a> | <a href="#/index">当时一样雨</a></p>
                        </div>
                        <div className="nextpage">
                            {
                                data.last !== undefined && <p><b>上一篇:</b> <a href={`#/ariticle/detail/${data.last.id}`}>{data.last.title}</a></p>
                            }
                            {
                                data.next !== undefined && <p><b>下一篇:</b> <a href={`#/ariticle/detail/${data.next.id}`}>{data.next.title}</a></p>
                            }
                        </div>
                        <div className="commentItem">
                            <CommentItem commentList={commentList} addComment={this.addComment} current={pageIndex} pageSize={pageSize} onPageChange={this.onPageChange} total={total} addLike={this.addLike} addDisLike={this.addDisLike} comment_count={data.current ? data.current.comment_count : 0} commentuser_count={data.current ? data.current.commentuser_count : 0} />
                        </div>

                    </div>
                    <AboutLeft newestAriticleList={newestAriticleList} />
                </article>
                <CopyRight >
                </CopyRight >
            </div>)
    }
}
