export function renderContact(icon) {
  return `<section class="contact-page">
    <header class="contact-intro"><h1>let’s <span class="hand pencil-underline">talk.</span></h1><p>A project, an opportunity, or a little hello.<br>I’d love to hear from you.</p></header>
    <div class="contact-postcard">
      <span class="tape" aria-hidden="true"></span>
      <div class="contact-postage" aria-hidden="true">${icon('heart')}<span class="hand">hello!</span></div>
      <span class="hand contact-to">to: Kayla ♡</span>
      <label class="tiny" for="contact-email">email me at</label>
      <div class="contact-email-row"><input id="contact-email" type="text" value="kaykayelisheva@gmail.com" readonly spellcheck="false" aria-describedby="copy-email-status"><button type="button" class="contact-copy" data-copy-email data-tactile hidden>copy email ${icon('note')}</button></div>
      <p id="copy-email-status" class="contact-copy-status" role="status" aria-live="polite"></p>
      <div class="contact-social"><span class="hand">or find me here</span><a href="https://www.linkedin.com/in/kayla-elisheva-siwi/" target="_blank" rel="noopener noreferrer" data-tactile>LinkedIn ${icon('arrow')}</a></div>
    </div>
    <a class="text-link contact-back" href="/">← back to my scrapbook</a>
  </section>`;
}
