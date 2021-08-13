const anm=$('anm');anm.innerHTML='<svg id="fasf" width="1500" height="112" viewBox="-8 0 870 64"><defs><clipPath id="clip"><path fill="none" d="M599 36l27-26h210v17l9-9v28H538l-16 16V44h-18v18l-16-16h-80l-16 16V46h-21l-16 16V46H203l-16 16V46.5l-71-.5v16l-16-16H16L0 62V9h148v18h-27v10h10l-9-9h27V10h128l-26 26h8l26-26 59 1 9-9h112v25l-9 9h10V10h147l-26 26h12z"/></clipPath></defs><g><path d="M36 22H4v40M36 33H4M69 46V20L40 49M106 18v28L79 19v27M122 32h21v10h-27V22h31M181 46V20l-29 29M218 46V27l-13.5 13.2L191 27v35M259 22h-31v20h31M228 32h31M279 42h28l-20-20h28M349 2v40h-28V18M386 46V27l-13.5 13.2L359 27v35M464 22h-31v20h31M433 32h31M423 46V27l-13.5 13.2L396 27v35M507 53l-21-21h12V22h-28v24M558 22h-32v40M558 33h-32M595 22h-31v20h31M564 32h31M628 46V20l-29 29M634 42h28l-20-20h28M672 22h34M689 46V22M760 42h-27l10-10h13V22h-31M835 42h-27l10-10h13V22h-31M766 22h27v20h-27zM841 46V18"/></g></svg><svg id="trans" width="1920" height="1080" viewBox="0 0 1920 1080"><path stroke-dashoffset="3800" d="M1920 600h-820l-100-100-1000 0"/><path stroke-dashoffset="4000" d="M700-500V1080"/><path stroke-dashoffset="3000" d="M1920 300H1280L800 780H0"/><path stroke-dashoffset="3200" d="M0 600h800l120-120 1000 0"/><path stroke-dashoffset="3600" d="M0 430H750l400 400v250"/><path stroke-dashoffset="3400" d="M1080-200V400l300 300H1920"/></svg>';const hf=[Element('div'),Element('div')];hf.forEach((t,e)=>{t.style.transform=(e?'scaleY(-1) ':'')+'translateY(-100%)',t.innerHTML='<svg width="1920" height="192" viewBox="0 -16 1920 192"><path fill="#0008" stroke="#cef8" stroke-width="2" d="M-32 160H400l32-24H1488l32 24H1952V-32H-32V160"/><path fill="#ed2" d="M396 161h8l32-26h-8l-32 26"/><path fill="#ed2" d="M1484 135h8l32 26h-8l-32-26"/></svg>'});let url=new URL(location.href),params=url.searchParams;const WS=io.connect(location.origin+'/frame?side=trans');WS.on('trans',t=>{for(let e in t)url.searchParams.set(e,t[e]);location.href=url.href});const next=Element('div','next'),nextBox=Element('div');next.ap(nextBox);const cover=Element('div');cover.style.backgroundImage=params.get('t.cover'),WS.on('t.cover',t=>cover.style.backgroundImage='url(//cdn.jsdelivr.net/gh/iwfasf/frame@g5uwz/img/'+t),cover.id='cover';const _time=Element('p').txt('Next - '+params.get('t.time'));WS.on('t.time',t=>_time.txt('Next - '+t));const _game=Element('p').txt(params.get('t.game'));WS.on('t.game',t=>_game.txt(t));const _est=Element('p');_est.append(Element('span','cat').txt(params.get('t.cat')),Element('span').txt(' - '+Time.formatMin(params.get('t.est')))),WS.on('t.cat',t=>_est.firstChild.txt(t)),WS.on('t.est',t=>_est.lastChild.txt(' - '+Time.formatMin(t)));const _run=Element('p');_run.append(Element('span','cat').txt('Others'===params.get('t.type')?'':params.get('t.type')+' '),css(Element('span').txt('by'),{fontSize:'28px'}),Element('span').txt(' '+params.get('t.run'))),WS.on('t.type',t=>_run.firstChild.txt('Others'===t?'':t+' ')),WS.on('t.run',t=>_run.lastChild.txt(' '+t)),nextBox.ap(cover,_time,_game,_est,_run);const Danmaku=io.connect(location.origin+'/danmaku'),canvas=Element('canvas',0,{id:'canvas',width:1920,height:600});document.body.ap(canvas);const ctx=canvas.transferControlToOffscreen().getContext('2d');let sprNormal;ctx.imageSmoothingEnabled=!1,ctx.globalAlpha=.5;let sprSp=[];Sprite('//cdn.jsdelivr.net/gh/iwfasf/frame@g5uwz/img/spr.png',32).then(t=>sprNormal=t),Sprite('//cdn.jsdelivr.net/gh/iwfasf/frame@g5uwz/img/4B6.png',152).then(t=>sprSp.push(t)),Sprite('//cdn.jsdelivr.net/gh/iwfasf/frame@g5uwz/img/K.png',109).then(t=>sprSp.push(t)),Sprite('//cdn.jsdelivr.net/gh/iwfasf/frame@g5uwz/img/M.png',111).then(t=>sprSp.push(t)),Sprite('//cdn.jsdelivr.net/gh/iwfasf/frame@g5uwz/img/G.png',100).then(t=>sprSp.push(t)),Sprite('//cdn.jsdelivr.net/gh/iwfasf/frame@g5uwz/img/P.png',93).then(t=>sprSp.push(t)),Sprite('//cdn.jsdelivr.net/gh/iwfasf/frame@g5uwz/img/T.png',111).then(t=>sprSp.push(t)),Sprite('//cdn.jsdelivr.net/gh/iwfasf/frame@g5uwz/img/C.png',96).then(t=>sprSp.push(t));const obj=[],createObj=(t,e)=>{e||(e=2+2*Math.random());let a=Math.max(t.w,t.h)*e*Math.SQRT1_2;return{spr:t[Math.random()*t.length<<0],x:2e3,y:a+Math.random()*(600-2*a),s:e,a:Math.random()*Math.PI*2,r:.1*(Math.random()-.5),d:4+4*Math.random(),h:t.w>>1,v:t.h>>1}},wait=t=>new Promise(e=>setTimeout(e,t));async function animation(){await wait(3e3),css($('fasf'),{strokeDasharray:200,strokeDashoffset:200,animation:'fasf cubic-bezier(0, 0, 0.5, 1) 2s reverse'}),await wait(1700),anm.style.filter='none',anm.innerHTML='',anm.ap(...hf),await wait(300),hf.forEach(t=>t.style.transform=t.style.transform.slice(0,-18)),await wait(1e3),$('head').innerHTML='<svg width="1200" height="80" viewBox="-8 0 960 64"><defs><clipPath id="clip"><path fill="none" d="M599 36l27-26h210v17l9-9v28H538l-16 16V44h-18v18l-16-16h-80l-16 16V46h-21l-16 16V46H203l-16 16V46.5l-71-.5v16l-16-16H16L0 62V9h148v18h-27v10h10l-9-9h27V10h128l-26 26h8l26-26 59 1 9-9h112v25l-9 9h10V10h147l-26 26h12z"/></clipPath></defs><g id="stroke"><path d="M36 22H4v40M36 33H4M69 46V20L40 49M106 18v28L79 19v27M122 32h21v10h-27V22h31M181 46V20l-29 29M218 46V27l-13.5 13.2L191 27v35M259 22h-31v20h31M228 32h31M279 42h28l-20-20h28M349 2v40h-28V18M386 46V27l-13.5 13.2L359 27v35M464 22h-31v20h31M433 32h31M423 46V27l-13.5 13.2L396 27v35M507 53l-21-21h12V22h-28v24M558 22h-32v40M558 33h-32M595 22h-31v20h31M564 32h31M628 46V20l-29 29M634 42h28l-20-20h28M672 22h34M689 46V22M760 42h-27l10-10h13V22h-31M835 42h-27l10-10h13V22h-31M766 22h27v20h-27zM841 46V18"/></g></svg>';const t=$('info');css(t,{whiteSpace:'nowrap',width:0,textAlign:'right',overflow:'hidden'}),document.body.append(next),await wait(500),css(t,{transition:'width 1s',width:'580px'});let e=Element('span').txt('时间表 > iwfasf.com'),a=[Element('span','time'),Element('span','time'),Element('span').txt(':'),Element('span','time'),Element('span','time')];e.style.marginRight='32px';const h=t=>{let e=new Date,a=e.toTimeString();for(let e=0;e<5;e++)2!==e&&t[e].txt(a[e]);setTimeout(h,6e4*(1+(e.getTime()/6e4<<0))-e.getTime(),t)};h(a),t.append(e,...a);const n=()=>{ctx.setTransform(1,0,0,1,0,0),ctx.clearRect(0,0,1920,600);for(let t=obj.length;t--;){let e=obj[t];if(e.x-=e.d,e.x<=-80){obj.splice(t,1);continue}e.a+=e.r;let a=Math.cos(e.a),h=Math.sin(e.a),n=e.s;ctx.setTransform(a*n,-h*n,h*n,a*n,e.x,e.y),ctx.drawImage(e.spr,-e.h,-e.v)}requestAnimationFrame(n)};n(),Danmaku.on('danmaku',()=>obj.push(createObj(sprNormal))),Danmaku.on('gift',t=>{let e='gold'===t.type?t.coin/1e4:t.coin/1e5;if(obj.push(createObj(sprSp[Math.random()*sprSp.length<<0],1)),e>=1){const t=e=>{obj.push(createObj(sprSp[Math.random()*sprSp.length<<0],1)),--e>=1&&setTimeout(t,200,e)};setTimeout(t,200,e)}})}animation();