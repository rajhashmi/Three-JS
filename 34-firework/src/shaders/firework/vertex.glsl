uniform float uSize;
attribute float aTimeMultiplier;
uniform vec2 uResolution;
uniform float uProgress;

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax)
{
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

attribute float aSize;
void main()
{

     float progress = uProgress * aTimeMultiplier;

    vec3 newPosition = position;
    float explodeingProgress = remap(progress, 0.0, 0.1, 0.0, 1.0);
    explodeingProgress = clamp(explodeingProgress, 0.0, 1.0);
    explodeingProgress = 1.0 - pow(1.0 - explodeingProgress, 3.0);
    newPosition *= explodeingProgress;

    float fallingProgress = remap(progress, 0.1, 1.0, 0.0, 1.0);
    fallingProgress = clamp(fallingProgress, 0.0, 1.0);
    fallingProgress = 1.0 - pow(1.0 - fallingProgress, 3.0);
    newPosition.y -= fallingProgress * 0.2;

     // Scaling
     float sizeOpeningProgress = remap(progress, 0.0, 0.125, 0.0, 1.0);
    float sizeClosingProgress = remap(progress, 0.125, 1.0, 1.0, 0.0);
    float sizeProgress = min(sizeOpeningProgress, sizeClosingProgress);
    sizeProgress = clamp(sizeProgress, 0.0, 1.0);


    // Twinkling
     float twinklingProgress = remap(progress, 0.2, 0.8, 0.0, 1.0);
    twinklingProgress = clamp(twinklingProgress, 0.0, 1.0);
    float sizeTwinkling = sin(progress *  100.0) * 0.5 + 0.5;
    sizeTwinkling = 1.0 - sizeTwinkling * twinklingProgress;


    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

   gl_PointSize = uSize * uResolution.y * aSize  * sizeProgress * twinklingProgress;
    gl_PointSize *= 1.0 / - viewPosition.z;

    if(gl_PointSize < 1.0)
        gl_Position = vec4(9999.9);

}