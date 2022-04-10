import React , { useEffect, useState }from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate'
import Items from './components/Items';
import Film from './components/Film';
import ActorDetail from './components/ActorDetail';
import Actor from './components/Actor';
import { getActor, getImageFromApi, getActorByName, getNow,getFilmDetail, getFilmsFromApiWithSearchedText } from './APP/TMDBApi'
import Loader from "react-loader-spinner"
 

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginKeyUp = this.keyUpHandler.bind(this, 'search');
        this.handleActorKeyUp = this.keyUpHandlerActor.bind(this, 'searchActor');
        
        this.state = {
            entries: [],
            showCrawl: {},
            search: [],
            inSearch: false,
            inSearchActor: false,
            keySearch: "",
            keySearchActor: "",
            now : false,
            actor: false,
            showActor :false,
            showFilm : false
        };
    }

    componentDidMount() {
         getNow()
            .then( response => response)
            .then(entries => {                
                this.setState({
                    entries :entries,
                    now : true
                });
            });
        }
    keyUpHandler(refName, e) {
        if(e.target.value.length > 0){
            getFilmsFromApiWithSearchedText(e.target.value)
                .then(res => res)
                .then(data => {
                    this.setState({
                        search : data,
                        inSearch : true,
                        inSearchActor : false,
                        keySearch: e.target.value,
                        keySearchActor: "",
                        actor : false,
                        now : false
                    });
                })
        }
    }
    keyUpHandlerActor(refName, e) {
        if(e.target.value.length > 0){
            getActorByName(e.target.value)
                .then(res => res)
                .then(data => {
                    console.log(data)
                    this.setState({
                        search : data,
                        inSearchActor : true,
                        inSearch : false,
                        keySearch: "",
                        keySearchActor: e.target.value,
                        actor: true
                    });
                })
        }
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
          var test = !this.state.inSearch ? false : true
          getFilmDetail (id)
            .then( response => response)
            .then(entries => {
                console.log(entries, this.state.showActor)
                this.setState(current => ({
                    showCrawl:  entries,
                    showFilm : true,
                    now : false,
                    // inSearch : false
                  }));
                  if(this.state.inSearch){
                    this.setState(current => ({
                        
                        inSearch : true
                      }));
                  }
            })}
        
            handleMovieActor = (e) => {
                var id = e.target.id
                var test = !this.state.inSearch ? false : true
                console.log(e,e.target, id)
                getActor (id)
                  .then( response => response)
                  .then(entries => {
                      console.log(entries)
                      this.setState(current => ({
                          showCrawl:  entries,
                          showActor : true
                          // inSearch : false
                        }));
                        if(this.state.inSearchActor){
                          this.setState(current => ({
                              
                              inSearchActor : true
                            }));
                        }
                  })}
        reset = (e => {
            var test = this.state.inSearch ? false : true
            this.setState(current => ({
                showCrawl:  {},
                showActor : false,
                showFilm : false,
                now : test
            }));
            console.log(this.state)
        })

    render() {
        if(this.state.now && !this.state.inSearch && !this.state.inSearchActor){
            console.log(this.state)
            console.log(this.state["entries"].results != undefined && Object.keys(this.state.showCrawl).length === 0 && this.state.inSearch === false,this.state.inSearchActor)
            return (
            <div>                
                <div className="input">
                    <input type="text" onKeyUp={this.handleLoginKeyUp} placeholder="Recherche par film" ref="search" autoFocus defaultValue={this.state.keySearch}/>
                </div>
                <div className="input">
                    <input type="text" onKeyUp={this.handleActorKeyUp} placeholder="Recherche par acteur" ref="searchActor" defaultValue={this.state.keySearchActor}/>
                </div>                
                <p>resultats : {this.state["entries"].total_results}</p>
                <h1>Films du moment :</h1>
                <div className="pagin">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Suivant >"
                        onPageChange={this.handlePageClick.bind(this)}
                        pageRangeDisplayed={5}
                        pageCount={this.state["entries"].total_pages}
                        previousLabel="< Précédent" 
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
                            </Items>
                        )
                    )}
                </div>
                
            </div>
            );
        }
        else if(this.state.inSearch && this.state.keySearch.length >0 && !this.state.actor && !this.state.showFilm){
            console.log(this.state)
            return(
            <div >               
                <div className="input">
                    <input type="text" onKeyUp={this.handleLoginKeyUp} placeholder="Recherche par film" ref="search" autoFocus defaultValue={this.state.keySearch}/>
                </div>
                <div className="input">
                    <input type="text" onKeyUp={this.handleActorKeyUp} placeholder="Recherche par acteur"ref="searchActor" autoFocus defaultValue={this.state.keySearchActor}/>
                </div>
                    <p>resultats : {this.state.search["total_results"]}</p>
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
                <div className=" homeConatainer">
                    {this.state.search["results"].map(
                        ({ id, poster_path,title }) =>  (
                            <Items
                                key={id}
                                id={id}
                                poster={getImageFromApi(poster_path) }
                                onClick = {this.handleMovie}
                            >
                            </Items>
                        )
                        )}
                </div>
                
            </div>)
        }
        else if(this.state.actor && !this.state.showActor){
            console.log(this.state.search,this.state.showCrawl,this.state.keySearchActor, this.state.inSearchActor)
            return(
                <div >
                 <div className="input">
                    <input type="text" onKeyUp={this.handleLoginKeyUp} placeholder="Recherche par film" ref="search" autoFocus defaultValue={this.state.keySearch}/>
                </div>
                <div className="input">
                    <input type="text" onKeyUp={this.handleActorKeyUp} placeholder="Recherche par acteur"ref="searchActor" autoFocus defaultValue={this.state.keySearchActor}/>
                </div>                
                <p>resultats : {this.state.search.total_results}</p>
                 <div className=" homeConatainer">
                 {this.state.search["results"].map(
                        ({ id, profile_path,name }) =>  (
                            <Actor
                                key={id}
                                id={id}
                                name={name}
                                poster={getImageFromApi(profile_path) }
                                onClick = {this.handleMovieActor}
                            >
                            </Actor>
                        )
                    )}
                    </div>
                 </div>
            )
        }
        else if(this.state.showActor){
           
            console.log(this.state.showCrawl)
            return (
                <div >
               <ActorDetail
                    key={this.state.showCrawl.id}
                    id={this.state.showCrawl.id}
                    actor={this.state.showCrawl}
                    poster={getImageFromApi(this.state.showCrawl.profile_path) }
                    onClick = {this.reset}
                >
                    
                </ActorDetail>
              </div>
            );
        }
        else if(this.state.showFilm){
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
        else{
            return (
            <div className="input">
                <input type="text" onKeyUp={this.handleLoginKeyUp} placeholder="Recherche par film" ref="search" autoFocus defaultValue={this.state.keySearch}/>
            </div>
            );
        }
    }
}

ReactDOM.render(<App />, document.getElementById('root'));