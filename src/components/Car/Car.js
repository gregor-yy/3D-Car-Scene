import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export const Car = () => {
    const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/corvette/scene.gltf");
    useEffect(() => {
        gltf.scene.scale.set(0.005, 0.005, 0.005);
        gltf.scene.position.set(0, -0.035, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf]);
    useFrame((state) => {
        let elapsed = state.clock.getElapsedTime();
        // еле нашел в этой сцене колёса
        let wheels = gltf.scene.children[0].children[0].children[0];

        wheels.children[0].rotation.x = elapsed * 2;
        wheels.children[2].rotation.x = elapsed * 2;
        wheels.children[4].rotation.x = elapsed * 2;
        wheels.children[6].rotation.x = elapsed * 2;
    });
    return <primitive object={gltf.scene} />;
};
