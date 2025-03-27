document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const bubbleId = window.location.pathname.split('/').pop();
    const commentsDiv = document.getElementById('comments');
  
    if (commentForm) {
      commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const content = document.getElementById('comment-content').value.trim();
        
        if (content === '') {
          alert('Comment cannot be empty');
          return;
        }
  
        const response = await fetch('/api/comment', {
          method: 'POST',
          body: JSON.stringify({ content, bubble_id: bubbleId }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          const newComment = await response.json();
          const p = document.createElement('p');
          p.textContent = `${newComment.content} - ${newComment.User ? newComment.User.name : 'Unknown'} on ${newComment.date_created}`;
          commentsDiv.appendChild(p);
          document.getElementById('comment-content').value = '';
        } else {
          alert('Failed to add comment');
        }
      });
    }
  });
  