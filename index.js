import data from './data.json' assert {type:'json'};
const type = new URLSearchParams(window.location.search).get('type');
if(type !== null) document.title = type;

$(document).ready(function(){
    $("#h").text(type+" Convertor")

// --------------------------------Index href---------------------------------------

    $(".mod").click(function(){
        window.location.href = "./convertor.html?type="+$(this).attr("name");
    });
// --------------------------------Index href---------------------------------------
    var current = [];
    var map = [];
// ---------------------------------Sidebar-----------------------------------------
    var html =  '<div onclick="nclose()" name="close" id="close" class="item">'+
                '    <i class="fas fa-xmark"></i> '+
                '    Close'+
                '</div>'
    data.forEach(element => {
        if(type === element['name']){
            current =element['units']; 
            map = element['multiplier'];
        }
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
    var count =0;
    current.forEach(element => {
        $("#unit1").append(`<option value="${element}">
                                ${element}
                            </option>`);

        $("#outputs").append(`
            <div class="card small column" name="${element}" id="${count++}">${element} = </div>
        `)


    });
// ---------------------------------Options-----------------------------------------

    var text = [];
    var currmap = map[current[0]]
    for(var i=0;i<current.length;i++){
        text.push($("#"+i).text());
    };
  
    function changed(unit,value){
        currmap = map[unit];
        if(type==="Temperature"){
            for(var i=0;i<current.length;i++){
                $("#"+i).text(text[i]+(value*currmap[current[i]]['mul']+currmap[current[i]]['add']));
            };
        }
        else{
            for(var i=0;i<current.length;i++){
                $("#"+i).text(text[i]+value*currmap[current[i]]);
            };
        }
    }
    var selected = $("#unit1").find(':selected').val();
    var value = $("#amount1").val();
    changed(selected,value);
    $("#unit1").on( "change", function() {
        selected = $(this).find(':selected').val();
        changed(selected,value)
    });
    $("#amount1").on( "input", function() {
        value = $(this).val();
        changed(selected,value);
    });

// -------------------------------copy option---------------------------------------
    $(".small").click(function(e){
        var idClicked = e.target.id;
        navigator.clipboard.writeText($("#"+idClicked).text());
        $("#flash").show().delay(200).fadeOut();
    });

// -------------------------------copy option---------------------------------------


});
