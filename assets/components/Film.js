import React from 'react';
 
 const Film = ({ id, poster, onClick, film }) => {
     {console.log(film)}
     return (<div key={id} className="card col-md-4 homeConatainer" onClick={onClick}>
         <div className="homeConatainer">
             <p>{film.original_title}</p>
             <img id={id} src={poster} />
             <div>{film.overview}</div>
         </div>
     </div>
 )};
 
 export default Film;