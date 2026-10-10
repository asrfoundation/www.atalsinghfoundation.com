const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('nav');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.textContent = isOpen ? 'Close' : 'Menu';
});

document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = 'Menu';
}));

document.querySelector('#year').textContent = new Date().getFullYear();

const heroPhoto = document.querySelector('.hero-photo');

if (heroPhoto) {
  const currentImage = heroPhoto.querySelector('img');
  const slideSources = [
    { src: currentImage?.src, alt: currentImage?.alt || 'School students together outdoors' },
    { src: 'home-community-children.jpg', alt: 'Children together in their community' },
    { src: 'home-community-stories.jpg', alt: 'Women sharing a conversation in their community' },
  ].filter((slide) => slide.src);

  heroPhoto.setAttribute('role', 'region');
  heroPhoto.setAttribute('aria-label', 'Community stories photo slideshow');
  heroPhoto.textContent = '';

  const slides = slideSources.map((slide, index) => {
    const image = document.createElement('img');
    image.className = `home-slide${index === 0 ? ' is-active' : ''}`;
    image.src = slide.src;
    image.alt = slide.alt;
    image.loading = index === 0 ? 'eager' : 'lazy';
    heroPhoto.append(image);
    return image;
  });

  const dots = document.createElement('div');
  dots.className = 'slideshow-dots';
  dots.setAttribute('aria-label', 'Choose a slideshow photo');
  heroPhoto.append(dots);

  let activeIndex = 0;
  const showSlide = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => slide.classList.toggle('is-active', index === activeIndex));
    [...dots.children].forEach((dot, index) => {
      dot.classList.toggle('is-active', index === activeIndex);
      dot.setAttribute('aria-pressed', String(index === activeIndex));
    });
  };

  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.className = `slideshow-dot${index === 0 ? ' is-active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show photo ${index + 1}`);
    dot.setAttribute('aria-pressed', String(index === 0));
    dot.addEventListener('click', () => showSlide(index));
    dots.append(dot);
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => showSlide(activeIndex + 1), 5000);
  }
}
