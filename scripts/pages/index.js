// Sélectionnez tous les chevrons des filtres
const heads = document.querySelectorAll(".filterBtn .head");

// Parcourez chaque chevron et ajoutez un événement de clic
heads.forEach((head) => {
  head.addEventListener("click", (event) => {
    event.preventDefault();
    const parent = head.parentNode;
    // Ajoutez ou supprimez la classe 'open' pour ouvrir ou fermer le filtre
    parent.classList.toggle("open");
  });
});

const recipesContainer = document.getElementById("recipesContainer");
let totalRecipes = 0; // Variable pour le nombre total de recettes

// Fonction pour créer une carte de recette
function createRecipeCard(recipe) {
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("recipeCard");

  // Création des éléments HTML pour la recette
  const recipeTime = document.createElement("p");
  recipeTime.classList.add("recipeTime");
  recipeTime.textContent = `${recipe.time} min`;

  const recipeImage = document.createElement("img");
  recipeImage.src = recipe.image;
  recipeImage.alt = recipe.name;

  const recipeName = document.createElement("h4");
  recipeName.textContent = recipe.name;

  const recipeDescription = document.createElement("p");
  recipeDescription.classList.add("recipeDescription");
  recipeDescription.textContent = `Recette`;

  const recipeText = document.createElement("p");
  recipeText.classList.add("recipeText");
  recipeText.textContent = `${recipe.description}`;

  const recipeIngredientTitle = document.createElement("p");
  recipeIngredientTitle.classList.add("recipeDescription");
  recipeIngredientTitle.textContent = `Ingrédients`;

  const recipeIngredients = document.createElement("div");
  recipeIngredients.classList.add("ingredientColumns");

  let currentColumn;

  recipe.ingredients.forEach((ingredient, index) => {
    if (index % 3 === 0) {
      currentColumn = document.createElement("div");
      currentColumn.classList.add("ingredientColumn");
      recipeIngredients.appendChild(currentColumn);
    }

    const ingredientContainer = document.createElement("div");
    const nameElement = document.createElement("p");
    nameElement.classList.add("ingredientNom");
    nameElement.innerHTML = `${ingredient.ingredient}`;
    ingredientContainer.appendChild(nameElement);

    const quantityElement = document.createElement("p");
    quantityElement.classList.add("unite");
    quantityElement.textContent = `${ingredient.quantity} ${ingredient.unit || ""}`;
    ingredientContainer.appendChild(quantityElement);

    currentColumn.appendChild(ingredientContainer);
  });

  // Ajout des éléments à la carte de recette
  recipeCard.appendChild(recipeTime);
  recipeCard.appendChild(recipeImage);
  recipeCard.appendChild(recipeName);
  recipeCard.appendChild(recipeDescription);
  recipeCard.appendChild(recipeText);
  recipeCard.appendChild(recipeIngredientTitle);
  recipeCard.appendChild(recipeIngredients);

  // Ajout de la carte de recette au conteneur des recettes
  recipesContainer.appendChild(recipeCard);
  totalRecipes++; // Incrémentation du nombre total de recettes
}

// Fonction pour créer les cartes de recette à partir d'un tableau de recettes
function createRecipeCards(recipes) {
  recipes.forEach(recipe => {
    createRecipeCard(recipe);
  });
}
// Appel initial pour créer les cartes de recette au chargement de la page
createRecipeCards(recipes);

// Création d'un élément pour afficher le nombre total de recettes affichées
const totalRecipeCount = document.createElement("div");
totalRecipeCount.classList.add("countRecettes");
totalRecipeCount.textContent = `${totalRecipes} recettes`;

// Sélection de la div "filterContainer"
const filterContainer = document.getElementById("filterContainer");

// Ajout de l'élément totalRecipeCount à l'intérieur de filterContainer
filterContainer.appendChild(totalRecipeCount);


