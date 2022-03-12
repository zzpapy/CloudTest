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
        console.log(Object.keys(json.tabSales))
        datas = (Object.values(json.tabSales))
        values =[]
        datas.forEach((item, index) => {
            values = [...values,item.length]
            console.log(item) //value
            console.log(index) //index
          })
          console.log(values)

        var canvas = document.getElementById("myChart");        
        canvas.remove()
        var newDiv = document.createElement("canvas");
        newDiv.id = "myChart"
        var currentDiv = document.getElementById('can');
        currentDiv.appendChild(newDiv, currentDiv);
        var canvas = document.getElementById("myChart")      
        var myChart = new Chart(canvas, {
            type: 'bar',
            data: {
                dataIndex: 'center',
                labels: Object.keys(json.tabSales),
                datasets: [{
                    label: "sas",
                    data: values
                }
                ]
        }
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

    