// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const c = db.collection("group")

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var group_name = event.group_name
  var group_charger = wxContext.OPENID
  var group_members = new Array()
  group_members.push(group_charger)

  c.add({
    data:{
      Group_Name : group_name,
      Group_Charger : group_charger,
      Group_Members = group_members
    }
  }).then(res=>{console.log(res)})
  
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}