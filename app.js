
const searchButton = document.getElementById('search_button').addEventListener("click", function () {
    const foodItem = document.getElementById('food_item').value;
    document.getElementById("meal-div").innerHTML = "";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodItem}`
    const url1 = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${foodItem}`
    fetch(url)
        .then(res => res.json())
        .then(data => getID(data));
});

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

const showMeal = id => {

    const mealDiv = document.getElementById('meal-div');
    const ingredientDiv = document.getElementById('ingredient-div');
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

const ingredients = id =>{
    const noResult = document.getElementById("no-result");
    noResult.style.display = "block";
}


