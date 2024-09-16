import { OrbitControls } from '@react-three/drei'
import {button ,useControls} from 'leva'
import {Perf} from 'r3f-perf';

export default function Experience()
{

        // const {position} = useControls({
        //     position: -2
        // })
        const { perfVisible } = useControls({
            perfVisible: true
        })
        const {position, color, visible} = useControls('Sphere',{
            position:
            {
                value: {x: -2, y:0},
                step: 0.01,
                joystick: 'invertY' // in default setting mesh is movinging in invert
            },
            color : '#ff0000',
            visible: true,
            myInterval: {
                min: 0,
                max: 0,
                value: [4,5]
            },
            clickMe : button(()=> console.log("Button is CLicked")),
            // to add button we need to first add it
            choice: {options: ['a', 'b', 'c']}
        })

    return <>
    { perfVisible && <Perf position="top-left" /> }

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <mesh position={ [position.x, position.y, 0]} visible={ visible}>
            <sphereGeometry />
            <meshStandardMaterial color={color} />
        </mesh>

        <mesh position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}