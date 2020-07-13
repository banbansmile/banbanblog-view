import React from 'react';
import Nav from 'components/nav/nav'
import './past.css'
import BlogSummary from 'components/blogsummary/blogsummary'
import AboutLeft from 'components/about-news/about-left/about-left'
import { getCommonAriticleList } from '@/api'
import Header from 'views/header/header.js'
import CopyRight from 'components/copyright/copyright'

export default class Past extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            ariticleList: [],newestAriticleList:[]
        }
    }

    componentWillMount() {
        document.title = '韶华追忆-当时一样雨';

        let params = new URLSearchParams();
        params.append('typeIds', '1')
        getCommonAriticleList(params).then(data => {
            if (data.code === 0) {
                this.setState({ ariticleList: data.data })
            }
        });


        let _params = new URLSearchParams();
        _params.append('pageSize', '6')
        this.getNewestAriticleList(_params);


    }


    getNewestAriticleList(params) {
        getCommonAriticleList(params).then(data => {
            if (data.code === 0) {
                this.setState({ newestAriticleList: data.data })
            }
        });
    }


    render() {

        const { ariticleList,newestAriticleList } = this.state;

        return (
            <div style={{minHeight:'calc(100vh)'}}>
                <Header>
                </Header>
                <Nav currentId={2}></Nav>
                <article>
                    <div className="l_box f_l">
                        <div className="topnews">
                            <h2>
                                <span>
                                    <a href="#/index">返回首页&gt;&gt;</a>
                                </span>
                                <b>韶华</b>追忆
                            </h2>
                            {

                                ariticleList.map((article, index) => (
                                    <BlogSummary key={index} article={article} type="关于我"></BlogSummary>
                                ))}
                        </div>
                    </div>
                    <AboutLeft newestAriticleList={newestAriticleList}/>
                </article>
                <CopyRight></CopyRight>
            </div>
        )
    }
}