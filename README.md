# Software Design Guide

`software_design_guide` は GitHub Pages で公開する静的サイトです。

## ファイル構成

- `index.html`: 本文とコンテンツ構造
- `assets/css/main.css`: スタイル定義
- `assets/js/main.js`: インタラクション（コピー、目次ハイライト、チェック操作）
- `assets/images/ogp-default.svg`: OGP画像
- `404.html`: 404ページ
- `robots.txt`: クローラー制御
- `sitemap.xml`: サイトマップ

## 更新手順

1. 本文修正は `index.html` を更新
2. 見た目修正は `assets/css/main.css` を更新
3. 挙動修正は `assets/js/main.js` を更新
4. 公開日更新時は `sitemap.xml` の `lastmod` を更新

## ローカル確認

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開いて確認してください。

## 公開後チェック

- レイアウト崩れがない
- 目次の現在地ハイライトが動作する
- Deep Dive と用語索引のコピー動作が動作する
- `https://oshirohiroki.github.io/robots.txt` が表示できる
- `https://oshirohiroki.github.io/sitemap.xml` が表示できる
- OGP画像がメタタグで参照されている

## 注意

User/Org Pages 前提で URL を `https://oshirohiroki.github.io/` に設定しています。別ドメインや Project Pages に変更する場合は、`index.html` の canonical/OGP/Twitter URL と `robots.txt`、`sitemap.xml` を更新してください。
