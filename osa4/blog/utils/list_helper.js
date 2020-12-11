const _ = require("lodash");


const dummy = (blogs) => { return 1 }
  
const totalLikes = blogs => {

    const reducer = ( a, b) => a + b.likes
    
    return blogs.length === 1  
        ? blogs[0].likes
        : blogs.reduce(reducer, 0)
    
}

const favoriteBlog = (blogs) => {
    
    const reducer = (current, next) => {
             if (next.likes > current.likes){
                current = next
             }
        
             return current
        }

           const fav = blogs.reduce(reducer)  

    return (
       
            [{
                title: fav.title,
                author: fav.author,
                likes: fav.likes
            }]
    )
} 
/*
const mostBlogs = (blogs) => {

    const reducer = (current, next) =>{
        const index = current.indexOf(next.author)
        if( index === -1 ){
            current.push([{author: next.author, blogs: 1}])
        } else current[index].blogs += 1
            
        return current
        }
        
    const blogger = blogs.reduce(reducer)
                         .sort((a,b) => a.blogs >= b.blogs)[0]
    
    return blogger

    }
*/

const mostBlogs = (blogs) => {

    const reducer = (current, next) => {
        const a = _.findIndex(current, function(a) {
            return a[0].author === next.author})
        //console.log(a)
        const index = _.indexOf(current, next.author)//current.indexOf(next.author)
        
        if( a === -1){
            current.push([{author: next.author, blogs: 1}])
            //console.log(_.head(current)[0].author)

        } else {
           // console.log(1212)
            current[a][0].blogs = current[a][0].blogs + 1
        }
        return current
        }
        
    const blogger = _.reduce(blogs, (reducer), [])
                     .sort((a,b) => {
                          return b[0].blogs - a[0].blogs
                     })
                     [0]
                     
                     
    return blogger

    }

const mostLikes = (blogs) => {

    const reducer = (current, next) => {
        const a = _.findIndex(current, function(a) {
            return a[0].author === next.author})
        if( a === -1){
            current.push([{author: next.author, likes: next.likes}])

        } else {
            current[a][0].likes = current[a][0].likes + next.likes
        }
        return current
        }
        
    const blogger = _.reduce(blogs, (reducer), [])
                     .sort((a,b) => {
                          return b[0].likes - a[0].likes
                     })
                     [0]
                     
                     
    return blogger

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }