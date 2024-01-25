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