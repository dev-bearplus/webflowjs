class MainScript {
    constructor() {
        this.loader = null;
        this.dracoLoader = null;
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.effect = null;
        this.model = null;
        this.start = null;
        this._resizeHandler = null;
    }

    init() {
        this.loader = new THREE.GLTFLoader();
        this.dracoLoader = new THREE.DRACOLoader();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.camera.position.set(0, 0, 8.5);
        this.start = Date.now();

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0, 0, 0);

        const pointLight1 = new THREE.PointLight(0xffffff, 4, 0, 0);
        pointLight1.position.set(4, 2, 4);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
        pointLight2.position.set(-4, 0, 4);
        this.scene.add(pointLight2);

        this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
        const urlLoader = 'https://cdnwf-prod.bear.plus/Echen/surge-logo.glb'
        this.loader.setDRACOLoader(this.dracoLoader);
        this.loader.load(
            urlLoader,
            (gltf) => {
                this.model = gltf.scene;
                this.model.position.y = 0;
                this.model.scale.set(1, 1, 1);
                this.model.rotation.y = 0;

                this.model.traverse((child) => {
                    if (child.isMesh && child.material) {
                        child.material.needsUpdate = true;
                    }
                });
                this.scene.add(this.model);
            },
        );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setAnimationLoop(this.animate.bind(this));

        const characters = ' .-+*#';
        const effectSize = { amount: 0.145 };
        const heroCanvas = document.querySelector('.home-hero-canvas');
        if (heroCanvas) {
            heroCanvas.style.overflow = 'hidden';
            heroCanvas.style.filter = 'invert(1)';

            if (typeof THREE.AsciiEffect === 'function') {
                this.effect = new THREE.AsciiEffect(this.renderer, characters, { invert: true, resolution: effectSize.amount });
                this.effect.setSize(window.innerWidth, window.innerHeight);
                this.effect.domElement.style.color = 'white';
                heroCanvas.appendChild(this.effect.domElement);
            } else {
                console.warn('THREE.AsciiEffect is not available.');
            }
        } else {
            console.warn('Element .home-hero-canvas not found.');
        }

        this.addResizeListener();
    }

    addResizeListener() {
        // Remove previous listener if exists
        if (this._resizeHandler) {
            window.removeEventListener('resize', this._resizeHandler);
        }
        this._resizeHandler = () => {
            if (this.camera && this.renderer) {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                if (this.effect) {
                    this.effect.setSize(window.innerWidth, window.innerHeight);
                }
            }
            if (window.innerWidth > 768) {
                this.camera.position.set(0, 0, 8.5);
            } else {
                this.camera.position.set(0, -1, 8.5);
            }
        };
        window.addEventListener('resize', this._resizeHandler);
    }

    animate() {
        const timer = Date.now() - this.start;

        if (this.model) {
            this.model.rotation.y = (timer * 0.0005) * -1;
        }
        if (this.effect) {
            this.effect.render(this.scene, this.camera);
        }
    }
}

const mainScript = new MainScript();
window.onload = () => mainScript.init();  