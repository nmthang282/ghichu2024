// Cấu hình Firebase (sử dụng thông tin từ bước 2)
const firebaseConfig = {
    apiKey: "AIzaSyD9ozJ6k-2DVdrhwbO4EdGsYLGiW3sjObY",
    authDomain: "ghichu2024-54519.firebaseapp.com",
    databaseURL: "https://ghichu2024-54519-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ghichu2024-54519",
    storageBucket: "ghichu2024-54519.appspot.com",
    messagingSenderId: "276303946107",
    appId: "1:276303946107:web:11ffb6dd550d7733a49dde",
    measurementId: "G-XFJRPLM4Z3"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Thêm ghi chú mới
function addNote() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const solution = document.getElementById('solution').value;

  if (title && description && solution) {
    const noteId = db.ref().child('notes').push().key;
    db.ref('notes/' + noteId).set({
      title: title,
      description: description,
      solution: solution
    }).then(() => {
      document.getElementById('title').value = '';
      document.getElementById('description').value = '';
      document.getElementById('solution').value = '';
      loadNotes();
    });
  }
}

// Tải ghi chú và hiển thị
function loadNotes() {
  const notesRef = db.ref('notes');
  notesRef.on('value', (snapshot) => {
    const notes = snapshot.val();
    const notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = '';

    for (let id in notes) {
      const note = notes[id];
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');
      noteDiv.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.description}</p>
        <p><strong>Solution:</strong> ${note.solution}</p>
      `;
      notesContainer.appendChild(noteDiv);
    }
  });
}

// Gọi hàm loadNotes để tải ghi chú khi trang được mở
loadNotes();
