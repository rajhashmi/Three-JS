varying vec2 vUv;

void main()
{
    // pattern 1
    // gl_FragColor = vec4(vUv, 1.0, 1.0);

    // pattern 2
    // gl_FragColor = vec4(vUv, 0.0, 1.0);

    // pattern 3
    // float xValue = vUv.x;
    // gl_FragColor = vec4(xvalue, xvalue, xvalue,1.0);

    // pattern 4 
    // float yValue = vUv.y;
    // gl_FragColor = vec4(yValue, yValue, yValue, 1.0);

    
    // pattern 5
    // float yValue = 1.0 - vUv.y;
    // gl_FragColor = vec4(yValue, yValue, yValue, 1.0);

    // pattern 6
    // float yValue =  vUv.y * 10.0;
    // gl_FragColor = vec4(yValue, yValue, yValue, 1.0);

    // pattern 7
    // float yValue =  mod(vUv.y * 10.0, 1.0);
    // gl_FragColor = vec4(yValue, yValue, yValue, 1.0);

    // pattern 8
    // float yValue =  mod(vUv.y * 10.0, 1.0);
    // yValue =  step(0.5, yValue); // we the cvalue is below the first argument then it's zero and acter that it's one
    // gl_FragColor = vec4(yValue, yValue, yValue, 1.0);

    
    // pattern 9
    // float yValue =  mod(vUv.y * 10.0, 1.0);
    // yValue =  step(0.8, yValue); 
    // gl_FragColor = vec4(yValue, yValue, yValue, 1.0);

    // pattern 10
//     float yValue =  mod(vUv.x * 10.0, 1.0);
//     yValue =  step(0.8, yValue); 
//     gl_FragColor = vec4(yValue, yValue, yValue, 1.0);

    // pattern 11
    // float yValue = step(0.8,  mod(vUv.y * 10.0, 1.0)); 
    // yValue += step(0.8,  mod(vUv.x * 10.0, 1.0)); 
    // gl_FragColor = vec4(yValue, yValue, yValue, 1.0);

    // pattern 12
    // float yValue = step(0.8,  mod(vUv.y * 10.0, 1.0)); 
    // yValue *= step(0.8,  mod(vUv.x * 10.0, 1.0)); 

    // gl_FragColor = vec4(yValue, yValue, yValue, 1.0); 


    // pattern 13
    // float yValue = step(0.8,  mod(vUv.y * 10.0, 1.0)); 
    // yValue -= step(0.8,  mod(vUv.x * 10.0, 1.0)); 

    // gl_FragColor = vec4(yValue, yValue, yValue, 1.0);


    // pattern 14
    // float yValue = step(0.8,  mod(vUv.y * 10.0, 1.0)); 
    // yValue *= step(0.4,  mod(vUv.x * 10.0, 1.0)); 

    // float xValue = step(0.4,  mod(vUv.y * 10.0, 1.0)); 
    // xValue *= step(0.8,  mod(vUv.x * 10.0, 1.0)); 

    // float strength = yValue + xValue;


    // gl_FragColor = vec4(strength, strength, strength, 1.0);  


    // pattern 15
    float barX = step(0.4,  mod(vUv.x * 10.0 , 1.0)); 
    barX *= step(0.8,  mod(vUv.y * 10.0 + 0.2, 1.0)); 

    float barY = step(0.8,  mod(vUv.x * 10.0 + 0.2, 1.0)); 
    barY *= step(0.4,  mod(vUv.y * 10.0 , 1.0)); 

    float strength = barX + barY;


    gl_FragColor = vec4(strength, strength, strength, 1.0); 

   
}