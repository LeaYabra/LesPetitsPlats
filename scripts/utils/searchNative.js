// Sélection de l'élément de champ de recherche
const searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener('input', searchRecipe);

// Fonction pour effectuer une recherche de recettes
function searchRecipe() {
  // Récupération du terme de recherche et nettoyage
  const searchTerm = document.querySelector('input[type="text"]').value.trim().replace(/\s+/g, ' ').toLowerCase();

  // Vérification si le terme de recherche est vide ou trop court
  if (searchTerm === '' || searchTerm.length < 3) {
    resetRecipeDisplay();
    resetFilterLists();
    return;
  }

  // Tableau pour stocker les recettes filtrées
  const filteredRecipes = [];
  const recipeCount = recipes.length;

  // Parcours de toutes les recettes
  for (let i = 0; i < recipeCount; i++) {
    const recipe = recipes[i];
    const recipeTitle = recipe.name.toLowerCase();
    const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
    const recipeDescription = recipe.description.toLowerCase();

    // Vérification si le terme de recherche est présent dans le titre, les ingrédients ou la description
    if (recipeTitle.includes(searchTerm) || recipeIngredients.includes(searchTerm) || recipeDescription.includes(searchTerm)) {
      filteredRecipes.push(recipe); // Ajout de la recette filtrée au tableau
    }
  }

  // Vérification si des recettes ont été trouvées
  if (filteredRecipes.length === 0) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = `Aucune recette ne contient '${searchTerm}'. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
    resetRecipeDisplay();
    resetFilterLists();
  } else {
    // Mise à jour de l'affichage des recettes filtrées
    updateRecipeDisplay(filteredRecipes);
    updateFilterLists(filteredRecipes);
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = '';
  }
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
      { list: appliancesList, items: appliances },      
      { list: ustensilsList, items: ustensils }       
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
    const filteredIngredients = [];
    const filteredAppliances = [];
    const filteredUstensils = [];
  
    // Parcours des recettes filtrées
    let r = 0;
    while (r < filteredRecipes.length) {
      const recipe = filteredRecipes[r];
  
      // Parcours des ingrédients de la recette
      let i = 0;
      while (i < recipe.ingredients.length) {
        const ingredient = recipe.ingredients[i].ingredient;
  
        // Vérification de l'unicité de l'ingrédient et ajout à la liste filtrée
        if (!filteredIngredients.includes(ingredient)) {
          filteredIngredients.push(ingredient);
        }
        i++;
      }
  
      // Vérification de l'unicité de l'appareil et ajout à la liste filtrée
      if (!filteredAppliances.includes(recipe.appliance)) {
        filteredAppliances.push(recipe.appliance);
      }
  
      // Parcours des ustensiles de la recette
      let u = 0;
      while (u < recipe.ustensils.length) {
        const ustensil = recipe.ustensils[u];

        // Vérification de l'unicité de l'ustensile et ajout à la liste filtrée
        if (!filteredUstensils.includes(ustensil)) {
          filteredUstensils.push(ustensil);
        }
        u++;
      }
      r++;
    }
  
    // Mise à jour des listes de filtres dans le DOM
    ingredientsList.innerHTML = '';
    for (let i = 0; i < filteredIngredients.length; i++) {
      const ingredient = filteredIngredients[i];
      const ingredientItem = document.createElement('li');
      ingredientItem.textContent = ingredient;
      ingredientsList.appendChild(ingredientItem);
    }
  
    appliancesList.innerHTML = '';
    for (let i = 0; i < filteredAppliances.length; i++) {
      const appliance = filteredAppliances[i];
      const applianceItem = document.createElement('li');
      applianceItem.textContent = appliance;
      appliancesList.appendChild(applianceItem);
    }
  
    ustensilsList.innerHTML = '';
    for (let i = 0; i < filteredUstensils.length; i++) {
      const ustensil = filteredUstensils[i];
      const ustensilItem = document.createElement('li');
      ustensilItem.textContent = ustensil;
      ustensilsList.appendChild(ustensilItem);
    }
}
  
  