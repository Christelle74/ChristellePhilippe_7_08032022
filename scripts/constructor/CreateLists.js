/* eslint-disable no-unused-vars */
class CreateIngredientsList {
  constructor(ingredient) {
    this.ingredient = ingredient;
    //console.log(this.ingredient);
  }

  buildIngredientsList() {
    const listOfIngredients = document.createElement("li");
    //console.log(listOfIngredients);
    listOfIngredients.classList.add(
      "list-items",
      "col-4",
      "col-sm-6",
      "col-md-4",
      "ingredient-item"
    );
    listOfIngredients.setAttribute("data-color", "bg-primary");
    listOfIngredients.setAttribute("data-item", this.ingredient);
    listOfIngredients.innerHTML = this.ingredient; //ou `${ingredient}`;

    return listOfIngredients;
  }
}
class CreateAppliancesList {
  constructor(appliance) {
    this.appliance = appliance;
    //console.log(this.appliance);
  }

  buildAppliancesList() {
    const listOfAppliances = document.createElement("li");
    listOfAppliances.classList.add(
      "list-items",
      "col-4",
      "col-sm-6",
      "col-md-4",
      "appliance-item"
    );
    listOfAppliances.setAttribute("data-color", "bg-success");
    listOfAppliances.setAttribute("data-item", this.appliance);
    listOfAppliances.innerHTML = this.appliance;

    return listOfAppliances;
  }
}

class CreateUstensilsList {
  constructor(ustensil) {
    this.ustensil = ustensil;
    //console.log(this.ustensil);
  }

  buildUstensilsList() {
    const listOfUstensils = document.createElement("li");
    listOfUstensils.classList.add(
      "list-items",
      "col-4",
      "col-sm-6",
      "col-md-4",
      "ustensil-item"
    );
    listOfUstensils.setAttribute("data-color", "bg-danger");
    listOfUstensils.setAttribute("data-item", this.ustensil);
    listOfUstensils.innerHTML = this.ustensil;
    //console.log(listOfUstensils);
    return listOfUstensils;
  }
}
