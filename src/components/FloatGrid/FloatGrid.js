import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { TextureLoader, RepeatWrapping } from "three";

export const FloatGrid = () => {
    const texture = useLoader(TextureLoader, process.env.PUBLIC_URL + "textures/grid-texture.png");
    useEffect(() => {
        texture.wrapS = RepeatWrapping; // повторяющаяся текстура
        texture.wrapT = RepeatWrapping; // повторяющаяся текстура
        texture.anisotropy = 0.01; // высота от пола
        texture.repeat.set(30, 30); // ограничиваем повторения
        texture.offset.set(0, 0); // смещение картинки внутри текстуры, как будто планшет скроллим
    }, [texture]);
    // анимирую движение текстуры
    useFrame((state) => {
        let elapsed = -state.clock.getElapsedTime() * 0.68;
        texture.offset.set(0, elapsed);
    });
    return (
        <mesh rotation-x={-Math.PI * 0.5} position={[0, 0.025, 0]}>
            <planeGeometry args={[35, 35]} />
            <meshBasicMaterial color={[1, 1, 1]} opacity={0.15} map={texture} alphaMap={texture} transparent={true} />
        </mesh>
    );
};
