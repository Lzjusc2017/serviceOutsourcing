/**
 *      created by 2020-4-13 author Lzjusc2017
 * */

let queryID = "2";
$(document).ready(function(){
    //解析json数组,直接data[i]操作即可
    queryID = GetQueryString("ID");
    if (queryID !== "null" || queryID !=="undefined" || queryID !== null){
        let url = "../../hotel_ai/room/selecRoomById.jsp";
        setAjaxData(url,queryID);
    }else{
        //如果没有queryID，则是直接添加.
        ;
    }
});
/**
 *  @param name getName
 *  查询GET请求参数
 * */
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null) {
        return unescape(r[2]);
    }
    return null;
}

/**
 * @param id 商品id
 *  通过ID获取商品的部分信息，可以修改
 * */

function setAjaxData(url,id){
    $.post(url,{"id":id},function(data,status){
        if (status === 200 || status === "success") {
            let labels = ["roomFloor","roomNuber","roomPicture",
                "roomInfo","roomType","roomMax",
            "roomArea","roomBedType","roomPrice"];
            for (let key in data[0]){
                for(let i = 0;i< labels.length; i++){
                    if (key === labels[i]){
                        let c = document.getElementById(labels[i]);
                        c.value = data[0][key];
                        break;
                    }
                }
            }
        }
    })
}

/**
 *  提交商品的信息
 * */
function updateRoom(){
    console.log("提交信息");
    let labels = ["roomFloor","roomNuber","roomPicture",
        "roomInfo","roomType","roomMax",
        "roomArea","roomBedType","roomPrice"];
    let json = {};
    for(let i = 0;i < labels.length; i++){
        let c = document.getElementById(labels[i]).value;
        json[labels[i]] = c;
    }
    if (queryID !== "null" || queryID !=="undefined" || queryID !== null){
        //如果id有值就是修改，没有就是添加
        json["id"] = "queryID";
        $.post("../../hotel_ai/room/updateRoom.jsp",json, function(data,status){
            if (status === 200 || status === "success"){
                alert("修改成功");
            }else{
                alert("修改失败")
            }
        });
    }else{
        $.post("../../hotel_ai/room/insertRoom.jsp",json, function(data,status){
            if (status === 200 || status === "success"){
                alert("添加成功");
            }else{
                alert("添加失败");
            }
        });
    }

}