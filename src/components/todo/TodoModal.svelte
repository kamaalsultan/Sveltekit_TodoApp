<script lang="ts">
    import { AnimatePresence, MotionDiv } from 'svelte-motion';
    import Button from '../ui/Button.svelte';
    import { onMount } from 'svelte';
    import { db } from '../../lib/firebase';
    import { v4 as uuid } from 'uuid';
    import { collection, setDoc, doc, updateDoc } from 'firebase/firestore';

    export let type: string;
    export let setModalOpen: (value: boolean) => void;
    export let modalOpen: boolean;
    export let todo: any = {};
    export let uid: string = '';

    const dropIn = {
        hidden: { opacity: 0, transform: 'scale(0.9)' },
        visible: { transform: 'scale(1)', opacity: 1, transition: { duration: 0.1, type: 'spring', damping: 25, stiffness: 500 }},
        exit: { transform: 'scale(0.9)', opacity: 0 }
    };
    let title: string = '';
    let status: string = 'incomplete';
    let todoRef: any;
    const todoCollection = collection(db, 'todo');
    
    onMount(() => {
        if(type === 'update' && todo) {
            title = todo.title;
            status = todo.status;
            uid = todo.uid;
            todoRef = doc(todoCollection, todo.id);
        } else {
            title = '';
            status = 'incomplete';
        }
    })

    const handleSubmit = () => {
        if(title === '') {
            alert('Please enter a title');
            return ;
        }
        if(title && status) {
            if(type === 'add') {
                const id = uuid();
                setDoc(doc(db, 'todo', id), { id, uid, title, status, time: new Date().toLocaleString()});
            } else if(type === 'update') {
                updateDoc(todoRef, { uid, title, status, time: new Date().toLocaleString()});
            }
            setModalOpen(false);
        }
    }
    const handleTitleChange = (event: Event) => {
        const target = event.target as HTMLInputElement | null;
        if (target) { title = target.value; }
    };
    const handleStatusChange = (event: Event) => {
        const target = event.target as HTMLInputElement | null;
        if (target) { status = target.value; }
    }
</script>
<AnimatePresence initial={true} show={modalOpen}>
    <MotionDiv 
        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
        <MotionDiv
            class="bg-slate-50 max-w-500 w-90p mx-auto flex justify-center items-center p-8 rounded-lg relative"
            variants={dropIn} initial="hidden" animate="visible" exit="exit"
        >
            <form class="form" on:submit={handleSubmit}>
                <h1 class=" text-2xl font-semibold mb-8 capitalize text-gray-500">
                    {#if type === 'add'} Add {:else} Update {/if} TODO
                </h1>
                <label class='text-base font-bold text-gray-500'>
                    Title
                    <input
                        type="text" id="title"
                        bind:value={title}
                        on:input={handleTitleChange}
                        class="mt-2 mb-8 w-full p-4 border-none bg-white text-sm"
                    />
                </label>
                <label class='text-base text-gray-500 font-bold'>
                    Status
                    <select id="type" bind:value={status} on:change={handleStatusChange}
                        class="mt-2 mb-8 w-full p-4 border-none bg-white text-sm">
                        <option value="incomplete">Incomplete</option>
                        <option value="complete">Completed</option>
                    </select>
                </label>
                <div class="flex gap-4 mt-8">
                    <Button type="submit" variant="primary">
                        {#if type === 'add'} Add Task {:else} Update Task {/if}
                    </Button>
                    <Button variant="secondary" on:click={() => setModalOpen(false)}>
                        Cancel
                    </Button>
                </div>
            </form>
        </MotionDiv>
    </MotionDiv>
</AnimatePresence>