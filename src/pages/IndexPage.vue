<!--

<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card bg-primary text-white" v-if="showLogin">
      <q-card-section>
        <div class="text-subtitle2">by Julian Raita</div>
      </q-card-section>
      <q-input outlined v-model="correoInput" label="Correo" >
      <template v-slot:label>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" :color="colorEmail" size="24px" name="mail" />
          </div>
        </template>
      </q-input>
      <q-input type="password" outlined v-model="contrasenaInput" label="Contraseña" >
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" :color="colorPass" size="24px" name="key" />
          </div>
        </template>
      </q-input>
      <q-separator dark />
      <q-card-actions style="justify-content: flex-end;">
        <q-btn class="glossy" @click="comprobarUsuario"  flat>Acceptar</q-btn>

      </q-card-actions>
    </q-card>
  </div>
  </q-page>
</template> -->

<style>
.center {
   border: 5px solid;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   padding: 10px;
}
</style>
<script>
import { defineComponent } from "vue";
import axios from "axios";
import { ref } from "vue";

export default defineComponent({
   name: "IndexPage",
   // setup() {
   //   // Define a reactive variable
   //   const showLogin = ref(true); // Initialize showLogin with your desired value
   //   const messageFromParent = ref(showLogin);

   //   return {
   //     messageFromParent,
   //     showLogin, // Export showLogin here
   //   };
   // },

   data() {
      // return {
      //   correoInput: '', // Define correoInput data property
      //   contrasenaInput: '',// Define contrasenaInput data property
      //   users:[],
      //   colorEmail:'red',
      //   colorPass:'red',
      // }
   },
   mounted() {
      // debugger
      // // Make a GET request to your API endpoint
      // axios.get('http://127.0.0.1:8000/usuarios/')
      //   .then((response) => {
      //     this.users = response.data;
      //     console.log(this.users)
      //   })
      //   .catch((error) => {
      //     console.error('Error fetching data:', error);
      //   });
   },
   methods: {
      // comprobarUsuario(){
      //   debugger
      //   let contrasena,usuario
      //   usuario=(this.users.filter(item => item.correo.toLowerCase()=== this.correoInput.toLowerCase()))[0];
      //   if(usuario){
      //     this.colorEmail= usuario ? 'green':'red'
      //     contrasena =usuario.password*1 === this.contrasenaInput*1 ? true :''
      //     this.colorPass=contrasena?'green':'red'
      //   }
      //   if(usuario && contrasena){
      //       this.showLogin=false
      //         if(usuario.admin){
      //         console.log('Administrador')
      //       }else{
      //         console.log('No es Administrador')
      //       }
      //     }else{
      //         console.log('usuario no existente')
      //       }
      // },
      // async fetchData() {
      //   try {
      //     const response = await axios.get('/api/data');
      //     console.log(response.data);
      //   } catch (error) {
      //     console.error('Error fetching data:', error);
      //   }
      // },
   },
});
</script>
