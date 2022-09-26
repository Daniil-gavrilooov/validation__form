let form = document.querySelector('.feedback__form'),
    formInputs = document.querySelectorAll('.feedback__input'),
    inputEmail = document.querySelector('.feedback__input-email'),
    inputPhone = document.querySelector('.feedback__input-phone');

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLocaleLowerCase());
}

function validatePhone(phone) {
    let re = /^[0-9\s]*$/;
    return re.test(String(phone));
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const prePayload = new FormData(form);
    const payload = new URLSearchParams(prePayload);
    let error = 0,
        emailVal = inputEmail.value,
        phoneVal = inputPhone.value,
        emptyInputs = Array.from(formInputs).filter(input => input.value === '');

    formInputs.forEach(function (input) {
        if (input.value === '') {
            input.classList.add('error');

            error++

        } else {
            input.classList.remove('error');
        }
    })


    if (emptyInputs.length !== 0) {
        console.log('inputs not filled');
        error++
        console.log(error)
        return false;
    }

    if (!validateEmail(emailVal)) {
        console.log('email not valid');
        inputEmail.classList.add('error');
        error++
        console.log(error)
        return false;
    } else {
        inputEmail.classList.remove('error');
    }

    if (!validatePhone(phoneVal)) {
        inputPhone.classList.add('error');
        console.log(error)
        return false;
    } else {
        inputPhone.classList.remove('error')
    }




    console.log(error)

        fetch('http://httpbin.org/post', {
        method: 'POST',
        body: payload,

    })
        .then(res => res.json())
        .then(data => console.log(data))
        .then(data => console.log(err));

    if (error === 0) {
        window.open(
            "thanks__page.html", "_blank");
    }




})