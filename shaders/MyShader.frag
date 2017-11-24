#ifdef GL_ES
precision highp float;
#endif

varying vec4 vFinalColor;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform bool uUseTexture;

uniform float colourScale;

void main() {
	// Branching should be reduced to a minimal. 
	// When based on a non-changing uniform, it is usually optimized.
  vec4 colourAux = vec4(1, 0, 0, 0.5);
  vec4 newColour = mix(vFinalColor, colourAux, colourScale);
	if (uUseTexture)
	{
		vec4 textureColor = texture2D(uSampler, vTextureCoord);
    
		gl_FragColor = textureColor * newColour;
	}
	else
		gl_FragColor = newColour;

}