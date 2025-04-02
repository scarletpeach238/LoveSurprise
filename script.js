function startSurprise() {
    // Get user's name
    let name = document.getElementById("name-input").value;
    if (name) {
        document.getElementById("name-placeholder").innerText = name;
    }

    // Show the surprise message
    document.getElementById("surprise-message").classList.remove("hidden");

    // Start hearts animation
    createHearts();

    // Start fireworks
    startFireworks();

    // Play background music
    document.getElementById("bg-music").play();
}

function createHearts() {
    for (let i = 0; i < 20; i++) {
        let heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.classList.add("heart");
        document.body.appendChild(heart);

        let startX = Math.random() * window.innerWidth;
        let duration = Math.random() * 3 + 2;
        let size = Math.random() * 30 + 10;

        heart.style.left = `${startX}px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.fontSize = `${size}px`;

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
}

// Fireworks effect
function startFireworks() {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let fireworks = [];

    function Firework(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        this.velocity = {
            x: (Math.random() - 0.5) * 6,
            y: (Math.random() - 0.5) * 6
        };
        this.alpha = 1;
    }

    Firework.prototype.update = function () {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.02;
    };

    Firework.prototype.draw = function () {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach((firework, index) => {
            firework.update();
            firework.draw();

            if (firework.alpha <= 0) {
                fireworks.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    setInterval(() => {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height * 0.5;
        for (let i = 0; i < 10; i++) {
            fireworks.push(new Firework(x, y));
        }
    }, 300);

    animate();
}
