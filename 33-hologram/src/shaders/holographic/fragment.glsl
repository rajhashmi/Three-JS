varying vec3 vPosition;
uniform float uTime;
varying vec3 vNormal;


void main(){

    float strips = mod( (vPosition.y - uTime * 0.02) * 20.0, 1.0);
    strips = pow(strips, 3.0);

    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = 


    gl_FragColor = vec4(vNormal, 1.0  );
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
} 