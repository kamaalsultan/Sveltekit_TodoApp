<script lang="ts">
    import { MotionDiv } from 'svelte-motion';
    import TodoItem from './todo/TodoItem.svelte';
    import { db } from '$lib/firebase';
    import { collection, where, query, onSnapshot } from 'firebase/firestore';
    import { filterStatus } from '$lib/filterStatus';
  
    const container = {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    };
    const child = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
      },
    };
    
    export let uid: string | undefined;
    let filterValue : string = 'all';
    let filteredTodoList: any = [];
    let todoList: any;

    const q = query(collection(db, 'todo'), where('uid', '==', uid));
    onSnapshot(q, (querySnapshot) => {
      todoList = [];
      querySnapshot.forEach((doc) => {
        todoList.push(doc.data());
      })
      filteredTodoList = todoList.filter((item: any) => {
        if (filterValue === 'all') {
          return true;
        }
        return item.status === filterValue;
      });
    });

    const unsubscribe = filterStatus.subscribe(($filter) => {
      filterValue = $filter;
      if(todoList && todoList.length > 0) {
        filteredTodoList = todoList.filter((item: any) => {
          if (filterValue === 'all') {
            return true;
          }
          return item.status === filterValue;
        });
      }
    });
  </script>
  
<MotionDiv
    class="bg-[#ecedf6] p-8 rounded-lg sm:p-6"
    variants={container}
    initial="hidden"
    animate="visible">
    {#if filteredTodoList && filteredTodoList.length > 0}
      {#each filteredTodoList as todo (todo.id)}
        <TodoItem todo={todo} />
      {/each}
    {:else}
      <MotionDiv 
        class="text-base font-bold text-gray-500 text-center mx-auto px-2 py-1 rounded-md bg-gray-100 inline-block"
        variants={child}>
        No Todos
      </MotionDiv>
    {/if}
</MotionDiv>