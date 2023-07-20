import data from './data.json' assert {type:'json'};
const type = new URLSearchParams(window.location.search).get('type');if(type !== null) document.title = type;

$(document).ready(function(){
    $("#h").text(type+" Convertor")

// --------------------------------Index href---------------------------------------

    $(".mod").click(function(){
        window.location.href = "./convertor.html?type="+$(this).attr("name");
    });
// --------------------------------Index href---------------------------------------
    var current = [];
// ---------------------------------Sidebar-----------------------------------------
    var html =  '<div onclick="nclose()" name="close" id="close" class="item">'+
                '    <i class="fas fa-xmark"></i> '+
                '    Close'+
                '</div>'
    data.forEach(element => {
        if(type === element['name'])    current = element['units'];
        html = html.concat( '<div class="item" name="'+element['name'] +'">   <i class="fas '+element['icon'] +'"></i>'+ element['name'] +'</div>');
    });
    $(".sidebar").html(html);
// ---------------------------------Sidebar-----------------------------------------

// ------------------------------Sidebar href---------------------------------------
    $(".item").click(function(){
        var curr = $(this).attr("name");
        if(type === curr || curr==="close"){}
        else
            window.location.href = "./convertor.html?type="+$(this).attr("name");
    });
// ------------------------------Sidebar href---------------------------------------

// ---------------------------------Options-----------------------------------------
    current.forEach(element => {
        $("#unit1").append(`<option value="${element}">
                                ${element}
                            </option>`);

        $("#outputs").append(`
            <div class="card small column" name="${element}">${element} = </div>
        `)


    });
// ---------------------------------Options-----------------------------------------
    



});