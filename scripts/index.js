/* eslint-disable no-undef */
/**----------DOM----------*/
const recipesContainer = document.querySelector("#output");
const ingredientsContainer = document.querySelector("#ingredientsList");
const applianceContainer = document.querySelector("#applianceList");
const ustensilsContainer = document.querySelector("#ustensilsList");
//console.log(ustensilsList);
//const filtersContainer = document.querySelector("#filters");
//console.log(filtersContainer);
//const listGroup = document.querySelectorAll(".list-group");
//console.log(listGroup);
const tags = document.querySelector(".selectedTag");
//console.log(tags);

//inputs
const ingredientFilter = document.querySelector("#ingredients-filter");
const applianceFilter = document.querySelector("#appliance-filter");
const ustensilFilter = document.querySelector("#ustensils-filter");
//const filters = document.querySelectorAll(".form-control");
//console.log(filters);

//chevrons
const ingredientChevron = document.querySelector(".ingredientChevron");
const applianceChevron = document.querySelector(".applianceChevron");
const ustensilChevron = document.querySelector(".ustensilChevron");
//console.log(ustensilChevron);
const chevrons = document.querySelectorAll(".chevron");
//);

//ul
const listOfIngredients = document.querySelector("#ingredientsList");
const listOfUstensils = document.querySelector("#ustensilsList");
const listOfAppliances = document.querySelector("#applianceList");
//console.log(listOfIngredients);

//arrays
var recipesArray = []; //tableau de toutes les recettes
//console.log(recipesArray);
var ingredientsArray = []; //tableau des ingrédients

var appliancesArray = []; //tableau des appareils
//console.log(appliancesArray);
var ustensilsArray = []; //tableau des ustensils
//console.log(ustensilsArray);

var tagsArray = []; //tableau contenant tous les tags
//console.log(tagsArray);
//var selectedRecipes = []; // tableau recettes triées
var selectedTags = []; //tableau de tags selectionnés
console.log(selectedTags);
var selectedIngredients = []; //tableau des ingredients selectionnés
//console.log(selectedIngredients);
var selectedAppliances = [];
//console.log(selectedAppliances);
var selectedUstensils = [];
//console.log(selectedUstensils);

//Listeners

ingredientFilter.addEventListener("click", (e) => {
  e.preventDefault();
  displayList(listOfIngredients, ingredientFilter, ingredientChevron);
  hideList(listOfAppliances, applianceFilter, applianceChevron);
  hideList(listOfUstensils, ustensilFilter, ustensilChevron);
});

applianceFilter.addEventListener("click", (e) => {
  e.preventDefault();
  displayList(listOfAppliances, applianceFilter, applianceChevron);
  hideList(listOfIngredients, ingredientFilter, ingredientChevron);
  hideList(listOfUstensils, ustensilFilter, ustensilChevron);
});

ustensilFilter.addEventListener("click", (e) => {
  e.preventDefault();
  displayList(listOfUstensils, ustensilFilter, ustensilChevron);
  hideList(listOfAppliances, applianceFilter, applianceChevron);
  hideList(listOfIngredients, ingredientFilter, ingredientChevron);
});
chevrons.forEach((chevron) => {
  chevron.addEventListener("click", (e) => {
    e.preventDefault();
    hideList(listOfUstensils, ustensilFilter, ustensilChevron);
    hideList(listOfAppliances, applianceFilter, applianceChevron);
    hideList(listOfIngredients, ingredientFilter, ingredientChevron);
  });
});

// display, hide des listes + chevrons
function displayList(listGroup, input, chevron) {
  listGroup.style.display = "block";
  input.style.width = "667px";
  chevron.style.transform = "rotate(180deg)";
}
function hideList(listGroup, input, chevron) {
  listGroup.style.display = "none";
  input.style.width = "170px";
  chevron.style.transform = "none";
}

function init() {
  const recipesByIngredients = filterRecipesByIngredients(
    recipesArray,
    selectedIngredients
  );
  const recipesByAppliances = filterRecipesByAppliances(
    recipesByIngredients,
    selectedAppliances
  );
  const recipesByUstensils = filterRecipesByUstensils(
    recipesByAppliances,
    selectedUstensils
  );

  createTag();
  displayIngredientsList(recipesByIngredients);
  displayAppliancesList(recipesByAppliances);
  displayUstensilsList(recipesByUstensils);

  createRecipesList(recipesByUstensils);
}

/**
 * It fetches the recipes.json file, then it creates a recipesArray variable and assigns it the recipes
 * object from the json file, then it calls the createRecipesList function and passes it the recipes
 * object.
 */
async function getRecipes() {
  const res = await fetch("data/recipes.json");
  const { recipes } = await res.json();
  recipesArray = recipes;
  //console.log(recipesArray);
  createRecipesList(recipes);
}
getRecipes();

/**
 * Create a new RecipesCard for each recipe in the recipes array, and append it to the
 * recipesContainer.
 * @param recipes - an array of objects
 */
function createRecipesList(recipes) {
  recipes.map((recipe) => {
    recipesContainer.appendChild(new RecipesCard(recipe).buildCard());
    // init();
  });
}

/**
 * It takes the data from the JSON file and creates three arrays: ingredientsArray, appliancesArray and
 * ustensilsArray. Then it creates three lists: ingredientsList, appliancesList and ustensilsList.
 */
const createAllLists = async () => {
  await getRecipes();

  recipesArray.forEach((recipe) => {
    recipe.ingredients.map((element) => {
      ingredientsArray.push(element.ingredient);
      tagsArray.push(element.ingredient);
    });
    appliancesArray.push(recipe.appliance);
    tagsArray.push(recipe.appliance);
    recipe.ustensils.map((element) => {
      ustensilsArray.push(element);
      tagsArray.push(element);
    });
  });

  ingredientsArray = [...new Set(ingredientsArray)].sort();
  appliancesArray = [...new Set(appliancesArray)].sort();
  ustensilsArray = [...new Set(ustensilsArray)].sort();

  //console.log(ingredientsArray);
  createIngredientsList(ingredientsArray);
  createApplianceList(appliancesArray);
  createUstensilsList(ustensilsArray);
};
createAllLists();

/**
 * It takes an array of ingredients, clears the ingredients container, and then creates a new
 * CreateIngredientsList object for each ingredient in the array, and then appends the result of the
 * buildIngredientsList() method to the ingredients container.
 * @param ingredients - an array of objects
 */
/* Creating a function called createIngredientsList that takes in a parameter called ingredients. */
function createIngredientsList(ingredients) {
  ingredientsContainer.innerHTML = "";
  ingredients.forEach((ingredient) => {
    ingredientsContainer.appendChild(
      new CreateIngredientsList(ingredient).buildIngredientsList()
    );
  });
  ingredientsArray = Array.from(document.querySelectorAll(".ingredient-item"));
  ingredientsArray = [...new Set(ingredientsArray)].sort();
  //console.log(ingredientsArray);
  ingredientsArray.forEach((item) => {
    item.addEventListener("click", () => {
      selectedIngredients.push(item.dataset.item);
      //console.log(selectedIngredients);
      selectedTags.push(item);
      //console.log(selectedTags);
      hideList(listOfIngredients, ingredientFilter, ingredientChevron);

      //filterRecipesByIngredients(recipesArray, selectedIngredients);
      init();
    });
  });
}

/**
 * It takes an array of appliances and creates a list of appliances.
 * @param appliances - an array of objects
 */
function createApplianceList(appliances) {
  applianceContainer.innerHTML = "";
  appliances.forEach((appliance) => {
    applianceContainer.appendChild(
      new CreateAppliancesList(appliance).buildAppliancesList()
    );
  });

  appliancesArray = Array.from(document.querySelectorAll(".appliance-item"));
  appliancesArray = [...new Set(appliancesArray)].sort();
  //console.log(appliancesArray);

  appliancesArray.forEach((item) => {
    item.addEventListener("click", () => {
      //console.log("test");
      selectedAppliances.push(item.dataset.item);
      //console.log(selectedAppliances);
      selectedTags.push(item);
      //console.log(selectedTags);
      hideList(listOfAppliances, applianceFilter, applianceChevron);
      init();
    });
  });
}

/**
 * It takes an array of objects, loops through them, and creates a new instance of the
 * CreateUstensilsList class for each object, then calls the buildUstensilsList method on each
 * instance, and appends the result to the ustensilsContainer element.
 * @param ustensils - an array of objects
 */
function createUstensilsList(ustensils) {
  ustensilsContainer.innerHTML = "";
  ustensils.forEach((ustensil) => {
    ustensilsContainer.appendChild(
      new CreateUstensilsList(ustensil).buildUstensilsList()
    );
  });
  ustensilsArray = Array.from(document.querySelectorAll(".ustensil-item"));
  ustensilsArray = [...new Set(ustensilsArray)].sort();
  //console.log(ustensilsArray);

  ustensilsArray.forEach((item) => {
    item.addEventListener("click", () => {
      selectedUstensils.push(item.dataset.item);
      //console.log(selectedUstensils);
      selectedTags.push(item);
      //console.log(selectedTags);
      hideList(listOfUstensils, ustensilFilter, ustensilChevron);
      //createTag(item);
      init();
      //filterRecipesByUstensils(selectedUstensils, selectedRecipesByAppliances);
    });
  });
}

/*filters.forEach((filter) => {
  filter.addEventListener("input", (e) => {
    getRecipes(e.target.value).then(() => createRecipesList(recipesArray));
  });
});*/

/*ingredientFilter.addEventListener("input", filterRecipes);
applianceFilter.addEventListener("keyup", filterRecipes);
ustensilFilter.addEventListener("keyup", filterRecipes);*/

/**
 * GESTION DES TAGS
 */

/**
 * It creates a new tag for each item in the selectedTags array.
 */
function createTag() {
  tags.innerHTML = "";
  selectedTags.forEach((tag) => {
    //console.log(selectedTags);

    const tagLi = document.createElement("li");
    const tagColor = tag.dataset.color;
    const tagName = tag.dataset.item;

    tagLi.classList.add(
      `${tagColor}`,
      "newTag",
      "mb-1",
      "me-2",
      `bg-${tagColor}`,
      "px-3",
      "py-2",
      "pe-5",
      "d-flex",
      "flex-row",
      "align-items-center",
      "rounded"
    );

    tagLi.innerHTML = `${tagName}
  <img id="close" src="assets/times-circle-regular.svg" alt=""
/>`;
    tagLi.setAttribute("data-item", tagName);

    tags.appendChild(tagLi);
    //console.log(tagLi);
    tagLi.addEventListener("click", closeTag);
    return tagLi;
  });
  tagsList = Array.from(document.querySelectorAll(".newTag"));
  tagsList = [...new Set(tagsList)];
  //console.log(tagsList);
}

/**
 * *Close the tag that was just clicked on.*
 * @param e - The event object.
 */
function closeTag(e) {
  let element = e.target;
  element.parentNode.remove(element);
}

/**
 * gestion des tris
 */

function filterRecipesByIngredients(recipesToFilter) {
  //Filtre les recettes selon les ingrédients choisis
  let selectedRecipesByIngredients = [];

  if (selectedIngredients.length === 0) {
    selectedRecipesByIngredients = recipesToFilter;
  } else {
    selectedIngredients.forEach((item) => {
      let ingredientValue = item.toLowerCase().replace(/\s/g, "");

      recipesToFilter.filter((recipe) => {
        if (
          recipe.ingredients.find((elt) =>
            elt.ingredient
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(ingredientValue)
          )
        ) {
          selectedRecipesByIngredients.push(recipe);
          selectedRecipesByIngredients = [
            ...new Set(selectedRecipesByIngredients),
          ];
          console.log(selectedRecipesByIngredients);
        }
      });
    });
  }
  return selectedRecipesByIngredients;
}

function filterRecipesByAppliances(recipesToFilter) {
  //Filtre les recettes filtrées par ingrédients, selon l’appareil choisi

  let selectedRecipesByAppliances = [];

  if (selectedAppliances.length === 0) {
    selectedRecipesByAppliances = recipesToFilter;
  } else {
    selectedAppliances.forEach((item) => {
      let applianceValue = item.toLowerCase().replace(/\s/g, "");
      // console.log(applianceValue);

      recipesToFilter.filter((recipe) => {
        if (
          recipe.appliance
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(applianceValue)
        ) {
          selectedRecipesByAppliances.push(recipe);
          selectedRecipesByAppliances = [
            ...new Set(selectedRecipesByAppliances),
          ];
          console.log(selectedRecipesByAppliances);
        }
      });
    });
  }
  return selectedRecipesByAppliances;
}

function filterRecipesByUstensils(recipesToFilter) {
  //Filtre les recettes filtrées par appareils, selon les ustensiles choisis
  let selectedRecipesByUstensils = [];

  if (selectedUstensils.length === 0) {
    selectedRecipesByUstensils = recipesToFilter;
  } else {
    selectedUstensils.forEach((item) => {
      let ustensilValue = item.toLowerCase().replace(/\s/g, "");
      //console.log(ustensilValue);

      recipesToFilter.filter((recipe) => {
        if (
          recipe.ustensils.find((elt) =>
            elt.toLowerCase().replace(/\s/g, "").includes(ustensilValue)
          )
        ) {
          selectedRecipesByUstensils.push(recipe);
          selectedRecipesByUstensils = [...new Set(selectedRecipesByUstensils)];
          //console.log(selectedRecipesByUstensils);
        }
        recipesContainer.innerHTML = "";
      });
    });
  }
  return selectedRecipesByUstensils;
}

function displayIngredientsList(tableauatrier) {
  // console.log(ingredientsArray);
  //ingredientsContainer.innerHTML = "";
  let newIngredientsArray = [];

  tableauatrier.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      newIngredientsArray.push(ingredient.ingredient);
      newIngredientsArray = [...new Set(newIngredientsArray)].sort();
      console.log(newIngredientsArray);
    });
  });

  createIngredientsList(newIngredientsArray);
}

function displayAppliancesList(tableauatrier) {
  // console.log(appliancesArray);
  let newAppliancesArray = [];
  tableauatrier.forEach((recipe) => {
    newAppliancesArray.push(recipe.appliance);
    newAppliancesArray = [...new Set(newAppliancesArray)].sort();
    //console.log(appliancesList);
  });
  createApplianceList(newAppliancesArray);
}

function displayUstensilsList(tableauatrier) {
  console.log(ustensilsArray);
  let newUstensilsArray = [];
  tableauatrier.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      newUstensilsArray.push(ustensil);
      newUstensilsArray = [...new Set(newUstensilsArray)].sort();
      //console.log(ustensilsList); //retourne le tableau des ustensils  suivant les recettes triées
    });
  });
  createUstensilsList(newUstensilsArray);
}
