const deleteBtn = document.querySelectorAll('#delete-btn');

deleteBtn.forEach((button, index) => {
  button.addEventListener('click', event => {
    const itemId = event.target.dataset.itemid;
    console.log(itemId);

    fetch(`profile/${itemId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(data => {
      if (res.status === 400) {
        throw new Error('Validation Error');
      }
      return res.json();
    });
  });
});
