<script>
  import { writable } from 'svelte/store';
  import Home from './routes/Home.svelte';
  import About from './routes/About.svelte';
  import Contact from './routes/Contact.svelte';
  import Services from './routes/Services.svelte';

  const currentRoute = writable(window.location.pathname);

  function navigate(path) {
    window.history.pushState({}, '', path);
    currentRoute.set(path);
  }

  const routes = {
    '/': Home,
    '/about': About,
    '/contact': Contact,
    '/services': Services,
  };
</script>

<main>
  <nav>
    <a href="/" on:click|preventDefault={() => navigate('/')}>Home</a>
    <a href="/about" on:click|preventDefault={() => navigate('/about')}>About</a>
    <a href="/contact" on:click|preventDefault={() => navigate('/contact')}>Contact</a>
    <a href="/services" on:click|preventDefault={() => navigate('/services')}>Services</a>
  </nav>

  {#if $currentRoute in routes}
    <svelte:component this={routes[$currentRoute]} />
  {/if}
</main>

<style>
  nav {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
  }

  a {
    text-decoration: none;
    color: red; /* Change the color to yellow */
    position: relative;
    transition: color 0.3s;
    font-size: 1.5rem; /* Increase the font size */
  }

  a::after {
    content: '';
    display: block;
    width: 4px;
    height: 4px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.3s;
  }

  a:hover {
    color: white; /* Slightly lighter yellow for hover effect */
  }

  a:hover::after {
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    transform: none;
    border-radius: 0;
    background-color: rgba(255, 235, 59, 0.2); /* Light yellow background */
  }
</style>