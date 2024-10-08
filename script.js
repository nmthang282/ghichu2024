

// Hàm thêm ghi chú
function addNote() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const solution = document.getElementById('solution').value;

    // Kiểm tra nếu tiêu đề không trống
    if (title.trim() === '') {
        alert('Tiêu đề không được để trống.');
        return;
    }

    // Thêm ghi chú vào Firestore
    db.collection('notes').add({
        title: title,
        description: description,
        solution: solution,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        // Làm sạch các trường
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('solution').value = '';
        loadNotes(); // Tải lại ghi chú
    }).catch((error) => {
        console.error('Lỗi khi thêm ghi chú: ', error);
    });
}

// Hàm tải ghi chú
function loadNotes() {
    // Làm sạch danh sách ghi chú hiện tại
    const notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = '';

    // Lấy tất cả ghi chú từ Firestore
    db.collection('notes').orderBy('createdAt', 'desc').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const note = doc.data();
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note';
            noteDiv.innerHTML = `<h2>${note.title}</h2><p>${note.description}</p><p><strong>Giải pháp:</strong> ${note.solution}</p>`;
            notesContainer.appendChild(noteDiv);
        });
    }).catch((error) => {
        console.error('Lỗi khi tải ghi chú: ', error);
    });
}

// Tải ghi chú khi trang được tải
document.addEventListener('DOMContentLoaded', loadNotes);
