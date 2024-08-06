 precision mediump float; // we have to define how percision our float should be  is 0.001 or 0.0000001 
        // highp -> performance hits
        // lowp -> create bugs


        varying float  vRandom; 

        void main()
        {
            gl_FragColor = vec4(vRandom, vRandom * 0.5, 1.0, 1.0);
        }