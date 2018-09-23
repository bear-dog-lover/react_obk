import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import App from './App';

// リクエストを受け付けるWebサーバの構築
const app = express();

// GET /client.bundle.js
// client.bundle.jsの内容をそのまま返す
app.get('/client.bundle.js', (req, res) => {
  const retPath = path.join(__dirname, 'dist/client.bundle.js');
  console.log(retPath);
  return res.sendFile(retPath);
});

// HTMLコンポーネント
// Appコンポーネントを含む大枠のHTML
// 内容はtest.htmlとほぼ同じ
function HTML({ now, children }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <title>シンプルなサーバサイドレンダリング</title>
      </head>
      <body>
        {/* 描画先要素 */}
        <div id="root">{children}</div>
        
        {/*  データ引継ぎ用 */}
        <script
          type="text/plain"
          id="server-now"
          data-server-now={now.getTime() + ''}
        ></script>
        
        {/* webpackが出力したファイル */}
        {/*
          http://localhost:3000/client.bundle.jsにGETリクエストが飛び、
          冒頭のパターンに当てはまり、ファイルが返される
         */}
        <script src="client.bundle.js"></script>
      </body>
    </html>
  );
}

// GET /
// サーバサイトレンダリングの結果のHTMLを返す
app.get('/', (req, res) => {
  const now = new Date();
  const stream = ReactDOMServer.renderToNodeStream(
    <HTML now={now}>
      <App renderedAt={now} />
    </HTML>
  );
  
  // クライアントにレスポンスを返す
  stream.pipe(res);
});

// ポート3000番でサーバを起動
app.listen(3000, () => {
  console.log('ポート3000番で起動...');
});