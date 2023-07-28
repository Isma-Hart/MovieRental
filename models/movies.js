const mongoose = require('mongoose')

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    parentalRating: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    isRented: {
        type: Number,
        required: true,
        default: 0
    },
    movieCount: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('movies', moviesSchema)