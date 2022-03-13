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
            console.log(item) //value
            console.log(index) //index
          })
          console.log(dataKey)

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
        // Options to display value on top of bars
        var myoption = {
            tooltips: {
                enabled: true
            },
            hover: {
                animationDuration: 1
            },
            animation: {
            duration: 1,
            onComplete: function () {
                var chartInstance = this.canvas.getContext("2d")
                    ctx = chartInstance.ctx;
                    console.log(chartInstance,this.canvas)
                    chartInstance.textAlign = 'center';
                    chartInstance.fillStyle = "rgba(0, 0, 0, 1)";
                    chartInstance.textBaseline = 'center';
                    this.data.datasets.forEach(function (dataset, i) {
                        
                        // var meta = chartInstance.controller.getDatasetMeta(i);
                        console.log(chartInstance.canvas.width)
                        i= chartInstance.canvas.width/(dataset.data.length*2)
                        dataset.data.forEach(function (bar, index,key) {
                            var data = dataset.data[index];
                            console.log(dataset.data.length,index,dataset.data,key._chartjs.listeners)
                            chartInstance.font = "20px Arial";                            
                            // chartInstance.fillText(data,i,50);
                            i = i * 2
                        });
                    });
                }
            }
        };
        //Code to drow Chart
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',    	// Define chart type
            data: myData,    	// Chart data
            options: myoption 	// Chart Options [This is optional paramenter use to add some extra things in the chart].
        });

    },"json" ).done( function (result) { 
        // console.log(result)
    })
})
window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    // const sidebarToggle = document.body.querySelector('#sidebarToggle');
    // if (sidebarToggle) {
    //     // Uncomment Below to persist sidebar toggle between refreshes
    //     // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //     //     document.body.classList.toggle('sb-sidenav-toggled');
    //     // }
    //     sidebarToggle.addEventListener('click', event => {
    //         event.preventDefault();
    //         document.body.classList.toggle('sb-sidenav-toggled');
    //         localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    //     });
       
    // }

    
});

var canvas = document.getElementById("myChart");
        // var ctx = canvas.getContext('2d')
        // ctx.clearRect(0,0,canvas.width,canvas.height)
        
    var myChart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: ["toto","tata","titi"],
            datasets: [{
                label: 'date',
                data: [22,33,54]
            }]
        }
    });

    