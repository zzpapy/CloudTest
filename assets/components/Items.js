import React from 'react';
 
 const Items = ({ id, poster }) => (
     <div key={id} className="card col-md-4 homeConatainer" >
         <div className="homeConatainer">
             <p>{id}</p>
             <img src={poster} />
         </div>
     </div>
 );
 
 export default Items;