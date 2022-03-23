import React from 'react';
 
 const Items = ({ id, poster, onClick }) => (
     <div key={id} className="card col-md-4 homeConatainer" onClick={onClick}>
         <div className="homeConatainer">
             <p>{id}</p>
             <img id={id} src={poster} />
         </div>
     </div>
 );
 
 export default Items;