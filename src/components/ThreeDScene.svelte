<script lang="ts">
    import * as THREE from 'three';
    import { onMount } from 'svelte';
  
    let container: HTMLDivElement;
    let typedText = '';
    let rightSidebarContent = 'Move your mouse to change this text.';
    const texts = [
      'This is the first sentence.',
      'Here comes the second sentence.',
      'And now the third sentence.',
      'Continuing with the fourth sentence.',
      'Finally, the fifth sentence.'
    ];
    let currentTextIndex = 0;
  
    function typeText() {
      let index = 0;
      function type() {
        if (index < texts[currentTextIndex].length) {
          typedText += texts[currentTextIndex].charAt(index);
          index++;
          setTimeout(type, 100); // Adjust the typing speed here
        } else {
          setTimeout(() => {
            typedText = '';
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            typeText();
          }, 2000); // Adjust the delay before starting the next sentence
        }
      }
      type();
    }
  
    onMount(() => {
      console.log('ThreeDScene component mounted');
  
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000); // Set background color to black
      container.appendChild(renderer.domElement);
  
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
  
      // Add a sphere
      const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(2, 0, 0);
      scene.add(sphere);
  
      // Add a cone
      const coneGeometry = new THREE.ConeGeometry(0.5, 1, 32);
      const coneMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
      const cone = new THREE.Mesh(coneGeometry, coneMaterial);
      cone.position.set(-2, 0, 0);
      scene.add(cone);
  
      // Add stars
      const starGeometry = new THREE.SphereGeometry(0.1, 24, 24);
      const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
      const stars = [];
      for (let i = 0; i < 10; i++) {
        const star = new THREE.Mesh(starGeometry, starMaterial);
        star.position.set(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2);
        stars.push(star);
        scene.add(star);
      }
  
      // Ensure camera position is set correctly
      camera.position.set(0, 0, 5);
  
      function animate() {
        requestAnimationFrame(animate);
  
        // Rotate the cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
  
        // Revolve the sphere around the cube
        sphere.position.x = 2 * Math.cos(Date.now() * 0.001);
        sphere.position.z = 2 * Math.sin(Date.now() * 0.001);
  
        // Revolve the cone around the cube
        cone.position.x = 2 * Math.cos(Date.now() * 0.001 + Math.PI);
        cone.position.z = 2 * Math.sin(Date.now() * 0.001 + Math.PI);
  
        // Revolve the stars around the cube
        stars.forEach((star, index) => {
          const angle = Date.now() * 0.001 + (index * Math.PI * 2) / stars.length;
          star.position.x = 3 * Math.cos(angle);
          star.position.z = 3 * Math.sin(angle);
        });
  
        renderer.render(scene, camera);
      }
      animate();
  
      function onMouseMove(event: MouseEvent) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        camera.position.x = mouseX * 2;
        camera.position.y = mouseY * 2;
        camera.lookAt(scene.position);
  
        // Update right sidebar content based on mouse position
        rightSidebarContent = `Mouse X: ${mouseX.toFixed(2)}, Mouse Y: ${mouseY.toFixed(2)}`;
      }
  
      window.addEventListener('mousemove', onMouseMove);
  
      typeText(); // Start typing the text when the component mounts
  
      return () => {
        console.log('ThreeDScene component unmounted');
        window.removeEventListener('mousemove', onMouseMove);
        container.removeChild(renderer.domElement);
      };
    });
  </script>
  
  <div bind:this={container} style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;"></div>
  
  <!-- Left Sidebar -->
  <div class="sidebar left-sidebar">
    <p>{typedText}</p>
  </div>
  
  <!-- Right Sidebar -->
  <div class="sidebar right-sidebar">
    <p>{rightSidebarContent}</p>
  </div>
  
  <style>
    div {
      overflow: hidden;
    }
  
    .sidebar {
      position: fixed;
      top: 0;
      width: 200px;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 1rem;
      box-sizing: border-box;
      z-index: 1; /* Ensure the sidebar is above the 3D scene */
    }
  
    .left-sidebar {
      left: 0;
    }
  
    .right-sidebar {
      right: 0;
    }
  </style>