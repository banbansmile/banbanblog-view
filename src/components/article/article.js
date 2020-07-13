import React from 'react';
import './article.css'
import AboutNews from '../about-news/about-news'

export default class Article extends React.Component{


    render(){
        return (<article>
            <AboutNews></AboutNews>
        </article>)
    }
}