import React from 'react';
import './App.css';
import Router from './router/Router';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <Router >
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
