document.getElementById('balloon').addEventListener('click', function() {
    const balloon = this;
    balloon.classList.add('inflate');
    
    setTimeout(() => {
        // Pop effect
        balloon.style.display = 'none';
        
        // Realistic Confetti blast
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff416c', '#ff4b2b', '#ffffff', '#ffd700']
        });

        setTimeout(() => {
            window.location.href = "wish.html";
        }, 2500);
    }, 800);
});