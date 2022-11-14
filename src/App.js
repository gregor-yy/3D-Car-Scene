import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./index.css";
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import { Ground } from "./components/Ground";
import { Car } from "./components/Car";
import { Rings } from "./components/Rings";
import { Boxes } from "./components/Boxes";
import { FloatGrid } from "./components/FloatGrid";

function CarShow() {
    return (
        <>
            {/* контроль орбиты */}
            <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
            {/* расположение камеры */}
            <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
            {/* фон */}
            <color args={[0, 0, 0]} attach="background" />
            {/* свет розовый */}
            <spotLight
                color={[1, 0.25, 0.7]}
                intensity={1.5}
                angle={0.6}
                penumbra={0.5}
                position={[5, 5, 0]}
                castShadow
                shadow-bias={-0.0001}
            />
            {/* свет синий */}
            <spotLight
                color={[0.14, 0.5, 1]}
                intensity={2}
                angle={0.6}
                penumbra={0.5}
                position={[-5, 5, 0]}
                castShadow
                shadow-bias={-0.0001}
            />
            {/* кольца */}
            <Rings />
            {/* коробки */}
            <Boxes />
            {/* камера и машина */}
            <CubeCamera resolution={256} frames={Infinity}>
                {(texture) => (
                    <>
                        <Environment map={texture} />
                        <Car />
                    </>
                )}
            </CubeCamera>
            {/* сетка */}
            <FloatGrid />
            {/* пол */}
            <Ground />
            {/* эффект размытия */}
            <EffectComposer>
                <Bloom
                    blendFunction={BlendFunction.ADD}
                    intensity={0.7} // Интенсивность размытия.
                    width={500} // ширина, на самом деле нихера не понял как оно рисуется, но чем больше значение, тем эффект выглядит более качественным
                    height={500} // высота
                    kernelSize={4} // вообще не понял что это, но тоже влияет на размытие
                    luminanceThreshold={0.15} // я так понимаю пиксели, которые не превышают по яркости этого значения затемняются
                    luminanceSmoothing={0.5} // я так понимаю мягкость размытия
                />
                <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0005, 0.0012]} />
            </EffectComposer>
        </>
    );
}

function App() {
    return (
        <Suspense fallback={null}>
            <Canvas shadows>
                <CarShow />
            </Canvas>
        </Suspense>
    );
}

export default App;
