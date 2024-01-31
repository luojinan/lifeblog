/**
 * 统计字符串中的中文字符数量
 * @param str 待统计的字符串
 * @returns 中文字符数量
 */
export function countChineseCharacters(str: string) {
  const pattern = /[\u4e00-\u9fa5]/g; // 匹配中文字符的正则表达式
  const matches = str.match(pattern); // 使用正则表达式匹配所有中文字符
  return matches ? matches.length : 0; // 返回匹配到的中文字数
}

/**
 * 计算阅读时间
 * @param chineseCharacterCount 需要阅读的汉字数量
 * @param readingSpeed 阅读速度（每分钟阅读的汉字数量）
 * @returns 阅读完指定汉字数量所需的时间（以分钟为单位）
 */
export function calculateReadingTime(chineseCharacterCount: number, readingSpeed: number = 200): number {
  const readingTimeInMinutes = chineseCharacterCount / readingSpeed;
  return Math.ceil(readingTimeInMinutes);
}

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