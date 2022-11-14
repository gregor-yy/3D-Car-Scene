import React, { useEffect } from "react";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, LinearEncoding, RepeatWrapping } from "three";

export const Ground = () => {
    // две текстурки пола
    const [roughness, normal] = useLoader(TextureLoader, [
        process.env.PUBLIC_URL + "textures/terrain-roughness.jpg",
        process.env.PUBLIC_URL + "textures/terrain-normal.jpg",
    ]);
    useEffect(() => {
        [normal, roughness].forEach((texture) => {
            texture.wrapS = RepeatWrapping; // повторяющаяся текстура
            texture.wrapT = RepeatWrapping; // повторяющаяся текстура
            texture.repeat.set(5, 5); // ограничиваем повторения
        });
        normal.encoding = LinearEncoding;
    }, [normal, roughness]);

    // анимирую движение текстур
    useFrame((state) => {
        let elapsed = (-state.clock.getElapsedTime() * 0.68) / 6;
        normal.offset.set(0, elapsed);
        roughness.offset.set(0, elapsed);
    });
    return (
        <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
            <planeGeometry args={[30, 30]} />
            <MeshReflectorMaterial
                envMapIntensity={0}
                normalMap={normal}
                normalScale={[0.15, 0.15]}
                roughnessMap={roughness}
                dithering={true}
                color={[0.015, 0.015, 0.015]}
                roughness={0.7}
                blur={[1000, 400]}
                mixBlur={30}
                mixStrength={80}
                mixContrast={1}
                resolution={1024}
                mirror={0}
                depthScale={0.01}
                minDepthThreshold={0.9}
                maxDepthThreshold={1}
                depthToBlurRatioBias={0.25}
                debug={0}
                reflectorOffset={0.2}
            />
        </mesh>
    );
};
