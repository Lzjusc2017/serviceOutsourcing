/**
 *      created by 2020-4-13 author Lzjusc2017
 * */

$(document).ready(function(){
    //解析json数组,直接data[i]操作即可
    let url = "../../hotel_ai/product/selectProductList";
    url = "../../new.json";
    let json = {};
    json.page = 1;
    json.limit = 50;
    setAjaxData(url,json);
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
    let url = "../../hotel_ai/product/";  //默认showControlText
    console.log(l);
    let json = {};
    if (l === "选择搜索类型"){
        alert("请先选择搜索类型");
        return false;
    }
    if (l === "商品名称"){
        url = url + "selecProductByProductName";
        json.productName = queryText;
    }
    else if (l === "热度"){
        url = url + "selectProductListByPopularity";
        json.page = 1;
        json.limit = 50;
    }else if (l === "分类"){
        url = url + "selectProductListByProductType";
        json.page = 1;
        json.limit = 50;
        json.productType = queryText;
    }else if (l === "id"){
        url = url + "selectProductById";
        json.id = queryText;
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
                let label= ["修改","删除","回收"];
                let labels = ["update" , "delete","recycleProduct"];
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
    let url = "../../hotel_ai/product/";
    if (type==="update"){
        url = "updateProduct.html?ID=" + id;
        //跳转到修改的页面.

    }else if (type === "delete"){
        url = url + "deleteProduct.jsp";
        let res=confirm("你确定要删除这个房间吗?"); //在页面上弹出对话框
        if(res ===true){
            //删除直接回收和释放.
            $.post(url, {
                "id": id
            },function(data,status) {
                if (status === "success" || status === 200){
                    alert("删除成功");
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