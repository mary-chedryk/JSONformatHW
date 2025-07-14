const input = document.getElementById('bookmarkInput');
const addBtn = document.getElementById('addBookmarkBtn');
const list = document.getElementById('bookmarkList');

let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

function saveToStorage() {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function renderBookmarks() {
  list.innerHTML = '';

  bookmarks.forEach((url, index) => {
    const li = document.createElement('li');

    const link = document.createElement('a');
    link.href = url;
    link.target = "_blank";
    link.textContent = url;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Видалити';
    deleteBtn.className = 'delete';
    deleteBtn.onclick = () => {
      bookmarks.splice(index, 1);
      saveToStorage();
      renderBookmarks();
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Редагувати';
    editBtn.className = 'edit';
    editBtn.onclick = () => {
      const newUrl = prompt("Введіть новий URL:", url);
      if (newUrl) {
        bookmarks[index] = newUrl;
        saveToStorage();
        renderBookmarks();
      }
    };

    li.append(link, editBtn, deleteBtn);
    list.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  const url = input.value.trim();
  if (url && !bookmarks.includes(url)) {
    bookmarks.push(url);
    input.value = '';
    saveToStorage();
    renderBookmarks();
  }
});

renderBookmarks();
