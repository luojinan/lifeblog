export default function (md) {
  const image = md.renderer.rules.image
  md.renderer.rules.image = (...args) => {
    let rawCode = image(...args);
    const regex = /src=["']([^"']+)["']/;
    const match = rawCode.match(regex);

    if (match) {
      // 找出带src的图片md语法
      const [, srcValue] = match;
      return `<a href="${srcValue.replace(/\/resize.*?\//, '/').replace(/\/resize.*$/, '')}" data-fancybox>${rawCode}</a>`
    } else {
      return rawCode
    }
  }
}