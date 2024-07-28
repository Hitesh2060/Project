const search_box = document.querySelector(".searchbox");
const search_btn = document.querySelector(".searchbtn");
const recipe_cont = document.querySelector(".recipe_cont");

const recipeDetails = document.querySelector(".recipe_details");
const recipeCloseBtn = document.querySelector(".recipe_close_btn");
const recipeDetailcont = document.querySelector(".recipe_detail_cont");

//Function to get recipes
const fetchrecipes = async (query) => {

    recipe_cont.innerHTML = '<h2>Fetching Recipes...</h2>';

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

    const response = await data.json();

    recipe_cont.innerHTML = "";
    response.meals.forEach(meal => {
        const recipe_div = document.createElement("div");
        recipe_div.classList.add("recipe");

        recipe_div.innerHTML = `
       <img src="${meal.strMealThumb}">
       <h3>${meal.strMeal}</h3>
       <p><span>${meal.strArea}</span> Dish</p> 
       <p> Belongs to <span>${meal.strCategory}</span> Category</p> `

        const button = document.createElement("button");
        button.textContent = "View Recipe";

        //adding event listner in button
        button.addEventListener("click", () => {
            openRecipePopup(meal);
        });

        recipe_cont.appendChild(recipe_div);
        recipe_div.appendChild(button);

    });
    // console.log(response.meals);
}

//function to open recipe popup
const openRecipePopup = (meal) => {
    recipeDetailcont.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients</h3>
    <ul class="ingredientsList">${fetchIngredients(meal)}</ul>

    <div class="recipeInstructions">
     <h3>Instructions</h3>
     <p>${meal.strInstructions}</p>
    </div>
    `
    recipeDetailcont.parentElement.style.display = "block";
}

//function to fetch ingredients
const fetchIngredients = (meal) => {
  let ingredientList = "";

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];

    if (ingredient) {
        const measure = meal[`strMeasure${i}`];
        ingredientList += `<li>${measure} ${ingredient}`
    }
    else{
        break;
    }
  }
  return ingredientList;
}

recipeCloseBtn.addEventListener("click", () => {
    recipeDetailcont.parentElement.style.display = "none";
});

search_btn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchinput = search_box.value.trim();
    fetchrecipes(searchinput);
});