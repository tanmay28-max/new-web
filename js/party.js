const btnNo = document.getElementById('btnNo');
const btnYes = document.getElementById('btnYes');
const btnGroup = document.querySelector('.btn-group');
const celebration = document.getElementById('celebration');
const questionText = document.querySelector('h2');

// --- NO বাটন পালানোর লজিক ---
function moveButton(e) {
    if(e) e.preventDefault(); // মোবাইলে টাচ করলে যেন সমস্যা না হয়
    const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
    const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);
    
    btnNo.style.position = 'fixed';
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
}

// ল্যাপটপের মাউসের জন্য
btnNo.addEventListener('mouseover', moveButton);
// মোবাইলের টাচের জন্য
btnNo.addEventListener('touchstart', moveButton);


// --- YES বাটনে ক্লিক করার লজিক ---
btnYes.addEventListener('click', () => {
    questionText.style.display = 'none';     // প্রশ্নটা গায়েব হয়ে যাবে
    btnGroup.style.display = 'none';         // দুটো বাটন গায়েব হয়ে যাবে
    celebration.classList.remove('hidden');  // খুশির মেসেজটা দেখাবে
});