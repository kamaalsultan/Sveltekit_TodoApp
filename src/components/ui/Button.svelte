<script lang="ts">
    import { getClasses } from '../../utils/getClasses';

    const buttonTypes: Record<string, string> = {
      primary: 'primary',
      secondary: 'secondary'
    };
  
    export let type: string = 'button';
    export let variant: string = 'primary';
</script>

<button
    type={ type === 'submit' ? 'submit' : 'button' }
    class="{getClasses(['button', `button--${buttonTypes[variant]}`])}"
    on:click>
        <slot />
</button>

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
.button--primary {
	background-color: var(--primaryPurple);
	color: var(--white);
}
.button--secondary {
	background-color: var(--bg-3);
	color: var(--black-1);
}
</style>