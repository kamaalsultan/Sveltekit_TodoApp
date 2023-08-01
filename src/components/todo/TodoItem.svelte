<script lang="ts">
    import { MotionDiv } from 'svelte-motion';
	import TodoModal from './TodoModal.svelte';
    import { db } from '../../lib/firebase';
    import { deleteDoc, doc } from 'firebase/firestore';

    export let todo: any;

    let updateModalOpen: boolean;
    const child = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };
    const setUpdateModalOpen = (value: boolean): void => { updateModalOpen = value }
    const handleUpdate = () => setUpdateModalOpen(true)
    const handleDelete = () => {
        deleteDoc(doc(db, "todo", todo.id))
            .then(() => {
                console.log("Entire Document has been deleted successfully.")
            })
            .catch(error => {
                console.log(error);
            })
    }
</script>

<MotionDiv
    class="flex items-center justify-between p-4 bg-white mb-6 rounded-md last:mb-0"
    variants={child}>
    <div class="flex items-center justify-start gap-4">
        <div class="flex flex-col overflow-hidden">
            <p class="break-all font-bold text-base text-gray-600 {todo.status === 'complete' && 'line-through opacity-70'}">
                { todo.title }</p>
            <p class="block text-base font-medium mt-[0.2rem] text-gray-500">
                { todo.time }</p>
        </div>
    </div>
    <div class="flex items-center justify-center gap-4">
        <div
            class="text-sm font-bold py-2 px-4 rounded bg-gray-100 text-gray-500 flex items-center justify-center cursor-pointer transition duration-300 hover:bg-gray-200"
            on:click={() => handleDelete()}
            on:keydown={() => handleDelete()}
            tabindex={0} role="button">
            Delete
        </div>
        <div
            class="text-sm font-bold py-2 px-4 rounded bg-gray-100 text-gray-500 flex items-center justify-center cursor-pointer transition duration-300 hover:bg-gray-200"
            on:click={() => handleUpdate()}
            on:keydown={() => handleUpdate()}   
            tabindex={0} role="button">
            Edit
        </div>
    </div>
    <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
    ></TodoModal>
</MotionDiv>