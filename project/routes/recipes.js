const express = require('express');
const router = express.Router();
const recipes = require('../recipes.json');

// GET /recipes/shopping-list?ids=1,2
router.get('/shopping-list', (req, res) => {
  const { ids } = req.query;

  // If ids is missing or blank -> 400
  if (!ids || ids.trim() === '') {
    return res.status(400).send('ids parameter is required');
  }

  const idList = ids.split(',').map(id => parseInt(id.trim(), 10));

  // Filter valid recipes
  const matchedRecipes = recipes.filter(r => idList.includes(r.id));

  if (matchedRecipes.length === 0) {
    return res.status(404).send('NOT_FOUND');
  }

  // Aggregate ingredients
  let aggregatedIngredients = [];
  matchedRecipes.forEach(recipe => {
    aggregatedIngredients = aggregatedIngredients.concat(recipe.ingredients);
  });

  res.json(aggregatedIngredients);
});

module.exports = router;
