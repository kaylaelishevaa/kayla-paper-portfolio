(() => {
  'use strict';
  const root = document.documentElement;
  const transientMotions = new Set();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motion = !reduced.matches;
  const syncMotion = () => {
    motion = !reduced.matches;
    root.dataset.motion = motion ? 'on' : 'off';
    if (!motion) { transientMotions.forEach(animation => animation.cancel()); transientMotions.clear(); }
    document.dispatchEvent(new Event('portfolio:motionchange'));
  };
  syncMotion();
  reduced.addEventListener('change', syncMotion);

  const copyEmail = document.querySelector('[data-copy-email]');
  if (copyEmail) {
    const address = document.getElementById('contact-email');
    const status = document.getElementById('copy-email-status');
    copyEmail.hidden = false;
    copyEmail.addEventListener('click', async () => {
      copyEmail.disabled = true;
      status.textContent = '';
      let copied = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(address.value);
          copied = true;
        }
      } catch { /* The address stays selectable if clipboard access is unavailable. */ }
      if (!copied) {
        address.focus({preventScroll:true});
        address.select();
        address.setSelectionRange(0, address.value.length);
        try { copied = document.execCommand('copy'); } catch { copied = false; }
      }
      status.textContent = copied ? 'Email copied ♡' : 'Select and copy the email address above.';
      copyEmail.disabled = false;
    });
  }

  // A short, pre-rendered hand wave. One atlas; no video decoder or WebGL scene.
  const avatar = document.querySelector('.avatar-button');
  if (avatar) {
    const scene = avatar.closest('.avatar-scene');
    const bubble = scene.querySelector('.hi-bubble');
    const sheet = scene.querySelector('.avatar-sheet');
    let greetingTimer, waveTimer, frame, latestPointer, waving = false, sequence = 0;
    const sheetReady = sheet.decode ? sheet.decode().then(() => true).catch(() => false) : Promise.resolve(sheet.complete);
    const finishWave = () => {
      clearTimeout(waveTimer);
      waving = false;
      avatar.classList.remove('is-waving');
    };
    const greet = async () => {
      clearTimeout(greetingTimer);
      bubble.textContent = 'hii, you! ♡';
      bubble.classList.add('is-visible');
      greetingTimer = setTimeout(() => bubble.classList.remove('is-visible'), 2700);
      if (!motion || waving) return;
      waving = true;
      const current = ++sequence;
      const ready = await sheetReady;
      if (current !== sequence) return;
      if (!ready || !motion || document.hidden) { finishWave(); return; }
      avatar.classList.add('is-waving');
      waveTimer = setTimeout(finishWave, 2350);
      for (let i = 0; i < 3; i++) {
        const piece = document.createElement('span');
        piece.className = 'confetti';
        piece.setAttribute('aria-hidden', 'true');
        piece.textContent = i === 1 ? '♡' : '✧';
        piece.style.setProperty('--dx', `${(i - 1) * 75}px`);
        piece.style.setProperty('--dy', `${-55 - Math.abs(i - 1) * 20}px`);
        scene.append(piece);
        setTimeout(() => piece.remove(), 1100);
      }
    };
    sheet.addEventListener('animationend', event => { if(event.animationName === 'kayla-hand-wave') finishWave(); });
    avatar.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') greet(); });
    avatar.addEventListener('focus', greet);
    avatar.addEventListener('click', greet);
    avatar.addEventListener('pointermove', event => {
      if (!motion || event.pointerType !== 'mouse') return;
      latestPointer = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const rect = avatar.getBoundingClientRect();
        avatar.style.setProperty('--ry', `${((latestPointer.x - rect.left) / rect.width - .5) * 7}deg`);
        avatar.style.setProperty('--rx', `${((latestPointer.y - rect.top) / rect.height - .5) * -4}deg`);
        frame = null;
      });
    });
    avatar.addEventListener('pointerleave', () => {
      if (frame) cancelAnimationFrame(frame);
      frame = null;
      avatar.style.setProperty('--ry', '0deg');
      avatar.style.setProperty('--rx', '0deg');
    });
    document.addEventListener('portfolio:motionchange', () => {
      if (!motion) { sequence++; finishWave(); }
    });
  }

  // Finite springs only: no simulation or animation loop while the page is idle.
  const springs = new WeakMap();
  const settle = (element, x = 0, y = -10, rotation = 0) => {
    if (!motion || !element.animate) return;
    springs.get(element)?.cancel();
    const frames = [
      {translate:`${x}px ${y}px`,rotate:`${rotation}deg`,scale:'1.03',offset:0},
      {translate:`${-x*.18}px ${-y*.18}px`,rotate:`${-rotation*.22}deg`,scale:'.985',offset:.4},
      {translate:`${x*.06}px ${y*.06}px`,rotate:`${rotation*.08}deg`,scale:'1.008',offset:.67},
      {translate:'0px 0px',rotate:'0deg',scale:'1',offset:1}
    ];
    const animation = element.animate(frames,{duration:650,easing:'cubic-bezier(.25,.7,.35,1)'});
    springs.set(element, animation);
    transientMotions.add(animation);
    const done = () => {transientMotions.delete(animation);if(springs.get(element)===animation) springs.delete(element);};
    animation.onfinish = done; animation.oncancel = done;
  };
  document.querySelectorAll('[data-bounce]').forEach(element => {
    element.addEventListener('click', () => settle(element, 0, -13, 16));
    element.addEventListener('pointerenter', event => {
      if(event.pointerType === 'mouse') settle(element,0,-7,9);
    });
  });
  // Paper has a little give: folders, tickets, project cards and controls all
  // respond to a visit or a tap, then settle. Touch scrolling stays native.
  const tactileSelector = '[data-tactile], .experiment-card, .extra-project, .play-card, .flow-node, .flow-next, .replay-writing';
  document.querySelectorAll(tactileSelector).forEach((element, index) => {
    const tilt = index % 2 ? 1.5 : -1.5;
    const react = event => {
      if (event.target.closest('[data-bounce]')) return;
      if (event.target.closest(tactileSelector) !== element) return;
      settle(element, 0, -6, tilt);
    };
    element.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') react(event);
    });
    element.addEventListener('focusin', react);
    element.addEventListener('click', react);
  });
  // Keep the current chapter in view in the phone's horizontal folder strip.
  const currentFolder = document.querySelector('.folder-tab[aria-current="page"]');
  if (currentFolder) {
    const strip = currentFolder.parentElement;
    const left = currentFolder.offsetLeft - strip.offsetLeft;
    if (left + currentFolder.offsetWidth > strip.clientWidth) {
      strip.scrollLeft = Math.max(0, left - 18);
    }
  }
  document.querySelectorAll('.floating-note').forEach(note => {
    const front = note.querySelector('.sticky-front');
    let drag = null, pendingFrame = 0, suppressClickUntil = 0;
    const paintDrag = () => {
      pendingFrame = 0;
      if (!drag?.active) return;
      note.style.translate = `${drag.x}px ${drag.y}px`;
      note.style.rotate = `${drag.x*.08}deg`;
    };
    front.addEventListener('pointerdown', event => {
      if (!motion || event.button !== 0) return;
      springs.get(note)?.cancel();
      drag = {id:event.pointerId, originX:event.clientX, originY:event.clientY, x:0, y:0, active:false, touch:event.pointerType==='touch'};
    });
    front.addEventListener('pointermove', event => {
      if (!drag || drag.id !== event.pointerId) return;
      const dx = event.clientX-drag.originX, dy = event.clientY-drag.originY;
      if (!drag.active) {
        if(Math.hypot(dx,dy)<7) return;
        // Vertical gestures keep scrolling the page on a phone.
        if(drag.touch && Math.abs(dy)>Math.abs(dx)){drag=null;return;}
        drag.active=true;
        front.setPointerCapture(event.pointerId);
        note.classList.add('is-dragging');
      }
      drag.x = 90*Math.tanh(dx/100);
      drag.y = 55*Math.tanh(dy/80);
      if(!pendingFrame) pendingFrame=requestAnimationFrame(paintDrag);
      event.preventDefault();
    });
    const finish = event => {
      if(!drag || drag.id!==event.pointerId) return;
      if(pendingFrame) cancelAnimationFrame(pendingFrame);
      pendingFrame=0;
      const last=drag; drag=null;
      note.classList.remove('is-dragging');
      note.style.translate=''; note.style.rotate='';
      if(front.hasPointerCapture(event.pointerId)) front.releasePointerCapture(event.pointerId);
      if(last.active){suppressClickUntil=performance.now()+450;settle(note,last.x,last.y,last.x*.08);}
    };
    front.addEventListener('pointerup',finish);
    front.addEventListener('pointercancel',finish);
    front.addEventListener('lostpointercapture',finish);
    front.addEventListener('pointerleave',event=>{if(drag && !drag.active) drag=null;});
    note.addEventListener('click', event => {
      if(performance.now()<suppressClickUntil){event.preventDefault();event.stopImmediatePropagation();}
    }, true);
  });

  document.querySelectorAll('[data-peek]').forEach(note => {
    const front = note.querySelector('.sticky-front');
    const back = note.querySelector('.sticky-back');
    const close = note.querySelector('.note-close');
    front.addEventListener('click', () => {
      front.hidden = true; back.hidden = false;
      front.setAttribute('aria-expanded', 'true'); close.focus({preventScroll:true});
    });
    close.addEventListener('click', () => {
      front.hidden = false; back.hidden = true;
      front.setAttribute('aria-expanded', 'false'); front.focus({preventScroll:true});
    });
  });

  const tabs = [...document.querySelectorAll('[data-project-tab]')];
  const activateTab = (tab, focus = false) => {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus({preventScroll:true});
    // Only the horizontal tab strip moves. Do not move the visitor's page position.
    const strip = tab.parentElement;
    const left = tab.offsetLeft - strip.offsetLeft;
    if (left < strip.scrollLeft || left + tab.offsetWidth > strip.scrollLeft + strip.clientWidth) {
      strip.scrollTo({left: Math.max(0, left - 12), behavior: motion ? 'smooth' : 'instant'});
    }
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === 'Home') next = tabs[0];
      if (event.key === 'End') next = tabs[tabs.length - 1];
      if (next) { event.preventDefault(); activateTab(next, true); }
    });
  });

  document.querySelectorAll('[data-flow]').forEach(widget => {
    const steps = JSON.parse(widget.querySelector('.flow-data').textContent);
    const buttons = [...widget.querySelectorAll('[data-step]')];
    const next = widget.querySelector('.flow-next');
    let index = 0;
    const select = value => {
      index = value;
      buttons.forEach((button, i) => {
        button.classList.toggle('is-active', i === index);
        button.setAttribute('aria-pressed', String(i === index));
      });
      widget.querySelector('.flow-caption').textContent = steps[index].text;
      widget.querySelector('.flow-progress span').style.width = `${(index + 1) / steps.length * 100}%`;
      next.textContent = index === steps.length - 1 ? 'start again ↺' : 'next step →';
    };
    buttons.forEach((button, i) => button.addEventListener('click', () => select(i)));
    next.addEventListener('click', () => select((index + 1) % steps.length));
  });

  const writing = document.querySelector('[data-writing]');
  const replay = () => {
    if (!writing) return;
    writing.classList.remove('is-writing');
    requestAnimationFrame(() => requestAnimationFrame(() => writing.classList.add('is-writing')));
  };
  document.querySelector('.replay-writing')?.addEventListener('click', replay);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('offscreen', !entry.isIntersecting);
        if (entry.isIntersecting && entry.target === writing && !writing.dataset.started) {
          writing.dataset.started = 'true'; replay();
        }
      });
    }, {rootMargin:'80px', threshold:0});
    document.querySelectorAll('.hero-stage, [data-writing]').forEach(el => observer.observe(el));
  } else { replay(); }
  document.addEventListener('visibilitychange', () => {
    document.body.classList.toggle('offscreen', document.hidden);
  });
})();
