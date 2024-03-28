
- [ ] 画廊页面设计
- [x] 图片放大功能 [github](https://github.com/vuejs/vitepress/issues/854)
- [x] 字数统计

![](https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/blog/20240124152951388.png?x-oss-process=image/format,webp/resize,w_640)
问题是不支持移动端双指缩放、拖拽移动，PC也仅仅是把原图宽高展示出来，不支持再放大缩小，从源码上看也仅仅是普通的全屏查看图片，并没有其他交互逻辑

使用 PhotoSwipe
![](https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/blog/20240125152240923.png?x-oss-process=image/format,webp/resize,w_640)

通过遍历img标签添加点击事件，创建放大图层，因为 PhotoSwipe 需要预设图片宽高，所以除了处理图片url为oss的原图宽高外，还要获取到图片的宽高比例

```ts
/**
 * 获取图片的宽度、高度和宽高比
 * @param src 图片链接
 * @returns 返回一个包含图片宽度、高度和宽高比的对象
 */
export const getImgWh = (src:string):Promise<{ width: number, height: number,ratio: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      const width = this.width;
      const height = this.height;
      resolve({
        width,
        height,
        ratio: height/width
      })
    };
    // oss图片宽度设置为最小，以节省流量，用来获取宽高比，实际使用时自行设置宽高
    img.src = `${src}/resize,w_10`
  })
}
```

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
