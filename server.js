const express = require('express');
const app = express();
const recipesRouter = require('./routes/recipes');

app.use('/recipes', recipesRouter);

// Default port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
