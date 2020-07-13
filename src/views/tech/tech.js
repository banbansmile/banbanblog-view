import React from 'react';
import Nav from 'components/nav/nav'
import { Pagination } from 'antd'
import BlogSummary from 'components/blogsummary/blogsummary'
import TechRight from 'components/techright/techright'
import { getCommonAriticleList, getTagAriticleCountList } from '@/api'
import Header from 'views/header/header.js'
import CopyRight from 'components/copyright/copyright'


export default class Tech extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ariticleList: [], newestAriticleList: [], pageIndex: 1, pageSize: 10,
            total: 0, typeIds: 2, tagList: [], tagIds: '', tag_name: ''
        }
    }

    componentWillMount() {

        document.title = '技术分享-当时一样雨';
        const { pageIndex, pageSize } = this.state

        let params = new URLSearchParams();
        params.append('typeIds', '2')
        params.append('pageIndex', pageIndex);
        params.append('pageSize', pageSize);
        this.getCommonAriticleList(params);

        let _params = new URLSearchParams();
        _params.append('pageSize', '6')
        this.getNewestAriticleList(_params);


        getTagAriticleCountList().then(data => {
            if (data.code === 0) {
                this.setState({ tagList: data.data })
            }
        })

    }

    getCommonAriticleList(params) {

        getCommonAriticleList(params).then(data => {
            if (data.code === 0) {
                this.setState({ ariticleList: data.data, total: data.totalnum })
            }
        });
    }

    getNewestAriticleList(params) {
        getCommonAriticleList(params).then(data => {
            if (data.code === 0) {
                this.setState({ newestAriticleList: data.data })
            }
        });
    }

    onChange = (pageIndex, pageSize) => {


        const { typeIds, tagIds } = this.state;

        let params = new URLSearchParams();
        params.append('typeIds', typeIds)
        params.append('pageIndex', pageIndex)
        params.append('pageSize', pageSize)
        if (tagIds !== '') {
            params.append('tagIds', tagIds)
        }

        this.setState({ ariticleList: [] })
        this.getCommonAriticleList(params);

        this.setState({ pageIndex, pageSize })
    }

    tagClik = (id, tag_name) => {
    

        const pageIndex = 1, pageSize = 10;

        let params = new URLSearchParams();
        params.append('pageIndex', pageIndex)
        params.append('pageSize', pageSize)
        params.append('typeIds', '2')
        params.append('tagIds', id)
        this.setState({ tagIds: id, pageIndex,pageSize,tag_name, ariticleList: [] });
        this.getCommonAriticleList(params);
    }



    render() {

        const { ariticleList, newestAriticleList, pageIndex, pageSize, total, tagList, tag_name } = this.state

        return (
            <div style={{minHeight:'calc(100vh)'}}>
                <Header>
                </Header>
                <Nav currentId={3}></Nav>
                <article>
                    <div className="l_box f_l">
                        <div className="topnews">
                            <h2>
                                <span>
                                    <a href="#/index">返回首页&gt;&gt;</a>
                                </span>
                                <b>技术分享</b>
                                {
                                    tag_name !== '' && <b>&nbsp;&gt;&nbsp;当前标签:&nbsp;&nbsp;{tag_name}</b>
                                }
                            </h2>
                            {

                                ariticleList.map((article, index) => (
                                    <BlogSummary key={index} article={article} type="关于我"></BlogSummary>
                                ))
                            }
                        </div>
                        <div className="pagination" style={{ 'marginTop': '30px', 'marginBottom': '50px' }}>
                            <Pagination defaultCurrent={1} size="small" showTotal={total => `共 ${total} 篇文章`} current={pageIndex} pageSize={pageSize} onChange={this.onChange} total={total} hideOnSinglePage={true} />
                        </div>

                    </div>
                    <TechRight newestAriticleList={newestAriticleList} tagList={tagList} tagClik={this.tagClik} />
                </article>
                <CopyRight></CopyRight>
            </div>
        )
    }
}