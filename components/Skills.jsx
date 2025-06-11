"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import WebDev from "@/components/3d-modals/WebDev"
import ReactIcon from "@/components/3d-modals/ReactIcon"
import Loader from "@/components/Loader"
import { Leva, useControls } from 'leva'

export default function Skills({}) {

   const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsSmallScreen(window.innerWidth < 640); // Tailwind "sm" breakpoint
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // const x=useControls('HackerRoom',{
  //   cameraX:{
  //     value:2.5,
  //     min:-10,
  //     max:10
  //   },
  //   cameraY:{
  //     value:2.5,
  //     min:-10,
  //     max:10
  //   },
  //   cameraZ:{
  //     value:2.5,
  //     min:-10,
  //     max:10
  //   },
  //   positionX:{
  //     value:0,
  //     min:-10,
  //     max:10
  //   },
  //   positionY:{
  //     value:0,
  //     min:-10,
  //     max:10
  //   },
  //   positionZ:{
  //     value:0,
  //     min:-10,
  //     max:10
  //   },
  //   rotateX:{
  //     value:0,
  //     min:-10,
  //     max:10
  //   },
  //   rotateY:{
  //     value:0,
  //     min:-10,
  //     max:10
  //   },
  //   rotateZ:{
  //     value:0,
  //     min:-10,
  //     max:10
  //   },
  // })

  return (
    <section className=" py-20  flex flex-col gap-10">
      <h2 className=" text-3xl text-center primaryText">My Skills</h2>
      <div className="h-96 w-full">

        <Canvas >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={<Loader/>}>
        <WebDev position={[0.2 , -3.2, -3.4]} cameraPosition={[0.1, 2.7, 3.9]}/>
      </Suspense>
      <ReactIcon position={isSmallScreen ? [-2.8, -1.4, -2.8] : [0,0,0]} />
    </Canvas>
      </div>
    </section>
  );
}
