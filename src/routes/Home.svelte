<script>
  import { onMount } from 'svelte';
  import ThreeDScene from '../components/ThreeDScene.svelte';

  function changeBackgroundColor(color) {
    document.body.style.transition = 'background-color 0.5s ease'; // Add transition for smooth fade
    document.body.style.backgroundColor = color;
  }

  let sunflowerStyle = {
    top: '0px',
    left: '0px'
  };

  function moveSunflower() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const maxTop = viewportHeight - 150; // Adjust based on sunflower size
    const maxLeft = viewportWidth - 150; // Adjust based on sunflower size

    sunflowerStyle = {
      top: `${Math.random() * maxTop}px`,
      left: `${Math.random() * maxLeft}px`
    };
  }

  onMount(() => {
    document.body.style.transition = 'background-color 0.5s ease'; // Add transition for smooth fade
    document.body.style.backgroundColor = 'transparent';
    moveSunflower();
    const interval = setInterval(moveSunflower, 3000); // Move every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component destroy
  });
</script>

<main>
  <ThreeDScene />
  <img src="/sunflower-removebg-preview.png" alt="Yellow Sunflower" class="top-left" style="top: {sunflowerStyle.top}; left: {sunflowerStyle.left};" />
  <h1 class="home-title"
      on:mouseover={() => changeBackgroundColor('rgba(0, 100, 0, 0.5)')} 
      on:mouseout={() => changeBackgroundColor('rgba(0, 0, 0, 0)')}>
    Home
  </h1>
  <p class="home-description">Welcome to the Home page!</p>
</main>

<style>
  main {
    text-align: center;
    position: relative;
    background-color: transparent; /* Ensure the main element has a transparent background */
  }

  .top-left {
    position: fixed;
    max-width: 150px; /* Adjust the size as needed */
    height: auto;
    margin: 1rem;
    z-index: -1; /* Ensure the image is on top of other elements */
    transition: top 0.5s, left 0.5s; /* Smooth transition for position */
  }

  img {
    max-width: 100%;
    height: auto;
    margin-top: 1rem;
  }

  .home-title {
    color: yellow; /* Light blue color for Home title */
    transition: color 0.3s, background-color 0.3s; /* Smooth transition for color and background */
  }

  .home-title:hover {
    color: lightskyblue; /* Change color for Home title on hover */
    border-radius: 0.25rem; /* Optional: Add border radius for rounded corners */
  }

  .home-description {
    transition: font-style 0.3s; /* Smooth transition for font style */
  }

  .home-title:hover + .home-description {
    font-style: italic; /* Change to italics when Home title is hovered over */
  }
</style>