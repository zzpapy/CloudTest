import React from 'react';
 
 const Message = ({ index,user,message,date,id,userId }) => {
     let right = ""
     right = userId == id ? "mess right":"mess"
     return (
     <div key={index} className= {right} id={id}> 
        <div className="titleChat"> 
            <p className="name">{user} </p>
            <p className="name">{date}</p>           
        </div>       
        <div className="chatText">{message}</div>
        
     </div>
 )};
 
 export default Message;