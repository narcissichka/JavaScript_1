// Глобальные переменные:                            
var FIELD_SIZE_X = 20;//строки
var FIELD_SIZE_Y = 20;//столбцы
var snake = []; // Сама змейка
var direction = 'y+'; // Направление движения змейки
var gameIsRunning = false; // Запущена ли игра
var snake_timer, bomb_timer; // Таймер змейки
var food_timer; // Таймер для еды
var doCount = scoreCount();

function init() {
    prepareGameField(); // Генерация поля

    var wrap = document.querySelector('.wrap');
    wrap.style.width = '450px';
    // События кнопок Старт и Новая игра
    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

    // Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection);
}

/**
 * Функция генерации игрового поля
 */
function prepareGameField() {
    // Создаём таблицу
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');

    // Генерация ячеек игровой таблицы
    for (var i = 0; i < FIELD_SIZE_X; i++) {
        // Создание строки
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.appendChild(cell); // Добавление ячейки
        }
        game_table.appendChild(row); // Добавление строки
    }

    document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
}
function startInterval() {

    let m = move();
    let f = createNewClass('food-unit', 'bomb-unit');
    let b = createNewClass('bomb-unit', 'food-unit');
    snake_timer = setInterval(m, SNAKE_SPEED);//каждые 200мс запускаем функцию move
    food_timer = setInterval(f, FOOD_SPEED);
    bomb_timer = setInterval(b, BOMB_SPEED);
}
/**
 * Старт игры
 */
function startGame() {
    let SNAKE_SPEED = 170; // Интервал между перемещениями змейки
    let BOMB_SPEED = 5000;
    let FOOD_SPEED = 5000;
    gameIsRunning = true;
    respawn();//создали змейку
    // startInterval();
    snake_timer = setInterval(move, SNAKE_SPEED);
    food_timer = setInterval(() => { createNewClass('food-unit', 'bomb-unit') }, FOOD_SPEED);
    bomb_timer = setInterval(() => { createNewClass('bomb-unit', 'food-unit') }, BOMB_SPEED);
}

/**
 * Функция расположения змейки на игровом поле
 */
function respawn() {
    // Змейка - массив td
    // Стартовая длина змейки = 2
    // Respawn змейки из центра
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);
    // Хвост змейки
    var snake_tail = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_tail.classList.add('snake-unit')
    // Голова змейки
    var snake_head = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0];
    snake_head.classList.add('snake-unit')
    snake.push(snake_tail);
    snake.push(snake_head);
}

/**
 * Движение змейки
 */
function move() {
    // Сборка классов
    var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');

    // Сдвиг головы
    var new_unit;
    var snake_coords = snake_head_classes[1].split('-');//преобразовали строку в массив
    var coord_y = parseInt(snake_coords[1]);
    var coord_x = parseInt(snake_coords[2]);

    if (coord_y == 0 && direction == 'y+') {
        new_unit = document.getElementsByClassName('cell-' + (FIELD_SIZE_Y - 1) + '-' + (coord_x))[0];
    } else if (coord_y == FIELD_SIZE_Y - 1 && direction == 'y-') {
        new_unit = document.getElementsByClassName('cell-' + (0) + '-' + (coord_x))[0];
    } else if (coord_x == 0 && direction == 'x-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (FIELD_SIZE_X - 1))[0];
    } else if (coord_x == FIELD_SIZE_X - 1 && direction == 'x+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (0))[0];
    } else {
        // Определяем новую точку
        if (direction == 'x-') {
            new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
        } else if (direction == 'x+') {
            new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
        } else if (direction == 'y+') {
            new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
        } else if (direction == 'y-') {
            new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
        }
    }

    if (!isSnakeUnit(new_unit) && !haveClass(new_unit, 'bomb-unit')) {
        // Добавление новой части змейки
        new_unit.classList.add('snake-unit');
        snake.push(new_unit);
        // Проверяем, надо ли убрать хвост
        if (!haveClass(new_unit, 'food-unit')) {
            // Находим хвост
            var removed = snake.splice(0, 1)[0];
            removed.classList.remove('snake-unit');
            removed.classList.remove('food-unit');
        } else {
            document.getElementById('score').textContent = 'Счет: ' + doCount();
        }
    }
    else {
        finishTheGame();
    }
}
function scoreCount() {
    let score = 0;
    return function () {
        return ++score;
    }
}
/**
 * Проверка на змейку
 * @param unit
 * @returns {boolean}
 */
function isSnakeUnit(unit) {
    var check = false;

    if (snake.includes(unit)) {
        check = true;
    }
    return check;
}
/**
 * проверка на еду
 * @param unit
 * @returns {boolean}
 */

function haveClass(unit, classN) {
    var check = false;
    var unit_classes = unit.getAttribute('class').split(' ');
    if (unit_classes.includes(classN)) {
        check = true;
    }
    return check;
}
function createNewClass(classN, anotherClassN) {
    let isCreated = false;
    while (!isCreated) { //пока не создали
        // рандом
        let _x = Math.floor(Math.random() * FIELD_SIZE_X);
        let _y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var _cell = document.getElementsByClassName('cell-' + _y + '-' + _x)[0];
        let _cell_classes = _cell.getAttribute('class').split(' ');

        // проверка на змейку
        if (!_cell_classes.includes('snake-unit') && !_cell_classes.includes(anotherClassN) && !_cell_classes.includes(classN)) {
            _cell.classList.add(classN);
            isCreated = true;
        }
    }
    if (classN == 'bomb-unit') {
        setTimeout(() => { _cell.classList.remove('bomb-unit'); }, 15000);
    }
}
/**
 * Изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e) {
    console.log(e);
    switch (e.keyCode) {
        case 37: // Клавиша влево
            if (direction != 'x+') {
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
    }
}

/**
 * Функция завершения игры
 */
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    clearInterval(bomb_timer);
    clearInterval(food_timer);
    alert('Вы проиграли! Ваш результат: ' + (doCount() - 1));
}

/**
 * Новая игра
 */
function refreshGame() {
    location.reload();
}

// Инициализация
window.onload = init;