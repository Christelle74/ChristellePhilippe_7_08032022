import { recipes } from "../data/recipes.js";

console.log(recipes);

function getRecipes() {
  // This is an array so we have to loop through it
  let output = "";

  recipes.forEach(function (recipe) {
    output += `
      <article class="card col-lg-4 col-md-6 col-sm-12 g-5 border-0">
        <img class="card-img-top"  src="" alt="" />
        <div   class="card-body py-0">
            <div id="receipTitle" class="d-flex flex-row mt-2 mb-2 gap-2 justify-content-between align-items-center ">
                <h2 class="card-title col mt-0">${recipe.name}</h2>
                <div class="time col-4 d-flex flex-row align-items-center justify-content-end">
                    <p class="mr-2 minutes">
                        <span class="me-2">
                        <img  src="/assets/time.svg" alt="">
                        </span>${recipe.time} min
                    </p>
                </div>
            </div>
        
            <div class="recipe d-flex flex-row justify-content-between gap-2 ">
                <ul class="ingredient-container col-5 mb-0">${recipe.ingredients.map(
                  (element) =>
                    `
                <li>
                    <span>${element.ingredient}</span> : ${
                      "quantity" in element ? element.quantity : ""
                    } ${"unit" in element ? element.unit : ""}
                `
                )}</li>
                </ul>
                <p class="card-text col-7 m-0   ">${recipe.description}</p>
            </div>
        </div>
    </article>
        
 `;
  });
  document.getElementById("output").innerHTML = output;
}
getRecipes();

/*
var ingredients = [];

function getIngredients() {
  recipe.ingredients.forEach((ingredient) => recipe.ingredients);
  console.log(ingredients);
}
getIngredients();*/
