import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useStore = defineStore('task', () => {
  const task = reactive([] as any);

  return {
    task,
  };
  
},

);

export default useStore;
