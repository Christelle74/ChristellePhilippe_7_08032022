/* eslint-disable no-undef */
/**----------DOM----------*/
const recipesContainer = document.querySelector("#output");
const tags = document.querySelector(".selectedTag");

//inputs
const ingredientFilter = document.querySelector("#ingredients-filter");
const applianceFilter = document.querySelector("#appliance-filter");
const ustensilFilter = document.querySelector("#ustensils-filter");
const principalSearch = document.querySelector("#recherche");

//chevrons
const ingredientChevron = document.querySelector(".ingredientChevron");
const applianceChevron = document.querySelector(".applianceChevron");
const ustensilChevron = document.querySelector(".ustensilChevron");
const chevrons = document.querySelectorAll(".chevron");

//ul
const listOfIngredients = document.querySelector("#ingredientsList");
const listOfUstensils = document.querySelector("#ustensilsList");
const listOfAppliances = document.querySelector("#applianceList");

//arrays
var recipesArray = []; //tableau de toutes les recettes
var ingredientsArray = []; //tableau des ingrédients
var appliancesArray = []; //tableau des appareils
var ustensilsArray = []; //tableau des ustensils

var selectedTags = []; //tableau de tags selectionnés
var selectedIngredients = []; //tableau des ingredients selectionnés
var selectedAppliances = []; // tableau des appareils selectionnés
var selectedUstensils = []; // tableau des ustensils selectionnés
var principalRecipeSearchValue = ""; // requête principe de recherche de recettes
var selectedRecipes = []; // tableau des recettes selectionnée par la recherche principale

//Listeners
ingredientFilter.addEventListener("click", (e) => {
  e.preventDefault();
  //console.log("test");
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

/**
 * When the user clicks on the input field, the list of options will appear and the chevron will rotate
 * 180 degrees.
 * @param listGroup - the list group that contains the list items
 * @param input - the input field
 * @param chevron - the chevron icon that rotates when the list is displayed
 */
function displayList(listGroup, input, chevron) {
  listGroup.style.display = "block";
  input.style.width = "667px";
  chevron.style.transform = "rotate(180deg)";
}
/**
 * When the user clicks on the input field, the list of options will appear, and when the user clicks
 * on the input field again, the list of options will disappear.
 * @param listGroup - The list group that contains the list items
 * @param input - the input element
 * @param chevron - the chevron icon that rotates when the list is shown/hidden
 */
function hideList(listGroup, input, chevron) {
  listGroup.style.display = "none";
  input.style.width = "207px";
  chevron.style.transform = "none";
  input.value = "";
}

/** fonction orchestre **/
/**
 * This function filters the recipes by ingredients, appliances and ustensils, then creates a list of
 * recipes, a list of tags, a list of ingredients, a list of appliances and a list of ustensils.
 * @param recipes - an array of objects, each object is a recipe
 */
function init(recipes) {
  const recipesBySearch = principalRecipesFilter(recipes);
  const recipesByIngredients = filterRecipesByIngredients(recipesBySearch);
  const recipesByAppliances = filterRecipesByAppliances(recipesByIngredients);
  const recipesByUstensils = filterRecipesByUstensils(recipesByAppliances);

  createRecipesList(recipesByUstensils);
  createTag();
  displayIngredientsList(recipesByUstensils);
  displayAppliancesList(recipesByUstensils);
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
  recipesArray = [
    ...recipes /*,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,

    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,

    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes,
    ...recipes*/,
  ]; // tests pour 4000 recettes
  console.log(recipesArray.length);
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
      //console.log(ingredientsArray);
    });
    appliancesArray.push(recipe.appliance);
    //console.log(appliancesArray);
    recipe.ustensils.map((element) => {
      ustensilsArray.push(element);
      //console.log(ustensilsArray);
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
 * It creates a list of ingredients from an array of ingredients.
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
      if (!inSelectedTags(item.dataset.item)) {
        selectedIngredients.push(
          item.dataset.item.toLowerCase().replace(/\s/g, "")
        );
        selectedTags.push(item); // empeche l'affichage en double du tag
      }

      hideList(listOfIngredients, ingredientFilter, ingredientChevron);
      ingredientFilter.value = "";
      init(recipesArray);
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
      if (!inSelectedTags(item.dataset.item)) {
        selectedAppliances.push(
          item.dataset.item.toLowerCase().replace(/\s/g, "")
        );
        selectedTags.push(item); // empeche l'affichage en double du tag
      }

      hideList(listOfAppliances, applianceFilter, applianceChevron);
      applianceFilter.value = "";
      init(recipesArray);
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
      if (!inSelectedTags(item.dataset.item)) {
        selectedUstensils.push(
          item.dataset.item.toLowerCase().replace(/\s/g, "")
        );
        selectedTags.push(item); // empeche l'affichage en double du tag
      }
      hideList(listOfUstensils, ustensilFilter, ustensilChevron);
      ustensilFilter.value = "";
      init(recipesArray);
    });
  });
}

/**
 * GESTION DES TAGS
 */

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
    let tagClose = document.querySelectorAll("#close");
    //console.log(tagClose);
    tagClose.forEach((tag) => tag.addEventListener("click", closeTag));

    return tagLi;
  });
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

  init(recipesArray);
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
  var index = target_list.indexOf(item_name.toLowerCase().replace(/\s/g, ""));
  //console.log(index);
  if (index > -1) {
    target_list.splice(index, 1);
  }
  //console.log(target_list);
  return target_list;
}

/**
 * gestion des tris par tag
 */

/**
 * It filters the recipes according to the ingredients chosen.
 * @param recipesToFilter - an array of objects (recipes)
 * @returns An array of objects.
 */
function filterRecipesByIngredients(recipesToFilter) {
  //Filtre les recettes selon les ingrédients choisis
  let selectedRecipesByIngredients = recipesToFilter;

  selectedIngredients.forEach((item) => {
    selectedRecipesByIngredients = selectedRecipesByIngredients.filter(
      (recipe) =>
        recipe.ingredients.find((elt) =>
          // console.log(item, elt.ingredient);
          elt.ingredient.toLowerCase().replace(/\s/g, "").includes(item)
        )
    );
    //console.log(selectedRecipesByIngredients);
  });

  return selectedRecipesByIngredients;
}

/**
 * It filters the recipes filtered by ingredients, according to the appliance chosen.
 * @param recipesToFilter - an array of objects (recipes)
 * @returns An array of objects.
 */
function filterRecipesByAppliances(recipesToFilter) {
  //Filtre les recettes filtrées par ingrédients, selon l’appareil choisi

  let selectedRecipesByAppliances = recipesToFilter;

  selectedAppliances.forEach((item) => {
    //console.log(item);
    selectedRecipesByAppliances = selectedRecipesByAppliances.filter(
      (recipe) =>
        recipe.appliance.toLowerCase().replace(/\s/g, "").includes(item)
      //console.log(recipe.appliance);
    );
  });
  return selectedRecipesByAppliances;
}

/**
 * It filters the recipes by the selected ustensils
 * @param recipesToFilter - an array of objects, each object is a recipe.
 * @returns An array of objects.
 */
function filterRecipesByUstensils(recipesToFilter) {
  //Filtre les recettes filtrées par appareils, selon les ustensiles choisis
  let selectedRecipesByUstensils = recipesToFilter;

  selectedUstensils.forEach((item) => {
    selectedRecipesByUstensils = selectedRecipesByUstensils.filter((recipe) =>
      recipe.ustensils.find((elt) =>
        elt.toLowerCase().replace(/\s/g, "").includes(item)
      )
    );
  });
  return selectedRecipesByUstensils;
}

/**
 * It takes an array of objects, loops through each object, then loops through each object's
 * ingredients array, then pushes each ingredient into a new array, then removes duplicates, then sorts
 * the array, then passes the array to another function.
 * @param listToFilter - an array of objects
 */
function displayIngredientsList(listToFilter) {
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
  let newAppliancesArray = [];

  listToFilter.forEach((recipe) => {
    newAppliancesArray.push(recipe.appliance);
    newAppliancesArray = [...new Set(newAppliancesArray)].sort();
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
ingredientFilter.addEventListener("input", ingredientInputFilter);
applianceFilter.addEventListener("input", applianceInputFilter);
ustensilFilter.addEventListener("input", ustensilInputFilter);

/**
 * If the input value is not included in the list item, then hide the list item, otherwise show the
 * list item.
 * @param e - event
 */
function ingredientInputFilter(e) {
  const inputValue = e.target.value.toLowerCase();
  // console.log(inputValue);
  const items = document.querySelectorAll(".list-items");
  //console.log(items);

  for (i = 0; i < items.length; i++) {
    if (!items[i].innerHTML.toLowerCase().includes(inputValue)) {
      items[i].style.display = "none";
    } else {
      items[i].style.display = "list-item";
    }
  }
}

/**
 * If the input value is not included in the list item, then hide the list item, otherwise show the
 * list item.
 * @param e - event
 */
function applianceInputFilter(e) {
  const inputValue = e.target.value.toLowerCase();
  // console.log(inputValue);
  const items = document.querySelectorAll(".list-items");
  //console.log(items);
  for (i = 0; i < items.length; i++) {
    if (!items[i].innerHTML.toLowerCase().includes(inputValue)) {
      items[i].style.display = "none";
    } else {
      items[i].style.display = "list-item";
    }
  }
}

/**
 * If the input value is not included in the list item, then hide the list item, otherwise show the
 * list item.
 * @param e - the event object
 */
function ustensilInputFilter(e) {
  const inputValue = e.target.value.toLowerCase();
  // console.log(inputValue);
  const items = document.querySelectorAll(".list-items");
  //console.log(items);
  for (i = 0; i < items.length; i++) {
    if (!items[i].innerHTML.toLowerCase().includes(inputValue)) {
      items[i].style.display = "none";
    } else {
      items[i].style.display = "list-item";
    }
  }
}

/**
 * recherche principale
 */
console.time("function 2");
principalSearch.addEventListener("input", algoPrincipalFilter);

/**
 * It filters an array of objects based on the value of a search input
 * @param recipesToFilter - an array of objects, each object is a recipe
 * @returns An array of objects.
 */

function principalRecipesFilter(recipesToFilter) {
  let selectedRecipesBySearch = [];

  for (let recipe of recipesToFilter) {
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const ingredientName = recipe.ingredients[i].ingredient
        .toLowerCase()
        .replace(/\s/g, "");
      //console.log(ingredientName);
      if (ingredientName.includes(principalRecipeSearchValue)) {
        selectedRecipesBySearch.push(recipe);
        selectedRecipesBySearch = [...new Set(selectedRecipesBySearch)];
        //console.log(recipesChoice);
      }
    }

    if (
      recipe.name
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(principalRecipeSearchValue) ||
      recipe.description
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(principalRecipeSearchValue)
    ) {
      selectedRecipesBySearch.push(recipe);
      selectedRecipesBySearch = [...new Set(selectedRecipesBySearch)];
    }
  }

  return selectedRecipesBySearch;
}

/**
 * It filters the recipesArray based on the value of the input field
 * @param e - the event object
 */
function algoPrincipalFilter(e) {
  principalRecipeSearchValue = e.target.value.toLowerCase().replace(/\s/g, "");
  // console.log(principalRecipeSearchValue);

  if (principalRecipeSearchValue.length > 2) {
    selectedRecipes = principalRecipesFilter(recipesArray);

    if (selectedRecipes.length == 0) {
      recipesContainer.innerHTML =
        "<p id='error'> Aucune recette ne correspond à votre critère ...vous pouvez, par exemple, rechercher 'tarte aux pommes', 'poisson', etc. </p>";
    } else init(selectedRecipes);
  } else {
    selectedRecipes = recipesArray;
    init(selectedRecipes);
  }
}
console.timeEnd("function 2");

/**
 * recherche principale
 */
/*
principalSearch.addEventListener("input", algoPrincipalFilter);
console.time("function 2");*/

/**
 * It filters the recipesArray according to the input value of the user
 * @param e - the event object
 */
/*function algoPrincipalFilter(e) {
  const inputValue = e.target.value.toLowerCase().replace(/\s/g, "");
  //console.log(inputValue);

  if (inputValue.length > 2) {
    let recipesChoice = [];

    for (let recipe of recipesArray) {
      for (let i = 0; i < recipe.ingredients.length; i++) {
        const ingredientName = recipe.ingredients[i].ingredient
          .toLowerCase()
          .replace(/\s/g, "");
        //console.log(ingredientName);
        if (ingredientName.includes(inputValue)) {
          recipesChoice.push(recipe);
          recipesChoice = [...new Set(recipesChoice)];
          //console.log(recipesChoice);
        }
      }

      if (
        recipe.name.toLowerCase().replace(/\s/g, "").includes(inputValue) ||
        recipe.description.toLowerCase().replace(/\s/g, "").includes(inputValue)
      ) {
        recipesChoice.push(recipe);
        recipesChoice = [...new Set(recipesChoice)];
      }
      // console.log(recipesChoice);
      init(recipesChoice);
    }

    if (recipesChoice.length == 0) {
      recipesContainer.innerHTML =
        "<p id='error'> Aucune recette ne correspond à votre critère ...vous pouvez, par exemple, rechercher 'tarte aux pommes', 'poisson', etc. </p>";
    }
  } else {
    init(recipesArray);
  }
}
console.timeEnd("function 2");*/
