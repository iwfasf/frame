window.init=async()=>{let[t,e,n]=await Promise.all([new AV.Query('Sub').include('run').limit(999).find({useMasterKey:!0}),new AV.Query('SP').include('r').limit(999).find({useMasterKey:!0}),new AV.Query('Control').include('sch').limit(999).find({useMasterKey:!0})]);const l=$('list'),a=$('edit'),s=$('schedule'),i=['var(--pending)','var(--accept)','var(--decline)','var(--backup)'],r=[1660348800,1660435200,1660867200,1660953600,166104e4],o=(t,e)=>t.onclick=()=>{let n=$c('list-now')[0];n&&(n.classList.remove('list-now'),n.style.background='',n.p.style.display='none'),t.classList.add('list-now'),t.style.background=t.style.borderColor||i[0],t.p.style.display='',css(b,{background:''}),e?.()},c=t=>t.forEach(t=>{let e=0;for(;e<r.length&&!(r[e]>t);e++);let n=(t-r[--e])/3600;css(b[20*e+n],{background:'#def'})});t.forEach(t=>{let e=Element('div','list');e.id=t.id,e.sub=t,e.p=Element('div'),e.add=Element('div','add-sch');let n=t.get('run').map(t=>t.get('name')||t.getUsername()).join(', ');e.ap(bindUpd(Element('h4'),t,'game',(t,e)=>t.innerText=e.map(t=>t[0]).join(' + ')),bindUpd(Element('span'),t,'est',(t,e)=>t.innerText=Time.formatMin(e)+'-'),Element('span').txt(n)),bindUpd(e,t,'status',(t,e)=>{t.style.borderColor=i[e],t.classList.contains('list-now')&&(t.style.background=i[e])}),o(e,()=>c(t.get('time'))),e.p.ap(Element('span').txt('状态:'),bind(Element('select').ap(Element('option',0,{value:0}).txt('待审核'),Element('option',0,{value:1}).txt('已通过'),Element('option',0,{value:2}).txt('未通过'),Element('option',0,{value:3}).txt('备选')),t,'status',t=>Number(t)),bind(Element('div'),t,'game').ap(...t.get('game').map((t,e)=>bindArr(Element('div'),e).ap(Element('span').txt('游戏:'),bindArr(Element('input'),0),Element('br'),Element('span').txt('链接:'),bindArr(Element('input'),1)))),Element('p').txt('选手: '+n),Element('span').txt('时长:'),bind(Element('input','inline'),t,'est',t=>Number(t)),Element('span').txt('(PB: '+t.get('pb')+')'),Element('br'),Element('span').txt('分类:'),bind(Element('select').ap(Element('option',0,{value:0}).txt('Solo Run'),Element('option',0,{value:1}).txt('Standard Race'),Element('option',0,{value:2}).txt('Blind Race'),Element('option',0,{value:3}).txt('Co-op Run'),Element('option',0,{value:4}).txt('Others')),t,'type',t=>Number(t)),bind(Element('input','inline'),t,'cat'),Element('br'),Element('span').txt('画面:'),bind(Element('select').ap(Element('option',0,{value:0}).txt('4:3'),Element('option',0,{value:1}).txt('16:9')),t,'win',t=>Number(t)),Element('span').txt('解说: '+(t.get('com')?'无':t.get('comp')||'有')),Element('span').txt('摄像头: '+(t.get('cam')?'无':'有')),Element('p').txt('报名理由/项目简介: '+t.get('desc')),e.add.txt('添加到时间表->')),e.p.style.display='none',e.add.onclick=()=>{if(e.ctrl)e.ctrl.get('start')||e.ctrl.set('start',r[0]),u(e);else{let t=new AV.Object('Control');t.set('start',r[0]),t.set('sub',e.sub),t.save(null,{useMasterKey:!0}).then(t=>{e.ctrl=t,u(e),msg('保存成功')})}},l.ap(e),a.ap(e.p)}),$('add-sp').onclick=()=>o(d(new AV.Object('Control')));const p=[];e.forEach(t=>{let e=t.get('i');p[e]?p[e].push(t):p[e]=[t]}),p.forEach(t=>t.sort((t,e)=>t.get('g')-e.get('g')));const m=[['Bilibili','Twitch'],['Bilibili','Twitch'],['Bilibili','Twitch'],['Bilibili','Twitch'],['参与玩家'],['I Wanna be the Cloudburst - 15min','I Wanna Outbreak - 20min','I Wanna call me it. - 30min','I Wanna Thank To Daburyu - 30min','I Wanna Arcana of the Tarot - 30min'],['参与玩家'],['参与玩家'],['参与玩家'],['参与玩家']],d=t=>{const e=t.get('data');let n=Element('div','list');if(n.ctrl=t,n.p=Element('div'),n.add=Element('div','add-sch'),n.ap(bindUpd(Element('h4'),t,'name',(t,e)=>t.txt(e)),bindUpd(Element('span'),t,'est',(t,e)=>t.txt(Time.formatMin(e)))),n.p.ap(Element('span').txt('名称:'),bind(Element('input'),t,'name'),Element('span').txt('时长:'),bind(Element('input','inline'),t,'est',t=>Number(t)),Element('br'),Element('span').txt('分类:'),bind(Element('select').ap(Element('option',0,{value:0}).txt('Solo Run'),Element('option',0,{value:1}).txt('Standard Race'),Element('option',0,{value:2}).txt('Blind Race'),Element('option',0,{value:3}).txt('Co-op Run'),Element('option',0,{value:4}).txt('Others'),Element('option',0,{value:5}).txt('Special Event'),Element('option',0,{value:6}).txt('Q&A')),t,'type',t=>Number(t)),bind(Element('input','inline'),t,'cat'),Element('br'),Element('span').txt('选手:'),bind(Element('input',0,{placeholder:'如需手动设置可在此填写'}),t,'run'),n.add.txt('添加到时间表->')),n.add.onclick=()=>{t.get('start')||t.set('start',r[0]),u(n)},void 0!==e?.i){let t=-1;p[e.i]?.forEach(l=>{let a=l.get('r'),s=l.get('g');t!==s&&void 0!==s&&n.p.ap(Element('p').ap(Element('b').txt(m[e.i][t=s])));let i=Element('span');i.onclick=()=>{css(b,{background:''}),c(l.get('t'))},n.p.ap(bindUpd(Element('div','user').ap(i.txt(a.get('name')||a.getUsername()),bind(Element('select').ap(Element('option',0,{value:0}).txt('待审核'),Element('option',0,{value:1}).txt('已通过'),Element('option',0,{value:2}).txt('未通过'),Element('option',0,{value:3}).txt('备选')),l,'s',t=>Number(t))),l,'s',(t,e)=>t.className='user s'+e))})}return n.getRunner=()=>{let t=[];return n.ctrl.get('run')?t=n.ctrl.get('run').split(','):p[e.i]?.forEach(e=>{if(1===e.get('s')){let n=E(e.get('r'));t.includes(n)||t.push(n)}}),t},n.p.style.display='none',l.prepend(n),a.ap(n.p),n},u=t=>{if(!t.ctrl.get('start'))return;if(t.sch)return updBind(t.ctrl,'start'),void s.ap(t.sch);let e=Element('div','sch');bindUpd(e,t.ctrl,'start',(t,e)=>{let n=0;for(;n<r.length&&!(r[n]>e);n++);let l=(e-r[--n])/30;css(t,{left:20*n+'%',top:l/24+'%',zIndex:10+l})}),e.ap(bindUpd(Element('span','sch-time'),t.ctrl,'start',(t,e)=>t.txt(new Date(1e3*e).toTimeString().slice(0,5)+' - '))),t.sub?(bindUpd(e,t.sub,'est',(t,e)=>t.style.height=e/12+'%'),bindUpd(e,t.sub,'type',(t,e)=>t.className='sch s'+e),e.ap(bindUpd(Element('span','sch-game'),t.sub,'game',(t,e)=>t.txt(e.map(t=>t[0]).join(' + '))))):(bindUpd(e,t.ctrl,'est',(t,e)=>t.style.height=e/12+'%'),bindUpd(e,t.ctrl,'type',(t,e)=>t.className='sch s'+e),e.ap(bindUpd(Element('span','sch-game'),t.ctrl,'name',(t,e)=>t.txt(e)))),e.onmousedown=t=>{t.button?(e.ctrl.unset('start'),e.remove()):(s.drag=e,s.dragX=-s.parentNode.offsetLeft,s.dragY=e.offsetTop-t.y)},e.ondblclick=()=>t.onclick(),t.sch=e,e.ctrl=t.ctrl,s.ap(e)};s.onmousemove=t=>{if(!s.drag)return;let e=Math.min(4,Math.max(0,(s.dragX+t.x)/s.offsetWidth*5<<0)),n=300*Math.max(0,(s.dragY+t.y)/s.offsetHeight*240<<0);updBind(s.drag.ctrl,'start',r[e]+n)},s.onmouseup=s.onmouseleave=()=>s.drag=null,s.oncontextmenu=t=>t.preventDefault(),n.forEach(t=>{let e=t.get('sub')?.id;if(e){let n=$(e);n.ctrl=t,u(n)}else{let e=d(t);u(e),o(e)}});const E=t=>{let e=t.get('name')||t.getUsername(),n=t.get('link');return n&&n.startsWith('http')?n.startsWith('https://space.bilibili.com')?e+n.slice(26):n.startsWith('https://www.twitch.tv/')?e+':'+n.slice(22):e+'>'+n:e},g=t=>JSON.stringify(Object.entries(t._serverData).sort((t,e)=>t[0].localeCompare(e[0])))!==JSON.stringify(Object.entries(t.attributes).sort((t,e)=>t[0].localeCompare(e[0])));$('save-sch').onclick=()=>{let t=[],e=[];$c('list').forEach(n=>{if(n.ctrl)if(n.ctrl.get('start')){let e=n.ctrl.get('sch');e||(e=new AV.Object('Schedule'),e.set('y',(new Date).getFullYear()),n.ctrl.set('sch',e));let l=n.sub??n.ctrl,a=l.get('cat'),s=l.get('type'),i=l.get('est');if(a&&'Any%'!==a&&e.set('c',a),e.set('t',['Solo Run','Standard Race','Blind Race','Co-op Run','Others','Special Event','Q&A'][s]),e.set('e',i),e.set('g',n.sub?l.get('game').map(t=>t[1]?t[0]+'='+t[1].replace('https://delicious-fruit.com/ratings/game_details.php?id=',''):t[0]):[l.get('name')]),e.set('r',n.sub?l.get('run').map(E):n.getRunner()),e.set('s',new Date(1e3*n.ctrl.get('start'))),!g(e)&&!g(n.ctrl))return;t.push(n.ctrl)}else if(n.ctrl.get('sch')){if(!g(n.ctrl))return;e.push(n.ctrl.get('sch')),n.ctrl.unset('sch'),t.push(n.ctrl)}}),t.length?AV.Object.destroyAll(e,{useMasterKey:!0}).then(()=>AV.Object.saveAll(t,{useMasterKey:!0})).then(()=>msg('保存成功')).catch(t=>{console.error(t),msg('保存失败',1)}):msg('已保存',2)};const b=[];for(let t=0;t<5;t++)for(let e=8;e<28;e++){let n=Element('div','time');css(n,{left:20*t+'%',top:5*(e-8)+'%'}),n.txt(Time.pad(e%24)+':00'),s.ap(n),b.push(n)}};