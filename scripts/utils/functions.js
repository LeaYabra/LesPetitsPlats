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

//recueperer les recettes
const recipesContainer = document.getElementById("recipesContainer");

// Parcourir le tableau des recettes et générer du contenu HTML pour chaque recette
recipes.forEach((recipe) => {
  // Créer les éléments HTML pour la recette
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("recipeCard");

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

  // Ajouter les ingrédients à la recette
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
    quantityElement.textContent = `${ingredient.quantity} ${
      ingredient.unit || ""
    }`;
    ingredientContainer.appendChild(quantityElement);
    currentColumn.appendChild(ingredientContainer);
  });

  // Ajouter les éléments à la carte de recette
  recipeCard.appendChild(recipeTime);
  recipeCard.appendChild(recipeImage);
  recipeCard.appendChild(recipeName);
  recipeCard.appendChild(recipeDescription);
  recipeCard.appendChild(recipeText);
  recipeCard.appendChild(recipeIngredientTitle);
  recipeCard.appendChild(recipeIngredients);

  // Ajouter la carte de recette au conteneur des recettes
  recipesContainer.appendChild(recipeCard);
});