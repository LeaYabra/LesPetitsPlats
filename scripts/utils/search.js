// Ajout d'un écouteur d'événement sur le champ de recherche
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

  // Chercher les recettes correspondantes au mot-clé
 const filteredRecipes = recipes.filter(recipe => {
    const recipeTitle = recipe.name.toLowerCase();
    const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
    const recipeDescription = recipe.description.toLowerCase();

    return recipeTitle.includes(searchTerm) || recipeIngredients.includes(searchTerm) || recipeDescription.includes(searchTerm);
 });

 // Afficher les recettes ou un message d'erreur
  if (filteredRecipes.length === 0) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = `Aucune recette ne contient '${searchTerm}'. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
    resetRecipeDisplay();
    resetFilterLists(); 
   } else {
    updateRecipeDisplay(filteredRecipes);
    updateFilterLists(filteredRecipes);
    addClickEventListener(ingredientItem,ingredient);
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

//Fonction pour l'affichage des listes de filtres en fonction des recettes filtrées
function updateFilterLists(filteredRecipes) {
 const filteredIngredients = [];
 const filteredAppliances = [];
 const filteredUstensils = [];

  // Vérification de l'unicité des elements et ajout à la liste filtrée
 filteredRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
    if (!filteredIngredients.includes(ingredient.ingredient)) {
        filteredIngredients.push(ingredient.ingredient);
    }
    });
    if (!filteredAppliances.includes(recipe.appliance)) {
    filteredAppliances.push(recipe.appliance);
    }
    recipe.ustensils.forEach(ustensil => {
    if (!filteredUstensils.includes(ustensil)) {
        filteredUstensils.push(ustensil);
    }
    });
 });

  //met a jour les filtres
  ingredientsList.innerHTML = '';
  filteredIngredients.forEach(ingredient => {
    const ingredientItem = document.createElement('li');
    ingredientItem.textContent = ingredient;
    ingredientsList.appendChild(ingredientItem);
     // Ajouter un écouteur d'événements click à chaque élément de la liste
     addClickEventListener(ingredientItem,ingredient);
  });
   

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