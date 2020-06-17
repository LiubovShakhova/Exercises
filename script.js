'use strict';
const book1 = document.getElementsByClassName('book')[1],
    book2 = document.getElementsByClassName('book')[0],
    book3 = document.getElementsByClassName('book')[4],
    book4 = document.getElementsByClassName('book')[3],
    book5 = document.getElementsByClassName('book')[5],
    book6 = document.getElementsByClassName('book')[2],
    link = document.getElementsByTagName('a')[4],
    adv = document.querySelector('.adv'),
    list = document.querySelectorAll('li'),
    page8 = document.createElement('li');
    //console.log(list);
//Восстановить порядок книг.
book2.insertAdjacentElement('beforebegin', book1);
book2.insertAdjacentElement('afterend', book3);
book4.insertAdjacentElement('afterend', book5);
book5.insertAdjacentElement('afterend', book6);

//Заменить картинку заднего фона на другую из папки image
document.body.style.backgroundImage = 'url(image/adv.jpg)';
//Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
link.textContent = 'Книга 3. this и Прототипы Объектов';
//Удалить рекламу со страницы
adv.remove();
//Восстановить порядок глав во второй и пятой книге 
list[9].insertAdjacentElement('afterend', list[2]);
list[3].insertAdjacentElement('afterend', list[6]);
list[6].insertAdjacentElement('afterend', list[8]);
list[47].insertAdjacentElement('afterend', list[55]);
list[50].insertAdjacentElement('afterend', list[48]);
list[53].insertAdjacentElement('afterend', list[51]);
list[51].insertAdjacentElement('afterend', list[54]);
//в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
page8.textContent = 'Глава 8: За пределами ES6';
list[25].insertAdjacentElement('afterend', page8);