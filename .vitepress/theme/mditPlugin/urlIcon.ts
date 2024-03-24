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