const express = require('express');
const app= express();
const PORT =3001;
const notesRoutes= require('./routes/notes');
const path= require('path');

 // Middleware
  // parsing incoming JSON request
 app.use(express.json()); 
 app.use (express.urlencoded({extended: true}));

 // Server the front-end site
 app.use (express.static(path.join(__dirname, 'public')));

  // Routes
  // Prefix routes with notes
  app.use('/notes', notesRoutes); 

  // startServer
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })


  //  initializing an Express server, setting up JSON parsing middleware, and importing Routes for notes.
