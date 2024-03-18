<template>
  <ul class="flex" v-for="item in vm.task">
    <li class="bg-slate-200 mt-2 w-full relative p-2">
      <label>
        <input
          v-model="item.isFinished"
          :value="item.sequenceNumber"
          type="checkbox"
          class="accent-pink-500"
          checked
        />
      </label>
      <span :class="{ 'line-through': item.isFinished }">{{ item.taskName }}</span>

      <!-- {{ item.taskName }} -->
      <!-- TODO 看要不要留著 -->
      <!-- <button
        class="bg-blue-600 text-white bottom float-right"
        @click="cancel(item.sequenceNumber)"
      >
        cancel
      </button> -->
    </li>
  </ul>
  <h2 v-if="vm.task.length === 0">
    {{
      currentTab.valueOf() === 'notFinished'
        ? '目前無未完成事項'
        : '目前無已完成事項'
    }}
  </h2>
</template>

<script setup lang="ts">
import { inject, ref, reactive, watch } from 'vue';
import taskStore from '../stores/task';

const props = defineProps({ identifier: String });

const vm = reactive({
  task: [] as any,
});
const currentTab = ref<string>(inject('tabName')!);

const taskFormStore = taskStore().task;

const cancel = (sn: number) => {
  const newTask = vm.task.filter((item: any) => {
    return item.sequenceNumber !== sn;
  });
};

watch(
  currentTab,
  () => {
    if (
      currentTab.value === 'notFinished' &&
      props.identifier === 'notFinished'
    ) {
      //未完成
      vm.task = taskStore().task;
      vm.task = vm.task.filter((item: any) => {
        return item.isFinished === false;
      });
    }
  },
  { immediate: true }
);
watch(
  currentTab,
  () => {
    if (currentTab.value === 'finished' && props.identifier === 'finished') {
      //完成
      vm.task = taskStore().task;
      vm.task = vm.task.filter((item: any) => {
        return item.isFinished === true;
      });
    }
  },
  { immediate: true }
);
</script>
