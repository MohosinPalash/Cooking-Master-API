
// Search Button Listener
const searchButton = document.getElementById('search_button').addEventListener("click", function () {
    const foodItem = document.getElementById('food_item').value;
    document.getElementById("meal-div").innerHTML = "";
    const ingredientDiv = document.getElementById('ingredient-div');
    ingredientDiv.style.display = "none";
    const mealDiv = document.getElementById('meal-div');
    mealDiv.style.display = "grid";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodItem}`
    const url1 = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${foodItem}`
    fetch(url)
        .then(res => res.json())
        .then(data => getID(data));
});

// Getting IDs of the respective meal items
const getID = data => {
    const noResult = document.getElementById("no-result");
    if (data.meals == null) {
        noResult.style.display = "block";
    } else {
        noResult.style.display = "none";
        data.meals.forEach(meal => {
            const id = meal.idMeal;
            showMeal(`${id}`);
        })
    }
}

// Show meal in the meal div
const showMeal = id => {

    const mealDiv = document.getElementById('meal-div');
    const div = document.createElement('div');
    let mealInfo = "";

    const url1 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url1)
        .then(res => res.json())
        .then(data => {
            mealInfo += `
                <div class="each-meal" onClick="ingredients(${id})">
                    <img src="${data.meals[0].strMealThumb}">
                    <p>${data.meals[0].strMeal}</p> 
                    </div>
                `
            div.innerHTML = mealInfo;
            mealDiv.appendChild(div);
        });
}

// Show ingredients in the ingredient Div
const ingredients= id =>{
    document.getElementById("ingredient-div").innerHTML = "";

    const ingredientDiv = document.getElementById('ingredient-div');
    const div1 = document.createElement('div');
    let ingredientInfo ="";

    const url2 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url2)
        .then(res => res.json())
        .then(data => {
            
            ingredientInfo += `
            <div class="ingredient-meal">
                <img src="${data.meals[0].strMealThumb}">
                <h1 style="text-align: center">${data.meals[0].strMeal}</h1>
                <p style="margin-left: 10px"><strong>Ingredients:</strong></p>
                <ul>
                    <li>${data.meals[0].strIngredient1}</li>
                    <li>${data.meals[0].strIngredient2}</li>
                    <li>${data.meals[0].strIngredient3}</li>
                    <li>${data.meals[0].strIngredient4}</li>
                    <li>${data.meals[0].strIngredient5}</li>
                    <li>${data.meals[0].strIngredient6}</li>
                    <li>${data.meals[0].strIngredient7}</li>
                </ul>
            </div>
            `
            div1.innerHTML = ingredientInfo;
            ingredientDiv.appendChild(div1);
            
        });

    ingredientDiv.style.display = "grid";
    const mealDiv = document.getElementById('meal-div');
    mealDiv.style.display = "none";
}

// THE END
