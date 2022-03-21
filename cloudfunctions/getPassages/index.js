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
    case "getHots": return getHots(event)
    case "getCollections": return getCollections(event)
    default:
      break;
  }

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}

getCollections = async (event) =>{
  console.log({_id:_.in(event.collections)}) 
  // return {_id:_.in(event.collections)}
  let articles = await db.collection("Articles").where({
    _id:_.in(event.collections)
  }).get()
  return articles
}

getHots = async (event) =>{
  let articles = await db.collection("Articles").where(event.options).limit(event.limit).skip(event.skip).get()
  return articles
}





