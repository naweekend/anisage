<script>
    import { page } from "$app/state";

    let q = page.url.searchParams.get("q");
</script>

<h1>{q}</h1>