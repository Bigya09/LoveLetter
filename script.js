let isOpen = false;

function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    const letter = document.getElementById('letter');
    const textArea = document.querySelector('.letter textarea');

    if (!isOpen) {
        envelope.style.transform = 'translateY(-20px) rotateX(30deg)';
        setTimeout(() => {
            letter.style.display = 'block';
            startFireworks();
        }, 500);
        isOpen = true;

        // Update the URL with the letter content
        const letterContent = encodeURIComponent(textArea.value);
        window.history.replaceState(null, null, `?letter=${letterContent}`);
    } else {
        envelope.style.transform = 'translateY(0) rotateX(0)';
        letter.style.display = 'none';
        isOpen = false;
    }
}

function startFireworks() {
    const fireworks = document.getElementById('fireworks');
    fireworks.style.display = 'block';

    const colors = ['red', 'yellow', 'blue', 'green', 'purple'];
    const positions = [
        { top: 0, left: 0 },
        { top: 0, right: 0 },
        { bottom: 0, left: 0 },
        { bottom: 0, right: 0 }
    ];

    for (let i = 0; i < 10; i++) {
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        explosion.style.backgroundColor = colors[i % colors.length];
        const position = positions[i % positions.length];

        if (position.top !== undefined) explosion.style.top = position.top + 'px';
        if (position.bottom !== undefined) explosion.style.bottom = position.bottom + 'px';
        if (position.left !== undefined) explosion.style.left = position.left + 'px';
        if (position.right !== undefined) explosion.style.right = position.right + 'px';

        fireworks.appendChild(explosion);

        setTimeout(() => {
            fireworks.removeChild(explosion);
        }, 1500);
    }

    setTimeout(() => {
        fireworks.style.display = 'none';
    }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const savedLetter = params.get('letter');
    if (savedLetter) {
        document.querySelector('.letter textarea').value = decodeURIComponent(savedLetter);
        openEnvelope(); // Optionally, open the envelope automatically
    }
});



