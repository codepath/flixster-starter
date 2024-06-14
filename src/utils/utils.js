//directory of genre id's and their value taken from themoviedb site
export const genre_to_id = {
    'Action': 28,
    'Adventure': 12,
    'Animation': 16,
    'Comedy': 35,
    'Crime': 80,
    'Documentary': 99,
    'Drama': 18,
    'Family': 10751,
    'Fantasy': 14,
    'History': 36,
    'Horror': 27,
    'Music': 10402,
    'Mystery': 9648,
    'Romance': 10749,
    'Science Fiction': 878,
    'TV Movie': 10770,
    'Thriller': 53,
    'War': 10752,
    'Western': 37
}
//helper to convert raw minutes int to a string, "hours:minutes" format
export function timeFormat(time){
    let hour = Math.floor(time/60).toString();
    let minute = time%60
    if(minute == 0 && hour == 0){
        return "no time provided"
    }
    if(minute < 10){
        return hour + ":0" +minute.toString() 
    }
    else{
        return hour +":" + minute.toString()
    }
}

/*
helper function to swap the k:v elements of a json [list] to v:k
*/
export function swap(list){
    let ret = {};
    for(let key in list){
      ret[list[key]] = key;
    }
    return ret;
  }

/*
helper function that guards against movies with no associated poster image. 
if a movie lacks an image, return the default image "movieplaceholer"
*/
export function imageGuard(img) {
    const baseImgURL = "https://image.tmdb.org/t/p/w500";
    if(img != null ) {
        return baseImgURL + img
    } else {
        return "src/assets/movieplaceholder.jpg"
    }

}

