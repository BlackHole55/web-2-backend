const form = document.querySelector('form');
const popup = document.getElementById('bmiPopup');
const popupContent = document.getElementById('popupContent');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const height = Number(formData.get('height'));
    const weight = Number(formData.get('weight'));

    // Validate
    if (!height || !weight) {
        alert("Height and weight are required.");
    }
    if (isNaN(height) || isNaN(weight)) {
        alert("Height and weight must be numbers.");
    }
    if (height < 50 || height > 300) {
        alert("Height must be between 50 and 250 cm.");
    }
    if (weight < 10 || weight > 500) {
        alert("Weight must be between 10 and 500 kg.");
    }

    try {
        const response = await fetch('http://localhost:3000/calculate-bmi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ height, weight })
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();

        popup.style.display = 'block';
        popupContent.innerText = `Your BMI is: ${data.bmi} (${data.bmiResult})`;
        popup.style.borderTopColor = data.bmiColor
        popup.style.borderLeftColor = data.bmiColor
    } catch (err) {
        console.error("Fetch error:", err);
    }
});

document.getElementById('closePopup').addEventListener('click', ()=>{
  popup.style.display = 'none';
});