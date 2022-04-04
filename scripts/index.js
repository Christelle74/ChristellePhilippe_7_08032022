/**----------DOM----------*/

const recipesContainer = document.querySelector("#output");
const ingredientsList = document.querySelector("#ingredientsList");
const applianceList = document.querySelector("#applianceList");
const ustensilsList = document.querySelector("#ustensilsList");
//console.log(ustensilsList);
const filtersContainer = document.querySelector("#filters");
//console.log(filtersContainer);
const listGroup = document.querySelectorAll(".list-group");
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
var recipesArray = []; //tableau de recettes
//console.log(recipesArray);
var ingredientsArray = []; //tableau des ingrédients
// console.log(ingredientsArray);
var appliancesArray = []; //tableau des appareils
//console.log(appliancesArray);
var ustensilsArray = []; //tableau des ustensils

var tagsArray = []; //tableau contenant tous les tags
//console.log(tagsArray);
var selectedRecipes = [];
var selectedTags = []; //tableau de tags selectionnés
//console.log(selectedTags);
var selectedIngredients = [];
console.log(selectedIngredients);
var selectedAppliances = [];
//console.log(selectedAppliances);
var selectedUstensils = [];
//console.log(selectedUstensils);
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

  //console.log(recipesArray);
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
  //createTags(tagsArray);
};
displayAllLists();

/**
 * Create a list of ingredients from the ingredients array
 * @param ingredientsArray - an array of ingredients
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
    ingredientsList.appendChild(listOfIngredients);
    //console.log(listOfIngredients);
  });
  ingredientsArray = Array.from(
    document.getElementsByClassName("ingredient-item")
  );
  //console.log(ingredientsArray);

  ingredientsArray.forEach((item) => {
    item.addEventListener("click", () => {
      selectedIngredients.push(item);
      //console.log(selectedIngredients);
      selectedTags.push(item);
      //console.log(item.textContent);
      createTag(item);
      filterRecipes(selectedRecipes);

      //hideList(listOfIngredients, ingredientFilter, ingredientChevron);
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
    applianceList.appendChild(listOfAppliances);
    //console.log(listOfAppliances);
  });
  appliancesArray = Array.from(
    document.getElementsByClassName("appliance-item")
  );
  //console.log(appliancesArray);

  appliancesArray.forEach((item) => {
    item.addEventListener("click", () => {
      selectedAppliances.push(item);
      //console.log(selectedAppliances);
      selectedTags.push(item);
      //console.log(selectedTags);
      //hideList(listOfAppliances, applianceFilter, applianceChevron);
      createTag(item);
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
    ustensilsList.appendChild(listOfUstensils);

    // console.log(listOfUstensils);
  });
  ustensilsArray = Array.from(document.getElementsByClassName("ustensil-item"));
  //console.log(ustensilsArray);

  ustensilsArray.forEach((item) => {
    item.addEventListener("click", (e) => {
      selectedUstensils.push(item);
      //console.log(selectedUstensils);
      selectedTags.push(item);
      // console.log(selectedTags);
      // hideList(listOfUstensils, ustensilFilter, ustensilChevron);
      createTag(item);
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

  tags.appendChild(tag);
  tag.addEventListener("click", closeTag, removeSelectedTag);
  return tag;
  //});
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
 * Remove the selected tags from the page
 */
function removeSelectedTag() {
  const resetselectedTag = selectedTags.forEach((item) => {
    item.remove();
    console.log(resetselectedTag);
  });
}

/**
 * tri
 */

function filterRecipes(selectedTag, recipesArray) {
  //listOfIngredients.textContent = "";
  //listOfAppliances.textContent = "";
  //listOfUstensils.textContent = "";
  console.log(selectedTags);
  const selectedRecipes = [];

  // if (
  selectedTags.forEach((tag) => {
    var selectedTag = tag.textContent.toLowerCase().replace(/\s/g, "");
    console.log(selectedTag);
  });
  //) {
  recipesArray.filter((recipe) => {
    if (
      recipe.name.toLowerCase().replace(/\s/g, "").includes(selectedTag) ||
      recipe.description
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(selectedTag) ||
      recipe.ingredients.find((elt) =>
        elt.ingredient.toLowerCase().replace(/\s/g, "").includes(selectedTag)
      ) ||
      recipe.appliance.toLowerCase().replace(/\s/g, "").includes(selectedTag) ||
      recipe.ustensils.find((elt) =>
        elt.toLowerCase().replace(/\s/g, "").includes(selectedTag)
      )
    ) {
      selectedRecipes.push(recipe);
      return selectedRecipes;
    }
  });
  console.log(selectedRecipes);
  // }
  createRecipesList(selectedRecipes);
}
