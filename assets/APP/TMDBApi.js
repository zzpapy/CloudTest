// API/TMDBApi.js

const API_TOKEN = "1209c73f14597cc45c91696c34a854c7";

export function getFilmsFromApiWithSearchedText (text,page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text+ "&page=" + page
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
  }
  export function getFilmDetail (id) {
    const url = "https://api.themoviedb.org/3/movie/"+id+"?api_key="+API_TOKEN+"&language=fr-FR&append_to_response=credits"
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
  }

  export function getImageFromApi (name) {
    if(name !== null){
      return 'https://image.tmdb.org/t/p/w300' + name

    }
    else return '../images/cine.jpg'
  }

  export function getActor(id){
    
    const url = "https://api.themoviedb.org/3/person/"+id+"?api_key="+API_TOKEN+"&append_to_response=movie_credits"
    return fetch(url)
        .then(res => res.json())
        .catch(er => console.error(er))
  }


  export async function getActorByName(name,page){
    
    const url = "https://api.themoviedb.org/3/search/person?query="+name+"&api_key="+API_TOKEN+"&page="+page+"&include_adult=false"
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (er) {
      return console.error(er);
    }
  }

  export function getNow(page){
    const url = "https://api.themoviedb.org/3/movie/now_playing?sort_by=primary_release_date.desc&api_key="+API_TOKEN+"&language=fr-FR&page="+page+"&region=FR"
    return fetch(url)
        .then(res => res.json())
        .catch(er => console.error(er))
  }

  export function getUser(){
    const url = "chatAjax"
    var result= async () => await fetch(url)
        .then(res => res.json())
        .catch(er => console.error(er))
    console.log(result)
    return result
  }

  export function tchat(data){
    const url = "tchat"
    return fetch(url+"?"+"message="+data)
        .then(async res => {
          return res.json()
        })
        .then(async res => {
          return res
          
        })
        .catch(er => console.error(er))
  }
  export function inter(data){
    const url = "action"
    return fetch(url+"?"+"message="+data)
        .then(async res => {
          return res.json()
        })
        .then(async res => {
          return res
          
        })
        .catch(er => console.error(er))
  }
  export async function init(data){
    const url = "init"
    try {
      const res = await fetch(url);
      const res_1 = await res.json();
      return await res_1;
    } catch (er) {
      return console.error(er);
    }
  }

    export async function listInter(data){
      const url = "listInter"
      try {
        const res = await fetch(url);
        const res_1 = await res.json();
        return await res_1;
      } catch (er) {
        return console.error(er);
      }
  }



  



  