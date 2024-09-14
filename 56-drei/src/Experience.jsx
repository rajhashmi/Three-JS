import { MeshReflectorMaterial ,Float, PivotControls ,OrbitControls, TransformControls, Html, Text} from '@react-three/drei';
import { useRef } from 'react';


export default function Experience()
{
    const cube = useRef()
    const shpere = useRef();

    return <>

    <OrbitControls makeDefault/>

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />
        <PivotControls anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={1}

        >
        <mesh ref={shpere} position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
            <Html 
                position={[0,1,1]}
                wrapperClass='label'
                center
                distanceFactor={6}
                occlude={[cube, shpere]}
            >
                That's a sphere 👍
            </Html>
        </mesh> 
        </PivotControls>
       
        <mesh ref={cube} position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={cube} mode='translate'/>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            {/* <meshStandardMaterial color="greenyellow" /> */}
            <MeshReflectorMaterial
                resolution={512}
                blur={[1000, 1000]}
                mixBlur={1}
                mirror={0.5}
                color={'greenyellow'}

            />
        </mesh>

        <Float speed={5} floatIntensity={2}>
        
        <Text
            font='./bangers-v20-latin-regular.woff'
            position={[0,2,0]}
        > I Love R3F ❤️
        </Text>
</Float>
    </>
}