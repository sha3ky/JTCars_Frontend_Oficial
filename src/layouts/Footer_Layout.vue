<template>
  <q-footer elevated class="bg-blue-grey-9">
    <q-toolbar>
      <q-toolbar-title style="text-align: center">
        Made with
        <span>
          <q-img src="/lovePng.png" width="50px" height="50px"></q-img>
        </span>
        by Sha3ky's TEAM {{ currentYear }}
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

