import React, {useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateForm = props => {
    console.log(props);

    const [movie, setMovie] = useState(initialMovie);

    const { match, movies } = props;
    console.log("match: ", match, "movies: ", movies);


    useEffect(() => {
        const id = match.params.id;
        console.log(id);
        const movieToUpdate = movies.find(movie => movie.id == id);
        console.log(movieToUpdate);

        if (movieToUpdate){
            console.log(movieToUpdate)
            setMovie(movieToUpdate);
        }
    }, [match, movies]);

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'metascore') {
          value = parseInt(value, 10);
        }
        if (e.target.name === 'stars'){
            value = value.split(",");
        }
    
        setMovie({
          ...movie,
          [e.target.name]: value
        });
      };
    
      const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the item
        axios
          .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
          .then(res => {
            // needs to call setItems
            props.updateMovies([...movies, res.data]);
            props.history.push(`/`);
            setMovie(initialMovie);
          })
          .catch(err => console.log(err.response));
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <h2>Update Movie</h2>
            <input
              type="text"
              name="title"
              onChange={changeHandler}
              placeholder="title"
              value={movie.title}
            />
            <div className="baseline" />
    
            <input
              type="text"
              name="director"
              onChange={changeHandler}
              placeholder="Director"
              value={movie.director}
            />
            <div className="baseline" />
    
            <input
              type="number"
              name="metascore"
              onChange={changeHandler}
              placeholder="Metascore"
              value={movie.metascore}
            />
            <div className="baseline" />
    
            <input
              type="string"
              name="stars"
              onChange={changeHandler}
              placeholder="Actor 1, Actor 2, ..."
              value={movie.stars}
            />
    
           
            <div className="baseline" />
    
            <button>Update</button>
          </form>
      );
    };
    
    export default UpdateForm;