<template>
   <q-toggle
      v-model="darkMode"
      size="xl"
      @update:model-value="handleToggle"
      :color="toggleColor"
      keep-color
      :dense="dense"
      icon="light"
   >
      <template v-slot:thumb>
         <div
            class="flex items-center justify-center"
            style="width: 100%; height: 100%; font-size: 24px"
         >
            {{ darkMode ? "🌙" : "☀️" }}
         </div>
      </template>
   </q-toggle>
</template>

<script>
import { computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import store from "../../src/store";
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

      // Computed para leer el estado darkMode del store
      const darkMode = computed({
         get: () => store.state.darkMode,
         set: (value) => {
            debugger;
            $q.dark.set(value);
            store.commit("setSessionData", {
               ...store.state,
               darkMode: value,
            });
         },
      });

      const toggleColor = computed(() => (darkMode.value ? "black" : "white"));

      const handleToggle = (newValue) => {
         debugger;
         // 1. Aplicar cambio en Quasar
         $q.dark.set(newValue);

         // 2. Actualizar Vuex store (usa tu mutation existente)
         store.commit("setSessionData", {
            sessionData: store.state.sessionData,
            name: store.state.name,
            isAdmin: store.state.isAdmin,
            darkMode: newValue,
         });

         // Opcional: emitir evento para el componente padre
         // emit('darkModeChanged', newValue)
      };

      // Sincronizar estado inicial
      onMounted(() => {
         // Asegurar que Quasar use el estado del store
         if (darkMode.value !== $q.dark.isActive) {
            $q.dark.set(darkMode.value);
         }
      });

      return {
         darkMode,
         toggleColor,
         handleToggle,
      };
   },
};
</script>
