const start = Date.now()
let camera, controls, scene, renderer, effect;

const mainScript = () => {
    console.log('initEchen')
    let model;
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.y = 0;
    camera.position.z = 7;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0, 0, 0);

    const pointLight1 = new THREE.PointLight(0xffffff, 4, 0, 0);
    pointLight1.position.set(4, 2, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
    pointLight2.position.set(-4, 0, 4);
    scene.add(pointLight2);


    // Load 3D Model
    const loader = new GLTFLoader();

    // Initialize DRACOLoader for compressed models
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
        // URL of the model file (you can replace with your own model)
        './surge-logo.glb',
        function (gltf) {

            model = gltf.scene;
            model.position.y = 0;
            model.scale.set(1, 1, 1); // Scale the model to appropriate size

            // Add some rotation animation to the model
            model.rotation.y = 0;

            // Ensure the model is visible in ASCII effect
            model.traverse((child) => {
                if (child.isMesh) {
                    // Make sure materials are properly configured for ASCII rendering
                    if (child.material) {
                        child.material.needsUpdate = true;
                    }
                }
            });

            scene.add(model);

            // Remove loading indicator
        },
    );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);

    let characters = ' .-+*#'
    const effectSize = { amount: .145 }

    effect = new AsciiEffect(renderer, characters, { invert: true, resolution: effectSize.amount });
    effect.setSize(window.innerWidth, window.innerHeight);
    effect.domElement.style.color = 'white';
    effect.domElement.style.backgroundColor = 'black';

    // Special case: append effect.domElement, instead of renderer.domElement.
    // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.
    const heroCanvas = document.querySelector('.home-hero-canvas');

    heroCanvas.appendChild(effect.domElement);

    controls = new TrackballControls(camera, effect.domElement);
    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    effect.setSize(window.innerWidth, window.innerHeight);

}

//

function animate() {

    const timer = Date.now() - start;

    // Animate the GLB model if it's loaded
    if (model) {
        model.rotation.y = (timer * 0.0005) * -1; // Rotate the model slowly
    }

    controls.update();

    effect.render(scene, camera);

}

window.onload = mainScript;  