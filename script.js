const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('nav');
menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? 'Close' : 'Menu';
});
document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = 'Menu';
}));
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const hero = document.querySelector('.hero-photo');
if (hero) {
  const firstImage = hero.querySelector('img');
  const slides = [
    { src: firstImage?.getAttribute('src') || 'home-school-girls.jpg', alt: firstImage?.alt || 'School students together outdoors' },
    { src: 'home-community-children.jpg', alt: 'Children together in their community' },
    { src: 'home-community-stories.jpg', alt: 'Women sharing a conversation in their community' }
  ];
  hero.setAttribute('role', 'region');
  hero.setAttribute('aria-label', 'Community stories photo slideshow');
  hero.innerHTML = slides.map((slide, index) => '<img class="home-slide' + (index === 0 ? ' is-active' : '') + '" src="' + slide.src + '" alt="' + slide.alt + '">').join('') + '<div class="slideshow-dots" aria-label="Choose a slideshow photo"></div>';
  const images = [...hero.querySelectorAll('.home-slide')];
  const dots = hero.querySelector('.slideshow-dots');
  let active = 0;
  const showSlide = (index) => {
    active = (index + images.length) % images.length;
    images.forEach((image, i) => image.classList.toggle('is-active', i === active));
    [...dots.children].forEach((dot, i) => dot.classList.toggle('is-active', i === active));
  };
  images.forEach((image, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'slideshow-dot' + (index === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', 'Show photo ' + (index + 1));
    dot.addEventListener('click', () => showSlide(index));
    dots.append(dot);
  });
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(() => showSlide(active + 1), 5000);
}

const footer = document.querySelector('footer');
if (footer) {
  const feedback = document.createElement('section');
  feedback.id = 'feedback';
  feedback.className = 'feedback-section';
  feedback.innerHTML = '<div class="feedback-inner"><div class="feedback-intro"><p class="eyebrow">YOUR PERSPECTIVE</p><h2>Help us make a <em>difference.</em></h2><p>Share a quick rating or comment. Your feedback helps us create clearer, more useful support for students.</p></div><form class="feedback-form"><label>Email address<input name="email" type="email" autocomplete="email" placeholder="you@example.com" required></label><fieldset><legend>How would you rate your experience?</legend><div class="rating-options"><label><input type="radio" name="rating" value="1" required><span>1</span></label><label><input type="radio" name="rating" value="2"><span>2</span></label><label><input type="radio" name="rating" value="3"><span>3</span></label><label><input type="radio" name="rating" value="4"><span>4</span></label><label><input type="radio" name="rating" value="5"><span>5</span></label></div></fieldset><label>Your comment<textarea name="comment" rows="5" placeholder="Tell us what you found helpful, or what we could improve." required></textarea></label><button class="feedback-submit" type="submit">Submit feedback</button><p class="feedback-status" role="status" aria-live="polite"></p><p class="feedback-note">Your feedback is sent directly to our team. Please do not include passwords or other sensitive information.</p></form></div>';
  footer.before(feedback);
  const style = document.createElement('style');
  style.textContent = '.feedback-section{background:#eef6f9;border-top:1px solid #d5e0e5;padding:96px max(28px,calc((100vw - 1184px)/2))}.feedback-inner{display:grid;grid-template-columns:.8fr 1.2fr;gap:90px;align-items:start}.feedback-intro h2{font-size:clamp(38px,4vw,58px)}.feedback-intro>p:not(.eyebrow){max-width:440px;color:#52636e;font-size:17px;margin:25px 0 0}.feedback-form{display:grid;gap:20px;background:#fff;padding:32px;border:1px solid #d5e0e5;border-radius:5px;box-shadow:0 16px 42px rgba(24,59,78,.08)}.feedback-form>label,.feedback-form fieldset{display:grid;gap:8px;border:0;padding:0;margin:0;font-size:13px;font-weight:800;color:#2b3c47}.feedback-form input[type=email],.feedback-form textarea{width:100%;border:1px solid #cbd9df;background:#fbfdfe;border-radius:3px;padding:13px 14px;color:#111820;font:400 15px Arial,sans-serif}.feedback-form textarea{resize:vertical;min-height:112px}.feedback-form legend{margin-bottom:4px}.rating-options{display:flex;gap:9px}.rating-options label{cursor:pointer}.rating-options input{position:absolute;opacity:0}.rating-options span{display:grid;place-items:center;width:39px;height:39px;border:1px solid #cbd9df;border-radius:50%;font-weight:800;color:#52636e}.rating-options input:checked+span{background:#111820;border-color:#111820;color:#fff}.feedback-submit{justify-self:start;border:0;border-radius:3px;background:#111820;color:#fff;padding:14px 18px;font:800 14px Arial,sans-serif;cursor:pointer}.feedback-submit:disabled{opacity:.65}.feedback-status{margin:0;color:#176f55;font-size:13px;font-weight:700}.feedback-status.is-error{color:#9a342d}.feedback-note{margin:0;color:#687983;font-size:12px;line-height:1.5}@media(max-width:720px){.feedback-section{padding:72px 20px}.feedback-inner{grid-template-columns:1fr;gap:35px}.feedback-form{padding:23px}}';
  document.head.append(style);
  const form = feedback.querySelector('.feedback-form');
  const button = feedback.querySelector('.feedback-submit');
  const status = feedback.querySelector('.feedback-status');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    formData.append('_subject', 'Website feedback - AtalSinghfoundation');
    button.disabled = true;
    button.textContent = 'Sending...';
    status.textContent = '';
    status.classList.remove('is-error');
    try {
      const response = await fetch('https://formsubmit.co/ajax/connect@atalsinghfoundation.com', { method: 'POST', headers: { Accept: 'application/json' }, body: formData });
      if (!response.ok) throw new Error('Feedback could not be sent.');
      form.reset();
      status.textContent = 'Thank you. Your feedback has been sent to our team.';
    } catch (error) {
      status.textContent = 'We could not send your feedback right now. Please try again shortly.';
      status.classList.add('is-error');
    } finally {
      button.disabled = false;
      button.textContent = 'Submit feedback';
    }
  });
}
