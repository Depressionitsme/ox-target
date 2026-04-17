const arc = document.getElementById('arc');
const wrapper = document.querySelector('.cursor-wrapper');



// 3. Główna logika ruchu
document.addEventListener('mousemove', (e) => {
    // Upewnij się, że element jest widoczny, gdy myszka się rusza
    

    const rect = wrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Obliczanie kąta
    const angle = Math.atan2(deltaY, deltaX);

    // Ustalenie wychylenia (20px od środka)
    const distance = 20; 
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    // Zamiana radianów na stopnie dla rotacji
    const rotationDeg = angle * (180 / Math.PI);

    // Użycie requestAnimationFrame dla maksymalnej płynności
    requestAnimationFrame(() => {
        arc.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotationDeg}deg)`;
    });
});

let currentScroll = 0;
const scrollSpeed = 0.95; 

window.addEventListener('wheel', (event) => {
    const wrapper = document.getElementById("options-wrapper");
    if (!wrapper) return;

    
    currentScroll += event.deltaY * scrollSpeed;

    
    const maxScroll = wrapper.scrollHeight - wrapper.clientHeight;
    currentScroll = Math.max(0, Math.min(currentScroll, maxScroll));

    // Animacja GSAP
    gsap.to(wrapper, {
        scrollTop: currentScroll,
        duration: 0.55,      
        ease: "power2.out", 
        overwrite: true     
    });
}, { passive: true });