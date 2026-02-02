// Initialize Lucide Icons
lucide.createIcons();

// Header Scroll Effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '12px 0';
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = 'none';
    }
});

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
// THREE.JS BACKGROUND ANIMATION
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
const container = document.getElementById('hero-canvas');

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const vertices = [];
for (let i = 0; i < 5000; i++) {
    vertices.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x00D2FF, size: 2 }));
scene.add(particles);

camera.position.z = 1000;

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Mouse movement effect
document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX - window.innerWidth / 2) / 100;
    const mouseY = (e.clientY - window.innerHeight / 2) / 100;
    gsap.to(particles.rotation, {
        y: mouseX * 0.1,
        x: mouseY * 0.1,
        duration: 2
    });
});