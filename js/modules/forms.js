function forms() {
    // FORMS
    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        bindPostData(item);
    })

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'We\'ll call you in 30 minutes!',
        failure: 'Something went wrong'
    }

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json' 
            }
        });

        return await res.json();
    }; 
    function bindPostData(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);            

            const formData = new FormData(form);

            // TO JSON
            // const obj = {};
            // formData.forEach((val, key) => {
            //     obj[key] = val
            // })
            // const json = JSON.stringify(obj)

            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', json)
                .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure)
                })
                .finally(() => {
                    form.reset()
                })
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>X</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000)
    }
}

export default forms;