// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  console.log(event)
  switch (event.action) {
    case "getUsers": return getUsers(event)
      break;
  }


  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}

getUsers = async (event) =>{
  let Users = await db.collection("Users").where(event.options).limit(event.limit).skip(event.skip).get()
  return Users
}