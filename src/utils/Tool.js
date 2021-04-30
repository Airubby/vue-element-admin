//时间格式化
export function FormatDate(fmt,value){
    let date=value?new Date(value):new Date();
    let o = {
        'M+': date.getMonth() + 1, //月份 
        'd+': date.getDate(), //日 
        'H+': date.getHours(), //小时 
        'm+': date.getMinutes(), //分 
        's+': date.getSeconds(), //秒 
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度 
        'S': date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;
}
//获取时间前一段时间  json:{key:"标识",value:2}  标识：y年 m月 d日 h时；value给数字
export function GetBeforeDate(json,tdate){
    let date=tdate?new Date(tdate):new Date();
    if(json&&json.key){
        switch (json.key) {
            case 'y':
                date=new Date(date.setFullYear(date.getFullYear()-json.value));
                break;
            case 'm':
                date=new Date(date.setMonth(date.getMonth()-json.value));
                break;
            case 'd':
                date=new Date(date.setDate(date.getDate()-json.value));
                break;
            case 'h':
                date=new Date(date.setHours(date.getHours()-json.value));
                break;
            default:
                break;
        }
    }
    return date;
}
export function arrayContains(v,arr){
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
export function listToTree(data,option){
    if(data&&data.length>0){
        let options=option||{};
        let ID_KEY=options.idKey||'id';
        let PARENT_KEY=options.parentKey||'pid';
        let CHILDREN_KEY=options.childrenKey||'children';
        let tree=[],childrenOf={};
        for(let i=0;i<data.length;i++){
            var item,id,parentId;
            item=data[i];
            id=item[ID_KEY];
            parentId=item[PARENT_KEY]||'0';
            //每行数据都可能存在子类
            childrenOf[id]=childrenOf[id]||[];
            //初始化子类
            item[CHILDREN_KEY]=childrenOf[id];
            if(parentId!='0'){
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
export function equalsObj(objOne,objTwo){
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
export function arrToObj(arr){
    const obj = arr.reduce((acc, cur) => {
        acc[cur.key] = cur.value
        return acc
    }, {})
    return obj
}
// 根据数组中对象的某个属性去重arr数组，objKey对象的判断key
export function arrUniqueFromObjkey(arr,objKey) {
    const res = new Map();
    return arr.filter((a) => !res.has(a[objKey]) && res.set(a[objKey], 1))
}
//判断两个区间是否存在重叠交叉
//总结1 . 满足max(A.start,B.start)<=min(A.end,B.end)，即重复 这里的等于的时候是两个区间挨着的状态
//总结2 . 满足A.end< B.start || A.start > B.end，即不重复
//Math.min.apply(null, [1, 2, 3]) 等价于 Math.min(1, 2, 3)
//arrA:[start,end];arrB:[start,end]
export function extentCross(arrA,arrB) {
    var max=[arrA.start,arrB.start];
    var min=[arrA.end,arrB.end];
    if(Math.max.apply(null, max)<= Math.min.apply(null, min)){
        return true;
    }
    return false;
}
//数组的交集、并集、补集、差集
export function gatherHandle(arrA,arrB,type){
    const arrASet = new Set(arrA),arrBSet = new Set(arrB);
    switch (type) {
        case 'intersection': // 交集
            return arrA.filter(item => arrBSet.has(item))
        case 'union': //并集
            return Array.from(new Set([...arrA, ...arrB]))
        case 'complement': //补集
            return [...arrA.filter(item => !arrBSet.has(item)), ...arrB.filter(item => !arrASet.has(item))]
        case 'diff': //差集
            return arrA.filter(item => !arrBSet.has(item))
        default:
            return Array.from(new Set([...arrA, ...arrB]))
    }
}
//删除数组中的指定元素
export function removeArritem(array,element){
    array.splice(array.findIndex(item => item === element), 1);
}

export default {
    arrayContains,
    FormatDate,
    GetBeforeDate,
    listToTree,
    equalsObj,
    arrToObj,
    arrUniqueFromObjkey
}