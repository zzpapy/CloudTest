import React from 'react';
import ReactDOM from 'react-dom';

import Items from './components/Items';

import { getImageFromApi, getActor, getNow } from './APP/TMDBApi'
import Loader from "react-loader-spinner"
 

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            entries: []
        };
    }

    componentWillMount() {
         getNow()
            .then( response => response)
            .then(entries => {
                console.log(entries)
                this.setState({
                    entries
                });
            });
    }

    render() {
        
        console.log(this.state["entries"].results == undefined,this.state["entries"].results)
        if(this.state["entries"].results != undefined){

            return (
                <div className="row">
                    {this.state["entries"].results.map(
                        ({ id, poster_path, body }) =>  (
                            <Items
                                key={id}
                                poster={getImageFromApi(poster_path) }
                                // body={body}
                            >
                            </Items>
                        )
                    )}
                </div>
            );
        }
        else{
            return (
                <div>
                toto
              </div>
            );
        }
    }
}

ReactDOM.render(<App />, document.getElementById('root'));