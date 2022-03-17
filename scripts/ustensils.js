import { recipes } from "../data/recipes.js";

const ustensilsList = document.querySelector("#ustensilsList");
console.log(ustensilsList);

/**
 * recherche des ustensils et création du tableau ustensils
 * array.from(new Set) : elimine les doublons
 * méthode sort pour trier par ordre alphabétique
 * creation dans le Html
 */
function displayUstensils() {
  const ustensils = [];

  recipes.forEach((recipe) => {
    //console.log(recipe.ustensils);
    recipe.ustensils.forEach((element) => ustensils.push(element));
  });
  //console.log(ustensils);
  const ustensilsArray = Array.from(new Set(ustensils));
  ustensilsArray.sort((a, b) => a.localeCompare(b));
  console.log(ustensilsArray);

  createUstensilsList(ustensilsArray);
}
displayUstensils();

/**
 *
 * @param {*} ustensilsArray
 * creation html de la liste d'ingrédients
 */
function createUstensilsList(ustensilsArray) {
  ustensilsArray.forEach((ustensil) => {
    const listOfUstensils = document.createElement("div");
    listOfUstensils.setAttribute("class", "table-items bg-danger");
    listOfUstensils.innerHTML = `
    <ul class=" list-group row flex-wrap m-0 p-1 pt-0">
        <li class="list-inline-item col-4 col-sm-6 col-md-4">${ustensil}</li>
    </ul>
        `;
    //console.log(listOfUstensils);
    //ustensilsList.appendChild(listOfUstensils);
  });
}
