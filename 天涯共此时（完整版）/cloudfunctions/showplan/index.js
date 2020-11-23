// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const c = db.collection("plan_db")

// 云函数入口函数
exports.main = async (event, context) => {
  
  const wxContext = cloud.getWXContext()
  await c.where({
    _openid : wxContext.OPENID
  }).get().then(res=>{console.log(res)})

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}