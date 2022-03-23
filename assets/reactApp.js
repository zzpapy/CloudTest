import React , { useEffect, useState }from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate'
import Items from './components/Items';

import { getImageFromApi, getActor, getNow,getFilmDetail } from './APP/TMDBApi'
import Loader from "react-loader-spinner"
 

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: [],
            showCrawl: {}
        };
    }

    componentDidMount() {
         getNow()
            .then( response => response)
            .then(entries => {
                console.log(entries.total_results)
                this.setState({
                    entries
                });
            });
    }
    handlePageClick(event) {
        console.log(this.state,event.selected)
        getNow(event.selected + 1)
        .then( response => response)
        .then(entries => {
            console.log(entries)
            this.setState({
                entries : entries
            });
        });
      };
      handleMovie = (e) => {
          console.log(e.target.id)
          var id = e.target.id
          getFilmDetail (id)
            .then( response => response)
            .then(entries => {
                console.log(entries)
                this.setState(current => ({
                    showCrawl:  entries 
                  }));
                  console.log(this.state.showCrawl)
            })}
        reset = (e => {
            this.setState(current => ({
                showCrawl:  {} 
              }));
        })

    render() {
        
        console.log(Object.keys(this.state.showCrawl).length)
        if(this.state["entries"].results != undefined && Object.keys(this.state.showCrawl).length === 0){

            return (
                <div>
                <div className="row">
                    {this.state["entries"].results.map(
                        ({ id, poster_path,title }) =>  (
                            <Items
                                key={id}
                                id={id}
                                poster={getImageFromApi(poster_path) }
                                onClick = {this.handleMovie}
                            >
                                {this.state.showCrawl[id] && (
                                    
                                    <div style={{ border: "1px black solid" }}>
                                    {title}
                                    </div>
                                )}
                            </Items>
                        )
                    )}
                </div>
                <div className="pagin">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={this.handlePageClick.bind(this)}
                    pageRangeDisplayed={5}
                    pageCount={this.state["entries"].total_pages}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
              </div>
              </div>
            );
        }
        if(Object.keys(this.state.showCrawl).length !== 0){
            console.log(this.state.showCrawl)
            return (
                <div>
               <Items
                    key={this.state.showCrawl.id}
                    id={this.state.showCrawl.id}
                    poster={getImageFromApi(this.state.showCrawl.backdrop_path) }
                    onClick = {this.reset}
                >
                    
                </Items>
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