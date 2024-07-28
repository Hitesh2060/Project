const search_box = document.querySelector(".searchbox");
const search_btn = document.querySelector(".searchbtn");
const recipe_cont = document.querySelector(".recipe_cont");

const recipeDetails = document.querySelector(".recipe_details");
const recipeCloseBtn = document.querySelector(".recipe_close_btn");
const recipeDetailcont = document.querySelector(".recipe_detail_cont");

// Function to get recipes
const fetchrecipes = async (query) => {
    recipe_cont.innerHTML = '<h2>Fetching Recipes...</h2>';

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipe_cont.innerHTML = "";
    if (response.meals) {
        response.meals.forEach(meal => {
            const recipe_div = document.createElement("div");
            recipe_div.classList.add("recipe");

            recipe_div.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Dish</p> 
                <p> Belongs to <span>${meal.strCategory}</span> Category</p>
            `;

            const button = document.createElement("button");
            button.textContent = "View Recipe";

            // Adding event listener to the button
            button.addEventListener("click", () => {
                openRecipePopup(meal);
            });

            recipe_div.appendChild(button);
            recipe_cont.appendChild(recipe_div);
        });
    } else {
        recipe_cont.innerHTML = "<h2>No recipes found.</h2>";
    }
};

// Function to open recipe popup
const openRecipePopup = (meal) => {
    recipeDetailcont.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <h3>Ingredients</h3>
        <ul>${fetchIngredients(meal)}</ul>
    `;
    recipeDetailcont.parentElement.style.display = "block";
};

// Function to fetch ingredients
const fetchIngredients = (meal) => {
    let ingredientList = "";

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientList;
};

// Event listener for search button
search_btn.addEventListener("click", () => {
    const query = search_box.value.trim();
    if (query) {
        fetchrecipes(query);
    }
});

// Event listener for close button in recipe popup
recipeCloseBtn.addEventListener("click", () => {
    recipeDetailcont.parentElement.style.display = "none";
});