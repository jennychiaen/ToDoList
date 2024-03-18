<template>
   
  <div class="w-full h-screen bg-gray-100 pt-8">
    <div
      class="flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100"
    >
      <div class="max-w-full p-8 bg-white rounded-lg shadow-lg w-96">
        <h1 class="text-3xl font-bold text-center mb-2">ToDoList</h1>
        <div class="flex">
          <input
            v-model="vm.todoTask"
            type="text"
            class="border mr-5 w-5/6 px-1 shadow rounded-lg"
            placeholder="add a new task"
          />
          <button
            @click="addTask"
            class="bg-blue-600 text-white rounded-lg px-4 py-2"
          >
            add
          </button>
        </div>
        <div class="max-w-md mx-auto my-4 ">
          <!-- my-5 -->
          <div class="mb-4 flex space-x-1 p-1 bg-white rounded-lg shadow-md">
            <button href="#" @click="clickTab('allTab')" :class="{ 'bg-blue-600 text-white': currentTab.valueOf() === 'allTab' }" class="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300">所有事項</button>
            <button href="#" @click="clickTab('notFinished')" :class="{ 'bg-blue-600 text-white': currentTab.valueOf() === 'notFinished' }" class="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300">未完成</button>
            <button href="#" @click="clickTab('finished')" :class="{ 'bg-blue-600 text-white': currentTab.valueOf() === 'finished' }"class="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300">已完成</button>
          </div>
          <!-- 所有事項 -->
          <!-- 避免v-if 元件destroy掉，子元件無法比較新舊currentTab (inject會沒資料) -->
          <KeepAlive>
            <totalTaskList 
            class="transition-all duration-300 bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600"
              v-if="currentTab.valueOf() === 'allTab'"
            ></totalTaskList>
          </KeepAlive>
          <!-- 未完成 -->
          <KeepAlive>
            <taskList
              v-if="currentTab.valueOf() === 'notFinished'"
              :identifier="'notFinished'"
            ></taskList>
          </KeepAlive>
          <!-- 已完成 -->
          <KeepAlive>
            <taskList
              v-if="currentTab.valueOf() === 'finished'"
              :identifier="'finished'"
            ></taskList>
          </KeepAlive>
        </div>

        <!-- <div>
          <router-view />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {  provide, reactive, ref, watch } from 'vue';
import taskStore from './stores/task';
import totalTaskList from './components/totalTaskList.vue';
import taskList from './components/finishedAndUnfinishedTask.vue';



const vm = reactive({
  todoTask: '' as string,
  task: [] as any,
  currentTab: 'allTab' as string,
});

const currentTab = ref<string>('allTab');
provide('tabName', currentTab);

const addTask = () => {
  vm.task = taskStore().task;
  if (vm.todoTask === '') {
    alert('please add new task first');
    return;
  }
  const temp = {
    sequenceNumber: new Date().getTime(),
    taskName: vm.todoTask,
    isFinished: false,
  };
  console.log('vm.task', vm.task);
  vm.task.push(temp);
  /**更新至store */
  taskStore().task = vm.task;
  console.log('存入', taskStore().task);
  vm.todoTask = '';
};

const clickTab = (target: string) => {
  console.log('target', target);
  currentTab.value = target;
};

// onMounted(() => {
//   vm.currentTab = 'allTab';
//   console.log('onMounted', vm.currentTab);
// });

watch(
  () => currentTab.value,
  () => {
    console.log('provide', currentTab.value);
  }
);
</script>
