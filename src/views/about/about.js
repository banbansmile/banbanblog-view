import React from 'react';
import Nav from 'components/nav/nav';
import { getCommonAriticleList } from '@/api'
import BlogSummary from 'components/blogsummary/blogsummary'
import AboutLeft from 'components/about-news/about-left/about-left'
import Header from 'views/header/header.js'
import CopyRight from 'components/copyright/copyright'

export default class About extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ariticleList: [], newestAriticleList: []
        }
    }

    componentWillMount() {
        document.title = '关于我-当时一样雨';

        let params = new URLSearchParams();
        params.append('typeIds', '3')
        this.getCommonAriticleList(params);

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

    getCommonAriticleList(params) {

        getCommonAriticleList(params).then(data => {
            if (data.code === 0) {
                this.setState({ ariticleList: data.data })
            }
        });
    }


    render() {

        let { ariticleList, newestAriticleList } = this.state;

        return (
            <div style={{minHeight:'calc(100vh)'}}>
                <Header>
                </Header>
                <Nav currentId={7}></Nav>
                <article>
                    <div className="l_box f_l">
                        <h2>关于我</h2>
                        {
                            ariticleList.map((article, index) => (
                                <BlogSummary key={index} article={article} type="关于我"></BlogSummary>
                            ))
                        }
                    </div>
                    <AboutLeft newestAriticleList={newestAriticleList} />
                </article>
                <CopyRight></CopyRight>
            </div>
        )
    }
}