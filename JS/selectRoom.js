/**
 *      created by 2020-4-13 author Lzjusc2017
 * */

$(document).ready(function(){
    //解析json数组,直接data[i]操作即可
    let url = "../../hotel_ai/product/selectProductList";
    url = "../../hotel_ai/room/selectRoomList.jsp";
    let json = {};
    json.page = 1;
    json.limit = 50;
    setAjaxData(url,json);
});

function setAjaxData(url,json){
    $.post(url,json,function(data, status) {
        if (status === 200 || status === "success") {
            //返回成功了,解析json数据
            $("tbody").empty();
            for (let i = 0; i < data.length; i++) {
                let tr = document.createElement("tr");
                for (let key in data[i]) {
                    let a = document.createElement("td");
                    a.innerText = data[i][key];
                    tr.append(a);
                }
            }
        }
    });
}