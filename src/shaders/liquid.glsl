precision highp float;

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
