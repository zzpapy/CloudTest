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
            inSearch: false,
            keySearch: ""
        };
    }

    componentDidMount() {
         getNow()
            .then( response => response)
            .then(entries => {                
                this.setState({
                    entries
                });
            });
        }
    keyUpHandler(refName, e) {
        getFilmsFromApiWithSearchedText(e.target.value)
            .then(res => res)
            .then(data => {
                this.setState({
                    search : data,
                    inSearch : true,
                    keySearch: e.target.value
                });
            })
    }
    handlePageClick(event) {
        getNow(event.selected + 1)
        .then( response => response)
        .then(entries => {
            this.setState({
                entries : entries,
                inSearch : false
            });
        });
      };
      handleSearch(event) {
        getFilmsFromApiWithSearchedText(this.state.keySearch,event.selected + 1)
        .then( response => response)
        .then(entries => {
            this.setState({
                search : entries,
                inSearch : true,
            });
        });
      };
      handleMovie = (e) => {
          var id = e.target.id
          console.log(this.state.inSearch, e.target)
          getFilmDetail (id)
            .then( response => response)
            .then(entries => {
                console.log(entries)
                this.setState(current => ({
                    showCrawl:  entries,
                    inSearch : false
                  }));
                //   if(this.state.inSearch){
                //     this.setState(current => ({
                        
                //         inSearch : true
                //       }));
                //   }
            })}
        reset = (e => {
            console.log(this.state.inSearch)
            this.setState(current => ({
                showCrawl:  {},
                inSearch : true
              }));
        })

    render() {
        console.log(this.state["entries"].results)
        if(this.state["entries"].results != undefined && Object.keys(this.state.showCrawl).length === 0 && this.state.inSearch === false){

            return (
                <div>
                    <div><input type="text" onKeyUp={this.handleLoginKeyUp} autoFocus ref="search" /></div>
                <div className=" homeConatainer">
                    {this.state["entries"].results.map(
                        ({ id, poster_path,original_title }) =>  (
                            <Items
                                key={id}
                                id={id}
                                title={original_title}
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
            return (
                <div >
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
        else if(this.state.inSearch && this.state.keySearch.length >0){
            return(
            <div >               
                <div><input type="text" onKeyUp={this.handleLoginKeyUp} ref="search" autoFocus defaultValue={this.state.keySearch}/></div>
                <div className=" homeConatainer">
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
                        onPageChange={this.handleSearch.bind(this)}
                        pageRangeDisplayed={5}
                        pageCount={  this.state.search.total_pages}
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
                <div><input type="text" onKeyUp={this.handleLoginKeyUp} ref="search" autoFocus defaultValue={this.state.keySearch}/></div>
            </div>
            );
        }
    }
}

ReactDOM.render(<App />, document.getElementById('root'));