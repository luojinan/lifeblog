## 切换githubPage/giteePage

只能重定向过于强制...

```js
fetch('https://ipinfo.io/json')
  .then(response => response.json())
  .then(data => {
    const country = data.country;
    if (country === 'CN') {
      window.location.href = 'gitee';
    } else {
    }
  })
  .catch(error => {
    console.log('获取 IP 地址时发生错误:', error);
  });
```
