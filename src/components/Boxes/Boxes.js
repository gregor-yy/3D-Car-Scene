import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

function Box({ color }) {
    const box = useRef();
    const time = useRef(0);
    // задаю рандомную скорость вращения
    const [xRotSpeed] = useState(() => Math.random());
    const [yRotSpeed] = useState(() => Math.random());
    const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);
    const [position, setPosition] = useState(getInitialPosition());

    function getInitialPosition() {
        let vector = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15);
        if (vector.x < 0) vector.x -= 1.75;
        if (vector.x > 0) vector.x += 1.75;

        return vector;
    }

    function resetPosition() {
        let vector = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, Math.random() * 10 + 10);
        if (vector.x < 0) vector.x -= 1.75;
        if (vector.x > 0) vector.x += 1.75;

        setPosition(vector);
    }

    useFrame(
        (_, delta) => {
            time.current += delta * 1.2;
            let newZ = position.z - time.current;

            if (newZ < -10) {
                resetPosition();
                time.current = 0;
            }

            box.current.position.set(position.x, position.y, newZ);
            box.current.rotation.x += delta * xRotSpeed;
            box.current.rotation.y += delta * yRotSpeed;
        },
        [xRotSpeed, yRotSpeed, position]
    );
    return (
        <mesh ref={box} rotation-x={Math.PI * 0.5} scale={scale} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} envMapIntensity={0.15} />
        </mesh>
    );
}

export function Boxes() {
    const [arr] = useState(() => {
        let a = [];
        for (let i = 0; i < 100; i++) a.push(0);
        return a;
    });

    return (
        <>
            {arr.map((_, i) => (
                <Box key={i} color={i % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]} />
            ))}
        </>
    );
}
