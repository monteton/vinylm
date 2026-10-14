/* VinylM — общее ядро для всех вариантов: язык (MN/RU/EN), каталог, иконки, лайтбокс */
(function(){
  var D=window.VM_DATA||{};
  var EXTRA={
    sr:{collapse:'Sakrij',allVideos:'Svi video zapisi',promoNew:'NOVO',promoTitle:'LED ekran do 20 m²',promoSub:'Korak piksela 2,5 mm — oštra slika za scene, festivale i korporativne događaje',promoCta:'Saznajte više',sendWa:'Pošalji na WhatsApp',sendViber:'Pošalji na Viber',msgHello:'Zdravo! Upit sa sajta VinylM:',copied:'Tekst upita je kopiran — nalepite ga u Viber čet i pošaljite.',copyManual:'Kopirajte tekst ispod i nalepite ga u Viber čet.',sendHint:'Upit se šalje porukom na +382 67 439 100',catalogLabel:'Katalog',catalogTitle:'Katalog opreme',catalogHint:'Izaberite kategoriju',catalogSub:'Sve što vam treba za scenu — na jednom mestu',items:'stavki',close:'Zatvori',menu:'Meni',email:'Email',call:'Pozovite',allPhotos:'Sve fotografije',scroll:'Skrolujte',tabAll:'Sve',openCat:'Otvori katalog',follow:'Pratite nas',formOk:'Hvala! Javićemo vam se uskoro.',formDemo:'Ovo je demo-verzija: upit se ne šalje.',formErr:'Greška pri slanju. Pozovite nas ili pišite na vinylmbudva@gmail.com'},
    ru:{collapse:'Свернуть',allVideos:'Все видео',promoNew:'НОВИНКА',promoTitle:'LED-экран до 20 м²',promoSub:'Шаг пикселя 2,5 мм — чёткая картинка для сцен, фестивалей и корпоративных событий',promoCta:'Подробнее',sendWa:'Отправить в WhatsApp',sendViber:'Отправить в Viber',msgHello:'Здравствуйте! Запрос с сайта VinylM:',copied:'Текст запроса скопирован — вставьте его в чат Viber и отправьте.',copyManual:'Скопируйте текст ниже и вставьте его в чат Viber.',sendHint:'Запрос уходит сообщением на +382 67 439 100',catalogLabel:'Каталог',catalogTitle:'Каталог оборудования',catalogHint:'Выберите категорию',catalogSub:'Всё, что нужно для сцены — в одном месте',items:'позиций',close:'Закрыть',menu:'Меню',email:'Email',call:'Позвонить',allPhotos:'Все фотографии',scroll:'Листайте',tabAll:'Все',openCat:'Открыть каталог',follow:'Мы в соцсетях',formOk:'Спасибо! Мы скоро свяжемся с вами.',formDemo:'Это демо-версия: заявка не отправляется.',formErr:'Не удалось отправить. Позвоните нам или напишите на vinylmbudva@gmail.com'},
    en:{collapse:'Collapse',allVideos:'All videos',promoNew:'NEW',promoTitle:'LED screen up to 20 m²',promoSub:'2.5 mm pixel pitch — a sharp picture for stages, festivals and corporate events',promoCta:'Learn more',sendWa:'Send via WhatsApp',sendViber:'Send via Viber',msgHello:'Hello! Inquiry from the VinylM website:',copied:'The inquiry text is copied — paste it into the Viber chat and send.',copyManual:'Copy the text below and paste it into the Viber chat.',sendHint:'The inquiry is sent as a message to +382 67 439 100',catalogLabel:'Catalog',catalogTitle:'Equipment catalog',catalogHint:'Choose a category',catalogSub:'Everything your stage needs — in one place',items:'items',close:'Close',menu:'Menu',email:'Email',call:'Call us',allPhotos:'All photos',scroll:'Scroll',tabAll:'All',openCat:'Open catalog',follow:'Follow us',formOk:'Thank you! We will get back to you shortly.',formDemo:'This is a demo version: the inquiry is not sent.',formErr:'Could not send. Please call us or email vinylmbudva@gmail.com'}
  };
  var LANGS=['sr','ru','en'];
  var lang='sr';
  try{var s=localStorage.getItem('vm-lang');if(LANGS.indexOf(s)>-1)lang=s}catch(e){}
  var listeners=[];

  function t(k){var d=D.i18n&&D.i18n[lang]||{};return d[k]!=null?d[k]:(EXTRA[lang][k]!=null?EXTRA[lang][k]:(D.i18n&&D.i18n.sr&&D.i18n.sr[k])||k)}
  function nm(x){if(typeof x==='string'){return x.charAt(0)==='@'?t(x.slice(1)):x}return x&&x[lang]||''}
  function cat(pid){
    var c=D.catalog[pid];
    return {id:pid,label:c.label[lang],title:c.title[lang],sub:c.sub[lang],
      groups:c.groups.map(function(g){return {key:g.key,icon:g.icon,name:c.names[lang][g.key]||g.key,items:g.items.map(nm),hot:g.items.map(function(i){return !!(i&&i.hot)})}})};
  }
  function apply(){
    document.documentElement.lang=lang==='sr'?'sr-Latn':lang;
    [].forEach.call(document.querySelectorAll('[data-i]'),function(e){e.textContent=t(e.getAttribute('data-i'))});
    [].forEach.call(document.querySelectorAll('[data-ih]'),function(e){e.innerHTML=t(e.getAttribute('data-ih'))});
    [].forEach.call(document.querySelectorAll('[data-ph]'),function(e){e.setAttribute('placeholder',t(e.getAttribute('data-ph')))});
    [].forEach.call(document.querySelectorAll('[data-lang]'),function(b){b.classList.toggle('on',b.getAttribute('data-lang')===lang);b.setAttribute('aria-pressed',b.getAttribute('data-lang')===lang)});
    listeners.forEach(function(f){try{f(lang)}catch(e){console.error(e)}});
  }
  function setLang(l){if(LANGS.indexOf(l)<0)return;lang=l;try{localStorage.setItem('vm-lang',l)}catch(e){}apply()}

  /* иконки (штриховые, 24px) */
  var P={
    speaker:'<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><circle cx="12" cy="9" r="2"/><circle cx="12" cy="16" r="3.4"/>',
    console:'<path d="M5 3v18M12 3v18M19 3v18"/><circle cx="5" cy="9" r="2" class="f"/><circle cx="12" cy="15" r="2" class="f"/><circle cx="19" cy="7" r="2" class="f"/>',
    mic:'<rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
    headphones:'<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="7" rx="1.5"/><rect x="17" y="14" width="4" height="7" rx="1.5"/>',
    disc:'<circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="3"/><path d="M12 5.5a6.5 6.5 0 0 1 6.5 6.5"/>',
    guitar:'<path d="M14.5 9.5l5.5-5.5M17 3l4 4M10.5 10.5a4 4 0 0 0-5.5 1 4 4 0 0 0-1.5 4.5A3.5 3.5 0 0 0 7 21a5 5 0 0 0 5-4 4 4 0 0 0 0-5"/>',
    bulb:'<path d="M9 18h6M10 21.5h4M12 2.5a6.5 6.5 0 0 0-3.5 12c.7.6 1 1.3 1 2h5c0-.7.3-1.4 1-2a6.5 6.5 0 0 0-3.5-12z"/>',
    truss:'<path d="M2.5 6h19M2.5 18h19M2.5 6l4.5 12 4.5-12 4.5 12 3-8"/>',
    cog:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/>',
    spark:'<path d="M12 2.5l1.9 6.6 6.6 1.9-6.6 1.9L12 19.5l-1.9-6.6L3.5 11l6.6-1.9zM19 16.5l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7z"/>',
    screen:'<rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    projector:'<rect x="2.5" y="8" width="19" height="9" rx="2.5"/><circle cx="16" cy="12.5" r="2.4"/><path d="M6 17v2.5M18 17v2.5M5.5 11.5h3"/>',
    gallery:'<rect x="3" y="3.5" width="18" height="17" rx="2.5"/><circle cx="9" cy="9.5" r="1.8"/><path d="M21 16l-5-5-9 9"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    close:'<path d="M6 6l12 12M18 6L6 18"/>',
    pin:'<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    phone:'<path d="M5 3.5h4l1.5 4.5-2.3 1.5a11 11 0 0 0 5.8 5.8l1.5-2.3L20 14.5v4a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 3 5.7 2 2 0 0 1 5 3.5z"/>',
    mail:'<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3 7l9 6.5L21 7"/>',
    insta:'<rect x="3" y="3" width="18" height="18" rx="5.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r=".8" class="f"/>',
    fb:'<path d="M14 21v-8h2.7l.5-3.3H14V7.6c0-.9.4-1.6 1.7-1.6h1.6V3.2A19 19 0 0 0 15 3c-2.5 0-4.2 1.5-4.2 4.2v2.5H8V13h2.8v8z"/>',
    play:'<path d="M7 4.5v15l13-7.5z" class="f"/>'
  };
  var MAP={'fa-volume-up':'speaker','fa-sliders-h':'console','fa-microphone':'mic','fa-headphones':'headphones','fa-compact-disc':'disc','fa-guitar':'guitar','fa-lightbulb':'bulb','fa-drafting-compass':'truss','fa-cogs':'cog','fa-magic':'spark','fa-tv':'screen','fa-desktop':'screen','fa-film':'projector','fa-video':'projector'};
  function icon(name,cls){
    var k=P[name]?name:(MAP[name]||'spark');
    return '<svg class="ic '+(cls||'')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+P[k]+'</svg>';
  }
  var CATICON={sound:'speaker',light:'bulb',effects:'spark',gallery:'gallery'};

  /* лайтбокс */
  function lightbox(list,start){
    var lb=document.getElementById('vmLb');
    if(!lb){
      lb=document.createElement('div');lb.id='vmLb';lb.className='vm-lb';
      lb.innerHTML='<button class="x" aria-label="Close">'+icon('close')+'</button><button class="p" aria-label="Prev">'+icon('arrow')+'</button><img alt=""><button class="n" aria-label="Next">'+icon('arrow')+'</button>';
      document.body.appendChild(lb);
      var st=document.createElement('style');
      st.textContent='.vm-lb{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.94);display:none;place-items:center;padding:3vw}.vm-lb.on{display:grid}.vm-lb img{max-width:94vw;max-height:88vh;object-fit:contain;border-radius:10px;box-shadow:0 30px 80px rgba(0,0,0,.6)}.vm-lb button{position:absolute;width:54px;height:54px;border-radius:50%;border:1px solid rgba(255,255,255,.3);background:rgba(20,20,20,.7);color:#fff;cursor:pointer;display:grid;place-items:center;backdrop-filter:blur(8px)}.vm-lb button svg{width:24px;height:24px}.vm-lb .x{right:3vw;top:3vw}.vm-lb .p{left:2vw;top:50%;transform:rotate(180deg)}.vm-lb .n{right:2vw;top:50%}@media(max-width:700px){.vm-lb button{width:44px;height:44px}.vm-lb .p{left:10px;top:auto;bottom:18px}.vm-lb .n{right:10px;top:auto;bottom:18px}}';
      document.head.appendChild(st);
    }
    var i=start||0,img=lb.querySelector('img');
    function show(n){i=(n+list.length)%list.length;img.src=list[i]}
    function close(){lb.classList.remove('on');window.VM.lenis&&window.VM.lenis.start();document.removeEventListener('keydown',key)}
    function key(e){if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)}
    lb.querySelector('.x').onclick=close;lb.querySelector('.p').onclick=function(){show(i-1)};lb.querySelector('.n').onclick=function(){show(i+1)};
    lb.onclick=function(e){if(e.target===lb)close()};
    show(i);lb.classList.add('on');window.VM.lenis&&window.VM.lenis.stop();document.addEventListener('keydown',key);
  }

  /* страховка анимаций появления: показать всё, что уже в зоне видимости */
  function revealGuard(sel){
    function go(){[].forEach.call(document.querySelectorAll(sel),function(e){if(e._rd)return;var r=e.getBoundingClientRect();if(r.top<innerHeight*.96){e._rd=1;window.gsap&&gsap.to(e,{opacity:1,y:0,x:0,duration:.9,ease:'power3.out',overwrite:true})}})}
    return go;
  }

  /* видео-модалка (вертикальные ролики) */
  function video(src,poster){
    var m=document.getElementById('vmVid');
    if(!m){
      m=document.createElement('div');m.id='vmVid';m.className='vm-vid';
      m.innerHTML='<button class="x" aria-label="Close">'+icon('close')+'</button><video controls playsinline></video>';
      document.body.appendChild(m);
      var st=document.createElement('style');
      st.textContent='.vm-vid{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.95);display:none;place-items:center}.vm-vid.on{display:grid}.vm-vid video{height:92vh;max-width:96vw;border-radius:14px;background:#000;box-shadow:0 30px 80px rgba(0,0,0,.7)}.vm-vid .x{position:absolute;right:3vw;top:3vw;width:54px;height:54px;border-radius:50%;border:1px solid rgba(255,255,255,.3);background:rgba(20,20,20,.7);color:#fff;cursor:pointer;display:grid;place-items:center;z-index:2}.vm-vid .x svg{width:24px;height:24px}';
      document.head.appendChild(st);
    }
    var v=m.querySelector('video');
    function close(){m.classList.remove('on');v.pause();v.removeAttribute('src');v.load();window.VM.lenis&&window.VM.lenis.start();document.removeEventListener('keydown',key)}
    function key(e){if(e.key==='Escape')close()}
    m.querySelector('.x').onclick=close;m.onclick=function(e){if(e.target===m)close()};
    v.poster=poster||'';v.src=src;m.classList.add('on');window.VM.lenis&&window.VM.lenis.stop();document.addEventListener('keydown',key);v.play().catch(function(){});
  }

  function init(){
    [].forEach.call(document.querySelectorAll('[data-lang]'),function(b){b.addEventListener('click',function(){setLang(b.getAttribute('data-lang'))})});
    apply();
  }

  window.VM={
    get lang(){return lang},t:t,nm:nm,cat:cat,icon:icon,catIcon:CATICON,setLang:setLang,onLang:function(f){listeners.push(f)},apply:apply,init:init,lightbox:lightbox,video:video,revealGuard:revealGuard,data:D,lenis:null,
    img:function(n){return '../assets/img/'+n},
    fmt:function(n){return n},
    cats:['sound','light','effects']
  };
})();
