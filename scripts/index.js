/* eslint-disable no-undef */
/**----------DOM----------*/
const recipesContainer = document.querySelector("#output");
const tags = document.querySelector(".selectedTag");
//console.log(tags);

//inputs
const ingredientFilter = document.querySelector("#ingredients-filter");
const applianceFilter = document.querySelector("#appliance-filter");
const ustensilFilter = document.querySelector("#ustensils-filter");
const principalSearch = document.querySelector("#recherche");
//console.log(principalSearch);
//const filters = document.querySelectorAll(".form-control");
//console.log(ingredientFilter);

//chevrons
const ingredientChevron = document.querySelector(".ingredientChevron");
const applianceChevron = document.querySelector(".applianceChevron");
const ustensilChevron = document.querySelector(".ustensilChevron");
const chevrons = document.querySelectorAll(".chevron");

//ul
const listOfIngredients = document.querySelector("#ingredientsList");
const listOfUstensils = document.querySelector("#ustensilsList");
const listOfAppliances = document.querySelector("#applianceList");
//console.log(listOfIngredients);

//arrays
var recipesArray = []; //tableau de toutes les recettes
//console.log(recipesArray);
var ingredientsArray = []; //tableau des ingrédients
console.log(ingredientsArray);
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

/**
 * The function init() is called when the page loads, and it filters the recipesArray by the
 * selectedIngredients, then creates the recipes list, the tags, and the lists of ingredients,
 * appliances, and ustensils.
 */
function init() {
  const recipesByIngredients = filterRecipesByIngredients(
    recipesArray,
    selectedIngredients
  );
  const recipesByAppliances = filterRecipesByAppliances(
    recipesByIngredients,
    selectedIngredients
  );
  const recipesByUstensils = filterRecipesByUstensils(
    recipesByAppliances,
    selectedIngredients
  );
  createRecipesList(recipesByUstensils);
  createTag();
  displayIngredientsList(recipesByIngredients);
  displayAppliancesList(recipesByAppliances);
  displayUstensilsList(recipesByUstensils);
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
  recipesContainer.innerHTML = "";
  recipes.map((recipe) => {
    recipesContainer.appendChild(new RecipesCard(recipe).buildCard());
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
 * It creates a list of ingredients from an array of ingredients
 * @param ingredients - an array of ingredients
 */
function createIngredientsList(ingredients) {
  listOfIngredients.innerHTML = "";
  ingredients.forEach((ingredient) => {
    listOfIngredients.appendChild(
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
      if (!inSelectedTags(item.dataset.item)) selectedTags.push(item); // empeche l'affichage en double du tag
      //console.log(selectedTags);
      hideList(listOfIngredients, ingredientFilter, ingredientChevron);
      ingredientFilter.value = "";
      principalSearch.value = "";
      init();
    });
  });
}

/**
 * It creates a list of appliances, and when you click on one of them, it adds it to an array of
 * selected appliances.
 * @param appliances - an array of objects
 */
function createApplianceList(appliances) {
  listOfAppliances.innerHTML = "";
  appliances.forEach((appliance) => {
    listOfAppliances.appendChild(
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
      if (!inSelectedTags(item.dataset.item)) selectedTags.push(item); // empeche l'affichage en double du tag
      //console.log(selectedTags);
      hideList(listOfAppliances, applianceFilter, applianceChevron);
      applianceFilter.value = "";
      principalSearch.value = "";
      init();
    });
  });
}

/**
 * It creates a list of ustensils, and when you click on one of them, it adds it to the
 * selectedUstensils array.
 * @param ustensils - an array of objects
 */

function createUstensilsList(ustensils) {
  listOfUstensils.innerHTML = "";
  ustensils.forEach((ustensil) => {
    listOfUstensils.appendChild(
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
      if (!inSelectedTags(item.dataset.item)) selectedTags.push(item); // empeche l'affichage en double du tag
      //console.log(selectedTags);
      hideList(listOfUstensils, ustensilFilter, ustensilChevron);
      ustensilFilter.value = "";
      principalSearch.value = "";
      init();
    });
  });
}

// Check if selectedTags contains item name
/**
 * If the item_name is in the selectedTags array, return true, otherwise return false.
 * @param item_name - the name of the item to be checked
 * @returns The result of the last iteration of the loop.
 */
function inSelectedTags(item_name) {
  var result = false;
  selectedTags.forEach((item) => {
    result = result || item.dataset.item === item_name;
  });
  return result;
}

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
    const tagType = tag.dataset.type;

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
    tagLi.setAttribute("data-type", tagType);
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
 * It removes the tag from the DOM, and then removes the tag from the list of selected tags.
 * @param e - the event that triggered the function
 */
function closeTag(e) {
  let element = e.target;
  // suppression de l'element graphique
  element.parentNode.remove(element);

  var item_name_to_remove = element.parentElement.dataset.item; //nom de l'élément enlevé
  var item_type_to_remove = element.parentElement.dataset.type; //type de l'élément enlevé
  // console.log(item_name_to_remove);
  selectedTags = removeItemFromObjectList(selectedTags, item_name_to_remove);

  switch (item_type_to_remove) {
    case "ingredient":
      selectedIngredients = removeItemFromList(
        selectedIngredients,
        item_name_to_remove
      );

      break;
    case "appliance":
      selectedAppliances = removeItemFromList(
        selectedAppliances,
        item_name_to_remove
      );

      break;
    case "ustensil":
      selectedUstensils = removeItemFromList(
        selectedUstensils,
        item_name_to_remove
      );
      break;
    default:
      console.log(`type not found ${expr}.`);
  }

  init();
}
// remove item_name from Object List
/**
 * It takes a list of objects and a string, and returns the list of objects with the object that has a
 * data-item attribute that matches the string removed.
 * @param target_list - the list of objects you want to remove the item from
 * @param item_name - the name of the item to remove
 * @returns The target_list is being returned.
 */
function removeItemFromObjectList(target_list, item_name) {
  var result = false;
  var item_to_remove = null;

  // On parcourt la liste des items de target_list (tags selectionnés)
  // Pour chaque item,"ici tag", si son name est egale au nom recherché, ici item_name
  // on l'enregistre dans item_to_remove et on sort de la boucle, break.
  // sinon on va voir l'item suivant
  for (let item of target_list) {
    result = item.innerHTML === item_name;
    if (result) {
      item_to_remove = item;

      break;
    }
  }

  // si item_name a été trouvé, donc item_to_remove n'est pas null
  // on peut donc le supprimer de target list
  if (item_to_remove) {
    var index = target_list.indexOf(item_to_remove);
    if (index > -1) {
      target_list.splice(index, 1);
    }
  }

  return target_list;
}

// remove item_name from List
/**
 * It takes a list and an item name, and returns the list with the item removed.
 * @param target_list - the list you want to remove the item from
 * @param item_name - The name of the item you want to remove from the list.
 * @returns The target_list is being returned.
 */
function removeItemFromList(target_list, item_name) {
  var index = target_list.indexOf(item_name);
  if (index > -1) {
    target_list.splice(index, 1);
  }
  return target_list;
}
/**
 * gestion des tris
 */

/**
 * It filters recipes by ingredients.
 * @param recipesToFilter - an array of objects (recipes)
 * @returns An array of objects.
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

/**
 * It filters the recipes filtered by ingredients, according to the appliance chosen.
 * @param recipesToFilter - an array of objects (recipes)
 * @returns An array of objects.
 */
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

/**
 * It filters recipes by ustensils, according to the ustensils chosen
 * @param recipesToFilter - an array of objects (recipes)
 * @returns An array of objects.
 */
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

/**
 * It takes an array of objects, loops through each object, then loops through each object's
 * ingredients array, then pushes each ingredient into a new array, then removes duplicates, then sorts
 * the array, then passes the array to another function.
 * @param listToFilter - an array of objects
 */
function displayIngredientsList(listToFilter) {
  // console.log(ingredientsArray);
  listOfIngredients.innerHTML = "";
  let newIngredientsArray = [];

  listToFilter.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      newIngredientsArray.push(ingredient.ingredient);
      newIngredientsArray = [...new Set(newIngredientsArray)].sort();
      //console.log(newIngredientsArray);
    });
  });
  createIngredientsList(newIngredientsArray);
}

/**
 * It takes an array of objects, loops through each object, and pushes the value of the "appliance" key
 * into a new array. Then it removes duplicates and sorts the array.
 * @param listToFilter - an array of objects
 */
function displayAppliancesList(listToFilter) {
  // console.log(appliancesArray);
  let newAppliancesArray = [];
  listToFilter.forEach((recipe) => {
    newAppliancesArray.push(recipe.appliance);
    newAppliancesArray = [...new Set(newAppliancesArray)].sort();
    //console.log(appliancesList);
  });
  createApplianceList(newAppliancesArray);
}

/**
 * It takes an array of objects, loops through each object, then loops through each object's array of
 * ustensils, then pushes each ustensil to a new array, then removes duplicates, then sorts the array,
 * then passes the array to another function.
 * @param listToFilter - an array of objects (recipes)
 */
function displayUstensilsList(listToFilter) {
  // console.log(ustensilsArray);
  let newUstensilsArray = [];
  listToFilter.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      newUstensilsArray.push(ustensil);
      newUstensilsArray = [...new Set(newUstensilsArray)].sort();
      //console.log(ustensilsList); //retourne le tableau des ustensils  suivant les recettes triées
    });
  });
  createUstensilsList(newUstensilsArray);
}

/**
 * filtres par inputSearch
 */
ingredientFilter.addEventListener("input", inputFilter);
applianceFilter.addEventListener("input", inputFilter);
ustensilFilter.addEventListener("input", inputFilter);
principalSearch.addEventListener("input", principalFilter);

/**
 * It takes the input value, filters the arrays and creates the lists.
 * </code>
 * @param e - the event object
 */
function inputFilter(e) {
  const inputValue = e.target.value.toLowerCase();
  // console.log(inputValue);

  //console.log(ingredientsArray);
  let ingredientChoice = [];
  //console.log(ingredientChoice);
  let applianceChoice = [];
  // console.log(applianceChoice);
  let ustensilChoice = [];
  //console.log(ustensilChoice);

  ingredientsArray.filter((ingredient) => {
    if (ingredient.innerHTML.toLowerCase().includes(inputValue)) {
      ingredientChoice.push(ingredient.innerHTML);
    }
  });
  // console.log(ingredientChoice);

  appliancesArray.filter((appliance) => {
    if (appliance.innerHTML.toLowerCase().includes(inputValue)) {
      applianceChoice.push(appliance.innerHTML);
    }
  });
  console.log(applianceChoice);

  ustensilsArray.filter((ustensil) => {
    if (ustensil.innerHTML.toLowerCase().includes(inputValue)) {
      ustensilChoice.push(ustensil.innerHTML);
    }
  });
  console.log(ustensilChoice);

  createIngredientsList(ingredientChoice);
  createApplianceList(applianceChoice);
  createUstensilsList(ustensilChoice);
}

function principalFilter(e) {
  const inputValue = e.target.value.toLowerCase().replace(/\s/g, "");
  //console.log(inputValue);

  let recipesChoice = [];

  recipesArray.filter((recipe) => {
    if (
      recipe.name.toLowerCase().replace(/\s/g, "").includes(inputValue) ||
      recipe.description
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(inputValue) ||
      recipe.ingredients.find((elt) =>
        elt.ingredient.toLowerCase().replace(/\s/g, "").includes(inputValue)
      )
    ) {
      recipesChoice.push(recipe);
      recipesChoice = [...new Set(recipesChoice)];
      // return recipesChoice;
    }
  });
  console.log(recipesChoice);

  createRecipesList(recipesChoice);
  displayIngredientsList(recipesChoice);
  displayAppliancesList(recipesChoice);
  displayUstensilsList(recipesChoice);
}
