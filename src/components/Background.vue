<script setup lang="ts">
import { useTemplateRef, onMounted, watch, reactive } from 'vue'
import { type BackgroundColours, type RGB } from '../types'
import gsap from 'gsap'
import { store } from '../store'
import { DEFAULT_BACKGROUND } from '@/constants'

const canvas = useTemplateRef('background-canvas')

let gl: WebGLRenderingContext | null
const tweens = reactive({ colour: 0.0, spin: 0.0 })
let tweenSpinUniformLocation: WebGLUniformLocation | null
let tweenColourUniformLocation: WebGLUniformLocation | null
let outsideColourLocationFrom: WebGLUniformLocation | null
let insideColourLocationFrom: WebGLUniformLocation | null
let betweenColourLocationFrom: WebGLUniformLocation | null
let outsideColourLocationTo: WebGLUniformLocation | null
let insideColourLocationTo: WebGLUniformLocation | null
let betweenColourLocationTo: WebGLUniformLocation | null

function updateColour(location: WebGLUniformLocation | null, colour: RGB) {
  gl?.uniform4f(location, colour.r / 255, colour.g / 255, colour.b / 255, 1.0)
}

function updateColours(fromColours: BackgroundColours, toColours: BackgroundColours) {
  gl?.uniform1f(tweenColourUniformLocation, tweens.colour)
  updateColour(outsideColourLocationFrom, fromColours.outside)
  updateColour(outsideColourLocationTo, toColours.outside)
  updateColour(insideColourLocationFrom, fromColours.inside)
  updateColour(insideColourLocationTo, toColours.inside)
  updateColour(betweenColourLocationFrom, fromColours.between)
  updateColour(betweenColourLocationTo, toColours.between)
}

watch(
  () => store.flashColour,
  (toColours: BackgroundColours | null) => {
    if (!toColours) return
    store.flashColour = null

    gsap.to(tweens, {
      colour: 1.0,
      duration: 0.5,
      onUpdate: () => {
        updateColours(DEFAULT_BACKGROUND, toColours)
      },
    })
    gsap.to(tweens, {
      colour: 0.0,
      duration: 5.0,
      delay: 0.5,
      ease: 'power1.out',
      onUpdate: () => {
        updateColours(DEFAULT_BACKGROUND, toColours)
      },
    })
    gsap.to(tweens, {
      spin: tweens.spin + 0.075,
      duration: 1.0,
      ease: 'power4.out',
      onUpdate: () => {
        gl?.uniform1f(tweenSpinUniformLocation, tweens.spin)
      },
    })
  },
)

onMounted(() => {
  if (!canvas.value) {
    return
  }

  gl = canvas.value.getContext('webgl')

  if (!gl) {
    return
  }

  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight

  const vertexShaderSource = `
    #version 100
    attribute vec2 a_position;
    varying vec2 v_texcoord;

    void main() {
        v_texcoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
    }
`

  const fragmentShaderSource = `
    #version 100
    precision highp float;

    #define MY_HIGHP_OR_MEDIUMP highp
    #define number float

    #define SPIN_EASE 0.5

    varying vec2 v_texcoord;

    uniform vec2 iResolution;
    uniform MY_HIGHP_OR_MEDIUMP number time;
    uniform MY_HIGHP_OR_MEDIUMP number spin_time;

    uniform MY_HIGHP_OR_MEDIUMP number tween_colour;
    uniform MY_HIGHP_OR_MEDIUMP number tween_spin;
    uniform MY_HIGHP_OR_MEDIUMP vec4 outside_colour_from;
    uniform MY_HIGHP_OR_MEDIUMP vec4 inside_colour_from;
    uniform MY_HIGHP_OR_MEDIUMP vec4 between_colour_from;
    uniform MY_HIGHP_OR_MEDIUMP vec4 outside_colour_to;
    uniform MY_HIGHP_OR_MEDIUMP vec4 inside_colour_to;
    uniform MY_HIGHP_OR_MEDIUMP vec4 between_colour_to;

    vec4 effect( vec4 colour, vec2 screen_coords )
    {
        vec2 love_ScreenSize = iResolution.xy;

        MY_HIGHP_OR_MEDIUMP number contrast = 1.0;
        MY_HIGHP_OR_MEDIUMP number spin_amount = 0.25 + tween_spin;

        MY_HIGHP_OR_MEDIUMP vec4 outside_colour = mix(outside_colour_from, outside_colour_to, tween_colour);
        MY_HIGHP_OR_MEDIUMP vec4 inside_colour = mix(inside_colour_from, inside_colour_to, tween_colour);
        MY_HIGHP_OR_MEDIUMP vec4 between_colour = mix(between_colour_from, between_colour_to, tween_colour);


        //Convert to UV coords (0-1) and floor for pixel effect
        MY_HIGHP_OR_MEDIUMP number pixel_size = 1.0;
        MY_HIGHP_OR_MEDIUMP vec2 uv = (floor(screen_coords.xy*(1./pixel_size))*pixel_size - 0.5*love_ScreenSize.xy)/length(love_ScreenSize.xy) - vec2(0.12, 0.);
        MY_HIGHP_OR_MEDIUMP number uv_len = length(uv);

        //Adding in a center swirl, changes with time. Only applies meaningfully if the 'spin amount' is a non-zero number
        MY_HIGHP_OR_MEDIUMP number speed = (spin_time*SPIN_EASE*0.2) + 302.2;
        MY_HIGHP_OR_MEDIUMP number new_pixel_angle = (atan(uv.y, uv.x)) + speed - SPIN_EASE*20.*(1.*spin_amount*uv_len + (1. - 1.*spin_amount));
        MY_HIGHP_OR_MEDIUMP vec2 mid = (love_ScreenSize.xy/length(love_ScreenSize.xy))/2.;
        uv = (vec2((uv_len * cos(new_pixel_angle) + mid.x), (uv_len * sin(new_pixel_angle) + mid.y)) - mid);

        //Now add the paint effect to the swirled UV
        uv *= 30.;
        speed = time*(2.);
        MY_HIGHP_OR_MEDIUMP vec2 uv2 = vec2(uv.x+uv.y);

        for(int i=0; i < 5; i++) {
            uv2 += sin(max(uv.x, uv.y)) + uv;
            uv  += 0.5*vec2(cos(5.1123314 + 0.353*uv2.y + speed*0.131121),sin(uv2.x - 0.113*speed));
            uv  -= 1.0*cos(uv.x + uv.y) - 1.0*sin(uv.x*0.711 - uv.y);
        }

        //Make the paint amount range from 0 - 2
        MY_HIGHP_OR_MEDIUMP number contrast_mod = (0.25*contrast + 0.5*spin_amount + 1.2);
        MY_HIGHP_OR_MEDIUMP number paint_res =min(2., max(0.,length(uv)*(0.035)*contrast_mod));
        MY_HIGHP_OR_MEDIUMP number c1p = max(0.,1. - contrast_mod*abs(1.-paint_res));
        MY_HIGHP_OR_MEDIUMP number c2p = max(0.,1. - contrast_mod*abs(paint_res));
        MY_HIGHP_OR_MEDIUMP number c3p = 1. - min(1., c1p + c2p);

        MY_HIGHP_OR_MEDIUMP vec4 ret_col = (0.3/contrast)*outside_colour + (1. - 0.3/contrast)*(outside_colour*c1p + inside_colour*c2p + vec4(c3p*between_colour.rgb, c3p*outside_colour.a));

        return ret_col;
    }

    void main() {
        vec2 uv = v_texcoord;
        uv.y = 1.0 - uv.y;
        uv.x += 2.0/15.0;
        vec2 fragCoord = uv * iResolution;
        gl_FragColor = effect(vec4(1.0, 1.0, 0.0, 1.0), fragCoord);
    }
`

  function compileShader(source: string, type: number) {
    if (!gl) {
      return
    }
    const shader = gl.createShader(type)

    if (!shader) {
      console.error('Problem creating shader with type', type)
      return
    }

    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation failed:', gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return
    }
    return shader
  }

  const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
  const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)
  const shaderProgram = gl.createProgram()
  if (!vertexShader || !fragmentShader) {
    return
  }
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)
  gl.useProgram(shaderProgram)

  const vertices = new Float32Array([-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0])

  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position')
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(positionAttributeLocation)

  tweenColourUniformLocation = gl.getUniformLocation(shaderProgram, 'tween_colour')
  tweenSpinUniformLocation = gl.getUniformLocation(shaderProgram, 'tween_spin')
  outsideColourLocationFrom = gl.getUniformLocation(shaderProgram, 'outside_colour_from')
  insideColourLocationFrom = gl.getUniformLocation(shaderProgram, 'inside_colour_from')
  betweenColourLocationFrom = gl.getUniformLocation(shaderProgram, 'between_colour_from')
  outsideColourLocationTo = gl.getUniformLocation(shaderProgram, 'outside_colour_to')
  insideColourLocationTo = gl.getUniformLocation(shaderProgram, 'inside_colour_to')
  betweenColourLocationTo = gl.getUniformLocation(shaderProgram, 'between_colour_to')

  const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, 'iResolution')
  const timeUniformLocation = gl.getUniformLocation(shaderProgram, 'time')
  const spinTimeUniformLocation = gl.getUniformLocation(shaderProgram, 'spin_time')

  function animate() {
    if (canvas.value === null || gl === null) {
      return
    }
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight

    gl.viewport(0, 0, canvas.value.width, canvas.value.height)

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const time = performance.now() / 1000

    gl.uniform2f(resolutionUniformLocation, canvas.value.width, canvas.value.height)
    gl.uniform1f(timeUniformLocation, time)
    gl.uniform1f(spinTimeUniformLocation, time)

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

    requestAnimationFrame(animate)
  }

  updateColours(DEFAULT_BACKGROUND, DEFAULT_BACKGROUND)
  animate()
})
</script>

<template>
  <canvas class="absolute top-0 left-0" ref="background-canvas" />
</template>
