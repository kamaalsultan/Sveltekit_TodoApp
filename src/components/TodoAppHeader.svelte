<script lang="ts">
    import Button from './ui/Button.svelte';
    import SelectButton from './ui/SelectButton.svelte';
    import TodoModal from './todo/TodoModal.svelte';
    import { filterStatus } from '../lib/filterStatus';

    let modalOpen = false;
    export let uid:string | undefined;

    const setModalOpen = (value: boolean): void => {
        modalOpen = value;
    }
    const handleClick = () => {
        setModalOpen(true);
    }
    const updateFilter = (event: Event) => {
        const target = event.target as HTMLInputElement | null;
        if(target) { $filterStatus = target.value; }
    }
    
</script>

<div class="appHeader">
    <Button variant="primary" on:click={handleClick}>Add Task</Button>
    <SelectButton
        id="status"
        on:change={(e) => updateFilter(e)}
    >
        <option value={"all"}>All</option>
        <option value={"incomplete"}>Incomplete</option>
        <option value={"complete"}>Completed</option>
    </SelectButton>
    <TodoModal uid={uid} type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
</div>