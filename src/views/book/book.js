import React from 'react';
import Nav from 'components/nav/nav'
import Header from 'views/header/header.js'
import CopyRight from 'components/copyright/copyright'

export default class Book extends React.Component {


  componentWillMount() {
    document.title = '个人书屋-当时一样雨';
  }


  render() {
    return (
      <div style={{ minHeight: 'calc(100vh)' }}>
        <Header>
        </Header>
        <Nav currentId={5}></Nav>
        <div className="bookom" style={{minHeight: 'calc(100vh - 100px)',width:'100%'}}>

        </div>
        <CopyRight></CopyRight>
      </div>
    )
  }
}