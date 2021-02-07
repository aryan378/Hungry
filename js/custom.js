// Calling display style
'use strict';
const container_info = document.getElementById('food');
const search = document.getElementById('search');
const warningFoods = document.getElementById('warning');

search.addEventListener('click', function () {
    const validateKeyword = document.getElementById('keyword').value;
    container_info.innerHTML = '';
    if (validateKeyword === '') {
        warningFoods.style.display = 'block';
    } else {
        getFood(validateKeyword);
        warningFoods.style.display = 'none';
    }
});

// Calling API in theme Meal DB 
const displayDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderFoodInfo(data.meals[0]);
            console.log(data.meals[0]);
        });
}

// Food details calling here
const renderFoodInfo = food => {
    const foodDetails = document.getElementById('foodsDetails');

    foodDetails.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
    <h4>${food.strMeal}</h4>
    
    <h5 class="pt-3 pb-2"><i class="icon-fire icons"></i> Ingredients</h5>
    <ul class="list-unstyled mb-0">
        <li><i class="icon-check icons"></i>${food.strMeasure1}, ${food.strIngredient1}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure2}, ${food.strIngredient2}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure3}, ${food.strIngredient3}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure4}, ${food.strIngredient4}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure5}, ${food.strIngredient5}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure6}, ${food.strIngredient6}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure7}, ${food.strIngredient7}</li>
    </ul>

`;
}

// Calling API Foods items
function getFood(mealsName) {
    const mainApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealsName}`;

    fetch(mainApi)
        .then(response => response.json())
        .then(data => {
            displayFoodItems(data.meals);
        });

    const displayFoodItems = foods => {
        const foodItemsDiv = document.getElementById('food');
        if (foods != null) {
            foods.map(food => {
                const foodContainer = document.createElement('div');
                foodContainer.className = 'col-md-3';
                const foodInfo = `
                        <div onclick="displayDetails('${food.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="">
                        <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                        </div>
                    `;
                    foodContainer.innerHTML = foodInfo;
                foodItemsDiv.appendChild(foodContainer);
            });
        } else {
            warningFoods.style.display = 'block';
        }
    }
}
