<template>
  <ul class="flex" v-for="item in vm.task">
    <li class="bg-slate-200 mt-2 w-full relative p-2">
      <label>
        <input
          v-model="item.isFinished"
          :value="item.sequenceNumber"
          @click="clickCheckBox(item.sequenceNumber)"
          type="checkbox"
          class="accent-pink-500"
          checked
        />
      </label>
      <span :class="{ 'line-through': item.isFinished }">{{ item.taskName }}</span>
      <button
        class="bg-blue-600 text-white bottom float-right rounded-lg px-2 py-1 "
        @click="cancel(item.sequenceNumber)"
      >
        cancel
      </button>
    </li>
  </ul>
  <h2 v-if="vm.task.length === 0">目前無待辦事項</h2>
</template>
<script setup lang="ts">
import {  reactive, watch } from 'vue';
import taskStore from '../stores/task.ts';

const vm = reactive({
  task: [] as any,
});

// const currentTab = ref<string>(inject('tabName')!);

const clickCheckBox = (sn: number) => {
  console.log('clickCheckBox', sn);

  vm.task = vm.task.map((item: any) => {
    if (item.sequenceNumber === sn) {
      return {
        ...item,
        isFinished: !item.isFinished,
      };
    } else {
      return item;
    }
  });

  taskStore().task = vm.task;
};

const cancel = (sn: number) => {
  vm.task.forEach((item: any, index: number) => {
    if (item.sequenceNumber === sn) {
      vm.task.splice(index, 1);
    }
  });

  taskStore().task = vm.task;
};


watch(
  () => taskStore().task,
  () => {
    vm.task = taskStore().task;
  },
  { immediate: true }
);

// watch(currentTab, () => {
//   if (currentTab.value === 'allTab') {
//     console.log('inject2', currentTab);
//   }
// },{ immediate: true });
</script>
