// Select DOM elements
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');
const overlay = document.getElementById('overlay');

// Function to show the modal
function showModal() {
  overlay.style.display = 'flex'; // Use flex for centering
}

// Function to hide the modal
function hideModal() {
  overlay.style.display = 'none';
}

// Event listeners
openModalButton.addEventListener('click', showModal);
closeModalButton.addEventListener('click', hideModal);
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) hideModal(); // Close when clicking outside the modal
});
