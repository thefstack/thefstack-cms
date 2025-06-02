"use client";
import ScrollVelocity from "@/components/ScrollVelocity"

export default function Skills({  }) {


  return (
    <section className=" py-40  flex flex-col gap-10">
      <h2 className=" text-3xl text-center">My Skills</h2>
      <div className="">  
<ScrollVelocity
  texts={[
    <span className="text-red-500 mx-6">HTML</span>,
    <span className="text-blue-500 mx-6">CSS</span>,
    <span className="text-yellow-500 mx-6">JavaScript</span>,
    <span className="text-green-500 mx-6">NodeJs</span>,
    <span className="text-indigo-500 mx-6">ExpressJs</span>,
    <span className="text-emerald-500 mx-6">MongoDB</span>,
    <span className="text-cyan-500 mx-6">ReactJs</span>,
    <span className="text-black mx-6">NextJs</span>,
    <span className="text-pink-500 mx-6">Rest API</span>,
    <span className="text-purple-500 mx-6">OpenAI Integration</span>
  ]} 
  velocity={10} 
  className="custom-scroll-text text-3xl"
  velocityMapping={{ input: [0, 500], output: [0, 20] }}
/>
      </div>
    </section>
  );
}
