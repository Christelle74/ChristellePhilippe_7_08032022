/**----------DOM----------*/

const recipesContainer = document.querySelector("#output");
const ingredientsList = document.querySelector("#ingredientsList");
const applianceList = document.querySelector("#applianceList");
const ustensilsList = document.querySelector("#ustensilsList");
console.log(ustensilsList);

//inputs
const ingredientFilter = document.querySelector("#ingredients-filter");
const applianceFilter = document.querySelector("#appliance-filter");
const ustensilFilter = document.querySelector("#ustensils-filter");
//const filters = document.querySelectorAll(".form-control");
//console.log(filters);

//li
const ingredientItem = document.getElementsByClassName("ingredient-item");
console.log(ingredientItem);
const applianceItem = document.getElementsByClassName("appliance-item");
const ustensilsItem = document.getElementsByClassName("ustensil-item");
const tags = document.getElementsByClassName("list-items");
console.log(tags);

//ul
const listOfIngredients = document.querySelector("#ingredientsList");
const listOfUstensils = document.querySelector("#ustensilsList");
const listOfAppliances = document.querySelector("#applianceList");
console.log(listOfUstensils);

var recipesArray = []; //tableau de recettes
var ingredientsArray = []; //tableau des ingrédients
var appliancesArray = []; //tableau des appareils
var ustensilsArray = []; //tableau des ustensils
var tagsArray = []; //tableau contenant tous les tags
var tagRecipes = []; //tableau de tags correspondants aux recettes filtrées

//Listeners
ingredientFilter.addEventListener("keyup", filterRecipes);

/**
 * It fetches the data from the recipes.json file and creates a list of recipes.
 * {recipes} destructuring pour obtenir directement les données
 */
async function getRecipes() {
  const res = await fetch("data/recipes.json");
  const { recipes } = await res.json();
  recipesArray = recipes;

  createRecipesList(recipesArray);
}
getRecipes();
//recipesContainer.innerHTML = "";

/**
 * It creates a list of recipes cards.
 * @param recipesArray - an array of recipe objects
 */
function createRecipesList(recipesArray) {
  recipesContainer.innerHTML = "";
  recipesArray.map((recipe) => {
    recipesContainer.appendChild(new RecipesCard(recipe).buildCard());
  });
}

/**
 * It creates a list of ingredients from the recipes.
 */
const displayIngredients = async () => {
  await getRecipes();
  recipesArray.map((recipe) => {
    recipe.ingredients.forEach((element) =>
      ingredientsArray.push(element.ingredient)
    );
  });
  ingredientsArray = [...new Set(ingredientsArray)].sort();
  createIngredientsList(ingredientsArray);
};
displayIngredients();

/**
 * Create a list of ingredients from the ingredients array
 * @param ingredientsArray - an array of ingredients
 */
function createIngredientsList(ingredientsArray) {
  ingredientsArray.forEach((ingredient) => {
    const listOfIngredients = document.createElement("li");
    listOfIngredients.setAttribute(
      "class",
      "list-items col-4 col-sm-6 col-md-4 ingredient-item"
    );
    listOfIngredients.innerHTML = ingredient; //ou `${ingredient}`;
    listOfIngredients.value = ingredient;
    ingredientsList.appendChild(listOfIngredients);
    //console.log(listOfIngredients);
  });
}

/**
 * It creates a list of appliances from the recipes.
 */
const displayAppliances = async () => {
  await getRecipes();
  recipesArray.forEach((recipe) => {
    appliancesArray.push(recipe.appliance);
  });
  appliancesArray = [...new Set(appliancesArray)].sort();
  createApplianceList(appliancesArray);
};
displayAppliances();

/**
 * Create a list of appliances and append them to the applianceList
 * @param appliancesArray - an array of appliances
 */
function createApplianceList(appliancesArray) {
  appliancesArray.forEach((appliance) => {
    const listOfAppliances = document.createElement("li");
    listOfAppliances.setAttribute(
      "class",
      "list-items col-4 col-sm-6 col-md-4 appliance-item"
    );
    listOfAppliances.innerHTML = appliance;
    applianceList.appendChild(listOfAppliances);
    listOfAppliances.value = appliance;
    //console.log(listOfAppliances);
  });
}

/**
 * Get all the recipes and their ustensils, then get the unique ustensils and create a list of them
 * (new Set) : elimine les doublons
 * méthode sort pour trier par ordre alphabétique
 */
const displayUstensils = async () => {
  await getRecipes();
  recipesArray.forEach((recipe) => {
    //console.log(recipe.ustensils);
    recipe.ustensils.forEach((element) => ustensilsArray.push(element));
  });
  ustensilsArray = [...new Set(ustensilsArray)].sort();
  createUstensilsList(ustensilsArray);
};
displayUstensils();

/**
 * Create a list of ustensils
 * @param ustensilsArray - an array of strings that will be used to create the list of ustensils.
 */
function createUstensilsList(ustensilsArray) {
  ustensilsArray.forEach((ustensil) => {
    const listOfUstensils = document.createElement("li");
    listOfUstensils.setAttribute(
      "class",
      "list-items col-4 col-sm-6 col-md-4 ustensil-item"
    );
    listOfUstensils.setAttribute("id", "ustensilItem");
    listOfUstensils.innerHTML = ustensil;
    //console.log(listOfUstensils);
    ustensilsList.appendChild(listOfUstensils);
    listOfUstensils.value = ustensil;
    //console.log(listOfUstensils);
  });
}

/**
 * tri
 */

/* filtre par les ingredients*/

function filterRecipes(e) {
  // recipesContainer.innerHTML = ""; //on vide la liste des recettes
  listOfIngredients.textContent = "";
  listOfAppliances.textContent = "";
  listOfUstensils.textContent = "";

  const searchedIngredientsTags = e.target.value
    .toLowerCase()
    .replace(/\s/g, ""); //on récupère la valeur de la recherche
  //console.log(searchedIngredientsTags);

  const filteredRecipes = recipesArray.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchedIngredientsTags) ||
      recipe.description.toLowerCase().includes(searchedIngredientsTags) ||
      recipe.ingredients.find((elt) =>
        elt.ingredient
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(searchedIngredientsTags)
      )
  );
  console.log(filteredRecipes);

  filteredIngredient = ingredientsArray.filter((ingredient) =>
    ingredient.toLowerCase().match(searchedIngredientsTags)
  ); //renvoie dans la liste ingredient le nom autant de fois qu'il y a de recettes
  //console.log(filteredIngredient);

  /*filteredIngredient = searchedIngredientsTags.match(ingredientItem);//renvoie la seconde lettre de lingredient !!*/
  /*filteredIngredient = ingredientItem.textContent.match(
    searchedIngredientsTags
  );
  */

  /*filteredAppliance = appliance.filter((appliance) =>
    appliance.toLowerCase().match(filteredIngredient)
  );
  console.log(filteredAppliance);*/

  //createApplianceList(filteredAppliance);
  createRecipesList(filteredRecipes);
  createIngredientsList(filteredIngredient);
}

//tags.addEventListener("keyup", showTags);
/*filterRecipes();

function showTags() {}*/
