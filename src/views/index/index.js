import React from 'react';
import Nav from 'components/nav/nav'
import { Carousel } from 'antd';
import './index.css'
import BlogSummary from 'components/blogsummary/blogsummary'
import { getCommonAriticleList, getTop2AriticleCount } from '@/api'
import IndexAboutLeft from 'components/about-news/about-left/index-about-left'
import Header from 'views/header/header.js'
import CopyRight from 'components/copyright/copyright'


export default class Index extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            ariticleList: [],
            newestAriticleList: [], topAriticleType: []
        }
    }

    componentWillMount() {
        document.title = '首页-当时一样雨';

        let params1 = new URLSearchParams();
        params1.append('pageSize', 10)
        getCommonAriticleList(params1).then(data => {
            if (data.code === 0) {
                this.setState({ ariticleList: data.data })
            }
        });

        let params = new URLSearchParams();
        params.append('pageSize', 6)
        this.getNewestAriticleList(params);

        this.getTop2AriticleCount();

    }

    getTop2AriticleCount() {
        getTop2AriticleCount().then(data => {
            if (data.code === 0) {
                this.setState({
                    topAriticleType: data.data
                });
            }
        })
    }

    getLink(ariticle_type, index) {
        var link = (<a href='#/index' target="_blank" rel="noopener noreferrer" key={'_ddd'}> </a>)

        if (ariticle_type.id === 1) {
            link = (<a href='/#past' key={index + '_'} target="_blank" rel="noopener noreferrer">{ariticle_type.type_name}({ariticle_type.count})</a>);
        }

        if (ariticle_type.id === 2) {
            link = (<a href='/#tech' key={index + '_'} target="_blank" rel="noopener noreferrer">{ariticle_type.type_name}({ariticle_type.count})</a>);
        }

        if (ariticle_type.id === 3) {
            link = (<a href='/#about' key={index + '_'} target="_blank" rel="noopener noreferrer">{ariticle_type.type_name}({ariticle_type.count})</a>)
        }
        return link;
    }

    getNewestAriticleList(params) {
        getCommonAriticleList(params).then(data => {
            if (data.code === 0) {
                this.setState({ newestAriticleList: data.data })
            }
        });
    }

    render() {

        const { ariticleList, newestAriticleList, topAriticleType } = this.state;

        return (
            <div style={{ minHeight: 'calc(100vh)' }}>
                <Header>
                </Header>
                <Nav currentId={0}></Nav>
                <article>
                    <div className="l_box f_l">
                        <div className="banner">
                            <div className="photo-slide f_l luara-top">
                                <Carousel >
                                    <div>
                                        <img src={require("./img/aboutblog.jpg")} alt="关于博客" />
                                    </div>
                                    <div>
                                        <img src={require("./img/aboutfriendlink.jpg")} alt="关于友情链接" />

                                    </div>
                                    <div>
                                        <img src={require("./img/aboutbookroom.jpg")} alt="关于书屋" />
                                    </div>
                                    <div>
                                        <img src={require("./img/aboutme.jpg")} alt="关于博主" />
                                    </div>
                                </Carousel>
                            </div>
                            <div className="slide-text f_r">
                                <section className="text01">
                                    <h3>
                                        <a href="#/ariticle/detail/1" target="_blank" rel="noopener noreferrer">
                                            关于博主
                                        </a>
                                    </h3>
                                    <p>九零后,双鱼座,IT界最不着调的程序员, 爱好：竹笛、摄影、读书、写文字、闲逛、吃零食</p>
                                </section>
                                <section className="text02">
                                    <h3>
                                        <a href="#/ariticle/detail/2" target="_blank" rel="noopener noreferrer">关于博客</a>
                                    </h3>
                                    <p>认认真真写一下这个，在很早以前我就想通过自己的努力来写一个属于自己的博客,但是 </p>
                                </section>
                            </div>
                        </div>
                        <div className="topnews">
                            <h2>
                                <span>
                                    {
                                        topAriticleType.map((ariticle_type, index) => {
                                            return this.getLink(ariticle_type, index)
                                        })
                                    }
                                </span>
                                <b>最新</b>文章
                            </h2>
                            {

                                ariticleList.map((article, index) => (
                                    <BlogSummary key={index} article={article} type="关于我"></BlogSummary>
                                ))

                            }


                        </div>
                    </div>
                    <IndexAboutLeft newestAriticleList={newestAriticleList} showConcern={true} />
                </article>
                <CopyRight >
                </CopyRight >
            </div>
        )
    }
}