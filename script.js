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


// Visitor feedback section: this website does not store submissions.
const footer = document.querySelector('footer');
if (footer) {
  const feedback = document.createElement('section');
  feedback.className = 'feedback-section';
  feedback.id = 'feedback';
  feedback.innerHTML = '<div class="feedback-inner"><div class="feedback-intro"><p class="eyebrow">Your perspective</p><h2>Help us make a <em>difference.</em></h2><p>Share a quick rating or comment. Your feedback helps AtalSinghfoundation create clearer, more useful support for students.</p></div><form class="feedback-form"><label>Email address<input name="email" type="email" autocomplete="email" placeholder="you@example.com" required></label><fieldset><legend>How would you rate your experience?</legend><div class="rating-options"><label><input type="radio" name="rating" value="1" required><span>1</span></label><label><input type="radio" name="rating" value="2"><span>2</span></label><label><input type="radio" name="rating" value="3"><span>3</span></label><label><input type="radio" name="rating" value="4"><span>4</span></label><label><input type="radio" name="rating" value="5"><span>5</span></label></div></fieldset><label>Your comment<textarea name="comment" rows="5" placeholder="Tell us what you found helpful, or what we could improve." required></textarea></label><button class="feedback-submit" type="submit">Share feedback <span>↗</span></button><p class="feedback-note">For your privacy, this website does not store responses. Submitting opens an email to our team.</p></form></div>';
  footer.before(feedback);
  const feedbackStyles = document.createElement('style');
  feedbackStyles.textContent = '.feedback-section{background:#eef6f9;border-top:1px solid #d5e0e5;padding:96px max(28px,calc((100vw - 1184px)/2))}.feedback-inner{display:grid;grid-template-columns:.8fr 1.2fr;gap:90px;align-items:start}.feedback-intro h2{font-size:clamp(38px,4vw,58px)}.feedback-intro>p:not(.eyebrow){max-width:440px;color:#52636e;font-size:17px;margin:25px 0 0}.feedback-form{display:grid;gap:20px;background:#fff;padding:32px;border:1px solid #d5e0e5;border-radius:5px;box-shadow:0 16px 42px rgba(24,59,78,.08)}.feedback-form>label,.feedback-form fieldset{display:grid;gap:8px;border:0;padding:0;margin:0;font-size:13px;font-weight:800;color:#2b3c47}.feedback-form input[type=email],.feedback-form textarea{width:100%;border:1px solid #cbd9df;background:#fbfdfe;border-radius:3px;padding:13px 14px;color:#111820;font:400 15px Manrope,Arial,sans-serif}.feedback-form textarea{resize:vertical;min-height:112px}.feedback-form input:focus,.feedback-form textarea:focus{outline:3px solid rgba(169,216,241,.55);border-color:#4e9dce}.feedback-form legend{margin-bottom:4px}.rating-options{display:flex;gap:9px}.rating-options label{cursor:pointer}.rating-options input{position:absolute;opacity:0}.rating-options span{display:grid;place-items:center;width:39px;height:39px;border:1px solid #cbd9df;border-radius:50%;font-weight:800;color:#52636e;transition:.18s}.rating-options input:checked+span{background:#111820;border-color:#111820;color:#fff}.rating-options input:focus-visible+span{outline:3px solid rgba(169,216,241,.8)}.feedback-submit{justify-self:start;border:0;border-radius:3px;background:#111820;color:#fff;padding:14px 18px;font:800 14px Manrope,Arial,sans-serif;cursor:pointer}.feedback-submit span{margin-left:15px;font-size:18px}.feedback-note{margin:0;color:#687983;font-size:12px;line-height:1.5}@media(max-width:720px){.feedback-section{padding:72px 20px}.feedback-inner{grid-template-columns:1fr;gap:35px}.feedback-form{padding:23px}.rating-options{gap:7px}}';
  document.head.append(feedbackStyles);
  feedback.querySelector('.feedback-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = 'Website feedback — AtalSinghfoundation';
    const body = 'Email: ' + formData.get('email') + ' | Rating: ' + formData.get('rating') + ' / 5 | Comment: ' + formData.get('comment');
    window.location.href = 'mailto:connect@atalsinghfoundation.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
}
