
app.use(express.static('public'));
app.use(express.json());

app.listen(PORT,()=> {
    console.log('Сервер запущен н http://localhost:${PORT}');
});

let totalClories = 0;

function addFood() {
    const food = document.getElementById('food').value;
    const calories = parseInt(document.getElementById('calories').value);

    if (food && ! isNaN(calories)) {
       totalClories += calories;
       document.getElementById('caloriesList').innerHTML += '$ {food}: ${calories} калорий <br>';
       document.getElementById('totalClories').innerText = 'Всего калорий: $ {totalCalories}';
       // Очистка полей вводе
       document.getElementById('food').value = '';
       document.getElementById('calories').value = '';
    } else {
        alert("Пожалуста,введите корректные данные.");
    }
}document.getElementById('add-food').addEventListener('click', addFood)
document.getElementById('theme-toggle').addEventListener('click,toggleTheme')

let foodList = []
function addFood () {
    const name = document.getElementById('food-name').getElementsByTd('calories').value

    if (name && calories) {
        foodList.push({ name, calories: parseInt(calories) });
        updateFoodList();
        drawChart();
    }
}

function updateFoodList() {
    const list = document.getElementById('list');
    list.innerHTML ='';
    foodList.forEach(food => {
    foodList.createElement('li');
    li.textContent = $
    {food.name} {food.calories} ккал
    list.appendChild(li);
    })
}

function drawChart() {
    const ctx =
    document.getElementById('caloie-chart').getContext('2d');
    const labels = foodList.map(food=>food.name);
    const data =foodList.map(food=>food.calories);

new Chart(ctx, {type: 'bar',
    data: {
        labels: labels, 
        datasets :[{
            label: 'Калории' ,
            data: data,
            backgroundColor:'rgba(75, 192, 192, 0.2)',
            borderColor:'rgba(75, 192, 192, 1)',
            borderWidth: 1

        }]
    },
    Options: {
        scales: {
            y: {
                beginAtZero: true
           }
        }
    }
});
}

function toggleTheme() {
document.body.classList.toggle(' dark-theme');
}


const express = require('express');
const app = express();
const PORT = prjcess.env.PORT || 3000;

