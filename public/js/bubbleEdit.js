document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed'); // Log this to ensure the DOM is ready
  
    // Select elements
    const editButton = document.getElementById('edit-bubble-btn');
    const editModal = new bootstrap.Modal(document.getElementById('editBubbleModal'));
    const editForm = document.getElementById('edit-bubble-form');
    const bubbleId = window.location.pathname.split('/').pop(); // Get bubble ID from URL
  
    // Show modal on edit button click
    if (editButton) {
      console.log('Edit button found'); // Log if button is found
      editButton.addEventListener('click', () => {
        console.log('Edit button clicked'); // Log when button is clicked
        editModal.show();
      });
    } else {
      console.log('Edit button not found'); // Log if button is missing
    }
  
    // Handle form submission for editing bubble
    if (editForm) {
      editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('Form submitted'); // Log when form is submitted
  
        const title = document.getElementById('edit-bubble-title').value.trim();
        const content = document.getElementById('edit-bubble-content').value.trim();
  
        if (title && content) {
          console.log('Title and content are valid'); // Log if title and content exist
          // Make PUT request to update the bubble
          const response = await fetch(`/api/bubble/${bubbleId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            console.log('Bubble updated successfully'); // Log if the update was successful
            document.location.reload();
          } else {
            console.log('Failed to update bubble'); // Log if update failed
            alert('Failed to update bubble');
          }
        }
      });
    } else {
      console.log('Edit form not found'); // Log if form is missing
    }
  });
  