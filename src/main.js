document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок
    lucide.createIcons();

    // 2. Инициализация AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // 3. Мобильное меню
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    const toggleMenu = () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    burger.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // 4. Three.js Hero Animation (упрощенная для стабильности)
    if (document.getElementById('hero-canvas')) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        const container = document.getElementById('hero-canvas');
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        for (let i = 0; i < 3000; i++) {
            vertices.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x00D2FF, size: 2 }));
        scene.add(particles);
        camera.position.z = 1000;

        const animate = () => {
            requestAnimationFrame(animate);
            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.001;
            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // 5. Swiper Slider
    const swiper = new Swiper('.blog-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: { nextEl: '.swiper-next', prevEl: '.swiper-prev' },
        breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });

    // 6. SimpleParallax
    const images = document.querySelectorAll('.parallax-img');
    if (images.length) new simpleParallax(images, { delay: .6, scale: 1.3 });

    // 7. Cookie Popup Logic
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookies-accepted')) {
        setTimeout(() => cookiePopup.classList.add('active'), 2000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookies-accepted', 'true');
        cookiePopup.classList.remove('active');
    });

    // 8. Контактная форма и капча
    const contactForm = document.getElementById('ajax-form');
    if (contactForm) {
        const captchaLabel = document.getElementById('captcha-label');
        const captchaInput = document.getElementById('captcha-input');
        const phoneInput = document.getElementById('phone-input');
        
        let n1 = Math.floor(Math.random() * 10), n2 = Math.floor(Math.random() * 10);
        let correctAnswer = n1 + n2;
        captchaLabel.textContent = `Сколько будет ${n1} + ${n2}?`;

        phoneInput.addEventListener('input', (e) => e.target.value = e.target.value.replace(/[^0-9+]/g, ''));

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (parseInt(captchaInput.value) !== correctAnswer) {
                alert('Ошибка в капче');
                return;
            }
            const btn = contactForm.querySelector('button');
            const msg = document.getElementById('form-message');
            btn.disabled = true;
            btn.textContent = 'Отправка...';
            
            setTimeout(() => {
                contactForm.reset();
                btn.disabled = false;
                btn.textContent = 'Отправить запрос';
                msg.textContent = 'Успешно отправлено!';
                msg.classList.add('success');
            }, 1500);
        });
    }
});