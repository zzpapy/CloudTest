import React from 'react';
 
 const ActorDetail = ({ id, poster, onClick, actor }) => {
     return (
     <div key={id} id={id} className="card homeConatainer ActorDetail col-md-4" onClick={onClick}>         
        <p key={id} className="test"id={id}>{actor.name}</p>
        <div key={id}className="test" id={id}>
        <img key={id} id={id} className="imgPoster"src={poster} />
        </div>
     </div>
 )};
 
 export default ActorDetail;