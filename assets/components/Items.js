import React from 'react';
 
 const Items = ({ id, poster, onClick, title }) => (
     <div key={id} id={id} onClick={onClick}>         
        <p>{title}</p>
        <img id={id} src={poster} />
     </div>
 );
 
 export default Items;