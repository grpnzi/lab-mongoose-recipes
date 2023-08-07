const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
mongoose.set('strictQuery', true);

const MONGODB_URI = 'mongodb+srv://admin:@cluster0.2ftqroh.mongodb.net/MyFirstDatabase';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
    
  })
  // Iteration 2 - Create a recipe
  .then(()=> {
    return Recipe.create({
      title: "Delicious Pancakes",
      level: "Easy Peasy",
      ingredients: ["flour", "milk", "eggs", "sugar", "baking powder"],
      cuisine: "American",
      dishType: "breakfast",
      image: "https://images.media-allrecipes.com/images/12345.jpg",
      duration: 30,
      creator: "John Doe"
    })
  })
  .then((element) => console.log(element.title))
  // Iteration 3 - Insert multiple recipes
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.insertMany(data)
  })
  .then((response)=> 
  {
    response.forEach((element)=>{
      console.log(element.title);
    })
  })
  // Iteration 4 - Update recipe
  .then(()=> {
    const query = {title: 'Rigatoni alla Genovese'}
    const update = {duration: 100 };

    return Recipe.findOneAndUpdate(query, update);
  })
  .then(()=> console.log("It's succes"))
  // Iteration 5 - Remove a recipe
  .then(()=>{
    return Recipe.deleteOne( {title: 'Carrot Cake'});
  })
  .then(()=> console.log('Succes deleting Carrot Cake'))
  // Iteration 6 - Close the Database
  .then(()=>  mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

