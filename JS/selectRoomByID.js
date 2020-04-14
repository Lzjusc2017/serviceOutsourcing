/**
 *      created by 2020-4-13 author Lzjusc2017
 * */

$(document).ready(function(){
    //解析json数组,直接data[i]操作即可
    console.log("选择商品通过id");
});
/**
 *  @param element 标签类型
 *  设置对应的文本值显示
 * */
function setText(element){
    let chooseID = document.getElementById(element.id);
    let showText = document.getElementById("showControlText");
    showText.innerText = chooseID.innerText;
}

/**
 *  @param element 标签类型
 *  选择不同的值，执行不同的操作
 * */
function check(element){
    let queryText = document.getElementById("queryText").value;
    let l = document.getElementById("showControlText").innerHTML;
    let url = "../../hotel_ai/room/";  //默认showControlText
    console.log(l);
    let json = {};
    if (l === "选择搜索类型"){
        alert("请先选择搜索类型");
        return false;
    }
    if (l === "id"){
        json.id = Number(queryText);
    }
    else if (l === "房间"){
        url = url + "searchRoom";
        json.roomNumber = Number(queryText);
    }
    else if (l === "楼层"){
        url = url + "selectRoomListByRoomFloor";
        json.page = 1;
        json.limit = 50;
        json.roomFloor = Number(queryText);
    }else if (l === "房间类型"){
        url = url + "searchRoom";
        json.page = 1;
        json.limit = 50;
        json.roomType = queryText;
    }else if (l === "床型"){
        url = url + "searchRoom";
        json.page = 1;
        json.limit = 50;
        json.roomBedType = queryText;
    }
    url = url + ".jsp";
    console.log("url:" + url);
    //执行ajax操作.
    setAjaxData(url,json);
}
/**
 * @param url 网址
 * @param json json数据
 *      设置ajax数据
 * */

function setAjaxData(url,json){
    $.post(url,json,function(data, status) {
        if (status === 200 || status === "success"){
            //返回成功了,解析json数据
            $("tbody").empty();
            for(let i=0;i<data.length;i++){
                let tr=document.createElement("tr");
                for(let key in data[i]){
                    let a = document.createElement("td");
                    a.innerText = data[i][key];
                    tr.append(a);
                }
                //添加操作标签
                let label= ["删除","修改","回收"];
                let labels = ["delete" , "update","recovery"];
                for(let j = 0;j<label.length; j++){
                    let a = document.createElement("a");
                    a.innerText = label[j];
                    a.classList.add("controlAA");
                    a.setAttribute('id',labels[j] + data[i].id); //设置标签属性aa=‘td_aa’
                    a.setAttribute('href','#'); //设置标签属性aa=‘td_aa’
                    a.addEventListener("click",function () {
                        mylocation(a);
                    });
                    tr.append(a);
                }

                $("tbody").append(tr);
            }
        }
    })
}

/**
 *  @param element 标签类型
 *  @return 跳转到不同的界面
 *
 * */
function mylocation(element){
    let type = element.split("-")[0];
    let id = element.split("-")[1];
    let url = "../../hotel_ai/room/";
    if (type==="update"){
        url = "updateRoom.html?ID=" + id;
        //跳转到修改的页面.
        window.location.href= url;
    }else if (type === "delete"){
        url = url + "deleteRoom.jsp";
        let res=confirm("你确定要删除这个房间吗?"); //在页面上弹出对话框
        if(res ===true){
            //删除直接回收和释放.
            $.post(url, {
                "id": id
            },function(data,status) {
                if (status === "success" || status === 200){
                    alert("删除成功");
                }else{
                    alert("删除失败")
                }
            });
        }
    }else if (type === "recovery"){
        url = url + "recycleRoom.jsp";
        let res=confirm("你确定要回收这个房间吗?"); //在页面上弹出对话框
        if(res ===true){
            //删除直接回收和释放.
            $.post(url, {"id": id},function(data,status) {
                if (status === "success" || status === 200){
                    alert("回收成功");
                    return false;
                }else{
                    alert("回收失败");
                }
            });
        }
    }else if (type === "update"){
        let res=confirm("你确定要修改这个房间吗?"); //在页面上弹出对话框
        if(res ===true){
            window.location.href= "updateRoom.html?ID=" + id;
        }else{
            alert(
                "修改失败"
            );
        }
    }
}