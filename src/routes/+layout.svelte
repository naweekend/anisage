<script>
	import '@fontsource/instrument-serif';
	import '@fontsource-variable/inter';
    import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
    import Footer from '$lib/components/Footer.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
</svelte:head>

<header>
	<Navbar />
</header>
<div class="mt-19">
	{@render children()}
</div>
<Footer />
