/**
 *  유니코드인지 체크 함수
 *
 * @param {string} s
 * @returns {string}
 */
const isUnicode = s => {
  return /[^\u0000-\u00ff]/.test(s);
};

/**
 * 유니코드 디코딩
 * @param {string} s
 * @returns {string}
 */
export const decodeUnicode = s => {
  if (isUnicode(s))
    return decodeURIComponent(JSON.parse('"' + s.replace(/\"/g, '\\"') + '"'));
  else return s;
};

/**
 * semantic ui > dropdown 데이터 포맷에 맞게 변환
 * 예시) {key: [{key:0, value: "job.latest_order", text: "최신순"}]
 *
 * @param {array}   data
 * @param {string}  value
 * @param {string}  text
 * @returns {object}
 */
export const convertDropdownFormat = (data, value, text) => {
  let newObj = {};
  Object.keys(data).forEach(key => {
    const newValue = data[key].map(e => ({
      ...e,
      objkey: key,
      value: e[value],
      text: e[text]
    }));
    newObj[key] = newValue;
  });
  return newObj;
};
