const express = require('express');
const app= express();
const PORT =3001;

 // Middleware
  // parsing incoming JSON request
 app.use(express.json()); 

  // Routes
  // Prefix routes with notes
  const notesRoutes = require('./routes/notes');
  app.use('/notes', notesRoutes); 

  // startServer
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })


  //  initializing an Express server, setting up JSON parsing middleware, and importing Routes for notes.
