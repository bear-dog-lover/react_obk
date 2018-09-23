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
function HTML({ contents, now }) {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <title>シンプルなサーバサイドレンダリング</title>
      </head>
      <body>
        {/* 描画先要素 */}
        <div id="root" dangerouslySetInnerHTML={{ __html: contents }}></div>
        
        {/*  データ引継ぎ用 */}
        <script
          type="text/plain"
          id="server-now"
          data-server-now={now.getTime() + ''}
        ></script>
        
        {/* webpackが出力したファイル */}
        <script src="./dist/client.bundle.js"></script>
      </body>
    </html>
  );
}

// GET /
// サーバサイトレンダリングの結果のHTMLを返す
app.get('/', (req, res) => {
  const now = new Date();
  const contentsHTML = ReactDOMServer.renderToString(
    <App renderedAt={now} />
  );
  
  // サーバサイドレンダリングの結果を大枠のHTMLで囲う
  const fullHTML = ReactDOMServer.renderToStaticMarkup(
    <HTML contents={contentsHTML} now={now} />
  );
  
  // クライアントにレスポンスを返す
  res.send(fullHTML);
});

// ポート3000番でサーバを起動
app.listen(3000, () => {
  console.log('ポート3000番で起動...');
});