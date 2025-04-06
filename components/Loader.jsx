"use client";
import React, { useEffect, useState } from 'react'
import "@/styles/Loader.css"


const Loader = () => {
	const [text, setText] = useState("");

	useEffect(() => {
		const loadText = async () => {
		  const { default: motivationalTexts } = await import("@/data/motivationalText");
		  const randomIndex = Math.floor(Math.random() * motivationalTexts.length);
		  setText(motivationalTexts[randomIndex]);
		};
	
		loadText();
	  }, []);

  return (
    <>
      <div class="hexagon" aria-label="Animated hexagonal ripples">
	<div class="hexagon__group">
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
	</div>
	<div class="hexagon__group">
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
	</div>
	<div class="hexagon__group">
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
	</div>
	<div class="hexagon__group">
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
	</div>
	<div class="hexagon__group">
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
	</div>
	<div class="hexagon__group">
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
	</div>
</div>
<p aria-label="Loading">{text}</p>
    </>
  )
}

export default Loader
