/* eslint-disable no-unused-vars */
class RecipesCard {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.servings = recipe.servings;
    this.ingredients = recipe.ingredients;
    //console.log(this.ingredients);
    this.time = recipe.time;
    this.description = recipe.description;
    this.appliance = recipe.appliance;
    this.ustensils = recipe.ustensils;
  }

  buildCard() {
    const card = document.createElement("article");
    // console.log(card);
    let photo = "";
    photo = this.name.toLowerCase().replace(/\s/g, "");

    card.classList.add(
      "card",
      "col-lg-4",
      "col-md-6",
      "col-sm-12",
      "g-4",
      "border-0"
    );
    card.innerHTML = `
      
        <img class="card-img-top"  src="assets/images/${photo}.jpg"
    }" alt="${this.name}" />
        <div   class="card-body py-0">
            <div id="receipTitle" class="d-flex flex-row mt-2 mb-2 gap-2 justify-content-between align-items-center">
                <h2 class="card-title col mt-0">${this.name}</h2>
                <div class="time col-4 d-flex flex-row align-items-center justify-content-end">
                    <p class="mr-2 minutes">
                        <span class="me-2">
                        <img  src="assets/time.svg" alt="">
                        </span>${this.time} min
                    </p>
                </div>
            </div>
        
            <div class="recipe d-flex flex-row justify-content-between gap-1">
                <ul class="ingredient-container col-5 mb-0">${this.ingredients
                  .map(
                    (element) =>
                      `
                <li>
                    <strong>${element.ingredient} :</strong> ${
                        "quantity" in element ? element.quantity : ""
                      } ${"unit" in element ? element.unit : ""}
                `
                  )
                  .join("")}</li>
                </ul>
                <p class="card-text col-7 m-0">${this.description}</p>
            </div>
        </div>`;

    return card;
  }
}
