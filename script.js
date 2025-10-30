/* js/script.js - funciones globales para VetNova */

/* NAVBAR: cambio de fondo al hacer scroll y control mobile */
(function(){
  const navbarElements = Array.from(document.querySelectorAll('.navbar'));
  function onScroll(){
    const scrolled = window.scrollY > 40;
    navbarElements.forEach(nav => {
      if(scrolled) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Mobile toggles: hay varios navToggle en páginas, los manejamos por delegación
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      // buscamos el nav más cercano en el DOM
      const nav = btn.parentElement.querySelector('.nav .nav-links') || btn.parentElement.querySelector('.nav');
      // si hay lista con clase nav-links, alternamos su visibilidad
      const links = btn.parentElement.querySelector('.nav-links');
      if(links){
        links.classList.toggle('show');
      } else {
        // fallback simple: toggle class on entire nav
        const navEl = btn.parentElement.querySelector('.nav');
        navEl?.classList.toggle('show');
      }
    });
  });

  // DROPDOWN (click para abrir/cerrar, accesible)
  document.querySelectorAll('.dropdown').forEach(drop => {
    const btn = drop.querySelector('.drop-btn');
    const menu = drop.querySelector('.dropdown-menu');
    btn?.addEventListener('click', (e) => {
      const opened = drop.classList.toggle('open');
      btn.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });
    // cerrar al click fuera
    document.addEventListener('click', (e) => {
      if(!drop.contains(e.target)) {
        drop.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
      }
    });
  });
})();

/* ADOPCIONES: abrir modal con info desde data-* */
(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modalAdopcion');
    if(!modal) return;

    const modalImg = document.getElementById('modalImg');
    const modalNombre = document.getElementById('modalNombre');
    const modalEdad = document.getElementById('modalEdad');
    const modalDescripcion = document.getElementById('modalDescripcion');
    const modalContacto = document.getElementById('modalContacto');
    const modalClose = document.getElementById('modalClose');

    // función para abrir modal con datos
    function abrirModal(card){
      const nombre = card.dataset.nombre || 'Sin nombre';
      const edad = card.dataset.edad || 'Edad no disponible';
      const descripcion = card.dataset.descripcion || 'Sin descripción';
      const imgEl = card.querySelector('.card-img');
      const imgSrc = imgEl ? imgEl.src : 'img/adopt_placeholder.jpg';

      modalNombre.textContent = nombre;
      modalEdad.textContent = edad;
      modalDescripcion.textContent = descripcion;
      modalImg.src = imgSrc;
      modalContacto.href = `contacto.html?interes=adoptar&nombre=${encodeURIComponent(nombre)}`;

      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    }

    // cerrar modal
    function cerrarModal(){
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    }

    // delegación: tarjetas y botones dentro de #adopcionesGrid
    document.getElementById('adopcionesGrid')?.addEventListener('click', (e) => {
      const card = e.target.closest('.adopcion-card');
      if(!card) return;
      abrirModal(card);
    });

    // permitir abrir con tecla Enter cuando tarjeta tiene focus
    document.getElementById('adopcionesGrid')?.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        const card = e.target.closest('.adopcion-card') || e.target;
        if(card && card.classList.contains('adopcion-card')) abrirModal(card);
      }
    });

    modalClose?.addEventListener('click', cerrarModal);

    // cerrar si se hace click fuera del modal-wrap
    modal.addEventListener('click', (e) => {
      if(e.target === modal) cerrarModal();
    });

    // ESC para cerrar
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && !modal.classList.contains('hidden')) cerrarModal();
    });
  });
})();

/* CONTACT FORM: validación simple y simulación de envío */
(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const msg = document.getElementById('formMsg');
    if(!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name')?.value.trim();
      const email = form.querySelector('#email')?.value.trim();
      const message = form.querySelector('#message')?.value.trim();

      if(!name || !email || !message){
        msg.textContent = 'Por favor completa los campos requeridos.';
        msg.style.color = 'crimson';
        return;
      }

      // simulación de envío
      msg.style.color = 'green';
      msg.textContent = 'Mensaje enviado. ¡Gracias! Nos contactaremos pronto.';
      form.reset();

      // aquí podrías añadir fetch() a tu API para enviar datos reales
    });
  });
})();
