

// Hàm đăng nhập
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Đăng nhập thành công
            alert('Đăng nhập thành công!');
            // Chuyển hướng đến trang ghi chú
            window.location.href = 'index.html'; // Thay bằng tên tệp ghi chú của bạn
        })
        .catch((error) => {
            // Xử lý lỗi
            alert(error.message);
        });
}

