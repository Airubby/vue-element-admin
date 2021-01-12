import echarts from 'echarts'
import Vue from 'vue'
import axios from 'axios'

//时间格式化
function FormatDate(fmt,value){
  let date=value?new Date(value):new Date();
  let o = {
      "M+": date.getMonth() + 1, //月份 
      "d+": date.getDate(), //日 
      "H+": date.getHours(), //小时 
      "m+": date.getMinutes(), //分 
      "s+": date.getSeconds(), //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
//获取时间前一段时间  json:{key:"标识",value:2}  标识：y年 m月 d日 h时；value给数字
function GetBeforeDate(json,tdate){
    let date=tdate?new Date(tdate):new Date();
    if(json&&json.key){
        switch (json.key) {
            case "y":
                date=new Date(date.setFullYear(date.getFullYear()-json.value));
                break;
            case "m":
                date=new Date(date.setMonth(date.getMonth()-json.value));
                break;
            case "d":
                date=new Date(date.setDate(date.getDate()-json.value));
                break;
            case "h":
                date=new Date(date.setHours(date.getHours()-json.value));
                break;
            default:
                break;
        }
    }
    return date;
}
function arrayContains(v,arr){
  if(arr.indexOf(v)==-1){
    return false;
  }else{
    return true;
  }
}
/*
普通列表转真树形结构
listToTree(list,{idKey:"id",parentKey:"pid",childrenKey:"children"})
 */
function listToTree(data,option){
    if(data&&data.length>0){
        let options=option||{};
        let ID_KEY=options.idKey||"id";
        let PARENT_KEY=options.parentKey||"pid";
        let CHILDREN_KEY=options.childrenKey||"children";
        let tree=[],childrenOf={};
        for(let i=0;i<data.length;i++){
            var item,id,parentId;
            item=data[i];
            id=item[ID_KEY];
            parentId=item[PARENT_KEY]||"0";
            //每行数据都可能存在子类
            childrenOf[id]=childrenOf[id]||[];
            //初始化子类
            item[CHILDREN_KEY]=childrenOf[id];
            if(parentId!="0"){
                //初始化其父的子节点
                childrenOf[parentId]=childrenOf[parentId]||[];
                //把它推到父类下的children
                childrenOf[parentId].push(item);
            }else{
                tree.push(item);
            }
        }
        return tree;
    }else{
        return [];
    }
}
//判断两个对象是否相等
function equalsObj(objOne,objTwo){
    if(Object.keys(objOne).length!=Object.keys(objTwo).length){
        return false;
    }
    for (let key in objOne) {
        if(objOne[key]!==objTwo[key]){
            return false;
        }
    }
    return true;
}
// arr[{key:'CN',value:'China'}] to obj, such as { CN : "China", US : "USA" }
function arrToObj(arr){
    const obj = arr.reduce((acc, cur) => {
        acc[cur.key] = cur.value
        return acc
    }, {})
    return obj
}

export default {
    arrayContains,
    FormatDate,
    GetBeforeDate,
    listToTree,
    equalsObj,
    arrToObj
}