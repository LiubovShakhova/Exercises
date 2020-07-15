document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const sendRequest = () => {
        return new Promise( (resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', './cars.json');
            request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                resolve(request.responseText); 
                console.log(request.responseText)
            } else {
                reject(request.statusText);
            }
            });
            request.setRequestHeader('Content-Type', 'application/json');
            request.send();
        });
    };
        

    select.addEventListener('change', () => {
        sendRequest()
            .then(response => {
                console.log(response)
                const data = JSON.parse(response);
                
                data.cars.forEach(item => {
                    if (item.brand === select.value) {
                        const {brand, model, price} = item;
                        output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
                    }
                });
            })
            .catch(error => {
                output.innerHTML = 'Произошла ошибка';
            });
        
    });


});