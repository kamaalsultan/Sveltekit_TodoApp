<script lang="ts">
	import AppHeader from '../../components/TodoAppHeader.svelte';
	import { authUser } from '$lib/authStore';
	import AppContent from '../../components/TodoAppContent.svelte';
	
	let uid: string = '';
	authUser.subscribe(($user) => uid = $user?.uid);
</script>

<main>
	<div class="main">
		<div class="container">
			<p class="title">TODO List</p>
		</div>
		<div class="app__wrapper">
			<AppHeader uid={uid}/>
			<AppContent uid={uid} />
		</div>
	</div>
</main>