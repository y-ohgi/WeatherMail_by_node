# 天気をメールで通知


## Description
午後傘が必要な天気だった場合午前中にメールで通知をする


## Usage


```
$ npm install
$ node index.js
```

**ルートディレクトリに以下ファイルを作成**
```javascript
// config.js
exports.fromaddress = function(){
    return "***@gmail.com";
};
exports.frompass = function(){
    return "password";
};
exports.toaddress = function(){
    return "****@example.com";
};

```


## 使用させていただいたAPI
http://www.drk7.jp/weather  
http://www.drk7.jp/weather/xml/13.xml
