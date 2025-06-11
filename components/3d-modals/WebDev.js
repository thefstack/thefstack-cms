"use client"
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three';
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

const WebDev=({ cameraPosition = [2.5, 2.5, 2.5], ...props })=> {
  const { camera } = useThree();
  const { nodes, materials } = useGLTF("/models/webdev.glb");

  const greenGearRef = useRef();
  const blueGearRef = useRef();
  const htmlRef = useRef();
const cssRef = useRef();
const jsRef = useRef();
const codeRef = useRef(); // for </>


const [t, setT] = useState(0); // animation progress


// Define the Bezier curve
  const jsCurve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 150.091, -350.928), new THREE.Vector3(0, 300, -50), new THREE.Vector3(376.682, -7.091, 50.928));

  const cssCurve=new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0.091, -180.928), new THREE.Vector3(-400, 300, 50), new THREE.Vector3(-376.682, -7.091, 50.928));

  const codeCurve=new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0.091, -350.928), new THREE.Vector3(0, 700, -50), new THREE.Vector3(171.163, 322.3, -327.784));


  const htmlCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(50, 0.091, -350.928),    // start
  new THREE.Vector3(-270, 450, -250),       // up and left
  new THREE.Vector3(-250, 400, -550),          // loop top
  new THREE.Vector3(-462, 20, -150),        // down and right
  new THREE.Vector3(-462.212, 33.56, -281.908),          // return center
  new THREE.Vector3(-462.212, 33.56, -281.908) // end
]);
  

  // Update camera position
  useEffect(() => {
    camera.position.set(...cameraPosition);
    camera.lookAt(0, 0, 0); // Adjust to focus on center
  }, [cameraPosition, camera]);

  useEffect(() => {
  nodes.Gears_light_green_0.geometry.center();
  nodes.Gears_light_blue_0.geometry.center();
}, [nodes]);

  // Rotate gears on every frame
  useFrame(() => {
  if (greenGearRef.current) greenGearRef.current.rotation.z -= 0.01;
  if (blueGearRef.current) blueGearRef.current.rotation.z += 0.01;

  const threshold = 200; // adjust this to trigger sooner or later
  const targetPosition = [0, -5.41, -143.591]; // position of laptop
  const camDistance = camera.position.distanceTo({ x: targetPosition[0], y: targetPosition[1], z: targetPosition[2] });

  if (camDistance < threshold) {
    // Animate pop out with a max limit
    if (!jsRef.current || t > 1) return;

    const pointOnCurve = jsCurve.getPoint(t);
    jsRef.current.position.copy(pointOnCurve);


    if (!cssRef.current || t > 1) return;

    const cssPointOnCurve = cssCurve.getPoint(t);
    cssRef.current.position.copy(cssPointOnCurve);

    if (!codeRef.current || t > 1) return;

    const codePointOnCurve = codeCurve.getPoint(t);
    codeRef.current.position.copy(codePointOnCurve);

    if (!htmlRef.current || t > 5000) return;

    const htmlPointOnCurve = htmlCurve.getPoint(t);
    htmlRef.current.position.copy(htmlPointOnCurve);


    setT(t + 0.01); // controls speed of animation

  }


});
  
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
      {/* <line>
  <bufferGeometry
    attach="geometry"
    {...new THREE.BufferGeometry().setFromPoints(cssCurve.getPoints(100))}
  />
  <lineDashedMaterial attach="material" color="white" dashSize={1} gapSize={0.5} />
</line> */}

  {/* Green Gear */}
  <group position={[80.344, -35, 281.843]} rotation={[-Math.PI / 2, 0, 1.29]} scale={100}>
    <mesh
      ref={greenGearRef}
      castShadow
      receiveShadow
      geometry={nodes.Gears_light_green_0.geometry}
      material={materials.light_green}
    />
  </group>

  {/* Blue Gear */}
  <group position={[153.344, 0, 281.843]} rotation={[-Math.PI / 2, 0, 1.29]} scale={100}>
    <mesh
      ref={blueGearRef}
      castShadow
      receiveShadow
      geometry={nodes.Gears_light_blue_0.geometry}
      material={materials.light_blue}
    />
  </group>

  {/* Static Gear */}
  <group position={[119.344, 0, 281.843]} rotation={[-Math.PI / 2, 0, 1.29]} scale={100}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Gears_blue_0.geometry}
      material={materials.blue}
    />
  </group>


        <group position={[-119.937, 7.508, -156.045]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_2_detail_001_Material013_0.geometry}
            material={materials['Material.013']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_2_detail_001_Material012_0.geometry}
            material={materials['Material.012']}
          />
        </group>
        <group position={[119.937, 7.508, -156.045]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_1_detail_001_Material014_0.geometry}
            material={materials['Material.014']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_1_detail_001_Material015_0.geometry}
            material={materials['Material.015']}
          />
        </group>
        <group position={[-117.015, 135.8, -207.061]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_2_detail_002_Material004_0.geometry}
            material={materials['Material.004']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_2_detail_002_Material011_0.geometry}
            material={materials['Material.011']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_2_detail_002_Material009_0.geometry}
            material={materials['Material.009']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_2_detail_002_Material006_0.geometry}
            material={materials['Material.006']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_2_detail_002_Material008_0.geometry}
            material={materials['Material.008']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_2_detail_002_Material010_0.geometry}
            material={materials['Material.010']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_2_detail_002_Material007_0.geometry}
            material={materials['Material.007']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_2_detail_002_Material005_0.geometry}
            material={materials['Material.005']}
          />
        </group>
        <group position={[122.86, 135.8, -207.061]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_1_detail_002_Material019_0.geometry}
            material={materials['Material.019']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_1_detail_002_Material018_0.geometry}
            material={materials['Material.018']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_1_detail_002_Material021_0.geometry}
            material={materials['Material.021']}
          />
        </group>
        <group position={[186.6, 117.896, -197.759]} rotation={[-0.381, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_1_detail_006_graph_1_0.geometry}
            material={materials.graph_1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_1_detail_006_graph_2_0.geometry}
            material={materials.graph_2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_1_detail_006_graph_3_0.geometry}
            material={materials.graph_3}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_1_detail_006_graph_4_0.geometry}
            material={materials.graph_4}
          />
        </group>
        <group position={[85.187, 113.497, -197.283]} rotation={[-0.372, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_1_detail_005_graph_3002_0.geometry}
            material={materials['graph_3.002']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_1_detail_005_graph_2002_0.geometry}
            material={materials['graph_2.002']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_1_detail_005_graph_4002_0.geometry}
            material={materials['graph_4.002']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_1_detail_005_gray_0.geometry}
            material={materials.gray}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_1_detail_005_graph_1002_0.geometry}
            material={materials['graph_1.002']}
          />
        </group>
        <group position={[0, -5.41, -143.591]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.laptop_screen_Material001_0.geometry}
            material={materials['Material.001']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.laptop_screen_Material002_0.geometry}
            material={materials['Material.002']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.laptop_screen_Material003_0.geometry}
            material={materials['Material.003']}
          />
        </group>
        <mesh
        ref={jsRef}
          castShadow
          receiveShadow
          geometry={nodes.JS_text001_0.geometry}
          material={materials['text.001']}
          position={[0, 150.091, -350.928]}
          scale={100}
        />
        <mesh
        ref={htmlRef}
          castShadow
          receiveShadow
          geometry={nodes.HTML_text002_0.geometry}
          material={materials['text.002']}
          position={[-462.212, 33.56, -281.908]}
          scale={100}
        />
        <mesh
         ref={cssRef}
          castShadow
          receiveShadow
          geometry={nodes.CSS_text_0.geometry}
          material={materials.text}
          position={[-355.475, -11.127, -14.417]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Lines_line_0.geometry}
          material={materials.line}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['Wi-Fi_Material022_0'].geometry}
          material={materials['Material.022']}
          position={[-77.384, 336.624, -298.406]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['@_Material025_0'].geometry}
          material={materials['Material.025']}
          position={[-106.489, 0, 272.375]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
        ref={codeRef}
          castShadow
          receiveShadow
          geometry={nodes['<>_text001_0'].geometry}
          material={materials['text.001']}
          position={[171.163, 322.3, -327.784]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Window_1_detail_003_blue001_0.geometry}
          material={materials['blue.001']}
          position={[28.527, 240.411, -246.21]}
          rotation={[-0.376, 0, -0.494]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Window_1_detail_004_Material020_0.geometry}
          material={materials['Material.020']}
          position={[66.786, 189.097, -228.092]}
          rotation={[-0.377, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.laptop_body_Material001_0.geometry}
          material={materials['Material.001']}
          position={[-3.483, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.laptop_key_bord_Material_0.geometry}
          material={materials.Material}
          position={[3.085, -4.808, -34.784]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        
      </group>
    </group>
  )
}

useGLTF.preload('/3d_clipart_webdev.glb')


export default WebDev;