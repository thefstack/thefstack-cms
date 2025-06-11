import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const ReactIcon=(props)=> {
  const { nodes, materials } = useGLTF('/models/react_logo.glb')
    const reactRef=useRef()


    useFrame(()=>{
        reactRef.current.rotation.y +=0.01
        reactRef.current.rotation.z -=0.01
    })


  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
        ref={reactRef}
          castShadow
          receiveShadow
          geometry={nodes['React-Logo_Material002_0'].geometry}
          material={materials['Material.002']}
          position={[900, 7.935, -700.102]}
          rotation={[Math.PI / 1.2 , 0, -Math.PI / 2]}
          scale={[29.166, 29.166, 12.734]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/react_logo.glb')

export default ReactIcon