// Cấu hình Firebase
var firebaseConfig = {
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
firebase.analytics();

// Khởi tạo tham chiếu tới database
var db = firebase.database();

// Hàm để thêm ghi chú mới vào Firebase Realtime Database
function addNote() {
  console.log("Save button clicked"); // Kiểm tra khi nhấn nút
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
      console.log("Note saved successfully");
      // Xóa các trường input sau khi lưu thành công
      document.getElementById('title').value = '';
      document.getElementById('description').value = '';
      document.getElementById('solution').value = '';
      loadNotes(); // Tải lại danh sách ghi chú
    }).catch(error => {
      console.error("Error saving note: ", error);
    });
  } else {
    console.error("Missing input fields"); // Kiểm tra trường nhập trống
  }
}

// Hàm để tải danh sách ghi chú từ Firebase và hiển thị trên trang
function loadNotes() {
  db.ref('notes').once('value', function(snapshot) {
    const notes = snapshot.val();
    const notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = ''; // Xóa nội dung hiện tại
    for (let noteId in notes) {
      const note = notes[noteId];
      const noteElement = document.createElement('div');
      noteElement.innerHTML = `<h2>${note.title}</h2><p>${note.description}</p><p><strong>Phương án:</strong> ${note.solution}</p>`;
      notesContainer.appendChild(noteElement);
    }
  });
}

// Tải ghi chú khi trang được load
window.onload = loadNotes;
