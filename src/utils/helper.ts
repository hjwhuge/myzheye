import { ColumnProps } from "@/store";

interface CheckCondition {
  format?: string[];
  size?: number;
}
type ErrorType = "size" | "format" | null;
export function beforeUploadCheck(file: File, condition: CheckCondition) {
  const { format, size } = condition;
  const isValidFormat = format ? format.includes(file.type) : true;
  const isValidSize = size ? file.size / 1024 / 1024 < size : true;
  let error: ErrorType = null;
  if (!isValidFormat) {
    error = "size";
  }
  if (!isValidSize) {
    error = "format";
  }
  // console.log(isValidFormat, isValidSize, error);
  return {
    passed: isValidFormat && isValidSize,
    error,
  };
}

/**
 * 数组去重（每一项是对象）
 * @param  {array} arr 去重的数组
 * @param  {string} key 每个对象的唯一值
 * @return {array}      返回一个去重之后的对象
 */

export function arrayDeduplication(arr: Array<ColumnProps>, key: 'id' | 'columnName') {
  arr = arr.filter((currentValue, index, arr) => {
    return index === arr.findIndex((t) => t[key] === currentValue[key])
  })
  return arr;
}
