import React from 'react';
import ReactDOMServer from 'react-dom/server';

// React ElementをHTMLの文字列に変換
const html = ReactDOMServer.renderToStaticMarkup(
  <h1>Hello, SSR!</h1>
);

console.log(html);