"use client";
import React from "react";
import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ width: '100px', textAlign: 'center' }}>
        <div
          style={{
            height: '6px',
            background: '#ddd',
            borderRadius: '3px',
            overflow: 'hidden',
            marginBottom: '8px'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: '#0ea5e9',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
        <p style={{ fontSize: '14px', color: '#555' }}>{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}
