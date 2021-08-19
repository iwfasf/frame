const fetchJSON=e=>new Promise((t,n)=>{fetch(e+'.json').then(e=>e.json()).then(e=>t(e)).catch(e=>n(e))});let WS,initBackground=()=>new Promise((e,t)=>{let n=new Image;n.src='//cdn.jsdelivr.net/gh/iwfasf/frame@g61r5/img/bg.jpg',n.onload=()=>{const t=$('bg').getContext('2d');t.drawImage(n,0,0),t.translate(32,32),t.canvas.style.background='none',e()},n.onerror=t}),timer=null,url=new URL(location.href);const FRAME=url.searchParams.get('frame')||'solo',SIDE=url.searchParams.get('side')||'bilibili';Promise.all([fetchJSON('//cdn.jsdelivr.net/gh/iwfasf/frame@g61r5/template/'+FRAME),initBackground()]).then(([e])=>{WS=io.connect(location.origin+'/frame?side='+SIDE);const t=(e,t)=>WS.emit('data',{room:'control',field:e,data:t});WS.on('connect',()=>t('f.init',FRAME)),WS.on('frame',e=>{if(e===FRAME)return t('f.init',FRAME);location.search=`?frame=${e}&side=${SIDE}`});const n=$('wrap'),a=Element('div');a.id='head',css(a,{backgroundImage:'url(//cdn.jsdelivr.net/gh/iwfasf/frame@g61r5/img/'+e.head+')',backgroundPosition:e.headAlign,top:e.headTop}),n.append(a);const s=Element('div');s.id='info',css(s,e.info);let o=Element('span').txt('时间表 > iwfasf.com'),i=[Element('span','time'),Element('span','time'),Element('span').txt(':'),Element('span','time'),Element('span','time')];s.append(o),e.info&&e.info.textAlign&&!e.info.zoom?s.append(Element('br')):o.style.marginRight='32px';const r=e=>{let t=new Date,n=t.toTimeString();for(let t=0;t<5;t++)2!==t&&e[t].txt(n[t]);setTimeout(r,6e4*(1+(t.getTime()/6e4<<0))-t.getTime(),e)};r(i),s.append(...i),n.append(s),e.window&&e.window.forEach((e,t)=>{let n=LiveWindow(e);n&&WS.on('f.run',e=>{e[t]&&n.txt(e[t])})});let l=[];WS.on('f.cover',e=>{e.split(',').forEach((e,t)=>{l[t]&&(l[t].style.backgroundImage=`url(//cdn.jsdelivr.net/gh/iwfasf/frame@g61r5/img/${e})`)})}),e.frame.forEach(e=>{const t=Element('div','frame');css(t,{left:e.x+'px',top:e.y+'px',width:e.w+'px',textAlign:e.align}),n.append(t),e.ui.forEach(e=>{switch(e.type){case"cover":let n=Element('div','cover box');css(n,e.style),t.append(n),l.push(n);break;case"timer":timer=new Timer(t),timer.timerBox.className+=' box',css(timer.timerBox,e.style),WS.on('timer',e=>timer[e[0]](e[1])),WS.on('f.est',e=>timer.setDuration(e));break;case"game":let a=Element('p');css(a,e.style),t.append(a),WS.on('f.game',e=>a.txt(e));break;case"est":let s=Element('p'),o=Element('span','cat'),i=Element('span');s.append(o,i),css(s,e.style),t.append(s),WS.on('f.cat',e=>o.txt(e)),WS.on('f.est',e=>{i.txt(' - '+Time.formatMin(e))});break;case'runner':let r=Element('p');t.append(r),WS.on('f.run',e=>{r.innerHTML='<span style="font-size:28px">by</span> '+e.join(', '),r.offsetTop>t.offsetHeight&&css(r,{display:'inline-block',marginLeft:'32px'})});break;case'next':let c=Element('div','next');css(c,e.style),t.append(c),WS.on('f.next',e=>{if(e){css(c,{display:'block',fontSize:''}),c.txt(e);let n=c.offsetWidth,a=t.offsetWidth;n>a&&(c.style.fontSize=a/n*24+'px')}else c.style.display='none'});break;case'relay':t.append(Relay());break;case'danmaku':let m=Danmaku();css(m,e.style),t.append(m);break;case'score':t.append(css(Score(),e.style));break;case'stat':t.append(css(Stat(),e.style));break;case'count':t.append(css(Count(),e.style));break;case'qa':t.append(QAFrame()),QAInit();break;case'mq':t.append(MQFrame()),QAInit()}})})});