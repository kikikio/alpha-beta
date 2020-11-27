// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const c = db.collection("usernote")
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var value = event.text

  c.where({
    _openid : _.exists(false)
  }).add({
    Note:new Array()
  })

  c.where({
    _openid:_.exists(true)
  }).update({
    data:{
      Note:_.push(value)
    }
  })

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}