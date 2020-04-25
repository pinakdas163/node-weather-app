const buttonEvent = document.querySelector('.button');
const inputField = document.querySelector('.input');
const result = document.querySelector('#result');
const errorDiv = document.querySelector('#error');

buttonEvent.addEventListener('click', (e) => {
    e.preventDefault();
    
    const value = inputField.value;
    if (value) {
        fetch(`/weather?address=${value}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw Error(data.error);
            }
            
            let msg = `The current weather of ${data.name} is ${data.description}.<br/>` +
            `Temperature is ${data.current_temp} degree.<br/>` +
            `Feels like ${data.feels_like} degree.<br/>` +
            `Humidity is ${data.humidity}%.`;
            result.style.display = 'block';
            result.innerHTML = msg;
            error.style.display = 'none';
        })
        .catch(error => {
            result.style.display = 'none';
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = error;
        })
    }
});