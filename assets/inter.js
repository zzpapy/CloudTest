import React , { useEffect, useState }from 'react';
import { tchat, listInter, inter } from './APP/TMDBApi'
import ReactDOM from 'react-dom';
import Interactions from './components/Interactions';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from '@emotion/css'
import InputEmoji from 'react-input-emoji'
import { format } from "date-fns"
import { fr } from 'date-fns/locale'


class App extends React.Component {
   
    constructor(props) {
        super(props);   
        // this.handleActorKeyUp = this.keyUpHandlerActor.bind(this, 'message');     
        this.state = {
            text : "",
            messages :{},
            ROOT_CSS : css({
                height:100,
                webkitScrollbar : {
                    width: 20
                  },
                // width: 400
              }),
            date : format(new Date(), "d-MMMM-yyyy", { locale: fr })
            };
            this.message = React.createRef()
    }
    
    
    componentDidMount() {
        console.log(this.state.date)
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
        this.setState(current => ({
                              
            text :refName.target.value
          }));
    }
    handleClick = (e) => {
        e.preventDefault();
        if(/\S/.test(this.state.text) && !/^\s+$/.test(this.state.text) && this.state.text.match(/^\s+$/) === null){
            inter(this.state.text).then( res => {
                this.setState(current => ({
                                  
                    messages : res
                  }));
                this.message.current.value = ""
            })
        }
    }

    messClick = (e) => {
        e.preventDefault();
    }

    render() {
    return (
        <React.StrictMode>  
             <ScrollToBottom className={this.state.ROOT_CSS} key={(6)}>            
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
                <h6>INTERACTIONS DU {this.state.date}</h6>
            </div>
            {/* <div key={(8)} id="click" onClick={this.handleClick} data-url='/listInter'>OK</div> */}
        </ScrollToBottom>
                </React.StrictMode>
        )
    }
    
}
if(document.getElementById('inter') != null){
    ReactDOM.render(<App />, document.getElementById('inter'));

}