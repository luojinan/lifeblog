// 1. 构建时优化 [构建时数据加载](https://vitepress.dev/zh/guide/data-loading)
// 注意：数据将会是静态数据，运行时不会更新
// 2. safari 图片双击问题 - 用html cdn做最小实现
// 
// 3. 字体资源拦截
// 只能移除样式作用效果且阻止不了字体懒加载方式的样式作用，不能阻止网络请求！
// 尝试找gm_xml请求api，但是没有生效，好像只能用来主动触发而不是用来拦截原请求 
// 尝试移除样式link 或者 script 语法也无效... 广告拦截脚本到底是怎么实现的

async function getFaviconUrl(websiteUrl: string) {
  try {
    const response = await fetch(websiteUrl);
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const links = doc.querySelectorAll('link[rel="icon"]');
    if (links.length > 0) {
      const faviconUrl = links[0].getAttribute('href');
      return faviconUrl;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting favicon URL:', error);
    return null;
  }
}


// 调用函数并传入要获取 favicon 的网站 URL
getFaviconUrl('https://www.douban.com/group/topic/301001502')
  .then(faviconUrl => {
    console.log('Favicon URL:', faviconUrl);
  });