// Khởi tạo Firebase
const firebaseConfig = {
    // Thay bằng cấu hình Firebase của bạn
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Hàm đăng ký
function register() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Đăng ký thành công
            alert('Đăng ký thành công!');
            // Chuyển hướng đến trang đăng nhập
            window.location.href = 'login.html'; // Chuyển hướng về trang đăng nhập
        })
        .catch((error) => {
            // Xử lý lỗi
            alert(error.message);
        });
}
