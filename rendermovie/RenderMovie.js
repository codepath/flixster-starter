//utility function to iterate over the array that has the movie details. it's in an object that has the whole movie details in the API
export function RenderMovie(dataObject){
    const arr = []
    for(let i = 0; i < dataObject.length; i++){
        let movies = dataObject[i]
        console.log(movies)
        let items = {
          //the items for these things are stored as that in the array i.e poster_path, runtime, overview
            "image": movies.poster_path,
            "title": movies.original_title,
            "rating": movies.vote_average,
            "overview": movies.overview,
            "runtime": movies.runtime,
            "release_date": movies.release_date,
            "genres": movies.genres,
            "id": movies.id
        }
          arr.push(items) //add it to an array named arr
    }
    return(
        arr // return the array
    )
  
}
