const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected'));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must hava a name'],
    unique: true
  },
  price: { type: Number, required: [true, 'A tour must have a price'] },
  rating: { type: Number, default: 4.5 }
});
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Park Camper',
  price: 997
});

testTour
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${process.env.PORT}...`);
});
