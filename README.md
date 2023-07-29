# MovieRental
REST API for a movie rental store.


Description of Assignment:
  "Create a REST API for a movie rental store, where it should control stock (CRUD) and rental of available DVDs.
  
  Feel free to use whatever language you are most comfortable with.
  
  Mandatory points:
  - Use database
  - Have route documentation
  
  To help:
  
  A film can be described by its generic structure
  
  Film {
    Title string 
    //Subtitle string
    Author string
    ParentalRating string
    ReleaseYear number
    Genre string
  }"



Installation:
  Prerequisites
  Before you proceed with the installation, ensure you have the following prerequisites installed on your machine:
  
  Node.js: Make sure you have Node.js installed. You can download the latest version from the official website: https://nodejs.org/
  
  npm: npm is the Node.js package manager, and it is installed along with Node.js. Verify its installation by running the following       command in your terminal:
  bash
    npm --version
    
  Database: This REST API requires a database, such as MongoDB make sure it is installed and running. Configure the database connection   settings before starting the API.
  
  Clone the Repository
  Clone this GitHub repository to your local machine using the following command:
  bash
    git clone https://github.com/your-username/your-rest-api.git
  
  Change into the project directory:
  bash
    cd your-rest-api
  
  Install Dependencies
  To install the required npm packages, run the following command in the project directory:
  bash 
    npm i express mongoose



Testing and Usage
Testing can vary depending on user choice, I used and recommend the extension "REST Client" by Huachao Mao which can be easily found in Visual Studio Code. The route.rest file includes all the necessary notes and specific cases to cover testing. 
This REST API can be used to add, and delete movies from a movie rental store's available showings. It can also modify generic information about the movie. This REST API also has the capability of showing the number of available DVDs for a specific film and the number of currently rented DVDs of that specific film. One can also look movies up by title, id, director, etc. 

Enjoy!
