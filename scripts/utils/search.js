// Ajout d'un écouteur d'événement sur le champ de recherche
const searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener("input", searchRecipe);

// Fonction pour effectuer une recherche de recettes
function searchRecipe() {
  const t0 = performance.now();
  const searchTerm = document.querySelector('input[type="text"]').value.trim().replace(/\s+/g, ' ').toLowerCase();
  const hasSearchTerm = searchTerm !== '' && searchTerm.length >=3;
  const isSearchTermValid = validateEntry(searchTerm);

  if (!hasSearchTerm && selectedIngredients.length === 0 && selectedAppliances.length === 0 && selectedUstensils.length === 0  && isSearchTermValid) {
    resetRecipeDisplay();
    resetFilterLists();
    return;
  }

  let filteredRecipes = recipes.filter(recipe => {
    const recipeTitle = recipe.name.toLowerCase();
    const recipeIngredients = getRecipeIngredients(recipe);
    const recipeDescription = recipe.description.toLowerCase();
    return recipeTitle.includes(searchTerm) || recipeIngredients.includes(searchTerm) || recipeDescription.includes(searchTerm);
  });

  // Filtrer par ingrédients
  const selectedRecipeIngredients = selectedIngredients.map(ingredient => ingredient.toLowerCase());

  if (selectedRecipeIngredients.length > 0) {
    filteredRecipes = filteredRecipes.filter(recipe => {
      const recipeIngredients = getRecipeIngredients(recipe);
      //const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
      return selectedRecipeIngredients.every(ingredient => recipeIngredients.includes(ingredient));
    });
  }
  // Filtrer par appareils
  const selectedRecipeAppliances = selectedAppliances.map(appliance => appliance.toLowerCase());

  if (selectedRecipeAppliances.length > 0) {
    filteredRecipes = filteredRecipes.filter(recipe => {
      const recipeAppliance = recipe.appliance.toLowerCase();
      return selectedRecipeAppliances.every(appliance => recipeAppliance === appliance);
    });
  }
  
  // Filtrer par ustensiles
  const selectedRecipeUstensils = selectedUstensils.map(ustensil => ustensil.toLowerCase());

  if (selectedRecipeUstensils.length > 0) {
    filteredRecipes = filteredRecipes.filter(recipe => {
      const recipeUstensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
      return selectedRecipeUstensils.every(ustensil => recipeUstensils.includes(ustensil));
    });
  }
  
  if (filteredRecipes.length === 0) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = `Aucune recette ne contient '${searchTerm}'avec les éléments selctionnés. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
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
  recipesContainer.innerHTML = "";
  createRecipeCards(recipes); // Utilisation de la fonction createRecipeCards pour générer les cartes de recette
  totalRecipeCount.textContent = `${recipes.length} recettes`;
}
// Fonction pour réinitialiser l'affichage des listes
function resetRecipeListDisplay() {
  recipesContainer.innerHTML = "";
  totalRecipeCount.textContent = "0 recette";
}
// Fonction pour l'affichage des recettes filtrées
function updateRecipeDisplay(filteredRecipes) {
  recipesContainer.innerHTML = "";
  createRecipeCards(filteredRecipes);
  totalRecipeCount.textContent = `${filteredRecipes.length} recettes`;
}
// Fonction pour réinitialiser les listes de filtres
function resetFilterLists() {
  // Tableau des listes de filtres à réinitialiser
  const filterLists = [
    { list: ingredientsList, items: allIngredients },
    { list: appliancesList, items: allAppliances },
    { list: ustensilsList, items: allUstensils },
  ];
  //reinitialisation
  filterLists.forEach((filter) => {
    filter.list.innerHTML = "";
    filter.items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      filter.list.appendChild(listItem);
    });
  });
}
//Fonction pour l'affichage des listes de filtres en fonction des recettes filtrées
function updateFilterLists(filteredRecipes) {
  const filteredIngredients = new Set();
  const filteredAppliances = new Set();
  const filteredUstensils = new Set();

   // Parcours de chaque recette filtrée
  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      filteredIngredients.add(ingredient.ingredient);
    });
    filteredAppliances.add(recipe.appliance);
    recipe.ustensils.forEach((ustensil) => {
      filteredUstensils.add(ustensil);
    });
  });

  // Mettre à jour la liste des ingrédients sélectionnés
  selectedIngredients.forEach((ingredient) => {
    // Vérification si l'ingrédient sélectionné n'est pas présent
    if (!filteredIngredients.has(ingredient)) {
      selectedIngredients.splice(selectedIngredients.indexOf(ingredient), 1);
    }
  });
  generateFilteredIngredientsList([...filteredIngredients]);

  // Mettre à jour la liste des appareils sélectionnés
  selectedAppliances.forEach((appliance) => {
    if (!filteredAppliances.has(appliance)) {
      selectedAppliances.splice(selectedAppliances.indexOf(appliance), 1);
    }
  });
  generateFilteredAppliancesList([...filteredAppliances]);

  // Mettre à jour la liste des ustensiles sélectionnés
  selectedUstensils.forEach((ustensil) => {
    if (!filteredUstensils.has(ustensil)) {
      selectedUstensils.splice(selectedUstensils.indexOf(ustensil), 1);
    }
  });
  generateFilteredUstensilsList([...filteredUstensils]);
}
//Fonction pour récuperer les ingredients des recettes
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