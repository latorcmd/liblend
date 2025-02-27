# Liblend

簡単な貸出管理システム

## Liblend を利用するために

Liblend を利用する前に、以下のことを行ってください。

### ログインデータベースの設定

Google Apps Script でデータベースを作成します<br>

[Google Drive](https://drive.google.com/)を開き、[liblend/database/admin/orgCodeSheet/LibrendAdmin_orgcodesheet.xlsx](https://github.com/latorcmd/liblend/blob/main/database/admin/orgCodeSheet/LibrendAdmin_orgcodesheet.xlsx)をアップロードします。<br>
アップロードしたファイルを開き、拡張機能＞ Apps Script を押します。<br>
コード.gs に[liblend/database/admin/orgCodeSheet/Code.gs](https://github.com/latorcmd/liblend/blob/main/database/admin/orgCodeSheet/Code.gs)のコードをコピーアンドペーストし、保存します。<br>
デプロイ＞新しいデプロイを押し、表示された画面で歯車マーク＞ウェブアプリを押して、「次のユーザーとして実行」を「自分」、「アクセスできるユーザー」を「全員」にしてデプロイを押します。<br>
自分のアカウントにログインし、プログラムに権限を与えます。<br>
その後、表示された「デプロイ URL」をコピーし、[liblend/liblend_app/login/script.js](https://github.com/latorcmd/liblend/blob/main/liblend_app/login/script.js):41 の"Login Database URL"にペーストします。<br>

### 配布フォルダの作成

Google Drive で配布フォルダを作成します。<br>

[Google Drive](https://drive.google.com/)を開き、新しいフォルダを作成します。<br>
そのフォルダに、[liblend/database/client/adminSheet/Liblend_adminSheet.xlsx](https://github.com/latorcmd/liblend/blob/main/database/client/adminSheet/Liblend_adminSheet.xlsx)をアップロードします。<br>
アップロードしたファイルを開き、拡張機能＞ Apps Script を押します。<br>
コード.gs に[liblend/database/client/adminSheet/Code.gs](https://github.com/latorcmd/liblend/blob/main/database/client/adminSheet/Code.gs)のコードをコピーアンドペーストし、保存します。<br>
先ほど作成したフォルダに戻り、[liblend/database/client/userSheet/Liblend_userSheet.xlsx](https://github.com/latorcmd/liblend/blob/main/database/client/userSheet/Liblend_userSheet.xlsx)をアップロードします。<br>
アップロードしたファイルを開き、拡張機能＞ Apps Script を押します。<br>
コード.gs に[liblend/database/client/userSheet/Code.gs](https://github.com/latorcmd/liblend/blob/main/database/client/userSheet/Code.gs)のコードをコピーアンドペーストし、保存します。<br>
作成したフォルダに共有設定（リンクを知っている全員に閲覧者権限を与える程度がちょうどいいと思います）をし、リンクをコピーします。<br>
[liblend/liblend_account/orgAccount/index.html](https://github.com/latorcmd/liblend/blob/main/liblend_account/orgAccount/index.html):87 の"DistributeFolder"にコピーしたリンクをペーストします。

### Google Books API の設定

Liblend は本の検索のために Google Books API を使用しているため、必要に応じて Google API キーを作成します。<br>

> 営利目的の使用の場合、利用規約に違反する場合があります。その場合はこの項目を飛ばしていただいて構いません。詳しくは[Google の利用規約](https://developers.google.com/books/terms?hl=ja)をご覧ください。

[こちらのページ](https://qiita.com/ryamate/items/2a0cba391829e20009aa)を参考にし、Google API キー を作成してください。<br>
[liblend/liblend_app/login/script.js](https://github.com/latorcmd/liblend/blob/main/liblend_app/login/script.js):135 の"Google API Key"を先ほど作成した Google API キー に書き換えてください。<br>

### (任意)NDL サーチ API の利用申請

Liblend は本の検索のために NDL サーチ API を使用しているため、必要に応じて利用申請をします。<br>

以下の内一つでも当てはまる場合、利用申請をする必要があります。<br>

- 営利企業・団体が利用する場合
- このプログラムの利用によって収益が発生する場合（結果的に赤字となるとしても、何かしらの経済的対価を受け取っている場合はこれに当てはまります）
- 継続的にアクセスが行われる場合（例：ウェブサイトとして公開する・組織の貸出管理システムとして利用するなど）

（詳しくは[国立国会図書館のウェブサイト](https://ndlsearch.ndl.go.jp/help/api)をご覧ください）<br>

利用申請をする必要がある場合、[NDL サーチ API 利用申請フォーム](https://form.ndl.go.jp/form/pub/ndl1/api)（英語版は[Application Programming Interface (API) of the NDL Search: Application Form](https://form.ndl.go.jp/form/pub/ndl1/apien)）から申請してください。<br>

## 準備が終わったら

準備が終わったら、[liblend/index.html](https://github.com/latorcmd/liblend/blob/main/index.html)を開き、ヘッダーの「Account」を押し、利用規約を読んだ後、「同意して登録する」を押し、その後の画面の指示に従って組織アカウントを作成してください。
