!function a(r,g,t){function e(n,i){if(!g[n]){if(!r[n]){var o="function"==typeof require&&require;if(!i&&o)return o(n,!0);if(b)return b(n,!0);var h=new Error("Cannot find module '"+n+"'");throw h.code="MODULE_NOT_FOUND",h}var s=g[n]={exports:{}};r[n][0].call(s.exports,function(a){var g=r[n][1][a];return e(g?g:a)},s,s.exports,a,r,g,t)}return g[n].exports}for(var b="function"==typeof require&&require,n=0;n<t.length;n++)e(t[n]);return e}({1:[function(a){function r(a){for(var r=h(a),g=r.width,t=r.height,e=g*v.minZ,b=t*v.minZ,n=(v.maxZ-v.minZ)/v.zSteps,i=[],s=v.minZ;s<v.maxZ;s+=n){var m=e/s,l=b/s,u=Math.abs((s-v.focusZ)/((v.maxZ-v.focusZ)/(a.space*v.blurMultiplier))|0),d=m+2*u,f=l+2*u,c=document.createElement("canvas");c.width=d,c.height=f,c.getContext("2d").drawImage(r,u,u,m,l);var w=document.createElement("canvas");w.width=d,w.height=f,o(c,w,u,!0),i.push(w)}return i}function g(a,r){var g=Math.random()*a.length|0;this.img=a[g][r],this.size=r,this.width=this.img.width,this.height=this.img.height,this.speed=.75*c+Math.random()*c*.25,this.angle=0,this.spin=(Math.random()-.5)/200,this.randomPos(!1)}function t(a){var r;i=[];var t=256/v.minZ,e=[],b=0,n=v.minZ;for(r=0;d>r;r++){var o=256/n,h=t/o;e.push(h),b+=h,n+=(v.maxZ-v.minZ)/v.zSteps}for(r=d-1;r>=0;r--){var s=Math.round(f*(e[r]/b));void 0;for(var m=0;s>m;m++)i.push(new g(a,r))}}function e(a){b=window.innerWidth-1,n=window.innerHeight-1,a.width=b,a.height=n}var b,n,i,o=(a("./merge"),a("./blur")),h=a("./create-flake"),s=a("./read-palette"),m=a("./requestAnimationFrame"),l=2*Math.PI,u=16,d=10,f=160,c=64,v={minZ:100,maxZ:500,zSteps:d,focusZ:125,blurMultiplier:2},w=Math.random()*l,p=Math.random()*l;g.prototype.randomPos=function(a){this.x=-this.width+Math.random()*(b+this.width),this.y=-this.height,a||(this.y+=Math.random()*(n+this.height))},g.prototype.draw=function(a){var r=(v.maxZ-v.minZ)/v.zSteps,g=v.minZ+this.size*r,t=this.speed/g,e=this.y;this.x+=(16*Math.sin(w+this.x*l*.5/b)+16*Math.sin(p))/g,e+=t,e>n?this.randomPos(!0):this.y=e,this.angle+=this.spin,a.save();var i=this.width/2,o=this.height/2;a.translate(this.x+i,this.y+o),a.rotate(this.angle),a.drawImage(this.img,-i,-o),a.restore()};var x;window.onload=function(){var a,g=s(document.getElementById("palette"),.33),o=[];for(a=0;u>a;a++)o.push(r({size:96,lineWidth:[18,16,14,8,6,3],space:16,palette:g}));var h=document.createElement("canvas");e(h),document.body.appendChild(h);var l=h.getContext("2d");t(o);var d=function(){for(l.clearRect(0,0,b,n),a=0;f>a;a++){var r=i[a];r.draw(l)}w+=.0017,p+=.0013,m(d)};m(d),window.addEventListener("resize",function(){x&&clearTimeout(x),x=setTimeout(function(){x=null,e(h)},200)})}},{"./blur":2,"./create-flake":3,"./merge":4,"./read-palette":5,"./requestAnimationFrame":6}],2:[function(a,r){function g(a,r,g,b){var n=a.width,i=a.height;r.style.width=n+"px",r.style.height=i+"px",r.width=n,r.height=i;var o=r.getContext("2d");o.clearRect(0,0,n,i),o.drawImage(a,0,0),isNaN(g)||1>g||(b?t(r,0,0,n,i,g):e(r,0,0,n,i,g))}function t(a,r,g,t,e,o){if(!(isNaN(o)||1>o)){o|=0;var h,s,m,l,u,d,f,c,v,w,p,x,M,y,Z,C,A,F,q,z,I,T,S,k,E=a.getContext("2d"),D=E.getImageData(r,g,t,e),N=D.data,P=o+o+1,W=t-1,R=e-1,O=o+1,J=O*(O+1)/2,L=new b,U=L;for(m=1;P>m;m++)if(U=U.next=new b,m==O)var _=U;U.next=L;var B=null,H=null;f=d=0;var j=n[o],G=i[o];for(s=0;e>s;s++){for(C=A=F=q=c=v=w=p=0,x=O*(z=N[d]),M=O*(I=N[d+1]),y=O*(T=N[d+2]),Z=O*(S=N[d+3]),c+=J*z,v+=J*I,w+=J*T,p+=J*S,U=L,m=0;O>m;m++)U.r=z,U.g=I,U.b=T,U.a=S,U=U.next;for(m=1;O>m;m++)l=d+((m>W?W:m)<<2),c+=(U.r=z=N[l])*(k=O-m),v+=(U.g=I=N[l+1])*k,w+=(U.b=T=N[l+2])*k,p+=(U.a=S=N[l+3])*k,C+=z,A+=I,F+=T,q+=S,U=U.next;for(B=L,H=_,h=0;t>h;h++)N[d+3]=S=p*j>>G,0!=S?(S=255/S,N[d]=(c*j>>G)*S,N[d+1]=(v*j>>G)*S,N[d+2]=(w*j>>G)*S):N[d]=N[d+1]=N[d+2]=0,c-=x,v-=M,w-=y,p-=Z,x-=B.r,M-=B.g,y-=B.b,Z-=B.a,l=f+((l=h+o+1)<W?l:W)<<2,C+=B.r=N[l],A+=B.g=N[l+1],F+=B.b=N[l+2],q+=B.a=N[l+3],c+=C,v+=A,w+=F,p+=q,B=B.next,x+=z=H.r,M+=I=H.g,y+=T=H.b,Z+=S=H.a,C-=z,A-=I,F-=T,q-=S,H=H.next,d+=4;f+=t}for(h=0;t>h;h++){for(A=F=q=C=v=w=p=c=0,d=h<<2,x=O*(z=N[d]),M=O*(I=N[d+1]),y=O*(T=N[d+2]),Z=O*(S=N[d+3]),c+=J*z,v+=J*I,w+=J*T,p+=J*S,U=L,m=0;O>m;m++)U.r=z,U.g=I,U.b=T,U.a=S,U=U.next;for(u=t,m=1;o>=m;m++)d=u+h<<2,c+=(U.r=z=N[d])*(k=O-m),v+=(U.g=I=N[d+1])*k,w+=(U.b=T=N[d+2])*k,p+=(U.a=S=N[d+3])*k,C+=z,A+=I,F+=T,q+=S,U=U.next,R>m&&(u+=t);for(d=h,B=L,H=_,s=0;e>s;s++)l=d<<2,N[l+3]=S=p*j>>G,S>0?(S=255/S,N[l]=(c*j>>G)*S,N[l+1]=(v*j>>G)*S,N[l+2]=(w*j>>G)*S):N[l]=N[l+1]=N[l+2]=0,c-=x,v-=M,w-=y,p-=Z,x-=B.r,M-=B.g,y-=B.b,Z-=B.a,l=h+((l=s+O)<R?l:R)*t<<2,c+=C+=B.r=N[l],v+=A+=B.g=N[l+1],w+=F+=B.b=N[l+2],p+=q+=B.a=N[l+3],B=B.next,x+=z=H.r,M+=I=H.g,y+=T=H.b,Z+=S=H.a,C-=z,A-=I,F-=T,q-=S,H=H.next,d+=t}E.putImageData(D,r,g)}}function e(a,r,g,t,e,o){if(!(isNaN(o)||1>o)){o|=0;var h,s=a.getContext("2d");h=s.getImageData(r,g,t,e);var m,l,u,d,f,c,v,w,p,x,M,y,Z,C,A,F,q,z,I,T,S=h.data,k=o+o+1,E=t-1,D=e-1,N=o+1,P=N*(N+1)/2,W=new b,R=W;for(u=1;k>u;u++)if(R=R.next=new b,u==N)var O=R;R.next=W;var J=null,L=null;v=c=0;var U=n[o],_=i[o];for(l=0;e>l;l++){for(C=A=F=w=p=x=0,M=N*(q=S[c]),y=N*(z=S[c+1]),Z=N*(I=S[c+2]),w+=P*q,p+=P*z,x+=P*I,R=W,u=0;N>u;u++)R.r=q,R.g=z,R.b=I,R=R.next;for(u=1;N>u;u++)d=c+((u>E?E:u)<<2),w+=(R.r=q=S[d])*(T=N-u),p+=(R.g=z=S[d+1])*T,x+=(R.b=I=S[d+2])*T,C+=q,A+=z,F+=I,R=R.next;for(J=W,L=O,m=0;t>m;m++)S[c]=w*U>>_,S[c+1]=p*U>>_,S[c+2]=x*U>>_,w-=M,p-=y,x-=Z,M-=J.r,y-=J.g,Z-=J.b,d=v+((d=m+o+1)<E?d:E)<<2,C+=J.r=S[d],A+=J.g=S[d+1],F+=J.b=S[d+2],w+=C,p+=A,x+=F,J=J.next,M+=q=L.r,y+=z=L.g,Z+=I=L.b,C-=q,A-=z,F-=I,L=L.next,c+=4;v+=t}for(m=0;t>m;m++){for(A=F=C=p=x=w=0,c=m<<2,M=N*(q=S[c]),y=N*(z=S[c+1]),Z=N*(I=S[c+2]),w+=P*q,p+=P*z,x+=P*I,R=W,u=0;N>u;u++)R.r=q,R.g=z,R.b=I,R=R.next;for(f=t,u=1;o>=u;u++)c=f+m<<2,w+=(R.r=q=S[c])*(T=N-u),p+=(R.g=z=S[c+1])*T,x+=(R.b=I=S[c+2])*T,C+=q,A+=z,F+=I,R=R.next,D>u&&(f+=t);for(c=m,J=W,L=O,l=0;e>l;l++)d=c<<2,S[d]=w*U>>_,S[d+1]=p*U>>_,S[d+2]=x*U>>_,w-=M,p-=y,x-=Z,M-=J.r,y-=J.g,Z-=J.b,d=m+((d=l+N)<D?d:D)*t<<2,w+=C+=J.r=S[d],p+=A+=J.g=S[d+1],x+=F+=J.b=S[d+2],J=J.next,M+=q=L.r,y+=z=L.g,Z+=I=L.b,C-=q,A-=z,F-=I,L=L.next,c+=t}s.putImageData(h,r,g)}}function b(){this.r=0,this.g=0,this.b=0,this.a=0,this.next=null}var n=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],i=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];r.exports=g},{}],3:[function(a,r){var g=a("./merge"),t=(a("./blur"),2*Math.PI),e=t/6,b=.618034,n={lineWidth:[32,28,24,16,12,6],lineCap:"round",lineJoin:"bevel",bgStyle:"rgba(0,0,0,0)",size:256,space:32,maxSpokeCount:5,palette:["rgba(0,35,14,1)","rgba(0,35,14,1)","rgba(1,36,16,1)","rgba(3,37,17,1)","rgba(4,38,18,1)","rgba(5,39,20,1)","rgba(6,40,22,1)","rgba(7,41,23,1)","rgba(9,42,25,1)","rgba(10,43,27,1)","rgba(11,44,28,1)","rgba(12,45,29,1)","rgba(13,46,31,1)","rgba(14,48,32,1)","rgba(15,48,34,1)","rgba(17,49,36,1)","rgba(18,50,38,1)","rgba(20,52,40,1)","rgba(21,52,41,1)","rgba(21,54,42,1)","rgba(23,54,44,1)","rgba(24,56,46,1)","rgba(26,57,47,1)","rgba(27,57,48,1)","rgba(28,59,50,1)","rgba(29,59,52,1)","rgba(30,61,53,1)","rgba(31,62,55,1)","rgba(33,62,56,1)","rgba(34,64,58,1)","rgba(35,64,59,1)","rgba(36,65,61,1)","rgba(38,66,62,1)","rgba(38,67,64,1)","rgba(40,69,66,1)","rgba(41,69,68,1)","rgba(42,70,68,1)","rgba(44,71,71,1)","rgba(45,72,72,1)","rgba(46,73,73,1)","rgba(47,75,75,1)","rgba(49,75,77,1)","rgba(50,77,78,1)","rgba(51,78,79,1)","rgba(52,79,81,1)","rgba(53,80,83,1)","rgba(54,81,85,1)","rgba(55,82,86,1)","rgba(57,83,87,1)","rgba(58,84,89,1)","rgba(60,85,90,1)","rgba(60,86,92,1)","rgba(62,87,94,1)","rgba(62,88,95,1)","rgba(64,89,97,1)","rgba(65,90,98,1)","rgba(67,91,100,1)","rgba(67,92,102,1)","rgba(69,93,103,1)","rgba(70,94,105,1)","rgba(71,95,106,1)","rgba(72,96,108,1)","rgba(74,97,110,1)","rgba(75,98,111,1)","rgba(76,99,113,1)","rgba(78,100,114,1)","rgba(79,101,116,1)","rgba(80,103,117,1)","rgba(82,103,119,1)","rgba(82,104,121,1)","rgba(84,105,122,1)","rgba(85,106,124,1)","rgba(86,108,125,1)","rgba(87,109,126,1)","rgba(88,109,128,1)","rgba(90,110,130,1)","rgba(91,112,131,1)","rgba(92,112,133,1)","rgba(93,114,134,1)","rgba(94,115,136,1)","rgba(95,115,138,1)","rgba(97,117,139,1)","rgba(98,118,141,1)","rgba(99,119,142,1)","rgba(100,119,144,1)","rgba(102,121,145,1)","rgba(103,122,147,1)","rgba(104,123,148,1)","rgba(105,124,150,1)","rgba(106,125,151,1)","rgba(108,126,153,1)","rgba(109,127,155,1)","rgba(110,128,156,1)","rgba(111,129,158,1)","rgba(112,130,160,1)","rgba(113,130,161,1)","rgba(115,132,163,1)","rgba(116,133,164,1)","rgba(117,134,166,1)","rgba(119,135,167,1)","rgba(120,136,169,1)","rgba(121,137,171,1)","rgba(122,138,172,1)","rgba(124,139,174,1)","rgba(125,140,175,1)","rgba(126,141,177,1)","rgba(127,142,179,1)","rgba(128,143,180,1)","rgba(129,144,181,1)","rgba(131,145,183,1)","rgba(132,146,185,1)","rgba(133,147,186,1)","rgba(134,148,188,1)","rgba(135,149,189,1)","rgba(136,150,190,1)","rgba(138,151,192,1)","rgba(139,152,194,1)","rgba(141,153,196,1)","rgba(141,154,197,1)","rgba(143,155,199,1)","rgba(144,156,200,1)","rgba(145,158,201,1)","rgba(147,158,203,1)","rgba(148,159,205,1)","rgba(149,160,206,1)","rgba(150,162,208,1)","rgba(151,163,210,1)","rgba(152,163,211,1)","rgba(153,165,213,1)","rgba(154,165,212,1)","rgba(155,166,213,1)","rgba(156,166,213,1)","rgba(156,167,214,1)","rgba(157,168,214,1)","rgba(158,169,215,1)","rgba(159,170,214,1)","rgba(160,170,215,1)","rgba(161,171,216,1)","rgba(162,172,215,1)","rgba(163,173,216,1)","rgba(163,173,216,1)","rgba(164,174,217,1)","rgba(165,174,216,1)","rgba(166,175,217,1)","rgba(166,176,218,1)","rgba(167,177,218,1)","rgba(168,177,219,1)","rgba(168,178,219,1)","rgba(169,179,219,1)","rgba(170,180,220,1)","rgba(171,180,220,1)","rgba(172,181,220,1)","rgba(173,181,220,1)","rgba(173,183,221,1)","rgba(175,183,221,1)","rgba(175,184,221,1)","rgba(176,185,222,1)","rgba(177,185,223,1)","rgba(178,186,223,1)","rgba(178,187,223,1)","rgba(179,187,223,1)","rgba(180,188,223,1)","rgba(181,189,224,1)","rgba(182,190,224,1)","rgba(182,190,224,1)","rgba(183,191,225,1)","rgba(184,192,225,1)","rgba(185,193,225,1)","rgba(186,193,226,1)","rgba(186,193,226,1)","rgba(187,195,226,1)","rgba(188,196,227,1)","rgba(189,197,228,1)","rgba(189,197,228,1)","rgba(190,197,227,1)","rgba(192,198,228,1)","rgba(192,199,229,1)","rgba(193,199,229,1)","rgba(193,201,229,1)","rgba(194,201,230,1)","rgba(195,202,230,1)","rgba(196,203,230,1)","rgba(197,203,230,1)","rgba(198,204,231,1)","rgba(199,205,231,1)","rgba(199,205,232,1)","rgba(200,206,231,1)","rgba(201,207,232,1)","rgba(201,207,233,1)","rgba(202,208,233,1)","rgba(203,209,234,1)","rgba(204,210,233,1)","rgba(205,211,233,1)","rgba(205,211,234,1)","rgba(206,212,235,1)","rgba(207,213,235,1)","rgba(208,213,236,1)","rgba(209,214,235,1)","rgba(210,215,236,1)","rgba(211,215,236,1)","rgba(212,216,237,1)","rgba(213,217,237,1)","rgba(213,217,237,1)","rgba(214,219,237,1)","rgba(215,219,238,1)","rgba(216,220,239,1)","rgba(216,220,238,1)","rgba(217,221,239,1)","rgba(218,222,239,1)","rgba(218,223,239,1)","rgba(219,223,240,1)","rgba(221,224,240,1)","rgba(221,225,241,1)","rgba(222,225,241,1)","rgba(223,226,241,1)","rgba(224,227,242,1)","rgba(225,228,243,1)","rgba(225,229,242,1)","rgba(226,229,243,1)","rgba(227,230,243,1)","rgba(228,231,243,1)","rgba(228,231,244,1)","rgba(230,232,244,1)","rgba(230,233,244,1)","rgba(230,233,245,1)","rgba(231,235,245,1)","rgba(232,235,246,1)","rgba(233,236,246,1)","rgba(234,237,246,1)","rgba(234,237,247,1)","rgba(236,237,247,1)","rgba(237,239,247,1)","rgba(238,239,247,1)","rgba(238,240,248,1)","rgba(239,240,248,1)","rgba(240,242,249,1)","rgba(241,242,248,1)","rgba(242,243,249,1)","rgba(242,244,249,1)","rgba(243,245,250,1)","rgba(244,245,250,1)","rgba(245,245,250,1)","rgba(245,246,251,1)","rgba(247,247,252,1)","rgba(247,247,251,1)","rgba(247,248,252,1)","rgba(249,249,252,1)","rgba(250,250,253,1)","rgba(250,251,253,1)","rgba(251,251,254,1)","rgba(252,252,253,1)","rgba(253,253,254,1)","rgba(253,253,255,1)","rgba(254,254,254,1)","rgba(255,255,255,1)","rgba(255,255,255,1)"]};r.exports=function(a){var r,i;a=g({},n,a);var o=a.size+a.space+a.space|0,h=a.size/2,s=document.createElement("canvas");s.width=o,s.height=o;var m=s.getContext("2d");m.fillStyle=a.bgStyle,m.fillRect(0,0,o,o);var l=o/2,u=o/2;m.lineCap=a.lineCap,m.lineJoin=a.lineJoin;var d=2+Math.random()*a.maxSpokeCount|0,f=[];for(x=0;d>x;x++)f[x]=Math.random()*h*b/(x+1)|0;for(var c=a.lineWidth.length,v=a.palette.length/c|0,w=255-v*(c-1),p=Math.random()*e,x=0;c>x;x++){r=a.lineWidth[x],i=a.palette[w],m.lineWidth=r,m.strokeStyle=i;for(var M=p;t>M;M+=e){var y=l,Z=u,C=Math.cos(M)*h,A=Math.sin(M)*h;m.beginPath(),m.moveTo(y,Z),m.lineTo(y+C,Z+A),m.stroke(),C=C/(d+1)|0,A=A/(d+1)|0;for(var F=0;d>F;F++){y+=C,Z+=A;var q=f[F],z=M-e/2,I=M+e/2;m.beginPath(),m.moveTo(y,Z),m.lineTo(y+Math.cos(z)*q,Z+Math.sin(z)*q),m.moveTo(y,Z),m.lineTo(y+Math.cos(I)*q,Z+Math.sin(I)*q),m.stroke()}}w+=v}return s}},{"./blur":2,"./merge":4}],4:[function(a,r){function g(){for(var a=Array.prototype.slice.call(arguments),r=a[0],g=1;g<a.length;g++){var t=a[g];if(t)for(var e in t)t.hasOwnProperty(e)&&(r[e]=t[e])}return r}r.exports=g},{}],5:[function(a,r){r.exports=function(a,r){void 0===r&&(r=1);var g=a.width,t=a.height,e=document.createElement("canvas"),b=e.getContext("2d");e.width=g,e.height=t,b.drawImage(a,0,0);for(var n=[],i=b.getImageData(0,0,g,t),o=i.data,h=0;h<o.length;h+=4)n.push("rgba("+(0|o[h])+","+(0|o[h+1])+","+(0|o[h+2])+","+o[h+3]/255*r+")");return void 0,n}},{}],6:[function(a,r){for(var g=0,t=["ms","moz","webkit","o"],e=0;e<t.length&&!window.requestAnimationFrame;++e)window.requestAnimationFrame=window[t[e]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[e]+"CancelAnimationFrame"]||window[t[e]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(a){var r=(new Date).getTime(),t=Math.max(0,16-(r-g)),e=window.setTimeout(function(){a(r+t)},t);return g=r+t,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)}),r.exports=window.requestAnimationFrame},{}]},{},[1]);