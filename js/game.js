let score = 0;
const targetScore = 10;
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const tray = document.getElementById('tray');
let gameInterval;
let collisionInterval;

gameArea.addEventListener('mousemove', (e) => {
    let x = e.clientX;
    tray.style.left = `${x}px`;
});

gameArea.addEventListener('touchmove', (e) => {
    let x = e.touches[0].clientX;
    tray.style.left = `${x}px`;
});

function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.classList.add('heart-target');
    heart.style.left = Math.random() * 90 + 'vw';
    gameArea.appendChild(heart);
    
    setTimeout(() => { 
        if (heart.parentElement) heart.remove(); 
    }, 4000);
}

function checkCollisions() {
    const hearts = document.querySelectorAll('.heart-target');
    const trayRect = tray.getBoundingClientRect();

    hearts.forEach(heart => {
        const heartRect = heart.getBoundingClientRect();
        
        if (
            heartRect.bottom >= trayRect.top + 20 &&
            heartRect.top <= trayRect.bottom &&
            heartRect.right >= trayRect.left &&
            heartRect.left <= trayRect.right
        ) {
            heart.remove();
            score++;
            scoreDisplay.innerText = score;
            
            if (score >= targetScore) {
                endGame();
            }
        }
    });
}

// 🗓️ ক্যালেন্ডারে ৫ দিনের লিমিট সেট করার ফাংশন
function setDateLimit() {
    const dateInput = document.getElementById('partyDate');
    
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 5); // আজকের থেকে ৫ দিন যোগ করা হলো

    // YYYY-MM-DD ফরম্যাটে ডেট তৈরি করার ফাংশন
    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    dateInput.min = formatDate(today);     // পেছনের ডেট সিলেক্ট করা বন্ধ
    dateInput.max = formatDate(maxDate);   // ৫ দিনের বেশি সিলেক্ট করা বন্ধ
}

function startGame() {
    setDateLimit(); // গেম শুরুর সময় ক্যালেন্ডারের লিমিট সেট হয়ে যাবে
    gameInterval = setInterval(createHeart, 800);
    collisionInterval = setInterval(checkCollisions, 50); 
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(collisionInterval);
    
    document.querySelectorAll('.heart-target').forEach(h => h.remove());
    tray.style.display = 'none';
    
    document.getElementById('final-message').classList.remove('hidden');
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
}

window.onload = startGame;

// Submit Button Logic with WhatsApp Redirect
document.getElementById('submitDateBtn').addEventListener('click', function() {
    const selectedDate = document.getElementById('partyDate').value;
    
    if(selectedDate) {
        // ১. তোমার হোয়াটসঅ্যাপ নম্বর (Country code 91 সহ, কিন্তু + ছাড়া)
        // ⚠️ নিচের 910000000000 এর জায়গায় তোমার আসল নম্বরটা বসিয়ে নেবে ⚠️
        const myWhatsAppNumber = "919775976850"; 
        
        // ২. মেসেজ তৈরি করা
        const message = "Hey! I am ready for the party! 🍕 My chosen date is: " + selectedDate;
        
        // ৩. হোয়াটসঅ্যাপ লিংক তৈরি
        const whatsappUrl = "https://wa.me/" + myWhatsAppNumber + "?text=" + encodeURIComponent(message);

        // ৪. গেমের অ্যানিমেশন এবং মেসেজ দেখানো
        document.getElementById('win-section').style.display = 'none';
        document.getElementById('goodbye-message').classList.remove('hidden');
        confetti({ particleCount: 300, spread: 150, origin: { y: 0.5 } });

        // ৫. অ্যানিমেশন দেখার জন্য ১.৫ সেকেন্ড ওয়েট করে হোয়াটসঅ্যাপ খুলে দেওয়া
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1500); 

    } else {
        alert("Please select a date first! 🥺");
    }
});