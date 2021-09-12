function Millionaire(question, answer1, answer2, answer3, answer4, ansNum, correctAns) {
    this.question = question;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4;
    this.ansNum = ansNum;
    this.correctAns = correctAns;
}
var question1 = new Millionaire('Какое растение существует на самом деле?\n', '1. - Лох чилийский\n', '2. - Лох индийский\n', '3. - Лох греческий\n', '4. - Лох Русский\n', 4, 2),
    question2 = new Millionaire('Какой город объявлен официальной родиной русского Деда Мороза?\n', '1. - Малая Вишера\n', '2. - Великий Устюг\n', '3. - Вышний Волочек\n', '4. - Нижний Новгород\n', 4, 2),
    question3 = new Millionaire('Что помогает запомнить мнемоническое правило «Это я знаю и помню прекрасно»?\n', '1. - Число Пи\n', '2. - Ряд активности металлов\n', '3. - Цвета радуги\n', '4. - Порядок падежей\n', 4, 1),
    question4 = new Millionaire('Какую площадь имеет клетка стандартной школьной тетради?\n', '1. - 0.25 кв.см\n', '2. -  1 кв.см\n', '3. -  0.5 кв.см\n', '4. -  1.25 кв.см\n', 4, 1),
    question5 = new Millionaire('Как назывались старинные русские пушки-гаубицы?\n', '1. - Кентавр\n', '2. -Грифон\n', '3. - Василиск\n', '4. - Единорог\n', 4, 4);
var questions = [question1, question2, question3, question4, question5];

gameMillionaire();
function gameMillionaire() {
    var events, playerAnswer, mistakes = 0, score = 0, ok, playerMistakes = [], mistakeArray = [];
    alert('Добро пожаловать в интеллектуальную игру "Кто хочет стать миллионером?"\nУ Вас есть только одна возможность ошибиться. За правильный ответ на первый вопрос вы получите 50000, на второй 100000, на третий 150000, на четвертый 200000, на пятый вопрос 500000.\nОтвечать нужно написав номер ответа цифрой.');

    for (var quest of questions) {
        playerAnswer = getAnswer(quest, events);
        if (playerAnswer == -1)
            break;
        else if (playerAnswer == quest.correctAns) {
            score = countScore(quest, score);
            alert('Это правильный ответ! Ваша сумма: ' + score);
        }
        else {
            mistakes++;
            mistakeArray.push(quest);
            playerMistakes.push(playerAnswer);
            alert('Это неправильный ответ! У вас больше нет права на ошибку');
            if (mistakes == 2) {
                alert('Вы проиграли со счетом: ' + score);
                break;
            }
        }
    }

    if (mistakes > 0) {
        do {
            playerAnswer = +prompt('Хотите узнать правильные ответы на те вопросы, в которых допустили ошибку?\n1. - Да\n2. - Нет, закончить игру');
            ok = isAnswer(2, playerAnswer);
        } while (!ok)

        if (playerAnswer == 2) return 0;
        else {
            if (mistakes == 1) {
                alert('Ошибку Вы допустили в вопросе:\n' + mistakeArray[0].question + '\nПравильный ответ: ' + findAnswerByNumber(mistakeArray[0], mistakeArray[0].correctAns)
                    + 'Ваш ответ: ' + findAnswerByNumber(mistakeArray[0], playerMistakes[0]));
                alert('Но все мы можем ошибиться, поздравляем с победой. Вы можете забрать ' + score + ' рублей');
            }
            else {
                alert('Первую ошибку Вы допустили в вопросе:\n' + mistakeArray[0].question + '\nПравильный ответ: ' + findAnswerByNumber(mistakeArray[0], mistakeArray[0].correctAns)
                    + 'Ваш ответ: ' + findAnswerByNumber(mistakeArray[0], playerMistakes[0]));
                alert('Вторую ошибку Вы допустили в вопросе:\n' + mistakeArray[1].question + '\nПравильный ответ: ' + findAnswerByNumber(mistakeArray[1], mistakeArray[1].correctAns)
                    + 'Ваш ответ: ' + findAnswerByNumber(mistakeArray[1], playerMistakes[1]));
                alert('Спасибо за игру!');
            }
            return 0;
        }
    }
    else {
        alert('Вы не допустили ни одной ошибки, отличный результат. Поздравляем с победой! Вы можете забрать свой ' + score);
        return 0;
    }
}

function findAnswerByNumber(object, number) {
    if (object.answer1[0] == number) return object.answer1;
    else if (object.answer2[0] == number) return object.answer2;
    else if (object.answer3[0] == number) return object.answer3;
    else if (object.answer4[0] == number) return object.answer4;
}

function countScore(object, score) {
    if (object == question1) score += 50000;
    else if (object == question2) score += 100000;
    else if (object == question3) score += 150000;
    else if (object == question4) score += 200000;
    else if (object == question5) score += 500000;
    return score;
}

function isAnswer(q, event) {
    if (isNaN(event) || !isFinite(event)) {
        alert('Вы ввели недопустимый символ');
        return false;
    }
    else if (event < 1 || event > q) {
        alert('Ваше число выходит из допустимого диапозона');
        return false;
    }
    return true;
}

function getAnswer(object, events) {
    var ok = false;
    do {
        ok = false;
        events = +prompt(object.question + object.answer1 + object.answer2 + object.answer3 + object.answer4 + '\n-1 - Выход из игры');

        if (events == -1) {
            break;
        }
        else {
            ok = isAnswer(object.ansNum, events);
        }
    } while (!ok);
    return events;
}