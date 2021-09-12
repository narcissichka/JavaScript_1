//После игры необходимо спросить номер вопроса. 
//По номеру вопроса нужно вывести текст вопроса и текст выбранного ответа

function Works(question, varNumber, var1, var2) {
    this.question = question;
    this.varNumber = varNumber;
    this.var1 = var1;
    this.var2 = var2;
}
var work1 = new Works('Вы живёте в тихой и уютной деревеньке на окрайне страны.\n' +
    'Здесь есть практчески всё: речка, лес, горы, озеро, луга и поля, есть даже школа в соседнем селе.\n' +
    'Сейчас начало лета, воскресенье, раннее утро, Вы просыпаетесь и собираетесь ...\n', 2, '1 - Поспать до обеда\n', '2 - Пойти прогуляться\n');
var work2 = new Works('Вы решили поспать до обеда.\n' +
    'После того как Вы проснулись первое, что вы ощутили, это приятный запах, который шёл с кухни.\n' +
    'После Вы замечаете, какая за окном прекрасная погода, и Вы думаете ...\n', 2, '1 - Пойти прогуляться\n', '2 - Пойти пообедать\n');
var work3 = new Works('Вы решили пойти прогуляться.\n' +
    'Вы выходите из своего дома и видите прекрасный рассвет, блики солнца так и играют на озёрной глади.\n' +
    'Вы решаете дойти до озера, полюбоваться его красотойю\n' +
    'С одной стороны тропинки Вы видите пшеничное поле, за которым веднеется лес.\n' +
    'С другой стороны течёт речка, а в далеке виднеются горы.\n' +
    'Вы наслаждаетесь пейзажами и не замечаете как летит время.\n' +
    'Домой Вы приходите только к обеду, но до обеда ещё есть время и Вы решаете ...\n', 2, '1 - Подождать обед в столовой\n', '2 - Поколоть дров перед обедом\n');
var work4 = new Works('Здесь пишем текст повествования.\n' +
    'Потом пишем несколько действий, например, два\n', 2, '1 - 1-й ответ\n', '2 - 2-й ответ\n');


var events, ok, answers = [], questNumber, quests = [];

switch (getAnswer(work1)) {
    case 1:
        quests.push(work1);
        quests.push(work2);
        switch (getAnswer(work2)) {
            case 1:
            case 2:
                quests.push(work4);
                getAnswer(work4)
                break;
            case -1:
                break;
            default:
                alert('Ошибка');
        }
        break;
    case 2:
        quests.push(work1);
        quests.push(work3);
        switch (getAnswer(work3)) {
            case 1:
            case 2:
                quests.push(work4);
                getAnswer(work4)
                break;
            case -1:
                break;
            default:
                alert('Ошибка');
        }
        break;
    case -1:
        break;
    default:
        alert('Ошибка');
}
alert('Спасибо за игру');

questNumber = +prompt('Введите номер вопроса (1-3), ответ на который хотели бы посмотреть. Чтобы выйти напишите -1');
displayAnswer(quests, answers, questNumber);

function displayAnswer(quest, answer, questNum) {
    while (1) {
        if (questNum == -1)
            break;
        else if (isCorrectQuest(questNum, quest)) {
            switch (answer[questNum - 1]) {
                case 1:
                    alert(quest[questNum - 1].question + quest[questNum - 1].var1);
                    break;
                case 2:
                    alert(quest[questNum - 1].question + quest[questNum - 1].var2);
                    break;
                default:
                    alert('Ошибка');
            }
            break;
        }
        else {
            questNum = +prompt('Ошибка ввода.\nВведите номер вопроса (1-3), ответ на который хотели бы посмотреть. Чтобы выйти напишите -1');
        }
    }
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

function getAnswer(work) {
    do {
        ok = false;
        events = +prompt(work.question + work.var1 + work.var2 + '-1 - Выход из игры');

        if (events == -1) {
            break;
        }
        else {
            ok = isAnswer(work.varNumber, events);
        }
    } while (!ok);
    answers.push(events);
    return events;
}

function isCorrectQuest(questNum, quest) {
    return (questNum >= 1 && questNum <= quest.length);
}