const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};
const formatDate = res => {
    res.toString()
    return `${res.toString().substring(0, 4)}-${res.toString().substring(4, 6)}-${res.toString().substring(6, 8)}`
};

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
};
/**
 * 字符串插入
 * @param  {String} str 要插入到的字符串
 * @param {Number} flg 要插入的起始位置
 * @param {String} sn 要插入的字符串
 * @return {String}
 */
const insertStr = (str, flg, sn) => {
    let arr = str.split("")
    arr.splice(sn, 0, flg);
    let strings = arr.join("");
    return strings
}
/**
 * 产生任意长度随机字母数字组合
 * @param  {Boolean} randomFlag 是否任意长度
 * @param  {Number} min        任意长度最小位[固定位数]
 * @param  {Number} max        任意长度最大位
 * @return {String}            随机字符串
 */
const randomWord = (randomFlag, min, max) => {
    let str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }

    for (var i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }

    return str;
};
/**
 * 深度复制对象
 * @param  {Object} obj 是否任意长度
 * @return {Object} 新对象
 */
const deepClone = (obj) => {
    let result = {};
    for (let key in obj) {
        let copy = obj[key];
        if (_isClass(copy) === "Object") {
            result[key] = copy;
        } else if (_isClass(copy) === "Array") {
            result[key] = copy;
        } else {
            result[key] = obj[key];
        }
    }
    return result;

};
const _isClass = (o) => {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
};
const _format = (time) => {
    let date;
    if (time === '至今') {
        date = 0
    } else if (time === '1998以前') {
        date = 1997
    } else {
        date = time
    }
    return date
}

const reformat = (time) => {
    let date;
    if (time === 0) {
        date = '至今'
    } else if (time < 1998) {
        date = '1998以前'
    } else {
        date = time
    }
    return date
};

const throttle = (fn, gapTime) => {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 1500
    }

    let _lastTime = null

    // 返回新的函数
    return function () {
        let _nowTime = +new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments)   //将this和参数传给原函数
            _lastTime = _nowTime
        }
    }
};
const dataThrottle = throttle((options) => {
    options()
    //return options
});
module.exports = {
    formatTime: formatTime,
    randomWord: randomWord,
    formatDate: formatDate,
    _format: _format,
    reformat: reformat,
    insertStr: insertStr,
    throttle: throttle,
    dataThrottle: dataThrottle
}