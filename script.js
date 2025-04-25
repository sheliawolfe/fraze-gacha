const insults = {
  reg: [],
  mal: [],
  cute: []
};

fetch('insultos.txt')
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n');
    lines.forEach(line => {
      const [category, ...rest] = line.split(':');
      if (insults[category.trim()]) {
        insults[category.trim()].push(rest.join(':').trim());
      }
    });
  });

function getInsult(category) {
  const arr = insults[category];
  if (arr && arr.length > 0) {
    const index = Math.floor(Math.random() * arr.length);
    document.getElementById('insult').innerText = arr[index];
  } else {
    document.getElementById('insult').innerText = 'no hay insultos aquí...';
  }
}
function sparkleBurst(x, y) {
  for (let i = 0; i < 10; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    // Random movement
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 50;
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;

    sparkle.style.transform = `translate(${dx}px, ${dy}px)`;
    document.body.appendChild(sparkle);

    // Fade out & remove
    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }
}
function getInsult(category) {
  const arr = insults[category];
  if (arr && arr.length > 0) {
    const i = Math.floor(Math.random() * arr.length);
    document.getElementById('insult').innerText = arr[i];
  }
  // Sparkle effect at button click
  document.addEventListener('click', function(e) {
    sparkleBurst(e.clientX, e.clientY);
  }, { once: true });
}

const audio = new Audio('Quavo.mp3');
audio.play();

const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  document.body.classList.toggle("dark-mode");

  // Optional: store preference in localStorage
  const currentTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", currentTheme);
});

// On load: apply saved theme
window.onload = () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.classList.add(savedTheme + "-mode");
};