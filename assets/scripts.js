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

console.log(window.screen.width)

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
        console.log( $( ".pouce" ).hasClass( "hidden" ))
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

console.log($("#root"))
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
        // 3. On réinitialise le formulaire
        
        // 4. On affiche l'alert
        alert("Texte copié !")
    })
    console.log(htmlContent)
})
$("#write").on('click', (e) => {
    e.preventDefault()
        $(".write").removeClass("hidden")
        $(".read").addClass("hidden")
        $("#write").addClass("mini")
        $("#read").addClass("mini")
})
$("#read").on('click', (e) => {
    e.preventDefault()
        $(".read").removeClass("hidden")
        $(".write").addClass("hidden")
        $("#read").addClass("mini")
        $("#write").addClass("mini")
})
$("#chat").on('click', (e) => {
    e.preventDefault()
        $(".chat").removeClass("hidden")
        $("#chat").addClass("mini")
        $("#mail").addClass("mini")
        $("#divers").addClass("mini")
        $(".mail").hasClass("hidden") ? null : $(".mail").addClass("hidden")
        $(".divers").hasClass("hidden") ? null : $(".divers").addClass("hidden")
        
       
})
$("#mail").on('click', (e) => {
    e.preventDefault()
        $(".mail").removeClass("hidden")
        $("#chat").addClass("mini")
        $("#mail").addClass("mini")
        $("#divers").addClass("mini")
        $(".chat").hasClass("hidden") ? null : $(".chat").addClass("hidden")
        $(".divers").hasClass("hidden") ? null : $(".divers").addClass("hidden")
       
})
$("#divers").on('click', (e) => {
    e.preventDefault()
        $(".divers").removeClass("hidden")
        $("#chat").addClass("mini")
        $("#mail").addClass("mini")
        $("#divers").addClass("mini")
        $(".mail").hasClass("hidden") ? null : $(".mail").addClass("hidden")
        $(".chat").hasClass("hidden") ? null : $(".chat").addClass("hidden")
       
})
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}
$(".delete").on('click', (e) => {
    e.preventDefault()
    console.log(e.target)
   id = $(e.target).data("id")
   $.post('delete', $( "#"+id).serialize(),function (json) {

   })        
       
})