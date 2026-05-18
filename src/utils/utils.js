//Sort the given array based on type passed
export default function sort(arr,type) {

    const sortedArr = [...arr]

    if (type === 'alpha'){
        return sortedArr.sort((a,b) => a.title.localeCompare(b.title));
    }else if (type === 'release'){
        return sortedArr.sort((a,b) => b.release_date.localeCompare(a.release_date))
    }else if (type === 'vote'){
        return sortedArr.sort((a,b) => b.vote_average - a.vote_average)
    }else {
        return arr
    }
}