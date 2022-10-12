import { useState, useEffect } from 'react'
import './App.css'
import Axios from 'axios'

function App() {

  const [moviewName, setMoviewName] = useState("")
  const [review, setReview] = useState("")
  const [movieReviewList, setMovieReviewList] = useState([])

  const [newReview, setnewReview] = useState("")

  useEffect(() => {
    Axios.get('http://localhost:3001/api/Allmovies').then(response => { setMovieReviewList(response.data) });
  }, [])


  function submitReview(event) {
    event.preventDefault();
    Axios.post('http://localhost:3001/api/movies', { movieName: moviewName, movieReview: review })
    // setMovieReviewList will help to push into the array of the current movies with "...x" method
    setMovieReviewList([...movieReviewList, { movieName: moviewName, movieReview: review }])
    // clearing the inputs
    // setMoviewName("");
    // setReview("");
  }

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/movies/${movie}`)
  }

  const updateReview = (movie) => {
    Axios.put('http://localhost:3001/api/update', {
      movieName: movie,
      movieReview: newReview
    });
    setnewReview("")
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>

      <form className='form-movie'>
        <label><h3>The name of Movie: {moviewName} 😄</h3></label>
        <input type="text" name='movieName' placeholder='Please enter a name' onChange={(e) => setMoviewName(e.target.value)} />

        <h3><label>The review: {review} 😃 </label></h3>
        <input type="text" name='review' placeholder='Please review' onChange={(e) => setReview(e.target.value)} />

        <button type="submit" onClick={submitReview}><h3>submit</h3></button>

        {movieReviewList.map(({ movieName, movieReview }) => {
          return (
            <div className='card'>
              <h3>movie: {movieName}</h3>
              <i>review: {movieReview}</i> <br />

              <button onClick={() => { deleteReview(movieName) }}>Delete</button>

              <input type="text" id='updateInput' onChange={(e) => setnewReview(e.target.value)} />
              <button onClick={() => { updateReview(movieName) }}>Update</button>
            </div>
          )

        })}
      </form>
    </div>
  )
}

export default App
