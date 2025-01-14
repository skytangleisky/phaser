#define SHADER_NAME PHASER_MOBILE_FS

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D uMainSampler;

varying vec2 outTexCoord;
varying float outTexId;
varying float outTintEffect;
varying vec4 outTint;

void main ()
{
    vec4 texel = vec4(outTint.bgr * outTint.a, outTint.a);

    vec4 texture = texture2D(uMainSampler, outTexCoord);

    //  Multiply texture tint
    vec4 color = texture * texel;

    if (outTintEffect == 1.0)
    {
        //  Solid color + texture alpha
        color.rgb = mix(texture.rgb, outTint.bgr * outTint.a, texture.a);
    }
    else if (outTintEffect == 2.0)
    {
        //  Solid color, no texture
        color = texel;
    }

    gl_FragColor = color;
}
