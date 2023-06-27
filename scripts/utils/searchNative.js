// Sélection de l'élément de champ de recherche
const searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener('input', searchRecipe);

// Fonction pour effectuer une recherche de recettes
function searchRecipe() {
  const t0 = performance.now();
  const searchTerm = document.querySelector('input[type="text"]').value.trim().replace(/\s+/g, ' ').toLowerCase();
  const hasSearchTerm = searchTerm !== '' && searchTerm.length >= 3;
  const isSearchTermValid = validateEntry(searchTerm);

  if (!hasSearchTerm && selectedIngredients.length === 0 && selectedAppliances.length === 0 && selectedUstensils.length === 0 && isSearchTermValid) {
    resetRecipeDisplay();
    resetFilterLists();
    return;
  }

  let filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeTitle = recipe.name.toLowerCase();
    const recipeIngredients = getRecipeIngredients(recipe);
    const recipeDescription = recipe.description.toLowerCase();

    if (
      recipeTitle.includes(searchTerm) ||
      recipeIngredients.includes(searchTerm) ||
      recipeDescription.includes(searchTerm)
    ) {
      filteredRecipes.push(recipe);
    }
  }

  // Filtrer par ingrédients
  const selectedRecipeIngredients = [];
  for (let i = 0; i < selectedIngredients.length; i++) {
    selectedRecipeIngredients.push(selectedIngredients[i].toLowerCase());
  }

  if (selectedRecipeIngredients.length > 0) {
    const tempFilteredRecipes = [];
    for (let i = 0; i < filteredRecipes.length; i++) {
      const recipe = filteredRecipes[i];
      const recipeIngredients = getRecipeIngredients(recipe);
      let hasAllIngredients = true;
      for (let j = 0; j < selectedRecipeIngredients.length; j++) {
        if (!recipeIngredients.includes(selectedRecipeIngredients[j])) {
          hasAllIngredients = false;
          break;
        }
      }
      if (hasAllIngredients) {
        tempFilteredRecipes.push(recipe);
      }
    }
    filteredRecipes = tempFilteredRecipes;
  }

  // Filtrer par appareils
  const selectedRecipeAppliances = [];
  for (let i = 0; i < selectedAppliances.length; i++) {
    selectedRecipeAppliances.push(selectedAppliances[i].toLowerCase());
  }

  if (selectedRecipeAppliances.length > 0) {
    const tempFilteredRecipes = [];
    for (let i = 0; i < filteredRecipes.length; i++) {
      const recipe = filteredRecipes[i];
      const recipeAppliance = recipe.appliance.toLowerCase();
      let hasAppliance = false;
      for (let j = 0; j < selectedRecipeAppliances.length; j++) {
        if (recipeAppliance === selectedRecipeAppliances[j]) {
          hasAppliance = true;
          break;
        }
      }
      if (hasAppliance) {
        tempFilteredRecipes.push(recipe);
      }
    }
    filteredRecipes = tempFilteredRecipes;
  }

  // Filtrer par ustensiles
  const selectedRecipeUstensils = [];
  for (let i = 0; i < selectedUstensils.length; i++) {
    selectedRecipeUstensils.push(selectedUstensils[i].toLowerCase());
  }

  if (selectedRecipeUstensils.length > 0) {
    const tempFilteredRecipes = [];
    for (let i = 0; i < filteredRecipes.length; i++) {
      const recipe = filteredRecipes[i];
      const recipeUstensils = [];
      for (let j = 0; j < recipe.ustensils.length; j++) {
        recipeUstensils.push(recipe.ustensils[j].toLowerCase());
      }
      let hasAllUstensils = true;
      for (let j = 0; j < selectedRecipeUstensils.length; j++) {
        if (!recipeUstensils.includes(selectedRecipeUstensils[j])) {
          hasAllUstensils = false;
          break;
        }
      }
      if (hasAllUstensils) {
        tempFilteredRecipes.push(recipe);
      }
    }
    filteredRecipes = tempFilteredRecipes;
  }

  if (filteredRecipes.length === 0) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = `Aucune recette ne contient '${searchTerm}' avec les éléments sélectionnés. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
    resetRecipeDisplay();
    resetFilterLists();
  } else {
    updateRecipeDisplay(filteredRecipes);
    updateFilterLists(filteredRecipes);
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = '';
  }
  var t1 = performance.now();
  console.log("L'appel a demandé " + (t1-t0)+ " ms.")
}
// Fonction pour réinitialiser l'affichage des recettes
function resetRecipeDisplay() {
  recipesContainer.innerHTML = '';
  createRecipeCards(recipes); // Utilisation de la fonction createRecipeCards pour générer les cartes de recette
  totalRecipeCount.textContent = `${recipes.length} recettes`;
}
// Fonction pour l'affichage des recettes filtrées
function updateRecipeDisplay(filteredRecipes) {
  recipesContainer.innerHTML = '';
  createRecipeCards(filteredRecipes); // Utilisation de la fonction createRecipeCards pour générer les cartes de recette
  totalRecipeCount.textContent = `${filteredRecipes.length} recettes`;
}
// Fonction pour réinitialiser les listes de filtres
function resetFilterLists() {
    // Tableau des listes de filtres à réinitialiser
    const filterLists = [
      { list: ingredientsList, items: allIngredients },   
      { list: appliancesList, items: allAppliances },      
      { list: ustensilsList, items: allUstensils }       
    ];
  
    // Parcours de chaque liste de filtres
    for (let i = 0; i < filterLists.length; i++) {
      const filter = filterLists[i];
  
      // Réinitialisation de la liste
      filter.list.innerHTML = '';
  
      // Parcours des éléments de la liste et création des éléments <li>
      let j = 0;
      while (j < filter.items.length) {
        const item = filter.items[j];
        const listItem = document.createElement('li');
        listItem.textContent = item;
        filter.list.appendChild(listItem);
        j++;
      }
    }
}
// Fonction pour l'affichage des listes de filtres en fonction des recettes filtrées
function updateFilterLists(filteredRecipes) {
  const filteredIngredients = new Set();
  const filteredAppliances = new Set();
  const filteredUstensils = new Set();

  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipe = filteredRecipes[i];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j].ingredient;
      filteredIngredients.add(ingredient);
    }

    filteredAppliances.add(recipe.appliance);

    for (let k = 0; k < recipe.ustensils.length; k++) {
      const ustensil = recipe.ustensils[k];
      filteredUstensils.add(ustensil);
    }
  }

  // Mettre à jour la liste des ingrédients sélectionnés
  let i = selectedIngredients.length - 1;
  while (i >= 0) {
    const ingredient = selectedIngredients[i];
    if (!filteredIngredients.has(ingredient)) {
      selectedIngredients.splice(i, 1);
    }
    i--;
  }
  generateFilteredIngredientsList([...filteredIngredients]);

  // Mettre à jour la liste des appareils sélectionnés
  let j = selectedAppliances.length - 1;
  while (j >= 0) {
    const appliance = selectedAppliances[j];
    if (!filteredAppliances.has(appliance)) {
      selectedAppliances.splice(j, 1);
    }
    j--;
  }
  generateFilteredAppliancesList([...filteredAppliances]);

  // Mettre à jour la liste des ustensiles sélectionnés
  let k = selectedUstensils.length - 1;
  while (k >= 0) {
    const ustensil = selectedUstensils[k];
    if (!filteredUstensils.has(ustensil)) {
      selectedUstensils.splice(k, 1);
    }
    k--;
  }
  generateFilteredUstensilsList([...filteredUstensils]);
}
//recupere les ingredients des recettes
function getRecipeIngredients(recipe) {
  return recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
}
//Fonction pour verifier les caractères non autorisés
function validateEntry(str) {
  var letters =
    /[^a-zA-Z'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ ]+/;
  if (str.match(letters)) {
    return false;
  }
  return true;
}