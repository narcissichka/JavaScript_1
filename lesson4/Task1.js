console.log(intToObject());
function intToObject() {
    str = prompt('Введите число от 0 до 999 (концы промежутка включительно). Чтобы выйти введите -1')
    let object = {};
    while (1) {
        if (exit(str)) {
            return 'Вы вышли из функции';
        }
        else if (isNaN(str)) {
            console.log('Вы ввели не число');
            str = prompt('Ошибка ввода.\nВведите число от 0 до 999 (концы промежутка включительно). Чтобы выйти введите -1')
        }
        else if (!checkInt(str)) {
            console.log('Неподходящее число');
            return object;
        }
        else if (checkInt(str)) {
            return fillObject(str, object);
        }
        else {
            str = prompt('Ошибка ввода.\nВведите число от 0 до 999 (концы промежутка включительно). Чтобы выйти введите -1')
        }
    }
}
function checkInt(str) {
    return (parseInt(str) >= 0 && parseInt(str) <= 999);
}
function exit(str) {
    return parseInt(str) == -1;
}
function fillObject(str, object) {
    if (str.length == 3) {
        object.hundreds = parseInt(str[0]);
        object.tens = parseInt(str[1]);
        object.units = parseInt(str[2]);
    }
    else if (str.length == 2) {
        object.tens = parseInt(str[0]);
        object.units = parseInt(str[1]);
    }
    else {
        object.units = parseInt(str[0]);
    }
    return object;
}