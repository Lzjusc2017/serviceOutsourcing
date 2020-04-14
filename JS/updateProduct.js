/**
 *      created by 2020-4-13 author Lzjusc2017
 * */

let queryID = "2";
$(document).ready(function(){
    //解析json数组,直接data[i]操作即可
    queryID = GetQueryString("ID");
    if (queryID !== "null" || queryID !=="undefined" || queryID !== null){
        setAjaxData(queryID);
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

function setAjaxData(id){
    let url = "../../hotel_ai/product/selectProductById.jsp";
    $.post(url,{"id":id},function(data,status){
        if (status === 200 || status === "success") {
            let labels = ["productName","productPicture","productIntro",
                "productType","productUnitProce","productNum"];
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
function addProductInformation(){
    console.log("提交信息");
    let labels = ["productName","productPicture","productIntro",
        "productType","productUnitProce","productNum"];
    let json = {};
    for(let i = 0;i < labels.length; i++){
        let c = document.getElementById(labels[i]).value;
        json[labels[i]] = c;
    }
    if (queryID !== "null" || queryID !=="undefined" || queryID !== null){
        $.post("../../hotel_ai/product/updateProduct.jsp",json, function(data,status){
            if (status === 200 || status === "success"){
                alert("修改成功");
            }
        });
    }
    $.post("../../hotel_ai/product/insertProduct.jsp",json, function(data,status){
        if (status === 200 || status === "success"){
            alert("添加成功");
        }
    });
}