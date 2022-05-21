// $("#click").on('click', (e) => {
//     e.preventDefault()
//     let url = $(e.target).data('url')
//     $.post(url, $( "#tchat").serialize(),function (json) {
//         console.log(Object.values(json.message))
//         $(".listMess").html("")
//         Object.values(json.message).forEach(element => {
//             $(".listMess").append( "<div><p>"+element.user+"</p><p>"+element.text+"</p></div>")
            
//         });
//         console.log(json.message)
       
       
//     },"json" ).done( function (result) { 
//         console.log(result.message)
//         result.message.forEach(element => {
//             console.log(element)
            
//         });
//     })
// })

import React , { useEffect, useState }from 'react';
import { tchat, listInter, inter } from './APP/TMDBApi'
import ReactDOM from 'react-dom';
import Interactions from './components/Interactions';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from '@emotion/css'
import InputEmoji from 'react-input-emoji'

class App extends React.Component {
   
    constructor(props) {
        super(props);   
        // this.handleActorKeyUp = this.keyUpHandlerActor.bind(this, 'message');     
        this.state = {
            text : "",
            messages :{},
            ROOT_CSS : css({
                height:600,
                webkitScrollbar : {
                    width: 20
                  },
                // width: 400
              })
            };
            this.message = React.createRef()
    }
    
    
    componentDidMount() {
        
           setInterval(
                 ()=>{ this.code()}
                ,5000)
        }
    code = () => {
        listInter().then(res => {
            return res
        })
        .then(res=> {
            this.setState(current => ({
                            
                messages : res
            }));
            return res
        })
    } 
    keyUpHandlerActor = (refName, e) => {
        console.log(refName.target.value)
        this.setState(current => ({
                              
            text :refName.target.value
          }));
        // if(e.target.value.length > 0){
        //    console.log(e.target.value.length)
        // }
    }
    handleClick = (e) => {
        e.preventDefault();
        console.log(this.state.text)
        if(/\S/.test(this.state.text) && !/^\s+$/.test(this.state.text) && this.state.text.match(/^\s+$/) === null){
            inter(this.state.text).then( res => {
                console.log(res)
                this.setState(current => ({
                                  
                    messages : res
                  }));
                this.message.current.value = ""
            })
        }
    }

    messClick = (e) => {
        e.preventDefault();
        
            console.log(e)
    }

    render() {
        console.log(this.state.messages)
    return (
        <React.StrictMode>             
            {Object.keys(this.state.messages).length != 0 ? this.state.messages.message.map(
                ({ index,user, text, date,id, userId,messId }) =>  {
                    return (
                        <Interactions
                            key={messId}
                            user={user}
                            userId={userId}
                            message={text}
                            date={date}
                            id={id}
                            onClick={this.messClick}
                        >
                        </Interactions>
                    );
                }
                ):null} 
            <div key={(7)} className="input"> 
                <form onSubmit={this.handleClick}>               
                    <input type="text" onKeyUp={this.keyUpHandlerActor} placeholder="" ref={this.message}  />
                </form>
            </div>
            <div key={(8)} id="click" onClick={this.handleClick} data-url='/listInter'>OK</div>
        
                </React.StrictMode>
        )
    }
    
}
if(document.getElementById('inter') != null){
    ReactDOM.render(<App />, document.getElementById('inter'));

}