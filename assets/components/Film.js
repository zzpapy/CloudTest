import React from 'react';
 
 const Film = ({ id, poster, onClick, film }) => {
     {console.log(film)}
     return (
     <div key={id} className="card homeConatainer film col-md-4" onClick={onClick}>         
        <p>{film.original_title}</p>
        <div>
        <img id={id} className="imgPoster"src={poster} />
        <div>{film.overview}</div>
        </div>
     </div>
 )};
 
 export default Film;