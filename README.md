# 個人ウェブサイト（Tristan Ryoma Fuchs / フックストリスタン龍馬）

1ページ構成・日英切り替え付きの研究者向け個人サイトです。依存ライブラリなし（HTML + CSS + 少量のJS）。
配色・書体は「副指導教員面談2026夏」「ポスターデザイン」のスライドに合わせています
（ティール #3AB0A2 / 濃ティール #3F8070 / 差し色オレンジ #DD5520 / Noto Sans JP）。

## ファイル構成

```
index.html          骨格とメタ情報だけ。通常は触らない（公開URL https://tristanfuchs1024.github.io/ を設定済み）
content.js          ★ サイトの中身はすべてここ。文言・項目の追加・修正はこのファイルだけでよい
style.css           見た目。配色は冒頭の :root 変数で一括変更できる
app.js              content.js からページを組み立てる処理と、言語切替・目次追従・↑ボタン。通常は触らない
assets/profile.jpg  顔写真（正方形推奨。無ければイニシャル "TF" が表示される）
assets/cv.pdf       CVのPDF（cv/cv.html から書き出したもの）
assets/og.png       SNS共有時のサムネイル（1200x630、設定済み）
cv/cv.html          英語CVの元データ（HTML）。内容を直したらここを編集して PDF を書き出し直す
cv/cv.pdf           書き出したCV（assets/cv.pdf と同じもの）
```

## 内容の編集のしかた（content.js）

- 英語と日本語で文言が違うものは `{ en: '英語', ja: '日本語' }` と書く。
  両言語で同じもの（論文題目・人名・英語の会議名など）は `'文字列'` と書くだけでよい。
- 文字列の中では HTML が使える（`<a href="…">リンク</a>`、`<sub>3</sub>`、`<br>`）。
- 項目を追加するときは、同じ配列の要素をコピーして書き換える。並び順は新しいものが上。
- 発表の項目の形:

  ```js
  {
    id: 'pres-xxxx',                       // 受賞欄などからリンクするときだけ付ける（任意）
    when: { en: 'Sep 2026', ja: '2026年9月' },
    title: '英語の題目',                    // 日本語だけの題目なら日本語の文字列をそのまま
    badges: [POSTER, UPCOMING],            // POSTER / ORAL / UPCOMING / BEST_POSTER を組み合わせる
    meta: AUTHORS_EN + ' — 会議名, 会場, 都市, 国'   // 国内会議なら AUTHORS_JA + ' — 会議名（会場、都市）'
  }
  ```

- 学歴・経歴の項目は `when` / `title` / `meta` / `notes: [ … ]` を持つ。`meta: { en: '…' }` のように
  片方の言語だけ書くと、その言語のページにだけ表示される。
- セクションの順番・目次は `sections` 配列の順番で決まる。セクションを消すときは配列から要素を削除するだけ。
- 論文が採択されたら、`publications` の `venue` を誌名・巻・ページ（DOI リンク付き）に書き換え、`badge` を削除する。
- 発表予定の項目には `UPCOMING` バッジを付け、発表が終わったら外す。

## 表記のルール（現在の方針）

- 国際会議の項目は日本語ページでも全て英語、国内会議の項目は英語ページでも日本語のまま。バッジだけが言語で切り替わる。
- 賞の名前は言語で切り替える（Best Poster Award / 優秀ポスター賞）が、会議名は原語のまま。
- 日本語ページの日付は「2026年9月」、英語ページは「Sep 2026」。日単位の日付や講演番号は書かない。

## スマホ表示

- 幅900px以下では、サイドバーの代わりにコンパクトなヘッダー（写真・名前・所属、白いカードの自己紹介、ボタン列）になり、
  目次と言語切り替えは画面上部に固定される細いバーに移ります。スマホ向けの見た目は `style.css` の
  `@media (max-width: 900px)` ブロックだけで決まっており、デスクトップ表示には影響しません。

## 日英切り替えの仕組み

- サイドバー右上の「EN / 日本語」ボタンで切り替わる。選択はブラウザに記憶され、初回はブラウザの言語設定で決まる。
- `?lang=ja` / `?lang=en` を URL に付けると、その言語で開く（リンク共有用）。
- ページの表示には JavaScript が必要（content.js から組み立てるため）。
- メールのボタンは押すとアドレスが「tristan at g.ecc.u-tokyo.ac.jp」の形でコピーされる（@ はページ上にもコピー内容にも含めない）。

## 確認のしかた

`index.html` をブラウザで開くだけで表示できます（`file://` でも動作します）。
ローカルサーバーで見る場合は、このフォルダで次を実行して http://localhost:8123 を開きます。

```bash
python -m http.server 8123
```

## CV（英語・PDF）の更新

- `cv/cv.html` を編集する。発表・受賞・資格の並びはサイトと同じ「新しいものが上」。
- PDF の書き出しは、`cv/cv.html` をブラウザ（Edge / Chrome）で開き、印刷 → 「PDF に保存」、用紙 A4、余白「既定」、
  「ヘッダーとフッター」オフ、「背景のグラフィック」オンで保存する。2ページに収まるように文字量を調整している。
- 書き出した PDF を `assets/cv.pdf` に上書きする（サイトの「CV (PDF)」ボタンはここを指している）。
- 予定の発表には `Scheduled` タグ（`<span class="tag plan">Scheduled</span>`）を付け、終わったら外す。
- 学会発表がサイトと同じかどうか、更新のたびに `content.js` と見比べる。

## 顔写真

- `assets/profile.jpg` は正方形（現在 400×400）。差し替えるときは顔が中央に来るように正方形に切り抜いた JPEG を同名で上書きする。
  サイトでは丸く切り抜かれて表示される（デスクトップ 112px、スマホ 64px）。

## 公開のしかた（GitHub Pages・無料）

1. 公開用リポジトリは https://github.com/TristanFuchs1024/TristanFuchs1024.github.io 。
2. `index.html`、`content.js`、`style.css`、`app.js`、`assets/`、`cv/`、`.nojekyll` を push する。
3. Settings → Pages → Branch を `main` / `(root)` にして Save。
4. 数分後に `https://tristanfuchs1024.github.io/` で公開される。
5. ORCID のプロフィールにサイトURL（https://tristanfuchs1024.github.io/）と arXiv 論文を登録しておくと、検索から辿りやすくなる。

## 更新の習慣

- 学会発表のたびに `content.js` の `presentations` に1項目足す。
- `content.js` の `updated`（最終更新）の月を書き換える。
