varying vec3 vPosition;
uniform float uTime;

void main(){

    float strips = mod( (vPosition.y - uTime * 0.02) * 20.0, 1.0);
    strips = pow(strips, 3.0);


    gl_FragColor = vec4(1.0, 1.0, 1.0, strips );
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
} 