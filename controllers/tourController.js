const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );
  
  const dataIsValid = (isValid, res) => {
    if (!isValid) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
      });
    }
  };
  
  exports.getAllTours = (req, res) => {
    res.status(200).json({
      status: 'success',
      results: tours.length,
      requestTime: req.requestTime,
      data: {
        tours
      }
    });
  };
  
  exports.getTour = (req, res) => {
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
  
  exports.createTour = (req, res) => {
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
  
  exports.updateTour = (req, res) => {
    dataIsValid(req.params.id * 1 <= tours.length, res);
  
    res.status(200).json({
      status: 'success',
      data: {
        tour: req.body
      }
    });
  };
  
  exports.deleteTour = (req, res) => {
    dataIsValid(req.params.id * 1 <= tours.length, res);
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  };