import React from 'react';
import AboutNav from 'components/about-news/about-nav/nav'
import './techright.css'
import NewestAriticle from 'components/about-news/about-newsariticle/newsariticle'
import FriendLinks from 'components/about-news/about-friendlinks/FriendLinks'

export default class TechRight extends React.Component {


    static defaultProps = {
        newestAriticleList: [],
        tagList: []
    }

    tagClik = (id, tag_name, e) => {
        e.preventDefault();
        if (this.props.tagClik) {
            this.props.tagClik(id, tag_name)
        }
    }

    render() {

        const { newestAriticleList, tagList } = this.props;

        return (
            <div className="r_box f_r">
                <div className="tit01 myself-nav">
                    <AboutNav></AboutNav>
                </div>
                <div className="tit01">
                    <h3>最新文章</h3>
                    <NewestAriticle newestAriticleList={newestAriticleList} />
                </div>

                <div className="tit01">
                    <h3>技术分类</h3>
                    <ul className="smile_rank">
                        {
                            tagList.map((tag, index) => {
                                return <li key={index + '_'}><a href="/#" onClick={this.tagClik.bind(this, tag.id, tag.tag_name)} target="_blank" title={tag.tag_name}>{tag.tag_name}</a><span>{tag.ariticle_count}篇</span></li>
                            })
                        }

                    </ul>
                </div>
                <div className="links">
                    <h3>友情链接</h3>
                    <FriendLinks />
                </div>
            </div>
        )
    }
}
