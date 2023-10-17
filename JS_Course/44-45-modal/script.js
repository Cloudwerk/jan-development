const modal = document.querySelector(`#modal`);
const openModalBtn = document.querySelector(`#open-modal-btn`);
const closeModalBtn = document.querySelector(`#close-modal-btn`);
const overlay = document.querySelector(`#overlay`);

openModalBtn.addEventListener("click", () => {
	modal.classList.add("open");
	overlay.classList.add("open");
});

function closeModal() {
	modal.classList.remove("open");
	overlay.classList.remove("open");
}

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
/*
  TODO: 2. Select the elements with the following IDs
    * modal
    * open-modal-btn
    * close-modal-btn
    * BONUS: overlay
*/

// TODO: 3. Create a click event listener for the open-modal-btn that adds the class "open" to the modal
// BONUS: Also add the class "open" to the overlay

// TODO: 4. Create a click event listener for the close-modal-btn that removes the class "open" from the modal
// BONUS: Also remove the class "open" from the overlay

// BONUS: Add a click event listener to the overlay that removes the class "open" from the modal and the overlay
