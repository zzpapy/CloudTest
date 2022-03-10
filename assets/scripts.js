// 
// Scripts
// 
$(".vente").on('click', (e) => {
    e.preventDefault()
    let url = $(e.target).data('url')
    $.post(url, $( "#vente").serialize(),function (json) {
        $( ".result" ).html( json.count );
        $( ".monthSales" ).html( json.monthSales );
        console.log(json)
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

    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Group 1", "Group 2", "Group 3"],
            datasets: [{
                label: 'Groups',
                data: [12, 19, 3]
            }]
        }
    });
});

