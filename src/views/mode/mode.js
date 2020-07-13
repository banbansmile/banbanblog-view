import React from 'react';
import Nav from 'components/nav/nav'
import './mode.css'
import AboutLeft from 'components/about-news/about-left/about-left'
import { getCommonModList, getCommonAriticleList } from '@/api'
import Header from 'views/header/header.js'
import CopyRight from 'components/copyright/copyright'


export default class Mode extends React.Component {



    state = { modList: [], newestAriticleList: [] }

    componentWillMount() {
        document.title = '心情随笔-当时一样雨';

        getCommonModList().then(data => {
            if (data.code === 0) {
                this.setState({ modList: data.data })
            }
        })

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

        const { modList,newestAriticleList} = this.state;

        return (
            <div style={{minHeight:'calc(100vh)'}}>
                <Header>
                </Header>
                <Nav currentId={1}></Nav>
                <div className="article">
                    <div className="l_box f_l">
                        <div className="topnews">
                            <h2>
                                <span>
                                    <a href="#/index">返回首页&gt;&gt;</a>
                                </span>
                                <b>心情</b>随笔
                        </h2>
                            {
                                modList.map((mod, index) => (
                                    <div className="mood" key={index + '_'}>
                                        <span className="tutime">{mod.add_time}</span>
                                        <p>{mod.content}</p>
                                    </div>
                                ))
                            }
                            <div className="pagelist">
                            </div>
                        </div>
                    </div>
                    <AboutLeft newestAriticleList={newestAriticleList}/>
                </div>
                <CopyRight></CopyRight>
            </div>
        )
    }
}