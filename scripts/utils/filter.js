// Récupérer la référence de l'élément de filtre des ingrédients
const ingredientsFilter = document.querySelector(
  ".filterBtn:nth-child(1) .searchFilter"
);

// Récupérer la liste de tous les ingrédients du fichier JSON
const allIngredients = recipes.reduce((ingredients, recipe) => {
  recipe.ingredients.forEach((ingredient) => {
    if (!ingredients.includes(ingredient.ingredient)) {
      ingredients.push(ingredient.ingredient);
    }
  });
  return ingredients;
}, []);

// Générer les éléments HTML pour la liste des ingrédients
const ingredientsList = document.createElement("div");
ingredientsList.classList.add("filterlist");
let selectedIngredients = []; // Tableau pour stocker les éléments déjà sélectionnés

// Générer les éléments HTML pour la liste des ingrédients initiale
generateFilteredIngredientsList(allIngredients);
// Ajouter la liste des ingrédients au filtre des ingrédients
ingredientsFilter.appendChild(ingredientsList);

// Générer les éléments HTML pour la liste des ingrédients filtrés
function generateFilteredIngredientsList(ingredientsFilter) {
  ingredientsList.innerHTML = "";
  // Générer les nouveaux éléments HTML pour la liste des ingrédients filtrés
  ingredientsFilter.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.textContent = ingredient;
    addClickEventListenerIngredients(ingredientItem, ingredient, "selectedIngredientTag");
    // Vérifier si l'ingrédient est déjà sélectionné
    if (selectedIngredients.includes(ingredient)) {
      ingredientItem.classList.add("selectedIngredientTag");
    }

    ingredientsList.appendChild(ingredientItem);
  });
}
// Ajout d'un écouteur d'événement sur la liste d'ingredients
ingredientsFilter.addEventListener("click", searchIngredient);
// Ajout d'un écouteur d'événement sur ingredients
ingredientsFilter.addEventListener("input", searchIngredient);

// Fonction pour effectuer une recherche d'ingrédients
function searchIngredient() {
  // Récupération du terme de recherche et nettoyage
  const searchIngredient = document
    .querySelector(".filterBtn:nth-child(1) .searchFilter input")
    .value.trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
  // Filtrer les ingrédients en fonction du texte de recherche
  const filterIngredients = allIngredients.filter((ingredient) =>
    ingredient.toLowerCase().includes(searchIngredient)
  );

 // Supprimer les anciens éléments de la liste des appareils
 ingredientsList.innerHTML = "";

 // Générer les nouveaux éléments HTML pour la liste des ingredients filtrés
 filterIngredients.forEach((ingredient) => {
   const ingredientItem = document.createElement("li");
   ingredientItem.textContent = ingredient;
   addClickEventListenerIngredients(ingredientItem, ingredient, "selectedIngredientTag");
   ingredientsList.appendChild(ingredientItem);
 });
}

let selectedTagIngredient = null;
//Fonction pour créer un tag d'ingrédient
function createIngredientTag(ingredient) {
  const ingredientTag = document.createElement('div');
  ingredientTag.textContent = ingredient;
  ingredientTag.classList.add('selectedTag');

  const closeIcon = document.createElement('span');
  closeIcon.innerHTML = '&times;';
  closeIcon.classList.add('closeIcon');

  closeIcon.addEventListener('click', () => {
    ingredientTag.remove();
    // Retirer l'élément de la liste des éléments sélectionnés
    const index = selectedIngredients.indexOf(ingredient);
    if (index > -1) {
      selectedIngredients.splice(index, 1);
    }
    searchRecipe();

  });

  ingredientTag.appendChild(closeIcon);
  const tag = document.querySelector('.tag');
  tag.appendChild(ingredientTag);
}
// Ajouter un écouteur d'événements click à chaque ingredients de la liste
function addClickEventListenerIngredients(ingredientItem, ingredient) {
  ingredientItem.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!selectedIngredients.includes(ingredient)) {
      createIngredientTag(ingredient);
      selectedIngredients.push(ingredient);
      selectedTagIngredient = ingredient.toLowerCase();
      searchRecipe();
    }
  });
}
// Récupérer la référence de l'élément de filtre des appareils
const appliancesFilter = document.querySelector(
  ".filterBtn:nth-child(2) .searchFilter"
);

// Récupérer la liste de tous les appareils du fichier JSON
const allAppliances = recipes.reduce((appliances, recipe) => {
  if (!appliances.includes(recipe.appliance)) {
    appliances.push(recipe.appliance);
  }
  return appliances;
}, []);

// Générer les éléments HTML pour la liste des appareils
const appliancesList = document.createElement("div"); 
appliancesList.classList.add("filterlist");
let selectedAppliances = []; // Tableau pour stocker les éléments déjà sélectionnés

// Générer les éléments HTML pour la liste des ingrédients initiale
generateFilteredAppliancesList(allAppliances);
// Ajouter la liste des appareils au filtre des appareils
appliancesFilter.appendChild(appliancesList);

// Générer les éléments HTML pour la liste des appareils filtrés
function generateFilteredAppliancesList(appliances) {
  appliancesList.innerHTML = "";
  appliances.forEach((appliance) => {
    const applianceItem = document.createElement("li");
    applianceItem.textContent = appliance;
    addClickEventListenerAppliances(applianceItem, appliance);
    appliancesList.appendChild(applianceItem); 
  });
}

// Ajout d'un écouteur d'événement sur la liste d'ingredients
appliancesFilter.addEventListener("click", searchAppliances);
// Ajout d'un écouteur d'événement sur ingredients
appliancesFilter.addEventListener("input", searchAppliances);

// Fonction pour effectuer une recherche d'appareils
function searchAppliances() {
  // Récupération du terme de recherche et nettoyage
  const searchAppliances = document
    .querySelector(".filterBtn:nth-child(2) .searchFilter input")
    .value.trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

  // Filtrer les appareils en fonction du texte de recherche
  const filterAppliances = allAppliances.filter((appliance) =>
    appliance.toLowerCase().includes(searchAppliances)
  );

  // Supprimer les anciens éléments de la liste des appareils
  appliancesList.innerHTML = "";

  // Générer les nouveaux éléments HTML pour la liste des appareils filtrés
  filterAppliances.forEach((appliance) => {
    const applianceItem = document.createElement("li");
    applianceItem.textContent = appliance;
    addClickEventListenerAppliances(applianceItem, appliance, "selectedApplianceTag");
    appliancesList.appendChild(applianceItem);
  });
}

let selectedTagAppliance = null;
//Fonction pour créer un tag d'appareils
function createApplianceTag(appliance) {
  const applianceTag = document.createElement('div');
  applianceTag.textContent = appliance;
  applianceTag.classList.add('selectedTag');

  const closeIcon = document.createElement('span');
  closeIcon.innerHTML = '&times;';
  closeIcon.classList.add('closeIcon');

  closeIcon.addEventListener('click', () => {
    applianceTag.remove();
    // Retirer l'élément de la liste des éléments sélectionnés
    const index = selectedAppliances.indexOf(appliance);
    if (index > -1) {
      selectedAppliances.splice(index, 1);
    }
    searchRecipe();
  });

  applianceTag.appendChild(closeIcon);
  const tag = document.querySelector('.tag');
  tag.appendChild(applianceTag);
}
// Ajouter un écouteur d'événements click à chaque apareils de la liste
function addClickEventListenerAppliances(applianceItem, appliance) {
  applianceItem.addEventListener('click', (event) => {
   event.stopPropagation();
    if (!selectedAppliances.includes(appliance)) {
      createApplianceTag(appliance);
      selectedAppliances.push(appliance);
      selectedTagAppliance = appliance.toLowerCase();
      searchRecipe();
    }
  });
}
// Récupérer la référence de l'élément de filtre des ustensils
const ustensilsFilter = document.querySelector(
  ".filterBtn:nth-child(3) .searchFilter"
);

// Récupérer la liste de tous les ustensils du fichier JSON
const allUstensils = recipes.reduce((ustensils, recipe) => {
  recipe.ustensils.forEach((ustensil) => {
    if (!ustensils.includes(ustensil)) {
      ustensils.push(ustensil);
    }
  });
  return ustensils;
}, []);

// Générer les éléments HTML pour la liste des ustensils
const ustensilsList= document.createElement("div");
ustensilsList.classList.add("filterlist");
let selectedUstensils = []; // Tableau pour stocker les éléments déjà sélectionnés

// Générer les éléments HTML pour la liste des ustensils initiale
generateFilteredUstensilsList(allUstensils);
// Ajouter la liste des ingrédients au filtre des ustensils
ustensilsFilter.appendChild(ustensilsList);

// Générer les éléments HTML pour la liste des ustensils filtrés
function generateFilteredUstensilsList(ustensils) {
  ustensilsList.innerHTML = "";
  ustensils.forEach((ustensil) => {
    const ustensilItem = document.createElement("li");
    ustensilItem.textContent = ustensil;
    addClickEventListenerUstensils(ustensilItem, ustensil);
    ustensilsList.appendChild(ustensilItem);
  });
}
// Ajout d'un écouteur d'événement sur la liste d'ustensils
ustensilsFilter.addEventListener("click", searchUstensil);
// Ajout d'un écouteur d'événement sur ingredients
ustensilsFilter.addEventListener("input", searchUstensil);

// Fonction pour effectuer une recherche d'ustensils
function searchUstensil() {
  // Récupération du terme de recherche et nettoyage
  const searchUstensil = document
    .querySelector(".filterBtn:nth-child(3) .searchFilter input")
    .value.trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
  // Filtrer les ingrédients en fonction du texte de recherche
  const filteredUstensils = allUstensils.filter((ustensil) =>
    ustensil.toLowerCase().includes(searchUstensil)
  );
  generateFilteredUstensilsList(filteredUstensils);
}

let selectedTagUstensil = null;
//Fonction pour créer un tag d'ingrédient
function createUstensilTag(ustensil) {
  const ustensilTag = document.createElement('div');
  ustensilTag.textContent = ustensil;
  ustensilTag.classList.add('selectedTag');

  const closeIcon = document.createElement('span');
  closeIcon.innerHTML = '&times;';
  closeIcon.classList.add('closeIcon');

  closeIcon.addEventListener('click', () => {
    ustensilTag.remove();
    // Retirer l'élément de la liste des éléments sélectionnés
    const index = selectedUstensils.indexOf(ustensil);
    if (index > -1) {
      selectedUstensils.splice(index, 1);
    }
    searchRecipe();
  });

  ustensilTag.appendChild(closeIcon);
  const tag = document.querySelector('.tag');
  tag.appendChild(ustensilTag);
}
// Ajouter un écouteur d'événements click à chaque ustensil de la liste
function addClickEventListenerUstensils(ustensilItem, ustensil) {
  ustensilItem.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!selectedUstensils.includes(ustensil)) {
      createUstensilTag(ustensil);
      selectedUstensils.push(ustensil);
      selectedTagUstensil = ustensil.toLowerCase();
      searchRecipe();
    }
  });
}


