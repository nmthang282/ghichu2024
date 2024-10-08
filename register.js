
// Đăng kí
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Đăng ký thành công, chuyển hướng về trang đăng nhập
            window.location.href = 'login.html';
        })
        .catch((error) => {
            alert(error.message);
        });
}
