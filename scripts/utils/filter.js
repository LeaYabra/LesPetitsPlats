// Récupérer la référence de l'élément de filtre des ingrédients
const ingredientsFilter = document.querySelector('.filterBtn:nth-child(1) .searchFilter');

// Récupérer la liste de tous les ingrédients du fichier JSON
const allIngredients = recipes.reduce((ingredients, recipe) => {
  recipe.ingredients.forEach(ingredient => {
    if (!ingredients.includes(ingredient.ingredient)) {
      ingredients.push(ingredient.ingredient);
    }
  });
  return ingredients;
}, []);

// Générer les éléments HTML pour la liste des ingrédients
const ingredientsList = document.createElement('div');
ingredientsList.classList.add('filterlist');
allIngredients.forEach(ingredient => {
  const ingredientItem = document.createElement('li');
  ingredientItem.textContent = ingredient;
  ingredientsList.appendChild(ingredientItem);
});

// Ajouter la liste des ingrédients au filtre des ingrédients
ingredientsFilter.appendChild(ingredientsList);

// Récupérer la référence de l'élément de filtre des appareils
const appliancesFilter = document.querySelector('.filterBtn:nth-child(2) .searchFilter');

// Tableau pour stocker les appareils
const appliances = [];

// Parcours des recettes
recipes.forEach((recipe) => {
  const appliance = recipe.appliance;
  if (!appliances.includes(appliance)) {
    appliances.push(appliance);
  }
});

// Générer les éléments HTML pour la liste des appareils
const appliancesList = document.createElement('div');
appliancesList.classList.add('filterlist');
appliances.forEach((appliance) => {
  const applianceItem = document.createElement('li');
  applianceItem.textContent = appliance;
  appliancesList.appendChild(applianceItem);
});
// Ajouter la liste des ingrédients au filtre des appareils
appliancesFilter.appendChild(appliancesList);

// Récupérer la référence de l'élément de filtre des ustensiles
const ustensilsFilter = document.querySelector('.filterBtn:nth-child(3) .searchFilter');

// Tableau pour stocker les ustensiles
const ustensils = [];

// Parcours des recettes
recipes.forEach((recipe) => {
  const recipeUtensils = recipe.ustensils;
  recipeUtensils.forEach((ustensil) => {
    if (!ustensils.includes(ustensil)) {
      ustensils.push(ustensil);
    }
  });
});
// Générer les éléments HTML pour la liste des ustensiles
const ustensilsList = document.createElement('div');
ustensilsList.classList.add('filterlist');
ustensils.forEach(( ustensil) => {
  const ustensilItem = document.createElement('li');
  ustensilItem.textContent = ustensil;
  ustensilsList.appendChild(ustensilItem);
});
// Ajouter la liste des ingrédients au filtre des ustensiles
ustensilsFilter.appendChild(ustensilsList);

