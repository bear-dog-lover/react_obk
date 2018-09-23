import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// サーバからのデータ
const serverNowString = 
  document.getElementById('server-now').getAttribute('data-server-now');
// サーバのDateインスタンスを復元する
const now = new Date(
  // 文字列から数値に変換する
  parseInt(serverNowString, 10)
);

ReactDOM.hydrate(
  <App renderedAt={now} />,
  document.getElementById('root')
);