const express = require('express')
const router = express.Router()
const Movie = require('../models/movies')

// Getting all 
router.get('/', async (req, res) => {
    try {
        const movierental = await Movie.find()
        res.json(movierental)
    } catch (err) {
        //status 500 - error on server
        res.status(500).json({message: err.message})
    }
})

// Getting One
router.get('/:id', getMovie, (req, res) => {
    const movieInfo = `
        Title: ${res.movie.title}
        Director: ${res.movie.director}
        Parental Rating: ${res.movie.parentalRating}
        Release Year: ${res.movie.releaseYear}
        Genre: ${res.movie.genre}
        Rent Status: ${res.movie.isRented}
        Available Copies: ${res.movie.movieCount}`
    
    res.send(movieInfo)
})

// Getting by title
router.get('/title/:title', getMovieTitle, (req, res) => {
    const movieInfo = `
        Title: ${res.movie.title}
        Director: ${res.movie.director}
        Parental Rating: ${res.movie.parentalRating}
        Release Year: ${res.movie.releaseYear}
        Genre: ${res.movie.genre}
        Rent Status: ${res.movie.isRented}
        Available Copies: ${res.movie.movieCount}`

    res.send(movieInfo)
})

// Getting by director
router.get('/director/:director', async (req, res) => {
    const director = req.params.director

    try {
        const movies = await Movie.find({director: {$regex: director, $options: 'i'}})
        res.json(movies)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Getting by parentalRating
router.get('/parentalRating/:parentalRating', async (req, res) => {
    const parentalRating = req.params.parentalRating

    try {
        const movies = await Movie.find({parentalRating: {$regex: parentalRating, $options: 'i'}})
        res.json(movies)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Getting by releaseYear
router.get('/releaseYear/:releaseYear', async (req, res) => {
    const releaseYear = req.params.releaseYear

    try {
        const movies = await Movie.find({releaseYear: releaseYear})
        res.json(movies)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Getting by genre
router.get('/genre/:genre', async (req, res) => {
    const genre = req.params.genre

    try {
        const movies = await Movie.find({genre: {$regex: genre, $options: 'i'}})
        res.json(movies)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Creating one
router.post('/', async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        parentalRating: req.body.parentalRating,
        releaseYear: req.body.releaseYear,
        genre: req.body.genre
    })

    try {
        const newMovie = await movie.save()
        //201 - created something successfully
        res.status(201).json(newMovie)
    } catch (err) {
        //400 - user malfunction
        res.status(400).json({message: err.message})
    }
})

// Renting a movie by ID
router.patch('/:id/rent', getMovie, async (req, res) => {
    if (res.movie.movieCount <= 0) {
        return res.status(400).json({message: 'Movie not available for rent'})
    }

    res.movie.isRented++
    res.movie.movieCount--

    try {
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Renting a movie by title
router.patch('/title/:title/rent', getTitle, async (req, res) => {
    if (res.movie.movieCount <= 0) {
        return res.status(400).json({message: 'Movie not available for rent'})
    }

    res.movie.isRented++
    res.movie.movieCount--

    try {
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Return a copy by ID
router.patch('/:id/return', getMovie, async (req, res) => {
    if (res.movie.isRented <= 0) {
        return res.status(400).json({message: 'Movie is not rented'}) 
    }
        
    res.movie.isRented--
    res.movie.movieCount++

    try {
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    } catch (err) {
        res.status(400).json({message: err.message})
    }

})

// Return a copy by title 
router.patch('/title/:title/return', getTitle, async (req, res) => {
    if (res.movie.isRented <= 0) {
        return res.status(400).json({message: 'Movie is not rented'}) 
    }
        
    res.movie.isRented--
    res.movie.movieCount++

    try {
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    } catch (err) {
        res.status(400).json({message: err.message})
    }

})

// Stock count to movies by ID
router.patch('/:id/stock', getMovie, async (req, res) => {
    const addStock = req.body.movieCount

    if (!Number.isInteger(addStock) || addStock < 0) {
        return res.status(400).json({ message: 'Invalid stock count value' });
    }

    res.movie.movieCount += addStock

    try {
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Stock count to movies by title
router.patch('/title/:title/stock', getTitle, async (req, res) => {
    const addStock = req.body.movieCount

    if (!Number.isInteger(addStock) || addStock < 0) {
        return res.status(400).json({ message: 'Invalid stock count value' });
    }

    res.movie.movieCount += addStock

    try {
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Updating one
router.patch('/:id', getMovie, async (req, res) => {
    if (req.body.title != null) {
        res.movie.title = req.body.title
    }

    if (req.body.director != null) {
        res.movie.director = req.body.director
    }

    if (req.body.parentalRating != null) {
        res.movie.parentalRating = req.body.parentalRating
    }

    if (req.body.releaseYear != null) {
        res.movie.releaseYear = req.body.releaseYear
    }

    if (req.body.genre != null) {
        res.movie.genre = req.body.genre
    }
    
    try {
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Deleting One by ID
router.delete('/:id', getMovie, async (req, res) => {
    try {
        await res.movie.deleteOne()
        res.json({message: 'Deleted movie'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//middleware
async function getMovie(req, res, next) {
    let movie

    try {
        movie = await Movie.findById(req.params.id)
        
        if (Movie == null) {
            return res.status(404).json({message: 'Cannont find movie'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.movie = movie
    next()
}

async function getTitle(req, res, next) {
    let movie

    try {
        movie = await Movie.findOne({title: req.params.title})
        if (!movie) {
            return res.status(404).json({message: 'Movie not found'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.movie = movie
    next()
}

async function getMovieTitle(req, res, next) {
    let movie

    try {
        movie = await Movie.findOne({title: req.params.title})
        if (!movie) {
            return res.status(404).json({message: 'Movie not found'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.movie = {
        _id: movie._id,
        title: movie.title,
        director: movie.director,
        parentalRating: movie.parentalRating,
        releaseYear: movie.releaseYear,
        genre: movie.genre,
        isRented: movie.isRented,
        movieCount: movie.movieCount
    }
    next()
}

module.exports = router