// Ajout d'un écouteur d'événement sur le champ de recherche
const searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener('input', searchRecipe);
// Fonction pour effectuer une recherche de recettes
function searchRecipe() {
  const t0 = performance.now();
  const searchTerm = document.querySelector('input[type="text"]').value.trim().replace(/\s+/g, ' ').toLowerCase();

  if ((searchTerm === '' || searchTerm.length < 3) && selectedTags.length === 0) {
    resetRecipeDisplay();
    resetFilterLists();
    return;
  }

  let filteredRecipes = recipes.filter(recipe => {
    const recipeTitle = recipe.name.toLowerCase();
    const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
    const recipeDescription = recipe.description.toLowerCase();

    return recipeTitle.includes(searchTerm) || recipeIngredients.includes(searchTerm) || recipeDescription.includes(searchTerm);
  });

  if (selectedTags.length > 0) {
    filteredRecipes = filteredRecipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
      const recipeAppliance = recipe.appliance.toLowerCase();
      const recipeUstensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());

      return (
        selectedTags.every(tag => recipeIngredients.includes(tag)) &&
        selectedTags.every(tag => recipeUstensils.includes(tag)) &&
        selectedTags.includes(recipeAppliance)
      );
    });
  }

  if (filteredRecipes.length === 0) {
    const selectedTagsString = selectedTags.join(', ');
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = `Aucune recette ne correspond à "${searchTerm}" avec les tags : ${selectedTagsString}. Vous pouvez essayer d'autres termes de recherche ou supprimer les tags sélectionnés.`;
    resetRecipeDisplay();
    resetFilterLists();
  } else {
    updateRecipeDisplay(filteredRecipes);
    updateFilterLists(filteredRecipes);

    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = '';
  }
 
  var t1 = performance.now();
  console.log("L'appel de search a demandé" + (t1-t0)+ "millisecondes.")
}



// Fonction pour réinitialiser l'affichage des recettes
function resetRecipeDisplay() {
  recipesContainer.innerHTML = '';
  createRecipeCards(recipes); // Utilisation de la fonction createRecipeCards pour générer les cartes de recette
  totalRecipeCount.textContent = `${recipes.length} recettes`;
}
// Fonction pour réinitialiser l'affichage des listes
function resetRecipeListDisplay() {
  recipesContainer.innerHTML = '';
  totalRecipeCount.textContent = '0 recette'; 
}
// Fonction pour l'affichage des recettes filtrées
function updateRecipeDisplay(filteredRecipes) {
  recipesContainer.innerHTML = '';
  createRecipeCards(filteredRecipes);
  totalRecipeCount.textContent = `${filteredRecipes.length} recettes`;
}
// Fonction pour réinitialiser les listes de filtres
function resetFilterLists() {
  // Tableau des listes de filtres à réinitialiser
  const filterLists = [
    { list: ingredientsList, items: allIngredients },
    { list: appliancesList, items: appliances },
    { list: ustensilsList, items: ustensils }
  ];
 //reinitialisation
  filterLists.forEach(filter => {
    filter.list.innerHTML = '';
    filter.items.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    filter.list.appendChild(listItem);
    });
 });
}
function updateFilterLists(filteredRecipes) {
  const filteredIngredients = new Set();
  const filteredAppliances = new Set();
  const filteredUstensils = new Set();

  filteredRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      filteredIngredients.add(ingredient.ingredient);
    });

    filteredAppliances.add(recipe.appliance);

    recipe.ustensils.forEach(ustensil => {
      filteredUstensils.add(ustensil);
    });
  });

  // Mettre à jour la liste des ingrédients sélectionnés
  selectedIngredients.forEach(ingredient => {
    if (!filteredIngredients.has(ingredient)) {
      selectedIngredients.splice(selectedIngredients.indexOf(ingredient), 1);
    }
  });

  // Régénérer la liste des ingrédients filtrés
  generateFilteredIngredientsList([...filteredIngredients]);
  //console.log('liste filtre', filteredIngredients)
  
  // Mettre à jour les autres listes de filtres
  appliancesList.innerHTML = '';
  filteredAppliances.forEach(appliance => {
    const applianceItem = document.createElement('li');
    applianceItem.textContent = appliance;
    appliancesList.appendChild(applianceItem);
  });

  ustensilsList.innerHTML = '';
  filteredUstensils.forEach(ustensil => {
    const ustensilItem = document.createElement('li');
    ustensilItem.textContent = ustensil;
    ustensilsList.appendChild(ustensilItem);
  });
}


