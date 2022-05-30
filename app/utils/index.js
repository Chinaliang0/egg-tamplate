'use strict'

const xml2js = require('xml2js')
// 导出解析XML的方法
function parseXMLAsync(xml) {
    return new Promise(function (resolve, reject) {
        xml2js.parseString(xml, { explicitArray: true }, function (err, content) {
            err ? reject(err) : resolve(content)
        })
    })
}

const getSmsCode = num => {
    let str = ''
    for (let i = 0; i < num; i++) {
        str += Math.floor(Math.random() * 10)
    }
    return str
}

module.exports = {
    parseXMLAsync,
    getSmsCode,
}
