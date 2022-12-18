document.addEventListener('DOMContentLoaded', function(){
    let openTestButton = document.querySelector('.main__button-start');
    let closeTestButton = document.querySelector('.popup-test__close-button');
    let test = document.querySelector('.popup-test');
    let form = document.forms[0];
    let nextButton = document.querySelector('.popup-test__next-button');
    let testItems = document.querySelectorAll('.popup-test__text-item')
    let questionTitle = document.querySelector('.popup-test__title');
    let questionNumber = document.querySelector('.popup-test__question-number');
    let questionAnswears = document.querySelector('.popup-test__answears');
    
    let q1 = new Question('radio', 'Який з варіантів відповідей належить до mobile first?', ['max-width', 'min-width'], 1);
    let q2 = new Question('radio', 'Скільки аргументів приймає функцій minmax?', ['1', '2', '3', 'немає такої функції'], 1);
    let q3 = new Question('radio', 'Як скоротити запис grid-template-columns: 100px 100px 100px; ?', ['grid-columns: 100px * 3', 'grid-template-columns: rep(100px, 3)', 'grid-template-columns: repeate(3, 100px)'], 2);
    let q4 = new Question('radio', 'Чи може grid-елемент бути grid-контейнером?', ['Так', 'Ні', 'Може, якщо тільки до нього застосувати технологію Flex'], 0);
    let q5 = new Question('radio', 'Як можна скоротити цей запис grid-column-gap: 10px; grid-row-gap: 10px;?', ['grid-column-row: 10px;', 'grid-gap: 10px;', 'column-row: 10px;'], 1);
    let q6 = new Question('checkbox', 'Вкажіть причини появи адаптивної верстки', ['Перегляд сайтів із фіксованою версткою на планшеті став незручним.', 'Мобільні сайти були оптимізовані під екрани великих розмірів.', 'Мобільний Інтернет був дешевий та швидкий', 'Мобільні телефони були потужними.'], [0, 1]);
    let q7 = new Question('checkbox', 'Вкажіть основні особливості адаптивного дизайну', ['застосування гнучкого макету на основі сітки', 'використання гнучких зображень', 'робота з медіа-запитами', 'плавна перебудова блоків у разі зміни розмірів екрану'], [0, 1, 2, 3]);
    let q8 = new Question('select', 'Вкажіть правила CSS, які дозволяють керувати стилями елементів, залежно від значень технічних параметрів пристроїв.', ['гумова верстка', 'брейкпоїнт', 'медіа-запит', 'модуль flexbox', 'модуль grid'], 2)
    let q9 = new Question('radio', 'Якщо до грід елементу застосувати z-index. Чи це працюватиме?', ['Так','Ні', 'Ні. У грідах є спеціальні для цієї властивості'], 0);
    let q10 = new Question('select', 'Чи можна використовувати технологію Flex та Grid в одному проекті?', ['Ні', 'Так', 'Ні. Це може поламати верстку'], 1)

    let questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
    let questionCount = -1;
    let testInfo = ``;
    let rating = 0;
    


    openTestButton.addEventListener('click', function(event){
        event.preventDefault();
        test.classList.add('open-test');
        ///////////////////////////////////////////////////
        nextButton.removeEventListener('click', closeTest);
        ////////////////////////////////////////////////////
    });
    closeTestButton.addEventListener('click', closeTest);

    nextButton.addEventListener('click', function(event){{
        event.preventDefault();
      
        if(questionCount < 0){
            recordName();
            resetAll();
            questionCount++;
            loadquestion(questionCount);
            return;
        }
        if(questionCount >= 0 && questionCount < questions.length){
            if(questionCount < questions.length-2){
                recordAnswear(questions[questionCount]);
                resetAll();
                questionCount++;
                loadquestion(questionCount);
            }else if(questionCount == questions.length-2){
                recordAnswear(questions[questionCount]);
                resetAll();
                questionCount++;
                loadquestion(questionCount);
                nextButton.innerHTML = `Завершити тест`;
            }
            else if (questionCount == questions.length-1){
            
                recordAnswear(questions[questions.length-1]);
                testInfo += `</br></br>Оцінка: ${rating} / 14`;
        
                
                resetAll();
                questionCount++;
                showResult();
                nextButton.innerHTML = `Закрити`;
                
                
                
            }
            
            
            
        }
        
        
            
        
        
    }});

    function resetAll(){
        questionAnswears.innerHTML = '';
        testItems.forEach((i)=>{
            i.style.display = 'none';
        });
        questionNumber.innerHTML = '';
        questionTitle.innerHTML = '';
        nextButton.removeAttribute('type');

    }
    function loadquestion(questionCount){
        questionTitle.innerHTML = questions[questionCount].question;
        questionNumber.style.display = 'block';
        questionAnswears.style.display = 'flex'
        questionNumber.innerHTML = `Завдання №${questionCount+1}`;
        nextButton.innerHTML = `Далі`;
        generateAnswears(questions[questionCount].type, questions[questionCount].answears);

    }
    function closeTest(event){
        event.preventDefault();
        test.classList.remove('open-test');
        testItems.forEach((i)=>{
            i.style.display = 'block';
        });
        questionTitle.innerHTML = "Заповніть всі поля";
        questionNumber.style.display = 'block';
        questionNumber.style.display = 'none';
        questionAnswears.style.display = 'none'
        questionCount = -1;
        rating = 0;
        testInfo = ``;
        nextButton.innerHTML = `Далі`;
        form.reset();
        nextButton.removeEventListener('click', closeTest);
    }

    function showResult(){
        questionTitle.innerHTML = testInfo;
        nextButton.addEventListener('click', closeTest);
    }
    function generateAnswears(type, answears){
        let htmlAnswears = ``;
        if(type == 'radio'){
            answears.forEach((answear, index)=>{
                
                htmlAnswears += `
                <div class="popup-test__answear-item">
                        <input type="radio" name="answear" id="answear__item${index}" class="popup-test__answear popup-test__radio-answear">
                        <label for="answear__item${index}"  class="popup-test__answear-label popup-test__radio-label">${answear}</label>
                    </div>`
                
                
            });
        }
        else if (type == 'checkbox'){
            answears.forEach((answear, index)=>{
                
                htmlAnswears += `
                <div class="popup-test__answear-item">
                        <input type="checkbox" name="answear" id="answear__item${index}" class="popup-test__answear popup-test__checkbox-answear">
                        <label for="answear__item${index}" class="popup-test__answear-label popup-test__checkbox-label">${answear}</label>
                    </div>`
            });
        }
        else if (type == 'select'){
            htmlAnswears += `
            <select name="selectquestion" id="" class="select">`;
            answears.forEach((answear, index)=>{
                htmlAnswears += `
                <option class="popup-test__answear" value="${index}" >${answear}</option>`;
            });
            htmlAnswears += `</select>`;
            
        }
        questionAnswears.insertAdjacentHTML("beforeend", htmlAnswears);
        
    }
    function recordName(event){
        testInfo += `ПІБ: ${form.name.value}</br>\nГрупа: ${form.group.value}</br>\n`;
        
        console.log(testInfo);
    }
    function recordAnswear(question){
        let inputAnswears = document.querySelectorAll('.popup-test__answear');
        let labels = document.querySelectorAll('.popup-test__answear-label');
        let select = document.querySelector('.select');
        let wasAnswear = false;

        if(question.type == 'radio'){
            inputAnswears.forEach((input, index)=>{
                if(input.checked){
                    wasAnswear = true;
                    let currentAnswear = labels[index].innerHTML;
                    testInfo += `Завдання №${questionCount+1}: ваша відповідь ${currentAnswear}`;
                    if(index == question.trueAnswearIndex){
                        testInfo += ` правильна відповідь ${question.answears[ question.trueAnswearIndex]} Зараховано 1 / 1</br>\n`;
                        rating++;
                        return;
                    }
                    else{
                        testInfo += ` правильна відповідь ${question.answears[question.trueAnswearIndex]} Не зараховано 0 / 1</br>\n`;
                        return;
                    }
                }
                

                
            });
            if(!wasAnswear){
                testInfo += `Завдання №${questionCount+1}: ви не відповіли Не зараховано</br>\n`;
            }
            console.log(testInfo);
            
           
        }
        else if(question.type == 'checkbox'){
            let arrayAnswears = [];
            let arrayIndex = [];
            let answearsStr = ``;
            let trueAnswearsStr = ``;
            testInfo += `Завдання №${questionCount+1}`;
            testInfo += `: ваша відповідь </br>\n`;
            let mark = 0;
            inputAnswears.forEach((input, index)=>{

                if(input.checked){
                    let currentAnswear = labels[index].innerHTML;
                    arrayAnswears.push(currentAnswear);
                    arrayIndex.push(index);
                }

            });
            arrayAnswears.forEach((item)=>{
                answearsStr += `&nbsp;&nbsp;&nbsp;&nbsp;\t${item}</br>\n`;
            });
            testInfo += answearsStr;
            testInfo += `Правильні відповіді:</br>\n`
            question.trueAnswearIndex.forEach((item)=>{
                trueAnswearsStr +=`&nbsp;&nbsp;&nbsp;&nbsp;\t${question.answears[item]}</br>\n`;
            });
            testInfo += trueAnswearsStr;
            for(let i = 0; i<arrayIndex.length; i++){
                for(let j = 0; j<question.trueAnswearIndex.length; j++){
                    if(arrayIndex[i] == question.trueAnswearIndex[j]){
                        mark++;
                    }
                }
                
            }
            
            if(arrayIndex.length > question.trueAnswearIndex.length){
                mark--;
            }

            if(mark > 0){
                testInfo += `Зараховано ${mark} / ${question.trueAnswearIndex.length}</br>\n`;
                
            }else{
                testInfo += `Не зараховано ${mark} / ${question.trueAnswearIndex.length}</br>\n`;
            
            }
            rating += mark;
            
            console.log(testInfo);
            
       
        }
        else if(question.type == 'select'){
            
            let index = select.value;
            testInfo += `Завдання № ${questionCount+1}: Ваша відповідь ${question.answears[index]} `
            testInfo += `Правильна відповідь: ${question.answears[question.trueAnswearIndex]} `;
            if(index == question.trueAnswearIndex){
                testInfo += `Зараховано 1 / 1 </br>\n`;
                rating++;
            }else{
                testInfo += `Не зараховано 0 / 1 </br>\n`;
            }
            console.log(testInfo);
            
        }
        
        
        
    }

});



class Question{
    constructor(type, question, answears, trueAnswearIndex){
        this.question = question;
        this.type = type;
        this.answears = answears;
        this.trueAnswearIndex = trueAnswearIndex;
    }
}

