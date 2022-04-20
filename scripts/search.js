import {
  recipesArray,
  createRecipesList,
  displayAppliancesList,
  displayIngredientsList,
  displayUstensilsList,
} from "/scripts/index.js";

export function principalFilter(e) {
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
