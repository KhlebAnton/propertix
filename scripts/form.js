document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.querySelector('.input_phone');

    const iti = window.intlTelInput(phoneInput, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        preferredCountries: ['au', 'us', 'de', 'fr'],
        initialCountry: "au",
        nationalMode: false,
        separateDialCode: false,
        autoInsertDialCode: true,
        customPlaceholder: function () {
            return '';
        }
    });

    setTimeout(() => {
        const countryData = iti.getSelectedCountryData();
        if (countryData && !phoneInput.value) {
            phoneInput.value = `+${countryData.dialCode}`;
        }
    }, 100);

    phoneInput.addEventListener('input', function (e) {
        let value = this.value.replace(/[^\d+]/g, '');

        if (!value.startsWith('+')) {
            const countryData = iti.getSelectedCountryData();
            if (countryData) {
                value = `+${countryData.dialCode}${value.replace(/\D/g, '')}`;
            }
        }
        this.value = value;
    });

    phoneInput.addEventListener('countrychange', function () {
        const countryData = iti.getSelectedCountryData();
        if (countryData) {
            const digits = phoneInput.value.replace(/\D/g, '') || '';
            phoneInput.value = `+${countryData.dialCode}${digits}`;
        }
    });
    phoneInput.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^\d+]/g, '');

        if (!this.value.startsWith('+') && iti.getSelectedCountryData()) {
            const countryCode = '+' + iti.getSelectedCountryData().dialCode;
            this.value = countryCode + this.value.replace(/[^\d]/g, '');
        }
    });

    phoneInput.addEventListener('countrychange', function () {
        const countryCode = '+' + iti.getSelectedCountryData().dialCode;
        if (!phoneInput.value.startsWith('+') ||
            phoneInput.value === '+' + iti.getSelectedCountryData().dialCode) {
            phoneInput.value = countryCode;
        } else {
            const number = phoneInput.value.replace(/^\+?\d+/, '');
            phoneInput.value = countryCode + number;
        }
    });

    const form = document.getElementById('demoForm');
    const errorMsg = document.querySelector('.input_error_msg');

    function validateName(input) {
        const isValid = input.value.trim().length > 0;
        updateInputState(input, isValid);
        return isValid;
    }

    function validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(input.value.trim());
        updateInputState(input, isValid);
        return isValid;
    }

    function validatePhone(input) {
        if (!input.value.startsWith('+')) {
            const countryCode = '+' + iti.getSelectedCountryData().dialCode;
            input.value = countryCode + input.value.replace(/[^\d]/g, '');
        }

        const isValid = input.value.trim() && iti.isValidNumber();
        updateInputState(input, isValid);
        return isValid;
    }

    function updateInputState(input, isValid) {
        const label = input.closest('.label_input');
        label.classList.remove('input_error', 'input_checked');

        if (input.value.trim()) {
            label.classList.add(isValid ? 'input_checked' : 'input_error');
        }
    }

    document.querySelectorAll('.label_input input').forEach(input => {
        input.addEventListener('blur', function () {
            if (this.name === 'name') validateName(this);
            if (this.name === 'email') validateEmail(this);
            if (this.name === 'phone') validatePhone(this);
        });

        input.addEventListener('input', function () {
            const label = this.closest('.label_input');
            label.classList.remove('input_error', 'input_checked');

            if (this.value.trim()) {
                label.classList.add('fill_input');
            } else {
                label.classList.remove('fill_input');
            }
        });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;
        errorMsg.style.display = 'none';

        const nameValid = validateName(form.querySelector('input[name="name"]'));
        const emailValid = validateEmail(form.querySelector('input[name="email"]'));
        const phoneValid = validatePhone(phoneInput);

        if (!nameValid || !emailValid || !phoneValid) {
            errorMsg.textContent = 'Please fill all fields correctly';
            errorMsg.style.display = 'block';
            return;
        }

        const phoneNumber = iti.getNumber();
        const formData = {
            name: form.querySelector('input[name="name"]').value.trim(),
            phone: phoneNumber,
            email: form.querySelector('input[name="email"]').value.trim()
        };

        console.log('Form data:', formData);
        closeModal(formModal)
        openModal(accessModal);
            
        form.reset();
        iti.setNumber("");

        document.querySelectorAll('.label_input').forEach(label => {
            label.classList.remove('input_checked', 'input_error', 'fill_input');
        });
    });




  const formModal = document.querySelector('.modal.modal_form');
    const formModalCloseBtn = formModal.querySelector('.modal_close');
    
    const accessModal = document.querySelector('.modal.modal_form_access');
    const accessModalCloseBtn = accessModal.querySelector('.modal_close');
    
    function openModal(modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    formModalCloseBtn.addEventListener('click', () => closeModal(formModal));
    formModal.addEventListener('click', function(e) {
        if (e.target === formModal) {
            closeModal(formModal);
        }
    });
    
    accessModalCloseBtn.addEventListener('click', () => closeModal(accessModal));
    accessModal.addEventListener('click', function(e) {
        if (e.target === accessModal) {
            closeModal(accessModal);
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (formModal.classList.contains('open')) {
                closeModal(formModal);
            }
            if (accessModal.classList.contains('open')) {
                closeModal(accessModal);
            }
        }
    });
    
    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', ()=>{openModal(formModal)});
    })

});