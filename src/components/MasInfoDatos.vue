<template>
   <div style="width: 100%">
      <q-dialog v-model="masInfo" @hide="closeDialog">
         <q-card style="overflow-y: hidden">
            <div
               style="
                  display: flex;
                  justify-content: center;
                  background-color: #37474f;
               "
            >
               <div>
                  <h3 style="margin: 0; padding: 20px; color: white">
                     Historial
                  </h3>
               </div>
               <div
                  style="
                     align-items: center;
                     display: flex;
                     justify-content: flex-end;
                  "
               >
                  <q-btn
                     glossy
                     rounded
                     style="color: #1aee9f"
                     @click="closeDialog"
                     flat
                     >Cerrar</q-btn
                  >
               </div>
            </div>

            <q-card class="my-card blue-grey-2 text-red">
               <div class="pdf-container" style="width: 500px">
                  <iframe
                     class="pdf-iframe"
                     :src="'data:application/pdf;base64,' + pdfFile"
                     title="PDF-file"
                     allowfullscreen
                  ></iframe>
               </div>
            </q-card>
         </q-card>
      </q-dialog>
   </div>
</template>

<style>
.pdf-container {
   width: 100%;
   height: 80vh; /* Adjusted height for screens < 600px */
   display: flex;
   justify-content: center;
   align-items: center;
}

.pdf-iframe {
   max-width: 100%;
   max-height: 100%;
   width: 100%; /* Adjusted width for screens >= 600px */
   height: 80vh; /* Adjusted height for screens >= 600px */
   border: none;
}

@media screen and (max-width: 600px) {
   .pdf-iframe {
      width: 100%; /* Full width for mobile devices */
      height: 80vh; /* Adjusted height for mobile devices */
   }
   .pdf-container {
      max-width: 100%;
   }
}
</style>

<script>
export default {
   props: {
      masInfoDialog: Boolean, // Define a prop to receive showLogin from the parent
      pdfDatos: String,
   },
   data() {
      return {
         masInfo: false,
         pdfFile:''
      };
   },
   watch: {
      masInfoDialog: function (item) {
         debugger;
         this.masInfo = item;
      },
      pdfDatos: function (item) {
         if(item){
          this.pdfFile=this.pdfDatos
         }
      },
   },
   methods: {
      closeDialog() {
         this.masInfo = false; // Close the dialog
         this.$emit("close-dialog-masinfo"); // Emit an event to notify the parent component
      },
   },
};
</script>
<!-- // Select your file input element
const fileInput = document.getElementById('yourFileInputId');

fileInput.addEventListener('change', function() {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const base64String = event.target.result.split(',')[1];
      // Now, base64String contains the base64 representation of the PDF file.
      console.log(base64String);
    };

    reader.readAsDataURL(file);
  }
}); -->
