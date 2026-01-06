const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
});

if (overlay) {
  overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    nav.classList.remove("active");
    overlay.classList.remove("active");
  });
}

/* ===== GOOGLE SHEET FORM ===== */
const scriptURL =
  'https://script.google.com/macros/s/AKfycbwTR_Osc8kGQyc4YhZQ8Tf1q3A1t3Xzd8xkv5LRkzO-xDp88IEwibXNS68Aeu_Xnc3M/exec';

const form = document.forms['submit-to-google-sheet'];
const successMsg = document.getElementById('successMsg');

form.addEventListener('submit', e => {
  e.preventDefault();

  // EMAIL TEKSHIRISH
  const email = form.querySelector('input[name="Email"]').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    successMsg.style.display = 'block';
    successMsg.style.color = 'red';
    successMsg.textContent = 'Please enter a valid email!';
    return;
  }

  // SUCCESS XABAR — DARHOL CHIQADI
  successMsg.style.display = 'block';
  successMsg.style.color = 'lime';
  successMsg.textContent = 'Message successfully sent!';

  
  setTimeout(() => {
    successMsg.style.display = 'none';
  }, 1600);

  const formData = new FormData(form);
  formData.append('Timestamp', new Date().toLocaleString());

  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      form.reset();
    } else {
      successMsg.style.display = 'block';
      successMsg.style.color = 'red';
      successMsg.textContent = 'Something went wrong. Try again.';
    }
  })
  .catch(() => {
    successMsg.style.display = 'block';
    successMsg.style.color = 'red';
    successMsg.textContent = 'Something went wrong. Try again.';
  });
});
