<template>
	<router-view />
</template>
<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
utools?.onPluginEnter(({ code, type, payload }) => {
	document.documentElement.setAttribute(
		"class",
		utools?.isDarkColors() ? "dark" : ""
	)
})
</script>