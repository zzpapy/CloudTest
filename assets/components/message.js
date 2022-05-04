import React from 'react';
 
 const Message = ({ index,user,message,date }) => {
     return (
     <div key={index} className="mess" > 
        <div className="titleChat"> 
            <p className="name">{user} </p>
            <p className="name">{date}</p>           
        </div>       
        <div className="chatText" >{message}</div>
        
     </div>
 )};
 
 export default Message;