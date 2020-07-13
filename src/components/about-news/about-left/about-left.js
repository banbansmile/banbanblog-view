import React from 'react';
import AboutNav from '../about-nav/nav'
import '../about-news.css'
import NewestAriticle from '../about-newsariticle/newsariticle'
import FriendLinks from '../about-friendlinks/FriendLinks'

export default class AboutLeft extends React.Component {

    static defaultProps={
        newestAriticleList:[],
        showConcern:false
    }

    render() {

        const {newestAriticleList,showConcern}=this.props;

        return (
            <div className="r_box f_r">
                {showConcern&&<div className="tit01">
                    <h3>关注我</h3>
                    <div className="gzwm">
                        <ul>
                            <li><a className="xlwb" href="/#" target="_blank" rel="noopener noreferrer">新浪微博</a></li>
                            <li><a className="txwb" href="/#" target="_blank" rel="noopener noreferrer">腾讯微博</a></li>
                            <li><a className="wx" href="mailto:1264350861@qq.com">邮箱</a></li>
                            <li><a className="feedback" href="#/blogmessage">意见反馈</a></li>
                        </ul>
                    </div>
                </div>
                }
                <div className="tit01 myself-nav">
                    <AboutNav></AboutNav>
                </div>
                <div className="tit01">
                    <h3>最新文章</h3>
                    <NewestAriticle newestAriticleList={newestAriticleList}/>
                </div>
                <div className="links">
                    <h3>友情链接</h3>
                    <FriendLinks />
                </div>
            </div>
        )
    }
}

