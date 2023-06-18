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
const selectedIngredients = []; // Tableau pour stocker les éléments déjà sélectionnés

// Générer les éléments HTML pour la liste des ingrédients initiale
generateFilteredIngredientsList(allIngredients);
// Ajouter la liste des ingrédients au filtre des ingrédients
ingredientsFilter.appendChild(ingredientsList);

// Générer les éléments HTML pour la liste des ingrédients
function generateFilteredIngredientsList(ingredients) {
  ingredientsList.innerHTML = '';
  ingredients.forEach(ingredient => {
    const ingredientItem = document.createElement('li');
    ingredientItem.textContent = ingredient;
    addClickEventListener(ingredientItem, ingredient);
    ingredientsList.appendChild(ingredientItem);
  });
}

// Ajout d'un écouteur d'événement sur la liste d'ingredients
ingredientsFilter.addEventListener('click', searchIngredient);
// Ajout d'un écouteur d'événement sur ingredients
ingredientsFilter.addEventListener('input', searchIngredient);
// Fonction pour effectuer une recherche d'ingrédients
function searchIngredient() {
  // Récupération du terme de recherche et nettoyage
  const searchIngredient = document.querySelector('.filterBtn:nth-child(1) .searchFilter input').value.trim().replace(/\s+/g, ' ').toLowerCase();
  // Filtrer les ingrédients en fonction du texte de recherche
  const filterIngredients = allIngredients.filter(ingredient =>
    ingredient.toLowerCase().includes(searchIngredient)
  );
  generateFilteredIngredientsList(filterIngredients);
}

// Fonction pour créer un tag d'ingrédient
function createIngredientTag(ingredient) {
  const ingredientTag = document.createElement('div');
  ingredientTag.textContent = ingredient;
  ingredientTag.classList.add('selectedIngredientTag');

  const closeIcon = document.createElement('span');
  closeIcon.innerHTML = '&times;';
  closeIcon.classList.add('closeIcon');

  closeIcon.addEventListener('click', () => {
    ingredientTag.remove();
    // Retirer l'élément de la liste des éléments sélectionnés
    const index = selectedIngredients.indexOf(ingredient);
    if (index > -1) {
      selectedIngredients.splice(index, 1);
      updateRecipeByIngredients();
    }
  });

  ingredientTag.appendChild(closeIcon);
  const tag = document.querySelector('.tag');
  tag.appendChild(ingredientTag);
}

// Ajouter un écouteur d'événements click à chaque élément de la liste
function addClickEventListener(ingredientItem, ingredient) {
  ingredientItem.addEventListener('click', () => {
    // Vérifier si l'élément a déjà été sélectionné
    if (!selectedIngredients.includes(ingredient)) {
      createIngredientTag(ingredient);
      // Ajouter l'élément à la liste des éléments sélectionnés
      selectedIngredients.push(ingredient);
      updateRecipeByIngredients();
    }
  });
}

///recette
// Fonction pour filtrer les recettes en fonction des ingrédients sélectionnés
function updateRecipeByIngredients() {
  const filteredRecipes = recipes.filter(recipe => {
    // Vérifier si tous les ingrédients sélectionnés sont présents dans la recette
    return selectedIngredients.every(ingredient => {
      return recipe.ingredients.some(recipeIngredient => recipeIngredient.ingredient === ingredient);
    });
  });

  if (filteredRecipes.length > 0){
    updateRecipeDisplay(filteredRecipes);
    updateFilterLists(filteredRecipes);
    } else {
      resetRecipeListDisplay(filteredRecipes);
      resetFilterLists(filteredRecipes);
  }
}

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



















// Ajout d'un écouteur d'événement sur appareils
appliancesFilter.addEventListener('input', searchAppliances);
// Fonction pour effectuer une recherche d'appareils
function searchAppliances() {
  // Récupération du terme de recherche et nettoyage
  const searchAppliances= document.querySelector('.filterBtn:nth-child(2) .searchFilter input').value.trim().replace(/\s+/g, ' ').toLowerCase();

  // Filtrer les appareils en fonction du texte de recherche
  const filterAppliances = appliances.filter(appliance =>
    appliance.toLowerCase().includes(searchAppliances)
  );
  
  // Supprimer les anciens éléments de la liste des appareils
  appliancesList.innerHTML = '';
  
  // Générer les nouveaux éléments HTML pour la liste des appareils filtrés
  filterAppliances.forEach(appliance=> {
    const applianceItem = document.createElement('li');
    applianceItem.textContent = appliance;
    appliancesList.appendChild(applianceItem);
  });
}

// Ajout d'un écouteur d'événement sur ustensils
ustensilsFilter.addEventListener('input', searchUstensils);
// Fonction pour effectuer une recherche d'ustensils
function searchUstensils() {
  // Récupération du terme de recherche et nettoyage
  const searchUstensils= document.querySelector('.filterBtn:nth-child(3) .searchFilter input').value.trim().replace(/\s+/g, ' ').toLowerCase();

  // Filtrer les ustensils en fonction du texte de recherche
  const filterUstensils = ustensils.filter(ustensil =>
    ustensil.toLowerCase().includes(searchUstensils)
  );
  
  // Supprimer les anciens éléments de la liste des ustensils
  ustensilsList.innerHTML = '';
  
  // Générer les nouveaux éléments HTML pour la liste des ustensils filtrés
  filterUstensils.forEach(ustensil=> {
    const ustensilItem = document.createElement('li');
    ustensilItem.textContent = ustensil;
    ustensilsList.appendChild(ustensilItem);
  });
}
