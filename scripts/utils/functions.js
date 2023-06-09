// Sélectionnez tous les chevrons des filtres
const filterChevrons = document.querySelectorAll('.filter-btn i');

// Parcourez chaque chevron et ajoutez un événement de clic
filterChevrons.forEach((chevron) => {
  chevron.addEventListener('click', (event) => {
    // Sélectionnez le parent du chevron 
    const button = event.target.parentNode;
    // Ajoutez ou supprimez la classe 'open' pour ouvrir ou fermer le filtre
    button.classList.toggle('open');
  });
});

//recueperer les recettes
const recipesContainer = document.getElementById('recipes-container');

// Parcourir le tableau des recettes et générer du contenu HTML pour chaque recette
recipes.forEach(recipe => {
  // Créer les éléments HTML pour la recette
  const recipeCard = document.createElement('div');
  recipeCard.classList.add('recipe-card');

  
  const recipeTime = document.createElement('p');
  recipeTime.classList.add('recipe-time');
  recipeTime.textContent = `${recipe.time} min`;

  const recipeImage = document.createElement('img');
  recipeImage.src = recipe.image;
  recipeImage.alt = recipe.name;
 
  const recipeName = document.createElement('h4');
  recipeName.textContent = recipe.name;

  const recipeDescription = document.createElement('p');
  recipeDescription.classList.add('recipe-description');
  recipeDescription.textContent = `Recette`;
  const recipeText =  document.createElement('p'); 
  recipeText.classList.add('recipeText');
  recipeText.textContent= `${recipe.description}`

  // Ajouter les ingrédients à la recette
  const recipeIngredientTitle = document.createElement('p');
  recipeIngredientTitle.classList.add('recipe-description');
  recipeIngredientTitle.textContent = `Ingrédients`;
 
const recipeIngredients = document.createElement('div');
recipeIngredients.classList.add('ingredient-columns');

let currentColumn;

recipe.ingredients.forEach((ingredient, index) => {
  if (index % 3 === 0) {
    currentColumn = document.createElement('div');
    currentColumn.classList.add('ingredient-column');
    recipeIngredients.appendChild(currentColumn);
  }

  const ingredientContainer = document.createElement('div');

  const nameElement = document.createElement('p');
  nameElement.innerHTML = `<strong>${ingredient.ingredient}</strong>`;
  ingredientContainer.appendChild(nameElement);

  const quantityElement = document.createElement('p');
  quantityElement.classList.add('unite');
  quantityElement.textContent = `${ingredient.quantity} ${ingredient.unit || ''}`;
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









