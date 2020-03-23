
/*
* 过滤特殊字符
* */



export  function stripscript(str) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*  %()  & ;—|{}【】‘；：”“'。，、？]")
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, '');
  }
  return rs;
}


// 验证邮箱

export  function validateEmail(value) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/

  return !reg.test(value) ? true : false
}


// 验证密码  6 - 20 位数字 字母

export  function validateP(value) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
  return !reg.test(value) ? true : false
}

// 验证验证码

export  function validateC(value) {
  let reg = /^[a-z0-9]{6}$/
  return !reg.test(value) ? true : false
}

