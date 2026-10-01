/* Aliyoga — inscription à « La lettre d'Aliyoga » (liste Brevo)
   Le formulaire est inséré juste avant le pied de page de chaque page qui charge ce script. */
(function(){
  var ACTION = 'https://328cc19b.sibforms.com/serve/MUIFAKiUMenusYU3BTRA962QGzzk6TtESmW53KEQel1UbylYnAVNg-ocsqIqMK4y7kHPWQ2qZcVKmVYqw91UuhcMFSvrujNxo5HdBkx4HNHAl9tMqHNNi-MVjnZeOVx2HvUMWcIRlgCSdbAX7c5SNPljruOybC9Zjs8WKnB1VwG-bBfHMX5biMrnHgitnzSTlv6jinj6EAtZt8q0TQ==';

  var footer = document.querySelector('footer');
  if (!footer || document.getElementById('newsletter')) return;

  var sec = document.createElement('section');
  sec.className = 'newsletter';
  sec.id = 'newsletter';
  sec.innerHTML =
    '<div class="container nl-inner">'
    + '<p class="nl-label">La lettre d\'Aliyoga 🍂</p>'
    + '<h2>Une lettre, chaque mois</h2>'
    + '<p class="nl-intro">Mes articles, les prochains rendez-vous et un peu d\'inspiration pour ta pratique. Pas plus.</p>'
    + '<form class="nl-form" novalidate>'
    +   '<div class="nl-fields">'
    +     '<input type="text" name="PRENOM" placeholder="Ton prénom" autocomplete="given-name" required aria-label="Ton prénom"/>'
    +     '<input type="email" name="EMAIL" placeholder="Ton e-mail" autocomplete="email" required aria-label="Ton e-mail"/>'
    +     '<button type="submit" class="btn">Je m\'inscris</button>'
    +   '</div>'
    +   '<input type="text" name="email_address_check" value="" class="nl-hp" tabindex="-1" autocomplete="off" aria-hidden="true"/>'
    +   '<label class="nl-consent"><input type="checkbox" name="consent" required/> '
    +     '<span>J\'accepte de recevoir la lettre d\'Aliyoga. Je peux me désinscrire à tout moment. '
    +     '<a href="confidentialite.html">Confidentialité</a></span></label>'
    +   '<p class="nl-msg" role="status" aria-live="polite"></p>'
    + '</form>'
    + '</div>';
  footer.parentNode.insertBefore(sec, footer);

  var form = sec.querySelector('form');
  var msg = sec.querySelector('.nl-msg');
  var btn = form.querySelector('button');
  function say(text, ok){ msg.textContent = text; msg.className = 'nl-msg ' + (ok ? 'ok' : 'err'); }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var prenom = form.PRENOM.value.trim();
    var email = form.EMAIL.value.trim();
    if (!prenom) { say('Indique ton prénom 🙂', false); form.PRENOM.focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say('Vérifie ton adresse e-mail et réessaie.', false); form.EMAIL.focus(); return; }
    if (!form.consent.checked) { say('Coche la case pour accepter de recevoir la lettre.', false); return; }

    var data = new FormData();
    data.append('PRENOM', prenom);
    data.append('EMAIL', email);
    data.append('email_address_check', form.email_address_check.value);
    data.append('locale', 'fr');

    btn.disabled = true; btn.textContent = 'Un instant…';
    fetch(ACTION + '?isAjax=1', { method: 'POST', body: data })
      .then(function(r){ return r.json(); })
      .then(function(res){
        if (res && res.success) {
          form.querySelector('.nl-fields').style.display = 'none';
          form.querySelector('.nl-consent').style.display = 'none';
          say('Merci ' + prenom + ', tu es bien inscrite ! Rendez-vous dans ta boîte mail au début du mois prochain 🍂', true);
        } else { throw new Error('refus'); }
      })
      .catch(function(){
        say('Oups, l\'inscription n\'a pas fonctionné. Réessaie dans un instant, ou écris-moi à aliyoga2508@gmail.com.', false);
      })
      .then(function(){ btn.disabled = false; btn.textContent = 'Je m\'inscris'; });
  });
})();
