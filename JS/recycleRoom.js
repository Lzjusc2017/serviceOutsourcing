$(document).ready(function() {
    url = "../../hotel_ai/room/selecRecycletRoomList.jsp";
    let json = {};
    json.page = 1;
    json.limit = 50;
    setAjaxData(url, json);

});
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
                let label= ["恢复"];
                let labels = ["recovery"];
                for(let j = 0;j<label.length; j++){
                    let a = document.createElement("a");
                    a.innerText = label[j];
                    a.classList.add("controlAA");
                    a.setAttribute('id',labels[j] + data[i].id); //设置标签属性aa=‘td_aa’
                    a.setAttribute('href','#'); //设置标签属性aa=‘td_aa’
                    a.addEventListener("click",function () {
                        recoveryRoom(a);
                    });
                    tr.append(a);
                }
                $("tbody").append(tr);
            }
        }
    })
}
function recoveryRoom(element){
    //恢复变成正常的状态
    let id = element.split("-")[1];
    $.post("../../hotel_ai/room/recoveryRecycleRoom.jsp", {
        "id": id
    },function(data,status) {
        if (status === "success" || status === 200){
            alert("恢复成功");
            return false;
        }
    });
}
