<script>
	import '@fontsource/instrument-serif';
	import '@fontsource-variable/inter';
    import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	
	let { children } = $props();
</script>

<header>
	<Navbar />
</header>
<div class="mt-19">
	{@render children()}
</div>
