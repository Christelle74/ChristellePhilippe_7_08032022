import { recipes } from "../data/recipes.js";

const ingredientsList = document.querySelector("#ingredientsList");
console.log(ingredientsList);

/**
 * recherche des ingrédients et création du tableau ingredients
 * array.from(new Set) : elimine les doublons
 * méthode sort pour trier par ordre alphabétique
 * creation dans le Html
 */
function displayIngredients() {
  const ingredients = [];

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((element) =>
      ingredients.push(element.ingredient)
    );
  });
  //console.log(ingredients);
  const ingredientsArray = Array.from(new Set(ingredients));
  ingredientsArray.sort((a, b) => a.localeCompare(b));
  console.log(ingredientsArray);

  createIngredientsList(ingredientsArray);
}
displayIngredients();

/**
 *
 * @param {*} ingredients
 * creation html de la liste d'ingrédients
 */
function createIngredientsList(ingredientsArray) {
  ingredientsArray.forEach((ingredient) => {
    const listOfIngredients = document.createElement("div");
    listOfIngredients.setAttribute("class", "table-items bg-primary");
    listOfIngredients.innerHTML = `
    <ul class=" list-group row flex-wrap m-0 p-1 pt-0">
        <li class="list-inline-item col-4 col-sm-6 col-md-4">${ingredient}</li>
    </ul>
        `;
    //console.log(listOfIngredients);
    //ingredientsList.appendChild(listOfIngredients);
  });
}
