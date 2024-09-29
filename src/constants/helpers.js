function makeArrayWithTrimmedString(str = "") {
  let newArr = str.split(",");
  let res = [];
  for (let i = 0; i < newArr.length; i++) {
    let temp = newArr[i].trim();
    if (temp) {
      res.push(temp);
    }
  }

  return res;
}

module.exports = { makeArrayWithTrimmedString };
