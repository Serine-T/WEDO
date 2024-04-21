export const isValidEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

document.getElementById('feedback-form').addEventListener('submit', event => handleSubmit(event));

const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const formData = {
        name: form.querySelector('[name="name"]').value,
        email: form.querySelector('[name="email"]').value,
        subject: form.querySelector('[name="subject"]').value,
        message: form.querySelector('[name="message"]').value
    };
    const responseMessage = document.getElementById('response-message');
    clearResponseMessage(responseMessage);

    if (!areAllFieldsFilled(formData)) {
        updateResponseMessage(responseMessage, "All fields are required.");
        return;
    }
    if (!isValidEmail(formData.email)) {
        updateResponseMessage(responseMessage, "Please enter a valid email address.");
        return;
    }

    updateResponseMessage(responseMessage, "Your message has been sent. Thank you!", 'success');
    form.reset();
};

function updateResponseMessage(element, message, status) {
    element.textContent = message;
    const color = status === 'success' ? 'green' : 'red';
    element.classList.remove('bg-green-200', 'text-green-800', 'bg-red-200', 'text-red-800');
    element.classList.add(`bg-${color}-200`, `text-${color}-800`);
}

const areAllFieldsFilled = formData => Object.values(formData).every(value => value.trim() !== '');

const clearResponseMessage = element => {
    element.innerText = '';
};
