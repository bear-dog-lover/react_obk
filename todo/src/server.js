import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

const app = express();

app.get('/', (req, res) => {
  // static以下のJS、CSSファイルのパス情報が取得できる
  const assetManifest = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../build/asset-manifest.json'))
  );
  
  // DOCTYPEはJSで描画できないためres.writeで書き出す
  res.write('<!DOCTYPE html>');
  
  const stream = ReactDOMServer.renderToNodeStream(
    /*
      build/index.htmlの内容をJSXとして記述
      - charsetをcharSetにする
      - metaタグなど明示的に閉じる
    */
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>React App</title>
        <link href={assetManifest['main.css']} rel="stylesheet" />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">
          {/* アプリケーションのReact Element */}
          <Propvider store={store}>
            <App />
          </Propvider>
        </div>
        <script type="text/javascript" src={assetManifest['main.js']}></script>
      </body>
    </html>
  );
  
  stream.pipe(res);
});

// その他の静的ファイルを返す
app.use(express.static(path.join(__dirname, '../build')));

// npm run buildからのserve -s buildで起動できるで
app.listen(process.env.NODE_PORT || 3000, err => {
  if (err) {
    console.log('起動失敗', err);
  } else {
    console.log('起動...');
  }
});