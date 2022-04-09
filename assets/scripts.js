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
        if(canvas){
            canvas.remove()
        }       
        
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
        values = [...values,item.length]
        dataKey = [...dataKey, keys[index]+"  " +item.length]
      })
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
        });
    }        

},"json" ).done( function (result) { 
    var canvas = document.getElementById("loader"); 
        if(canvas){
            canvas.remove()
        }       
})
function getImageFromApi (name) {
    if(name !== null){
      return 'https://image.tmdb.org/t/p/w300' + name

    }
    else return '../Images/cine.jpg'
  }
  function getFilmDetail (id) {
    const url = "https://api.themoviedb.org/3/movie/"+id+"?api_key="+API_TOKEN+"&language=fr-FR&append_to_response=credits"
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
  }
const API_TOKEN = "1209c73f14597cc45c91696c34a854c7"

export async function getNow(page){
    const url = "https://api.themoviedb.org/3/movie/now_playing?sort_by=primary_release_date.desc&api_key="+API_TOKEN+"&page="+page+"language=fr-FR&region=FR"
    try {
        await fetch(url).then(async res => {
            return await res.json()
        })
        .then(res => {
            // console.log(res)
            res.results.map(el => {
                // console.log(el)
                var poster = getImageFromApi(el["poster_path"])
                var films = document.getElementById("films")
                var newDiv = document.createElement("div");
                newDiv.id = el.id
                newDiv.className = "detail"
                films.append(newDiv)
                var img = document.createElement("img");
                img.src = poster
                newDiv.append(img)
            });
            return res
        });
        // return await console.log(res.json());
    } catch (er) {
        return console.error(er);
    }
  }
  if(document.getElementById("films")){
getNow()
// $(".films").on("cilck", (res) => console.log(res) )


    document.getElementById("films").onclick = async function(res) { 
        var result = await getFilmDetail(res.target.parentElement.id)
        console.log(result)
        };  
}