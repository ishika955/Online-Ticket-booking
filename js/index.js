
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const form = this;
        const button = document.getElementById('search-button');
        
        button.classList.add('loading');
        const actionUrl = form.getAttribute('action');
        const formData = new FormData(form);
        const searchParams = new URLSearchParams(formData);
        const finalUrl = actionUrl + '?' + searchParams.toString();
  
        setTimeout(function() {
            window.location.href = finalUrl;
        }, 2500); 
    });
  
const searchForm = document.getElementById('search-form');
const searchButton = document.getElementById('search-button');

function showAlert(title, message) {
    alert(`${title}: ${message}`);
}

searchButton.addEventListener('click', function(e) {
    e.preventDefault(); 

    const originInput = document.getElementById('input-origin');
    const destinationInput = document.getElementById('input-destination');
    const dateInput = document.getElementById('input-date');
    const guestsInput = document.getElementById('input-guests');

    const origin = originInput.value.trim();
    const destination = destinationInput.value.trim();
    const date = dateInput.value;
    const guests = guestsInput.value;

    if (!origin || !destination || !date || !guests) {
        showAlert("Validation Error", "Please fill in all search details (Origin, Destination, Date, Guests).");
        return;
    }
 
    const numGuests = parseInt(guests);
    if (numGuests <= 0 || isNaN(numGuests)) {
        showAlert("Validation Error", "The number of guests must be a valid number greater than 0.");
        return;
    }
    const buttonIcon = document.querySelector('#search-button .button-icon');
    const buttonText = document.querySelector('#search-button .button-text');
    const spinner = document.querySelector('#search-button .spinner');
    
    if (buttonIcon) buttonIcon.style.display = 'none';
    if (buttonText) buttonText.textContent = 'Searching...';
    if (spinner) spinner.style.display = 'inline-block';
    searchButton.disabled = true;

    const params = new URLSearchParams({
        origin: origin,
        destination: destination,
        date: date,
        guests: guests
    }).toString();

    setTimeout(() => {
       window.location.href = `booking.html?${params}`; 
    }, 500); 
});


document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('input-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

// --------------------------------------------------------------------------------------------------------------------------------------------------






  const data = {
    manali: `
      <h2>Manali</h2>
      <img src="../img/man.jpg" style="width:100%;border-radius:10px;margin-bottom:15px;">
      <p>Manali, nestled in the Himalayas, is a paradise for nature lovers. Enjoy snow-capped peaks, adventure sports, and cozy cottages.</p>
      <ul>
        <li><strong>Best Time:</strong> October – February</li>
        <li><strong>Famous For:</strong> Snowfall, Solang Valley, Rohtang Pass</li>
        <li><strong>Activities:</strong> Skiing, Trekking, River Rafting</li>
      </ul>
    `,
    lakshadweep: `
      <h2>Lakshadweep</h2>
      <img src="../img/lakshdweep.jpg" style="width:100%;border-radius:10px;margin-bottom:15px;">
      <p>Experience the untouched beauty of India's tropical islands. Perfect for water sports, relaxation, and coral exploration.</p>
      <ul>
        <li><strong>Best Time:</strong> November – May</li>
        <li><strong>Famous For:</strong> Coral Reefs, Scuba Diving, Clear Blue Water</li>
        <li><strong>Activities:</strong> Kayaking, Snorkeling, Beach Walks</li>
      </ul>
    `,
    agra: `
      <h2>Agra</h2>
      <img src="../img/agra.jpg" style="width:100%;border-radius:10px;margin-bottom:15px;">
      <p>Home to the Taj Mahal — one of the Seven Wonders of the World — Agra is a city rich in Mughal history and architecture.</p>
      <ul>
        <li><strong>Best Time:</strong> October – March</li>
        <li><strong>Famous For:</strong> Taj Mahal, Agra Fort, Fatehpur Sikri</li>
        <li><strong>Activities:</strong> Heritage Walks, Shopping, Local Cuisine</li>
      </ul>
    `
  };

  const modal = document.getElementById("destinationModal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', () => {
      const dest = btn.getAttribute('data-destination');
      modalBody.innerHTML = data[dest];
      modal.style.display = 'flex';
    });
  });

  closeBtn.onclick = () => modal.style.display = 'none';
  window.onclick = e => { if(e.target === modal) modal.style.display = 'none'; };









{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

    (function(){
      emailjs.init("9OUznPEKzdAmAGhO9"); 
    })();

    const form = document.getElementById('contact-form');
    const popup = document.getElementById('successPopup');
    const closePopup = document.getElementById('closePopup');

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      clearErrors();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.title.value.trim();
      const message = form.message.value.trim();

      let isValid = true;

      if (!name) { showError(form.name, "Name is required."); isValid = false; }
      if (!subject) { showError(form.title, "Subject is required."); isValid = false; }
      if (!message) { showError(form.message, "Message is required."); isValid = false; }
      if (!validateEmail(email)) { showError(form.email, "Invalid email."); isValid = false; }

      if (!isValid) return;

      emailjs.sendForm('service_shnaj1l', 'template_bx1wc3a', this)
      .then(() => {
        showPopup();
        form.reset();
      })
      .catch((error) => {
        alert('❌ Failed to send message: ' + JSON.stringify(error));
      });
    });

    function validateEmail(email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    }

    function showError(input, message) {
      const error = document.createElement('div');
      error.className = 'error-message';
      error.textContent = message;
      input.insertAdjacentElement('afterend', error);
    }

    function clearErrors() {
      document.querySelectorAll('.error-message').forEach(el => el.remove());
    }

    function showPopup() {
      popup.style.display = 'flex';
      closePopup.addEventListener('click', () => popup.style.display = 'none');
      setTimeout(() => popup.style.display = 'none', 3000);
    }
  