class PageFellowShip {
    constructor() {
        this.init();
    }

    init() {
        this.initCanvas();
    }
    initCanvas() {
        const canvas = document.querySelector("#canvas_smoke_fire");
        if (!canvas) {
            console.warn("Canvas with id #canvas_smoke_fire not found.");
            return;
        }
        const context = canvas.getContext("2d", { alpha: true });
        const container = canvas.parentElement;
        // Keep references on instance
        this.canvas = canvas;
        this.context = context;
        // Pixel-art look preferences
        this.pixelStep = 1; // snap to a 2px grid
        this.maxPixels = 1000; // hard cap
        this.speedGain = 2; // faster when moving up (top faster)
        this.bottomBiasPower = 2; // stronger density bias to bottom

        // Style and attach
        canvas.style.display = "block";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.background = "#000";

        // Initial sizing and particles
        const resizeCanvas = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            canvas.width = Math.max(1, width);
            canvas.height = Math.max(1, height);

            const seedCount = 2000
            this.seedPixels(seedCount);
        };
        this.resizeCanvas = resizeCanvas;
        resizeCanvas();

        // Animate
        const step = () => {
            this.update();
            this.draw();
            this.rafId = requestAnimationFrame(step);
        };
        this.step = step;
        step();

        // Handle resize
        this.boundResize = () => {
            // Debounce a little via rAF to avoid layout thrash
            cancelAnimationFrame(this.resizeRafId);
            this.resizeRafId = requestAnimationFrame(resizeCanvas);
        };
        window.addEventListener("resize", this.boundResize);
    }

    seedPixels(desiredCount) {
        if (!this.pixels) this.pixels = [];
        const pixelArray = this.pixels;
        const countDelta = desiredCount - pixelArray.length;

        // Add more pixels if needed
        for (let i = 0; i < countDelta; i += 1) {
            pixelArray.push(this.createPixel());
        }
        // Trim extras if downsizing
        if (countDelta < 0) pixelArray.length = desiredCount;
    }

    createPixel() {
        const minSize = 4;
        const maxSize = 8;
        const size = 4//Math.random() < 0.8 ? minSize : maxSize;
        const upwardSpeed = 0.3 + Math.random() * 1.2; // base upward speed
        const h = this.canvas.height || 1;
        // Bottom-biased start position: more particles near bottom (stronger bias)
        const r = Math.random();
        const startY = h * (1 - Math.pow(r, this.bottomBiasPower));
        return {
            x: Math.random() * this.canvas.width,
            y: startY,
            vx: 0, // Initial horizontal movement
            vy: -upwardSpeed,
            size: size,
            alpha: 0.3 + Math.random() * 0.7,
            // Add properties for horizontal oscillation
            oscillationSpeed: 0.02 + Math.random() * 0.03, // Speed of oscillation
            oscillationRange: 0.5 + Math.random() * 2, // Range of oscillation (-range to +range)
            oscillationOffset: Math.random() * Math.PI * 2, // Random starting phase
        };
    }

    update() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        for (let i = 0; i < this.pixels.length; i += 1) {
            const p = this.pixels[i];
            // Increase vertical speed as it goes higher
            const yFactor = 1 - Math.max(0, Math.min(1, p.y / height)); // 0 at bottom → 1 at top
            const verticalScale = 1 + this.speedGain * yFactor;

            // Calculate horizontal oscillation based on y position
            const progress = Math.max(0, Math.min(1, 1 - p.y / height)); // 0 at top, 1 at bottom
            const oscillation = Math.sin(p.oscillationOffset + progress * Math.PI * 2) * p.oscillationRange;

            // Apply horizontal movement based on oscillation
            p.vx = oscillation * 0.5; // Scale down the oscillation for smoother movement

            p.x += p.vx;
            p.y += p.vy * verticalScale;

            // Wrap horizontally 
            if (p.x < -p.size) p.x = width + p.size;
            if (p.x > width + p.size) p.x = -p.size;

            // Re-spawn at bottom when leaving the top
            if (p.y + p.size < 0) {
                p.y = height + p.size;
                p.x = Math.random() * width;
                // new random speed and opacity each spawn
                p.vx = 0; // Reset horizontal movement
                p.vy = -(0.3 + Math.random() * 0.9);
                // p.alpha = 0.3 + Math.random() * 0.7;
                p.alpha = 1;
                // Reset oscillation properties
                p.oscillationSpeed = 0.02 + Math.random() * 0.03;
                p.oscillationRange = 0.5 + Math.random() * 0.5;
                p.oscillationOffset = Math.random() * Math.PI * 2;
            }
        }
    }

    draw() {
        const ctx = this.context;
        const canvas = this.canvas;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < this.pixels.length; i += 1) {
            const p = this.pixels[i];
            const snappedX = Math.round(p.x / this.pixelStep) * this.pixelStep;
            const snappedY = Math.round(p.y / this.pixelStep) * this.pixelStep;
            const finalX = snappedX + p.size / 2 + p.vx;
            const finalY = snappedY + p.size / 2 + p.vy;
            // Fade with height: opacity increases as y increases  
            const height = this.canvas.height || 1;
            const t = Math.max(0, Math.min(1, snappedY / height));
            const alphaScale = 0.2 + 0.8 * t; // top ~0.2 → bottom ~1.0
            ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha * alphaScale));
            ctx.fillStyle = "#666666";
            ctx.beginPath();
            ctx.arc(finalX, finalY, p.size / 2, 0, 2 * Math.PI);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
}


class SurgeAI {
    constructor() { }

    init() {
        const page = document.querySelector('[data-page]').getAttribute('data-page');

        if (page === 'fellowship') {
            new PageFellowShip();
        }
    }

}

const surgeAI = new SurgeAI();
window.addEventListener("DOMContentLoaded", () => {
    surgeAI.init();
});

