// 
// Scripts

// import { values } from "core-js/core/array";

// import { values } from "core-js/core/array";

// 
$(".vente").on('click', (e) => {
    e.preventDefault()
    let url = $(e.target).data('url')
    $.post(url, $( "#vente").serialize(),function (json) {
        $( ".result" ).html( json.count );
        $( ".monthSales" ).html( json.monthSales );
        keys = Object.keys(json.tabSales)
        datas = (Object.values(json.tabSales))
        values =[]
        dataKey = []
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
                backgroundColor: ['grey'],
                data: values,
            }]
        };
       
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',    	
            data: myData,    	
        });

    },"json" ).done( function (result) { 
        
    })
})
window.addEventListener('DOMContentLoaded', event => {

    
});


$.post('chart', $( "#vente").serialize(),function (json) {
    $( ".result" ).html( json.count );
    $( ".monthSales" ).html( json.monthSales );
    keys = Object.keys(json.tabSales)
    datas = (Object.values(json.tabSales))
    values =[]
    dataKey = []
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
            backgroundColor: ['grey'],
            data: values,
        }]
    };
   
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',    	
        data: myData,    	
    });

},"json" ).done( function (result) { 
    var canvas = document.getElementById("loader");        
        canvas.remove()
})


    