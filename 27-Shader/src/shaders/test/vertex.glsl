    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;


    attribute vec3 position;

    void main()
    {
        // this is float value mean number should be in decimal
        float fooBar = - 0.232;
        float bar = 1.000;
        float cal = fooBar / bar;

        // integer
        int foo = 123;
        int barr = -1;

        //  handeling two data type calculation
        float c = bar * float(foo);

        // boolean

        bool bo1 = true;
        bool bo2 = false;

        // vector

        vec2 coordinate1 = vec2(1.0, 2.0);
        coordinate1.x = 2.3; 
        // we can change all vec2 values by doing this vec *= 2.0;

    // vec3 is almost same but more features

    vec3 colors = vec3(0.1, 1.2, 0.3);
    colors.r = 0.5;

    // 
    vec3 foor = vec3(1.0, 2.0, 3.0);
    vec2 bars = foor.yx;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionMatrixPosition = projectionMatrix * viewPosition;


        // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrixPosition;
        //   gl_Position this variable is already exist we just changing it and this is the position of our shape

        //  gl_Position.x += 0.5 // changing the position of mesh and this is not good way.
    }


    /***
    The modelMatrix will apply all transformations relative to the Mesh. If we scale, rotate or move the Mesh, these transformations will be contained in the modelMatrix and applied to the position.
The viewMatrix will apply transformations relative to the camera. If we rotate the camera to the left, the vertices should be on the right. If we move the camera in direction of the Mesh, the vertices should get bigger, etc.
The projectionMatrix will finally transform our coordinates into the final clip space coordinates.
If you want to find out more about those matrices and coordinates, here's a good article: https://learnopengl.com/Getting-started/Coordinate-Systems.

To apply a matrix, we multiply it. If want to apply a mat4 to a variable, this variable has to be a vec4. We can also multiply matrices with other matrices:
    */ 