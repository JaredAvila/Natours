const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// returns 404 if isValid is false

const dataIsValid = (isValid, res) => {
  if (!isValid) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
};

// request response handlers

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  dataIsValid(tour, res);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

const createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

const updateTour = (req, res) => {
  dataIsValid(req.params.id * 1 <= tours.length, res);

  res.status(200).json({
    status: 'success',
    data: {
      tour: req.body
    }
  });
};

const deleteTour = (req, res) => {
  dataIsValid(req.params.id * 1 <= tours.length, res);

  res.status(204).json({
    status: 'success',
    data: null
  });
};

// Routes
app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
