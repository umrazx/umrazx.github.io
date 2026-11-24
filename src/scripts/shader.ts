import frag from '../shaders/liquid.glsl?raw';

const VERT = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}';
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

export function initShader(canvas: HTMLCanvasElement, reduce: boolean) {
  // Each exit records why on the canvas (data-shader) and in the console, so a missing
  // background can be diagnosed from DevTools without guessing.
  const fail = (why: string, detail?: unknown) => {
    canvas.dataset.shader = why;
    console.warn(`[hero background] ${why}`, detail ?? '');
  };
  const opts = { antialias: false, alpha: false };
  const gl = (canvas.getContext('webgl', opts) ?? canvas.getContext('experimental-webgl', opts)) as WebGLRenderingContext | null;
  if (!gl) return fail('webgl-unavailable');

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (gl.getShaderParameter(s, gl.COMPILE_STATUS)) return s;
    fail('shader-compile-error', gl.getShaderInfoLog(s));
    return null;
  };
  // Some GPUs have no high-precision floats in fragment shaders; fall back to medium.
  const hp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
  const src = hp && hp.precision > 0 ? frag : frag.replace('precision highp float;', 'precision mediump float;');
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, src);
  if (!vs || !fs) return;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return fail('shader-link-error', gl.getProgramInfoLog(prog));
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = (n: string) => gl.getUniformLocation(prog, n);
  gl.uniform3fv(u('u_base'), hex('#08070F'));
  gl.uniform3fv(u('u_mid'), hex('#1F1250'));
  gl.uniform3fv(u('u_accent'), hex('#8B6CFF'));
  gl.uniform1f(u('u_zoom'), 0.28);
  const uRes = u('u_resolution');
  const uTime = u('u_time');
  const uMouse = u('u_mouse');

  // Render at reduced resolution: the noise is soft, so this is invisible and keeps the GPU cool.
  const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;
  const resize = () => {
    const w = Math.max(1, Math.round(canvas.clientWidth * scale));
    const h = Math.max(1, Math.round(canvas.clientHeight * scale));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    gl.uniform2f(uRes, canvas.width, canvas.height);
  };

  let mx = 0, my = 0, tx = 0, ty = 0;
  let visible = true;
  let raf = 0;
  let speed = 1;
  let t = 0;
  let last = performance.now();

  const draw = (now: number) => {
    raf = 0;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    t += dt * speed;
    mx += (tx - mx) * 0.04;
    my += (ty - my) * 0.04;
    resize();
    gl.uniform1f(uTime, t);
    gl.uniform2f(uMouse, mx, my);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (visible && !reduce && !document.hidden) raf = requestAnimationFrame(draw);
  };
  const kick = () => {
    if (!raf && visible && !document.hidden) {
      last = performance.now();
      raf = requestAnimationFrame(draw);
    }
  };

  draw(performance.now());
  canvas.classList.add('on');
  canvas.dataset.shader = 'ok';
  canvas.addEventListener('webglcontextlost', () => {
    canvas.classList.remove('on');
    fail('context-lost');
  });
  if (reduce) return;

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    kick();
  }).observe(canvas);
  document.addEventListener('visibilitychange', kick);
  window.addEventListener(
    'pointermove',
    (e) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = 0.5 - e.clientY / window.innerHeight;
    },
    { passive: true },
  );
}
