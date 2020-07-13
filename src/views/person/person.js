import React from 'react';
import Nav from 'components/nav/nav'
import './person.css'
import { getAllAriticleSimpleInfo } from '@/api'
import Header from 'views/header/header.js'
import CopyRight from 'components/copyright/copyright'

export default class Person extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0, year: [], isYearShouw: [], data: []
        }
    }


    componentWillMount() {

        document.title = '个人归档-当时一样雨';

        let { year, isYearShouw } = this.state;

        getAllAriticleSimpleInfo().then(data => {

            if (data.code === 0) {
                data.data.forEach(a => {
                    year.push(a.year);
                    isYearShouw.push(true);
                });
                this.setState({ year, isYearShouw, data: data.data });
            }
        });
    }

    onClickYear = (index) => {


        const { isYearShouw } = this.state;
        var newIsYearShow = [];

        for (var i = 0; i < isYearShouw.length; i++) {
            if (i < index) {
                newIsYearShow.push(false)
            } else {
                newIsYearShow.push(true)
            }
        }


        this.setState({ currentIndex: index, isYearShouw: newIsYearShow })
    }


    render() {

        const { currentIndex, year, isYearShouw, data } = this.state;

        return (
            <div style={{ minHeight: 'calc(100vh)' }}>
                <Header>
                </Header>
                <Nav currentId={4}></Nav>
                <article style={{ minHeight: 'calc(100vh)' }}>
                    <div className="l_box f_l">
                        <div className="topnews">
                            <div className="box">
                                <ul className="event_year">
                                    {
                                        year.map((y, index) => {
                                            if (index === currentIndex) {
                                                return <li className="current" key={index + '__'}><label>{y}</label></li>
                                            } else {
                                                return <li onClick={this.onClickYear.bind(this, index)} key={index + '__'}><label>{y}</label></li>
                                            }

                                        })
                                    }

                                </ul>
                                <ul className="event_list">
                                    {
                                        data.map((y, index) => {
                                            return (isYearShouw[index] && <div key={index + '_'}>
                                                <h3 id="2019">{y.year}</h3>
                                                {
                                                    y.list.map((ariticle, index1) => {
                                                        return (<li key={index1 + '___'}>
                                                            <span>{ariticle.description}</span>
                                                            <p>
                                                                <span>
                                                                    <a href={`#/ariticle/detail/${ariticle.id}`} title={ariticle.title} target="_blank" rel="noopener noreferrer">{ariticle.title}</a>
                                                                </span>
                                                            </p>
                                                        </li>)
                                                    })
                                                }
                                            </div>)
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </article>
                <CopyRight></CopyRight>
            </div>
        )
    }
}