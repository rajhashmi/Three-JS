 precision mediump float; // we have to define how percision our float should be  is 0.001 or 0.0000001 
        // highp -> performance hits
        // lowp -> create bugs

    uniform vec3 uColor;
    uniform sampler2D uTexture; // this is special type for texture

    varying vec2 vUv;

        void main()
        {
            vec4 textureColor = texture2D(uTexture, vUv);
            gl_FragColor = textureColor;
        }