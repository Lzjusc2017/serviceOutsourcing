/**
 *      created by 2020-4-14 author Lzjusc2017
 * */

$(document).ready(function(){
    //解析json数组,直接data[i]操作即可
    let url = "../../hotel_ai/product/selectProductList";
    url = "../../hotel_ai/product/selecRecycletProductList.jsp";
    let json = {};
    json.page = 1;
    json.limit = 50;
    setAjaxData(url,json);
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
 *  * */
function mylocation(element){
    let type = element.split("-")[0];
    let id = element.split("-")[1];
    let url = "../../hotel_ai/product/";
    if (type === "recovery"){
        url = url + "recoveryRecycleProduct.jsp";
        let res=confirm("你确定要恢复这个房间吗?"); //在页面上弹出对话框
        if(res ===true){
            //删除直接回收和释放.
            $.post(url, {
                "id": id
            },function(data,status) {
                if (status === "success" || status === 200){
                    alert("恢复成功");
                }
            });
        }
    }else if (type === "recycleProduct"){
        url = url + "recycleProduct.jsp";
        if(res ===true){
            //删除直接回收和释放.
            $.post(url,{
                "id": id
            },function(data,status) {
                if (status === "success" || status === 200){
                    alert("回收成功");
                }
            });
        }
    }
}