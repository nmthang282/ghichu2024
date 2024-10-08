// login.js
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Đăng nhập thành công, chuyển hướng về trang ghi chú
            window.location.href = 'index.html';
        })
        .catch((error) => {
            alert(error.message);
        });
}

