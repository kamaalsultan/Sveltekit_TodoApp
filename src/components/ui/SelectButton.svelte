<script lang="ts">
    import { getClasses } from '../../utils/getClasses';
    export let id: string;
</script>

<select
	id={id}
	class="{getClasses(['button', 'button__select'])}"
	on:change
>
	<slot />
</select>

<style lang="scss">
.button {
	display: inline-block;
	height: auto;
	padding: 8px 20px;
	border: none;
	border-radius: 6px;
	font-weight: bold;
	font-size: 16px;
	text-decoration: none;
	text-transform: capitalize;
	cursor: pointer;
	overflow: hidden;
	&__select {
		color: var(--black-2);
		padding: 10px;
		border: none;
		background-color: var(--bg-3);

		width: 150px;
		cursor: pointer;
	}
}
</style>