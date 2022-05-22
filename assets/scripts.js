// 
// Scripts

// import { values } from "core-js/core/array";

// import { values } from "core-js/core/array";

// 
const options = {
    grid: {
        color: "white"
      },
        scales: {
            yAxes:{
                grid: {
                    drawBorder: false,
                    color: "white"
                },
                ticks: {
                    fontSize: 18,
                    color: "white",
                    
                    beginAtZero: true
                }
            },
            xAxes:{
                grid: {
                    drawBorder: false,
                    color: "white"
                },
                ticks: {
                    color: "white", 
                }
            }
        }
    
}

function pouce(val,ret = null){
    $( ".visible" ).animate({
        opacity: val,
        // left: "+=50",
        // height: "toggle"
      }, 1000, function() {
        ret
      });
}
$(".vente").on('click', (e) => {
    e.preventDefault()
    let url = $(e.target).data('url')
    $(".vente").removeClass('but')
    $.post(url, $( "#vente").serialize(),function (json) {
        $( ".result" ).html( json.count );
        $( ".monthSales" ).html( json.monthSales );
        $( ".pouce" ).hasClass( "hidden" )
        $(".pouce").removeClass('hidden')
        $(".pouce").addClass('visible')
        pouce(0,pouce(1))
        
        var keys = Object.keys(json.tabSales)
        var datas = (Object.values(json.tabSales))
        var values =[]
        var dataKey = []
        datas.forEach((item, index) => {
            values = [...values,item.length]
            dataKey = [...dataKey, keys[index]+"  " +item.length]
          })
        var canvas = document.getElementById("myChart");        
        canvas.remove()
        var newDiv = document.createElement("canvas");
        newDiv.id = "myChart"
        var currentDiv = document.getElementById('can');
        currentDiv.appendChild(newDiv, currentDiv);


        var myData = {
            labels: dataKey,
            datasets: [{
                label: "sas",
                barPercentage: 0.5,
                barThickness: 25,
                maxBarThickness: 25,
                minBarLength: 2,
                backgroundColor: ['white'],
                data: values,
            }]
        };
    
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',    	
            data: myData, 
            options: options   	
        });
    },"json" ).done( function (result) { 
        var canvas = document.getElementById("loader"); 
        if(canvas){
            canvas.remove()
        }  
        $(".vente").addClass('but')     
        
    })
})
window.addEventListener('DOMContentLoaded', event => {

    
});

$.post('chart', $( "#vente").serialize(),function (json) {
    $( ".result" ).html( json.count );
    $( ".monthSales" ).html( json.monthSales );
    var keys = Object.keys(json.tabSales)
    var datas = (Object.values(json.tabSales))
    var values =[]
    var dataKey = []
    datas.forEach((item, index) => {
        date = new Date(Date.parse(keys[index]))
       date = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()
        values = [...values,item.length]
        dataKey = [...dataKey, date+"  " +item.length]
      })
 
    var myData = {
        labels: dataKey,
        datasets: [{
            label: "sas",
            barPercentage: 0.5,
            barThickness: 25,
            strokeColor : "rgba(255,255,255,1)",
            maxBarThickness: 25,
            minBarLength: 2,
            backgroundColor: ['white'],
            data: values,
        }]
    };
   
    var canvas = document.getElementById("myChart");
    if(canvas){
        canvas.remove()
        var newDiv = document.createElement("canvas");
        var currentDiv = document.getElementById('can');
        if (currentDiv){
            newDiv.id = "myChart"
            currentDiv.appendChild(newDiv, currentDiv);
    
        } 
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',    	
            data: myData,  
            options: options  	
        });
    }        

},"json" ).done( function (result) { 
    var canvas = document.getElementById("loader"); 
        if(canvas){
            canvas.remove()
        }       
})
 
$(".copy").on('click', (e) => {
    e.preventDefault()
    htmlContent = e.target.textContent
    navigator.clipboard.writeText(htmlContent).then(() => {
        $(".copie").toggle(1000, function() {
            $(".copie").toggle(3000)
          })
    })
})

$(".iconCopy").on('click',(e) => {
    e.stopPropagation();
    htmlContent =$("."+e.target.id).text()
    navigator.clipboard.writeText(htmlContent).then(() => {
        $(".copie").slideDown(function() {
            setTimeout(function() {
                $(".copie").slideUp();
            }, 5000);
        });
    })
})
$("#write").on('click', (e) => {
    e.preventDefault()
         $(".search").removeClass("hidden")
        $(".write").removeClass("hidden")
        $(".read").addClass("hidden")
        $("#write").addClass("mini")
        $("#write").addClass("colorMenu")
        $("#read").addClass("mini")
        
        $("#read").hasClass("colorMenu") ?  $("#read").removeClass("colorMenu") : null
})
$("#read").on('click', (e) => {
    e.preventDefault()
    $(".search").removeClass("hidden")
        $(".read").removeClass("hidden")
        $(".write").addClass("hidden")
        $("#read").addClass("mini")
        $("#write").addClass("mini")
        $("#read").addClass("colorMenu")
        $("#write").hasClass("colorMenu") ?  $("#write").removeClass("colorMenu") : null
        
})
$("#chat").on('click', (e) => {
    $(this).css('background-color', '#ff0000');
    e.preventDefault()
        $(".chat").removeClass("hidden")
        $("#chat").addClass("mini")
        $("#chat").addClass("colorMenu")
        $("#mail").addClass("mini")
        $("#divers").addClass("mini")
        $(".mail").hasClass("hidden") ? null : $(".mail").addClass("hidden")
        $(".divers").hasClass("hidden") ? null : $(".divers").addClass("hidden")
        $("#mail").hasClass("colorMenu") ?  $("#mail").removeClass("colorMenu") : null
        $("#divers").hasClass("colorMenu")?  $("#divers").removeClass("colorMenu") : null
        
       
})
$("#mail").on('click', (e) => {
    e.preventDefault()
        $(".mail").removeClass("hidden")
        $("#mail").addClass("colorMenu")
        $("#chat").addClass("mini")
        $("#mail").addClass("mini")
        $("#divers").addClass("mini")
        $(".chat").hasClass("hidden") ? null : $(".chat").addClass("hidden")
        $(".divers").hasClass("hidden") ? null : $(".divers").addClass("hidden")
        $("#chat").hasClass("colorMenu") ?  $("#chat").removeClass("colorMenu") : null
        $("#divers").hasClass("colorMenu")?  $("#divers").removeClass("colorMenu") : null
       
})
$("#divers").on('click', (e) => {
    e.preventDefault()
        $(".divers").removeClass("hidden")
        $("#divers").addClass("colorMenu")
        $("#chat").addClass("mini")
        $("#mail").addClass("mini")
        $("#divers").addClass("mini")
        $(".mail").hasClass("hidden") ? null : $(".mail").addClass("hidden")
        $(".chat").hasClass("hidden") ? null : $(".chat").addClass("hidden")
        $("#chat").hasClass("colorMenu") ?  $("#chat").removeClass("colorMenu") : null
        $("#mail").hasClass("colorMenu")?  $("#mail").removeClass("colorMenu") : null
       
})
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}
$(".delete").on('click', (e) => {
    // e.preventDefault()
    e.stopPropagation();

    id = $(e.target).data("id")
   let confirmAction = confirm("Etes vous sure de vouloir supprimer le texte ?");
    if (confirmAction) {
        $.post('delete', $( "#"+id).serialize(),function (json) {
        $( "#"+id).parent().remove()            
    })        
        alert("Etes vous certain !!!");
    } else {
        alert("Suppression annulée");
    }
       
})
// $( "#action").on('submit', (e) => {
//     e.stopPropagation();
// })
$( "#action").on('submit', (e) => {
    
    e.preventDefault()
    id = $(e.target).serialize()
    
    $.post('action', id,function (json) {
        JSON.parse(json).actions.forEach(element => {
            $(".interactions").html()
            $(".interactions").append(
                '<div>'+element.date+' - '+element.inter+'</div>'
                )
            });         
        })
        $(".inter").val('')
    })
$(function() {

    var mark = function() {
  
      // Read the keyword
      var keyword = $("input[name='keyword']").val();
  
      // Determine selected options
      var options = {};
      $("input[name='opt[]']").each(function() {
        options[$(this).val()] = $(this).is(":checked");
      });
  
      // Remove previous marked elements and mark
      // the new keyword inside the context
      $(".context").unmark({
        done: function() {
          $(".context").mark(keyword, options);
        }
      });
    };
  
    $("input[name='keyword']").on("input", mark);
    $("input[type='checkbox']").on("change", mark);
  
  });

  $(".chatVisible").on('click', (e) => {
    e.preventDefault()
    
    $(".listMess").hasClass("hidden") ?  $(".listMess").removeClass("hidden") : $(".listMess").addClass("hidden")
    $(".menuChat").hasClass("hidden") ?  $(".menuChat").removeClass("hidden") : $(".menuChat").addClass("hidden")
    $('.listMess')[0].scrollIntoView(false)
   
})
$(".interAction").on('click', (e) => {
    e.preventDefault()
    $("#inter").hasClass("hidden") ?  $("#inter").removeClass("hidden") : $("#inter").addClass("hidden")
   
})
  