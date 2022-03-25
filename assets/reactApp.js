import React , { useEffect, useState }from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate'
import Items from './components/Items';
import Film from './components/Film';
import { getImageFromApi, getActor, getNow,getFilmDetail, getFilmsFromApiWithSearchedText } from './APP/TMDBApi'
import Loader from "react-loader-spinner"
 

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginKeyUp = this.keyUpHandler.bind(this, 'search');
        this.state = {
            entries: [],
            showCrawl: {},
            search: [],
            inSearch: false
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
    keyUpHandler(refName, e) {
        console.log(e.target.value);
        getFilmsFromApiWithSearchedText(e.target.value)
            .then(res => res)
            .then(data => {
                this.setState({
                    search : data,
                    inSearch : true
                });
                console.log(this.state.search["results"])
            })
        // prints either LoginInput or PwdInput
    }
    handlePageClick(event) {
        console.log(this.state,event.selected)
        getNow(event.selected + 1)
        .then( response => response)
        .then(entries => {
            console.log(entries)
            this.setState({
                entries : entries,
                inSearch : false
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
                    showCrawl:  entries,
                    inSearch : false
                  }));
                  console.log(this.state.showCrawl)
            })}
        reset = (e => {
            this.setState(current => ({
                showCrawl:  {},
                inSearch : false
              }));
        })

    render() {
        
        console.log(Object.keys(this.state.showCrawl).length)
        if(this.state["entries"].results != undefined && Object.keys(this.state.showCrawl).length === 0 && this.state.inSearch === false){

            return (
                <div>
                    <div><input type="text" onKeyUp={this.handleLoginKeyUp} ref="search" /></div>
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
        else if(Object.keys(this.state.showCrawl).length !== 0 && this.state.inSearch === false){
            console.log(this.state.showCrawl)
            return (
                <div>
               <Film
                    key={this.state.showCrawl.id}
                    id={this.state.showCrawl.id}
                    film={this.state.showCrawl}
                    poster={getImageFromApi(this.state.showCrawl.backdrop_path) }
                    onClick = {this.reset}
                >
                    
                </Film>
              </div>
            );
        }
        else if(this.state.inSearch){
            return(
                <div>
            <div className="row">
                    <div><input type="text" onKeyUp={this.handleLoginKeyUp} ref="search" /></div>
            {this.state.search["results"].map(
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
        </div>)
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