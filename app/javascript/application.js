// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
document.addEventListener("DOMContentLoaded", function() {
    let totalTasks = 10;
    let completedTasks = 6;
    let pendingTasks = totalTasks - completedTasks;

    document.getElementById("totalTasks").textContent = totalTasks;
    document.getElementById("completedTasks").textContent = completedTasks;
    document.getElementById("pendingTasks").textContent = pendingTasks;
});
// Add this script to highlight today
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().getDate();
  const cells = document.querySelectorAll('.calendar td');
  cells.forEach(cell => {
    if (cell.textContent.trim() === today.toString()) {
      cell.classList.add('today');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Check localStorage for theme preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  // Set initial state of the theme and slider
  if (isDarkMode) {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
  }

  // Listen for toggle switch
  themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode', themeToggle.checked);
    localStorage.setItem('darkMode', themeToggle.checked);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const quickAddBtn = document.getElementById('quick-add-task');
  const modal = document.getElementById('modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalBody = document.getElementById('modal-body');

  quickAddBtn.addEventListener('click', () => {
    // Fetch the form via Turbo Stream
    fetch('/tasks/new', {
      headers: { 'Accept': 'text/vnd.turbo-stream.html' }
    })
      .then(response => response.text())
      .then(html => {
        modalBody.innerHTML = html;
        modal.classList.remove('hidden');
      });
  });

  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalBody.innerHTML = ''; // Clear modal content
  });

  // Optional: Close when clicking outside modal content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modalBody.innerHTML = '';
    }
  });
});
