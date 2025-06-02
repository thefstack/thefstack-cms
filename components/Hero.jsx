"use client";
import Image from "next/image";
import styles from "@/styles/Hero.module.css";
import TrueFocus from "@/components/TrueFocus";
import Magnet from "@/components/Magnet";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className="flex flex-wrap justify-center">Hey, I'm Raj</h1>
        <div className="flex flex-row gap-2 flex-wrap items-center justify-center text-2xl font-bold text-center text-[#222831]">
          I'M A FULL STACK DEVELOPER CRAFTING SEAMLESS
          <TrueFocus
            sentence={["Front-End", " Back-End"]}
            manualMode={false}
            blurAmount={5}
            borderColor="red"
            animationDuration={1}
            pauseBetweenAnimations={3}
          />
          EXPERIENCES WITH A PASSION FOR INNOVATION.
        </div>

        <div className="mt-12">
          <Magnet padding={90} disabled={false} magnetStrength={5}>
            <Link href="/#contact" className="bg-[#222831] text-[#DFD0B8] px-5 py-2 rounded-lg">Let's Connect</Link>
          </Magnet>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src="/HeroImage.avif"
          alt="Hero Image"
          width={500}
          height={300}
          priority
        />
      </div>
    </section>
  );
}
