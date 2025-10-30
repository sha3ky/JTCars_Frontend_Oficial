<template>
   <q-toggle
      v-model="darkMode"
      size="xl"
      @update:model-value="handleToggle"
      :color="darkMode ? 'grey-9' : 'orange'"
      keep-color
      :dense="dense"
      :icon="darkMode ? 'dark_mode' : 'light_mode'"
   >
      <template v-slot:label>
         <div class="q-ml-sm" style="font-size: 20px">
            {{ darkMode ? "🌙" : "☀️" }}
         </div>
      </template>
   </q-toggle>
</template>

<script>
import { computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import store from "../../src/store"; // ✅ Importa DIRECTAMENTE tu store.js

export default {
   name: "DarkModeToggle",
   props: {
      dense: {
         type: Boolean,
         default: false,
      },
   },

   setup(props) {
      const $q = useQuasar();

      // ✅ Computed que funciona con importación directa
      const darkMode = computed({
         get: () => store.state.darkMode,
         set: (value) => {
            $q.dark.set(value);
            store.commit("SET_DARK_MODE", value);
         },
      });

      const handleToggle = (newValue) => {
         darkMode.value = newValue; // ✅ Usa el computed setter
      };

      // Sincronizar estado inicial
      onMounted(() => {
         if (store.state.darkMode !== $q.dark.isActive) {
            $q.dark.set(store.state.darkMode);
         }
      });

      return {
         darkMode,
         handleToggle,
      };
   },
};
</script>
