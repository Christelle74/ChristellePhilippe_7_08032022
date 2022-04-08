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
//console.log(ingredientFilter);

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
//console.log(ingredientsArray);
var appliancesArray = []; //tableau des appareils
//console.log(appliancesArray);
var ustensilsArray = []; //tableau des ustensils
//console.log(ustensilsArray);

var tagsArray = []; //tableau contenant tous les tags
//console.log(tagsArray);
//var selectedRecipes = []; // tableau recettes triées
var selectedTags = []; //tableau de tags selectionnés
//console.log(selectedTags);
var selectedIngredients = []; //tableau des ingredients selectionnés
console.log(selectedIngredients);
var selectedAppliances = [];
console.log(selectedAppliances);
var selectedUstensils = [];
console.log(selectedUstensils);

//Listeners

/*ingredientFilter.addEventListener("keyup", filterRecipes);
applianceFilter.addEventListener("keyup", filterRecipes);
ustensilFilter.addEventListener("keyup", filterRecipes);*/

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
 * This function will get all the recipes from the database and then create a list of all the
 * ingredients, appliances and ustensils
 */
const displayAllLists = async () => {
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
displayAllLists();

/**
 * Create a list of ingredients from the ingredients array
 * @param ingredientsArray- an array of ingredients
 */
function createIngredientsList(ingredientsArray) {
  ingredientsArray.forEach((ingredient) => {
    const listOfIngredients = document.createElement("li");
    listOfIngredients.classList.add(
      "list-items",
      "col-4",
      "col-sm-6",
      "col-md-4",
      "ingredient-item"
    );
    listOfIngredients.setAttribute("data-color", "bg-primary");
    listOfIngredients.setAttribute("data-item", ingredient);
    listOfIngredients.innerHTML = ingredient; //ou `${ingredient}`;
    ingredientsContainer.appendChild(listOfIngredients);
    //console.log(listOfIngredients);
  });
  ingredientsList = Array.from(document.querySelectorAll(".ingredient-item"));
  ingredientsList = [...new Set(ingredientsList)].sort();
  //console.log(ingredientsList);

  ingredientsList.forEach((item) => {
    item.addEventListener("click", () => {
      selectedIngredients.push(item);
      //console.log(selectedIngredients);
      hideList(listOfIngredients, ingredientFilter, ingredientChevron);
      createTag(item);
      filterRecipesByIngredients(recipesArray, selectedIngredients);
    });
  });
}

/**
 * Create a list of appliances and add an event listener to each one
 * @param appliancesArray - an array of strings that will be used to create the list of appliances.
 */
function createApplianceList(appliancesArray) {
  appliancesArray.forEach((appliance) => {
    const listOfAppliances = document.createElement("li");
    listOfAppliances.classList.add(
      "list-items",
      "col-4",
      "col-sm-6",
      "col-md-4",
      "appliance-item"
    );
    listOfAppliances.setAttribute("data-color", "bg-success");
    listOfAppliances.setAttribute("data-item", appliance);
    listOfAppliances.innerHTML = appliance;
    applianceContainer.appendChild(listOfAppliances);
    //console.log(listOfAppliances);
  });
  appliancesList = Array.from(document.querySelectorAll(".appliance-item"));
  appliancesList = [...new Set(appliancesList)].sort();
  //console.log(appliancesList);

  appliancesList.forEach((item) => {
    item.addEventListener("click", () => {
      selectedAppliances.push(item);
      //console.log(selectedAppliances);

      createTag(item);
      hideList(listOfAppliances, applianceFilter, applianceChevron);
      filterRecipesByAppliances(
        selectedAppliances,
        selectedRecipesByIngredients
      );
    });
  });
}

/**
 * Create a list of ustensils and add an event listener to each one
 * @param ustensilsArray - an array of strings that will be used to create the list of ustensils.
 */
function createUstensilsList(ustensilsArray) {
  ustensilsArray.forEach((ustensil) => {
    const listOfUstensils = document.createElement("li");
    listOfUstensils.classList.add(
      "list-items",
      "col-4",
      "col-sm-6",
      "col-md-4",
      "ustensil-item"
    );
    listOfUstensils.setAttribute("data-color", "bg-danger");
    listOfUstensils.setAttribute("data-item", ustensil);
    listOfUstensils.innerHTML = ustensil;
    ustensilsContainer.appendChild(listOfUstensils);

    // console.log(listOfUstensils);
  });
  ustensilsList = Array.from(document.querySelectorAll(".ustensil-item"));
  ustensilsList = [...new Set(ustensilsList)].sort();
  //console.log(ustensilsList);

  ustensilsList.forEach((item) => {
    item.addEventListener("click", () => {
      selectedUstensils.push(item);
      //console.log(selectedUstensils);
      selectedTags.push(item);
      // console.log(selectedTags);
      hideList(listOfUstensils, ustensilFilter, ustensilChevron);
      createTag(item);
      filterRecipesByUstensils(selectedUstensils, selectedRecipesByAppliances);
    });
  });
}

/**
 * GESTION DES TAGS
 */
/**
 * Create a new tag element and append it to the tags element
 * @param item - The element that was clicked.
 * @returns Nothing.
 */
function createTag(item) {
  //selectedTags.forEach((item) => {
  const tag = document.createElement("li");
  const tagColor = item.dataset.color;
  const tagName = item.innerHTML;
  tag.classList.add(
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

  tag.innerHTML = `${tagName}
  <img id="close" src="assets/times-circle-regular.svg" alt=""
/>`;
  tag.setAttribute("data-item", tagName);
  tags.appendChild(tag);

  selectedTags = Array.from(document.querySelectorAll(".newTag"));
  console.log(selectedTags);
  tag.addEventListener("click", closeTag);

  return tag;
}

/**
 * *Close the tag that was just clicked on.*
 * @param e - The event object.
 */
function closeTag(e) {
  let element = e.target;
  element.parentNode.remove(element);
  listOfIngredients.textContent = "";
  listOfAppliances.textContent = "";
  listOfUstensils.textContent = "";
  displayAllLists(ingredientsList, appliancesList, ustensilsList);
}

/**
 * gestion des tris
 */

var selectedRecipesByIngredients = [];

function filterRecipesByIngredients(recipesArray, selectedIngredients) {
  //Filtre les recettes selon les ingrédients choisis
  listOfIngredients.textContent = "";
  listOfAppliances.textContent = "";
  listOfUstensils.textContent = "";

  selectedIngredients.forEach((item) => {
    var ingredientValue = item.textContent.toLowerCase().replace(/\s/g, "");
    console.log(ingredientValue);

    recipesArray.filter((recipe) => {
      if (
        recipe.ingredients.find((elt) =>
          elt.ingredient
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(ingredientValue)
        )
      ) {
        selectedRecipesByIngredients.push(recipe);

        console.log(selectedRecipesByIngredients);
      }
    });
    createRecipesList(selectedRecipesByIngredients);
    displayIngredientsList(selectedRecipesByIngredients);
    displayAppliancesList(selectedRecipesByIngredients);
    displayUstensilsList(selectedRecipesByIngredients);
  });
}

var selectedRecipesByAppliances = [];

function filterRecipesByAppliances(
  selectedAppliances,
  selectedRecipesByIngredients
) {
  //Filtre les recettes filtrées par ingrédients, selon l’appareil choisi

  selectedAppliances.forEach((item) => {
    var applianceValue = item.textContent.toLowerCase().replace(/\s/g, "");
    console.log(applianceValue);

    selectedRecipesByIngredients.filter((recipe) => {
      if (
        recipe.appliance
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(applianceValue)
      ) {
        selectedRecipesByAppliances.push(recipe);

        console.log(selectedRecipesByAppliances);
      }
    });
  });
  createRecipesList(selectedRecipesByAppliances);
}

var selectedRecipesByUstensils = [];

function filterRecipesByUstensils(
  selectedUstensils,
  selectedRecipesByAppliances
) {
  //Filtre les recettes filtrées par appareils, selon les ustensiles choisis

  selectedUstensils.forEach((item) => {
    var ustensilValue = item.textContent.toLowerCase().replace(/\s/g, "");
    //console.log(ustensilValue);

    selectedRecipesByAppliances.filter((recipe) => {
      if (
        recipe.ustensils.find((elt) =>
          elt.toLowerCase().replace(/\s/g, "").includes(ustensilValue)
        )
      ) {
        selectedRecipesByUstensils.push(recipe);

        console.log(selectedRecipesByUstensils);
      }
    });
    createRecipesList(selectedRecipesByUstensils);
  });
}

function displayIngredientsList(selectedRecipesByIngredients) {
  ingredientsList = [];
  selectedRecipesByIngredients.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientsList.push(ingredient.ingredient);
      ingredientsList = [...new Set(ingredientsList)].sort();
      console.log(ingredientsList);
    });
  });
  createIngredientsList(ingredientsList);
}

function displayAppliancesList(selectedRecipesByIngredients) {
  appliancesList = [];
  selectedRecipesByIngredients.forEach((recipe) => {
    appliancesList.push(recipe.appliance);
    appliancesList = [...new Set(appliancesList)].sort();
    console.log(appliancesList);
  });
  createApplianceList(appliancesList);
}

function displayUstensilsList(selectedRecipesByIngredients) {
  selectedRecipesByIngredients.forEach((recipe) => {
    ustensilsList = [];
    recipe.ustensils.filter((ustensil) => {
      ustensilsList.push(ustensil);
      ustensilsList = [...new Set(ustensilsList)].sort();
      console.log(ustensilsList); //retourne le tableau des ustensils  suivant les recettes triées
    });
  });
  createUstensilsList(ustensilsList);
} /*

/*function displayByTags(recipesArray) {
  selectedIngredients.forEach((tag) => {
    console.log("test");
    const index = selectedIngredients.indexOf(tag);
    console.log(index);

    if (index != -1) {
      selectedIngredients.splice(index, 1);

      // recipesArray.add(tag);
      createRecipesList(recipesArray);
    }
  });

  const value = e.target.getAttribute("data-item");
  console.log(value); //retourne la valeur 1 fois sur 10
}*/
function displayByTag(recipesArray) {
  const filteredRecipes = recipesArray.filter((recipe) => {
    if (
      selectedTags.every((item) => {
        const formatedItem = item.textContent.toLowerCase().replace(/\s/g, "");

        recipe.ingredients.some((i) => {
          return i.ingredient.toLowerCase().includes(formatedItem);
        }) ||
          recipe.appliance.toLowerCase().includes(formatedItem) ||
          recipe.ustensils.some((ustensil) => {
            return ustensil.toLowerCase() === formatedItem;
          });
      })
    ) {
      if (filteredFilters.length) {
        console.log(filteredRecipes);
        recipesContainer.innerHTML = "";
        createRecipesList(filteredRecipes);
      }
    }
  });
}*/
