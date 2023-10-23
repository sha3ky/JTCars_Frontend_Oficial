<template>
  <div class="q-pa-md" style="width: 100%;">
    <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
      arrows

    >
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
      <q-carousel-slide :name="5" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="6" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="7" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
      <q-carousel-slide :name="8" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
    </q-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 1,

    };
  },
};
</script>
