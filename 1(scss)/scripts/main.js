import { isValidEmail } from "./helpers.js";

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

    // Validate required fields and email format.
    if (!areAllFieldsFilled(formData)) {
        updateResponseMessage(responseMessage, "All fields are required.");
        return;
    }
    if (!isValidEmail(formData.email)) {
        updateResponseMessage(responseMessage, "Please enter a valid email address.");
        return;
    }

    // Provide user feedback on successful submission.
    updateResponseMessage(responseMessage, "Your message has been sent. Thank you!", 'success');
    form.reset();
};

// Checks if all form fields are filled.
const areAllFieldsFilled = formData => Object.values(formData).every(value => value.trim() !== '');

// Updates the text and color of the response message element.
const updateResponseMessage = (element, message, status) => {
    element.innerText = message;
    element.style.color = status === 'success' ? '#066A46' : '#991B1B';
    element.style.backgroundColor = status === 'success' ? '#A7F3D0' : '#FECACA';
};

// Clears the previous response message.
const clearResponseMessage = element => {
    element.innerText = '';
    element.style.color = '';
};
