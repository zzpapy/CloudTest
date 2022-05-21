import React from 'react';
 
 const Interactions = ({ index,user,message,date,id,userId }) => {
     let right = ""
     
     return (
     <div key={index} id={id}>     
        <div className="">{date} - {message}</div>        
     </div>
 )};
 
 export default Interactions;