import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert';


export class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       input:'',
       movie:[],
      id:'',
      
    }
  }
  handleId=(e)=>{
    this.setState({
      id:e.target.value
    })
  
  }
 handleInput=(e)=>{
    this.setState({
      input:e.target.value
    })
   
 }  
 submit=()=>{
   if(this.state.input==''){
      swal("Please Enter Movie Name!", "", "warning");
   }else{
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=135b6e7e12a820057fe03a345a4393c5&query=${this.state.input}&page=1&include_adult=false`)
    .then(res=>{
      const result = res.data.results
      this.setState({movie:result})
      console.log(this.state.movie,'---------------------->')
    })
   }
   this.setState({input:''})
     
 }

  render() {
    const {id,movie}=this.state
    return (

      <div >
        <h1 className='text-white text-center' style={{background:'#032541' }}>Movie Finder</h1>
        <div className='overlay text-center d-flex justify-content-center align-items-end' style={{height:'90vh'}}>
          <div  className='text-white py-5 display-3 '>
          <h1 style={{background:''}}>Welcome</h1>
          <p>Millions of movies to discover. Explore now.</p>
          <div class="py-5 input-group mb-3 container">
            <input style={{borderRadius:'50px'}} type="text" class="form-control" placeholder="Search Movie......" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.state.input} onChange={this.handleInput}/>
            <div class="input-group-append" >
              <button class="btn btn-outline-secondary text-white"  type="button" style={{borderRadius:'50px'}} onClick={this.submit}>Search</button>
            </div>
          </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
    
        {movie.map(ele=>{
      return(
       <div className='col-sm'>
          <div key={ele.id}  class="card my-4 " style={{width: "18rem"}}>
          <img src={ele.poster_path == null?('default.png'):(`https://image.tmdb.org/t/p/w500${ele.poster_path}`)} class="card-img-top "  style={{width: "18rem",height:"30rem"}}></img>
            <div class="card-body bg-secondary">
              <h4 class="card-title">{ele.title}</h4>
                  <p class="card-text"><b>Popularity:- </b>{ele.popularity}</p>
                  <p class="card-text"><b>Release Date:- </b> {ele.release_date}</p>
                  <p class="card-text"><b>Rating:- </b>{ele.vote_average}</p>
                  <button type="button" class="btn btn-block btn-outline-warning text-white rounded-0 "  data-toggle="modal" data-target="#exampleModal" value={ele.id}  onClick={this.handleId}>
                  Know More...
                  </button>
            </div>
          </div>
        
        </div>
        
      )
    })
    } 
     {movie.map(ele=>{
     if(ele.id==id){
      return(
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
            <h3 class="modal-title text-dark" id="exampleModalLabel">{ele.title}</h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body bg-dark">
            <div className='d-flex '>
          <img src={ele.poster_path == null?('default.png'):(`https://image.tmdb.org/t/p/w500${ele.poster_path}`)} class="card-img-top "  style={{width: "18rem"}}></img>
            
              <div className='mx-4'>
              <p class="card-text"><b>Popularity:- </b> {ele.popularity}</p>
                  <p class="card-text"><b>Release Date:- </b>{ele.release_date}</p>
                  <p class="card-text"><b>Rating:- </b>{ele.vote_average}</p>
              </div>
            </div>
             
            <p><b>Overview:- </b>{ele.overview}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      )
     }
   })
  }
   
    
    
          
      </div>
    </div>
  </div>
    )
  }
}

export default Home
