$(document).ready(function(){
    //ajax请求数据
});


function addRoom(){

    let roomFloor = document.getElementById("roomFloor").value;
    let roomNumber = document.getElementById("roomNuber").value;
    let roomPicture = document.getElementById("roomPicture").value;
    let roomInfo = document.getElementById("roomInfo").value;
    let roomType = document.getElementById("roomType").value;
    let roomMax = document.getElementById("roomMax").value;
    let roomArea = document.getElementById("roomArea").value;
    let roomBedType = document.getElementById("roomBedType").value;
    let roomPrice = document.getElementById("roomPrice").value;
    roomNumber = Number(roomNumber);
    $.post("../data.json",{
        "roomFloor":roomFloor,
        "roomNuber":roomNumber,
        "roomPicture":roomPicture,
        "roomInfo":roomInfo,
        "roomType":roomType,
        "roomMax":roomMax,
        "roomArea":roomArea,
        "roomBedType":roomBedType,
        "roomPrice":roomPrice
    }, function(data,status){
        var obj = JSON.parse(data);
        if (status === 200){
            alert("添加成功");
        }
    });
}