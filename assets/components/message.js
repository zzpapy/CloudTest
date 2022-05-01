import React from 'react';
 
 const Message = ({ index,user,message }) => {
     return (
     <div key={index} className="mess" >  
        <p className="name">{user}</p>       
        <div>{message}</div>
     </div>
 )};
 
 export default Message;