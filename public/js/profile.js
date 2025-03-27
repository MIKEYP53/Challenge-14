const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#bubble-title').value.trim();
  const content = document.querySelector('#bubble-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/bubble`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create bubble');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/bubble/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete bubble');
    }
  }
  
};

document
  .querySelector('.new-bubble-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.bubble-list')
  .addEventListener('click', delButtonHandler);
