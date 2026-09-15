document.getElementById('loginBtn').addEventListener('click', function() {
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');
    
    // Set your birthday date password here (e.g., 14092026)
    if(pass === "10032006") {
        errorMsg.classList.add('hidden');
        document.querySelector('.login-container').classList.add('fade-out');
        document.querySelector('.lock-icon').innerText = '🔓';
        
        setTimeout(() => {
            window.location.href = "birthday.html";
        }, 1000);
    } else {
        errorMsg.classList.remove('hidden');
        document.querySelector('.login-container').style.animation = "none";
        setTimeout(() => document.querySelector('.login-container').style.animation = "shake 0.5s", 10);
    }
});