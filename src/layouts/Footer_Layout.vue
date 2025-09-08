<template>
   <q-footer elevated class="bg-blue-grey-9">
      <q-toolbar>
         <q-toolbar-title style="text-align: center; font-size: 1vw">
            Creado por
            <span>
               <q-img src="/logoEmpresa.png" width="50px" height="50px"></q-img>
            </span>
            BytePunk Studios {{ currentYear }}
         </q-toolbar-title>
      </q-toolbar>
   </q-footer>
</template>

<script>
export default {
   computed: {
      currentYear() {
         return new Date().getFullYear();
      },
   },
};
</script>
