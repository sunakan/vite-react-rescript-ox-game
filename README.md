## 最初にやること

```sh
$ npx degit jihchi/vitejs-template-react-rescript app
```


## 完成後のディレクトリ/ファイル構成

```sh
$ tree -I "node_modules|lib|dist" app
app
├── Makefile
├── README.md
├── bsconfig.json
├── index.html
├── package-lock.json
├── package.json
├── public
│   ├── favicon.svg
│   └── global.css
├── src
│   ├── App.css
│   ├── App.mjs   # トランスパイルされたjs
│   ├── App.res   # res(実装)
│   ├── App.resi  # resi(インターフェース)
│   ├── Main.mjs  # トランスパイルされたjs
│   └── Main.res  # res(実装)
└── vite.config.js

2 directories, 15 files
```
