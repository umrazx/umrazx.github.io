var e=`precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_zoom;
uniform vec3 u_base;
uniform vec3 u_mid;
uniform vec3 u_accent;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + vec2(13.1, 7.7); a *= 0.5; }
  return v;
}

void main() {
  // The design shows a close-up of the noise field: soft haze with a few bright wisps.
  // u_zoom picks how much of the field the hero covers (smaller = closer).
  // Anchored to the right edge at the design's 1.6 aspect, so the bright wisp stays in view on narrow screens.
  vec2 uv = vec2(1.6 - (u_resolution.x - gl_FragCoord.x) / u_resolution.y, (u_resolution.y - gl_FragCoord.y) / u_resolution.y) * u_zoom;
  float t = u_time;
  vec2 p = uv * 1.3 + u_mouse * 0.05;
  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.10)), fbm(p + vec2(5.2, -t * 0.08)));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 0.06),
                fbm(p + 3.0 * q + vec2(8.3, 2.8) - t * 0.05));
  float f = fbm(p + 3.5 * r);
  vec3 col = mix(u_base, u_mid, smoothstep(0.25, 0.62, f));
  col = mix(col, u_accent, smoothstep(0.58, 0.9, f * (0.6 + length(r))));
  float c = abs(fract(f * 14.0) - 0.5);
  col = mix(col, u_accent, (1.0 - smoothstep(0.0, 0.035, c)) * 0.28 * smoothstep(0.2, 0.6, f));
  col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) * 0.045;
  gl_FragColor = vec4(col, 1.0);
}
`,t=e=>[1,3,5].map(t=>parseInt(e.slice(t,t+2),16)/255);function n(n,r){let i=(e,t)=>{n.dataset.shader=e,console.warn(`[hero background] ${e}`,t??``)},a={antialias:!1,alpha:!1},o=n.getContext(`webgl`,a)??n.getContext(`experimental-webgl`,a);if(!o)return i(`webgl-unavailable`);let s=(e,t)=>{let n=o.createShader(e);return o.shaderSource(n,t),o.compileShader(n),o.getShaderParameter(n,o.COMPILE_STATUS)?n:(i(`shader-compile-error`,o.getShaderInfoLog(n)),null)},c=o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT),l=c&&c.precision>0?e:e.replace(`precision highp float;`,`precision mediump float;`),u=s(o.VERTEX_SHADER,`attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}`),d=s(o.FRAGMENT_SHADER,l);if(!u||!d)return;let f=o.createProgram();if(o.attachShader(f,u),o.attachShader(f,d),o.linkProgram(f),!o.getProgramParameter(f,o.LINK_STATUS))return i(`shader-link-error`,o.getProgramInfoLog(f));o.useProgram(f),o.bindBuffer(o.ARRAY_BUFFER,o.createBuffer()),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),o.STATIC_DRAW);let p=o.getAttribLocation(f,`a`);o.enableVertexAttribArray(p),o.vertexAttribPointer(p,2,o.FLOAT,!1,0,0);let m=e=>o.getUniformLocation(f,e);o.uniform3fv(m(`u_base`),t(`#08070F`)),o.uniform3fv(m(`u_mid`),t(`#1F1250`)),o.uniform3fv(m(`u_accent`),t(`#8B6CFF`)),o.uniform1f(m(`u_zoom`),.28);let h=m(`u_resolution`),g=m(`u_time`),_=m(`u_mouse`),v=Math.min(window.devicePixelRatio||1,1.5)*.5,y=()=>{let e=Math.max(1,Math.round(n.clientWidth*v)),t=Math.max(1,Math.round(n.clientHeight*v));(n.width!==e||n.height!==t)&&(n.width=e,n.height=t,o.viewport(0,0,e,t)),o.uniform2f(h,n.width,n.height)},b=0,x=0,S=0,C=0,w=!0,T=0,E=0,D=performance.now(),O=e=>{T=0;let t=Math.min(.05,(e-D)/1e3);D=e,E+=t*1,b+=(S-b)*.04,x+=(C-x)*.04,y(),o.uniform1f(g,E),o.uniform2f(_,b,x),o.drawArrays(o.TRIANGLES,0,3),w&&!r&&!document.hidden&&(T=requestAnimationFrame(O))},k=()=>{!T&&w&&!document.hidden&&(D=performance.now(),T=requestAnimationFrame(O))};O(performance.now()),n.classList.add(`on`),n.dataset.shader=`ok`,n.addEventListener(`webglcontextlost`,()=>{n.classList.remove(`on`),i(`context-lost`)}),r||(new IntersectionObserver(([e])=>{w=e.isIntersecting,k()}).observe(n),document.addEventListener(`visibilitychange`,k),window.addEventListener(`pointermove`,e=>{S=e.clientX/window.innerWidth-.5,C=.5-e.clientY/window.innerHeight},{passive:!0}))}export{n as initShader};