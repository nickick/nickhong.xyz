import { Box, keyframes } from '@mui/material';
import { useEffect } from 'react';
import * as THREE from 'three';
import { entranceAnimationDelay, entranceAnimationDuration } from './utils/constants';
// import * as dat from 'dat.gui'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export default function Animation() {
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const cross = loader.load('/cross.png');

    // Debug
    // const gui = new dat.GUI()

    // Canvas
    const canvas = document.querySelector('canvas.webgl');

    // Scene
    const scene = new THREE.Scene();

    // Objects
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;

    const positionArray = new Float32Array(particlesCount * 3);
    // xyz, xyz, xyz, xyz

    for (let i = 0; i < particlesCount * 3; i += 1) {
      positionArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

    // Materials

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      map: cross,
      transparent: true,
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lights

    const pointLight = new THREE.PointLight(0xffffff, 0.1);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    scene.add(pointLight);

    /**
    * Sizes
    */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    /**
    * Camera
    */
    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2;
    scene.add(camera);

    // Controls
    // const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true

    /**
    * Renderer
    */
    const renderer = new THREE.WebGLRenderer({
      canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color('#21282a'), 0.1);

    /**
     * Mouse
     */

    let mouseX = 0;
    let mouseY = 0;

    /**
    * Animate
    */

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update objects
      // sphere.rotation.y = .5 * elapsedTime
      particlesMesh.rotation.y = -0.1 * elapsedTime;

      if (mouseX > 0) {
        particlesMesh.rotation.x = mouseY * (elapsedTime * 0.00008);
        particlesMesh.rotation.y = -mouseX * (elapsedTime * 0.00008);
      }

      // Update Orbital Controls
      // controls.update()

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();

    function animateParticles(event) {
      mouseY = event.clientY;
      mouseX = event.clientX;
    }

    document.addEventListener('mousemove', animateParticles);

    const resize = () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', resize);

    return (() => {
      window.removeEventListener('mousemove', animateParticles);
      window.removeEventListener('resize', resize);
    });
  }, []);
  return (
    <Box
      sx={{
        animation: `${fadeIn} ${entranceAnimationDuration}s both ${entranceAnimationDelay}s`,
      }}
    >
      <canvas
        className="webgl"
        style={{
          position: 'fixed',
          width: '100%',
          top: 0,
          left: 0,
          outline: 'none',
        }}
      />
    </Box>
  );
}
