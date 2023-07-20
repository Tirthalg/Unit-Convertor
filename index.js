import data from './data.json' assert {type:'json'};
const type = new URLSearchParams(window.location.search).get('type');if(type !== null) document.title = type;

$(document).ready(function(){
    $(".card").click(function(){
        window.location.href = "./convertor.html?type="+$(this).attr("name");
    });
    
    $(".item").click(function(){
        var curr = $(this).attr("name");
        if(type === curr || curr==="close"){}
        else
            window.location.href = "./convertor.php?type="+$(this).attr("name");
    });
    
    
});