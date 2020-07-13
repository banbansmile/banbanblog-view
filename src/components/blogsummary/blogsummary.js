

import React from 'react';
import './blogsummary.css';
import { addZanCount } from '@/api'

export default class BlogSummary extends React.Component {

    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.state = { islike: false, article: { content: '', description: '', image: '', title: '', id: 0, type_name: '', visit_count: '', zan_count: 0, isLike: '', update_time: '' } }
    }

    static defaultProps = {
        islike: false,
        article: { content: '', description: '', image: '', title: '', id: 0, type_name: '', visit_count: '', zan_count: 0, isLike: false, update_time: '' }
    }

    componentWillMount() {
        this.setState({
            isLike: this.props.islike,
            article: this.props.article,
            zan_count: this.props.article.zan_count
        });
    }

    handleOnClick = () => {


        const { isLike } = this.state;
        if (isLike) {
            return;
        }

        const { id } = this.state.article;

        addZanCount(id).then(data => {
            if (data.code === 0) {
                this.setState((prevState) => ({ isLike: true, zan_count: prevState.zan_count + 1 }));
            }
        });


    }


    render() {

        const { description, image, title, id, type_name, visit_count, update_time, comment_count, type_id } = this.state.article;
        const { zan_count, isLike } = this.state;

        var link = (<span></span>)
        if (type_id === 1) {
            //韶华追忆
            link = (<a href='#/past'>{type_name}</a>);
        }

        if (type_id === 2) {
            //技术分享
            link = (<a href='#/tech'>{type_name}</a>);
        }

        if (type_id === 3) {
            //关于我
            link = (<a href='#/about'>{type_name}</a>)
        }


        return (
            <div className="blog">
                <figure><a href={`#/ariticle/detail/${id}`} target="_blank" rel="noopener noreferrer" title={title}><img src={image} alt={title} /></a></figure>
                <ul>
                    <h3><a href={`#/ariticle/detail/${id}`} target="_blank" rel="noopener noreferrer" title={title}>{title}</a></h3>
                    <p className="blogContent">{description.substring(0, 160)}...<a href={`#/ariticle/detail/${id}`} target="_blank" rel="noopener noreferrer" title={title}>[详情]</a></p>
                    <p className="blogstate">
                        <span className="aboutme f_l">{link}</span>
                        <span className="dtime f_l">{update_time}</span>
                        <span className={`addlikecount f_r ${isLike ? "afteraddlikecount" : ''}`} onClick={this.handleOnClick}><a href="/#">{zan_count}</a></span>
                        <span className="viewnum f_r"><a href={`#/ariticle/detail/${id}`} target="_blank" rel="noopener noreferrer">浏览({visit_count})</a></span>
                        <span className="pingl f_r"><a href={`#/ariticle/detail/${id}`} target="_blank" rel="noopener noreferrer">评论({comment_count})</a></span>
                    </p>
                </ul>
            </div>
        )
    }

}