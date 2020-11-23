// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const c = db.collection("plan_db")
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var task_name = event.task_name
  var task_begin = event.task_begin
  var task_end = event.task_end
  var note = event.note


  var obj = {
    Task_Name : task_name,
    Task_Begin : task_begin,
    Task_End : task_end,
    Note : note
  }

  // 如果不存在记录就创建一个新的计划数组
  c.where({
    _openid:_.exists(false)
  }).add({
    data:{
      Task : new Array()
    }
  })

  // 如果存在记录就把新的计划加入
  c.where({
    _openid:_.exists(true)
  }).update({
    data:{
      Task : _.push(obj)
    }
  })

  
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }

}