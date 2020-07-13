import React from 'react';
import './about-news.css'
import { articles } from '../article/data';
import BlogSummary from '../blogsummary/blogsummary'
import AboutLeft from './about-left/about-left'

export default class AboutNews extends React.Component {

    render() {
        return (
            <div>
                <div className="l_box f_l">
                    <h2>关于我</h2>
                    {
                        articles.map((article, index) => (
                            <BlogSummary key={index} article={article} type="关于我"></BlogSummary>
                        ))
                    }
                </div>
                <AboutLeft />
            </div>
        )
    }
}