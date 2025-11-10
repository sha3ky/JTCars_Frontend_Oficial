<template>
   <!--
    1. WRAPPER PRINCIPAL: Q-Dialog
    Usamos el estado interno 'dialogVisible' que se sincroniza con la prop.
    Al cerrarse (swipe, escape, click fuera), se dispara @hide, que notifica al padre.
  -->
   <q-dialog v-model="dialogVisible" @hide="closeDialog">
      <q-card
         class="q-dialog-plugin q-pa-md"
         style="max-width: 600px; width: 90%; max-height: 500px"
      >
         <q-card-section>
            <div class="text-h6">Responder a {{ arrayDatos.username }}</div>
         </q-card-section>

         <!-- Sección de Mensaje Recibido -->
         <q-card-section class="q-pt-none text-subtitle1 text-grey-8">
            <span class="text-bold">Mensaje recibido:</span>
            {{ arrayDatos.mensaje }}
         </q-card-section>

         <!-- Sección de Input (Aquí se escribe la respuesta) -->
         <q-card-section class="q-pt-none overflow-auto" style="flex-grow: 1">
            <q-input
               v-model="emailCliente"
               label="Mensaje de Respuesta (Se copia al portapapeles al pulsar el botón)"
               filled
               type="textarea"
               rows="5"
               autogrow
               class="q-mb-md"
               :placeholder="placeholderText"
            />
         </q-card-section>

         <!-- Información de Contacto -->
         <q-card-section
            class="q-pt-none text-caption text-grey-6 row q-gutter-x-lg"
         >
            <div v-if="arrayDatos.email">
               Email: <span class="text-bold">{{ arrayDatos.email }}</span>
            </div>
            <div v-if="arrayDatos.telefono">
               Teléfono:
               <span class="text-bold">{{ arrayDatos.telefono }}</span>
            </div>
         </q-card-section>

         <!-- Acciones con los botones de contacto directo -->
         <q-card-actions align="right">
            <!--
          Reemplazamos v-close-popup por la llamada a closeDialog, que hace lo mismo
          pero notifica al padre.
        -->
            <q-btn flat label="Cancelar" color="grey" @click="closeDialog" />

            <!-- Botón para WHATSAPP -->
            <q-btn
               flat
               label="Enviar WhatsApp"
               color="teal-7"
               @click="abrirWhatsApp"
               disable="!arrayDatos.telefono"
               icon="fab fa-whatsapp"
               class="q-mr-sm"
            />

            <!-- Botón para EMAIL -->
            <q-btn
               flat
               label="Responder Email"
               color="primary"
               @click="abrirEmail"
               :disable="!arrayDatos.email"
               icon="email"
            />
         </q-card-actions>
      </q-card>
   </q-dialog>
</template>

<script>
export default {
   props: {
      showContactDialog: Boolean, // Prop para recibir el estado de apertura
      arrayDatos: Object, // Datos del contacto (unificado el nombre de la prop)
   },
   data() {
      return {
         dialogVisible: false, // Estado interno del diálogo (v-model)
         emailCliente: "",
         placeholderText:
            "Escribe aquí tu respuesta. El texto se copiará automáticamente al portapapeles y se pegará en tu cliente de correo/WhatsApp.",
      };
   },
   watch: {
      // Sincroniza la prop externa con el estado interno
      showContactDialog(newValue) {
         this.dialogVisible = newValue;
      },
   },
   methods: {
      // Emite un evento al padre para que cierre el diálogo
      closeDialog() {
         this.dialogVisible = false;
         this.$emit("close-dialog-contact");
      },

      // 1. Método para ABRIR EL CLIENTE DE EMAIL PREDETERMINADO (usa mailto:)
      abrirEmail() {
         if (!this.arrayDatos.email) {
            this.$q.notify({
               type: "warning",
               message:
                  "El cliente no ha proporcionado una dirección de correo.",
            });
            return;
         }

         const subject = encodeURIComponent(
            `Re: Su consulta sobre ${this.arrayDatos.username}`
         );

         let bodyText = this.emailCliente.trim();
         if (bodyText === "") {
            bodyText = "Estimado/a " + this.arrayDatos.username + ",\n\n";
         }

         this.copiarAlPortapapeles(bodyText);

         const mailtoLink = `mailto:${this.arrayDatos.email}?subject=${subject}`;

         window.open(mailtoLink, "_blank");

         this.$q.notify({
            type: "info",
            message:
               "Se ha abierto tu cliente de correo. ¡Recuerda pegar el mensaje (Ctrl+V) en el cuerpo del correo!",
            timeout: 3000,
         });

         // Cerramos el diálogo después de la acción
         this.closeDialog();
      },

      // 2. Método para ABRIR WHATSAPP (usa wa.me)
      abrirWhatsApp() {
         if (!this.arrayDatos.telefono) {
            this.$q.notify({
               type: "warning",
               message: "El cliente no ha proporcionado un número de teléfono.",
            });
            return;
         }

         const telefonoLimpio = this.arrayDatos.telefono.replace(/\D/g, "");

         let messageText = this.emailCliente.trim();
         if (messageText === "") {
            messageText = `Hola ${this.arrayDatos.username}, te contacto respecto a tu mensaje en JTCars.`;
         }

         const encodedMessage = encodeURIComponent(messageText);

         const whatsappLink = `https://wa.me/${telefonoLimpio}?text=${encodedMessage}`;

         window.open(whatsappLink, "_blank");

         // Cerramos el diálogo después de la acción
         this.closeDialog();
      },

      // 3. Método auxiliar para copiar el texto (usando execCommand por compatibilidad con iframes)
      copiarAlPortapapeles(textToCopy) {
         const textarea = document.createElement("textarea");
         textarea.value = textToCopy;
         document.body.appendChild(textarea);
         textarea.select();

         try {
            const successful = document.execCommand("copy");
            if (successful) {
               this.$q.notify({
                  type: "positive",
                  message: "¡Mensaje copiado al portapapeles!",
                  timeout: 1000,
               });
            } else {
               this.$q.notify({
                  type: "warning",
                  message:
                     "No se pudo copiar automáticamente. Por favor, copia el texto manualmente.",
                  timeout: 3000,
               });
            }
         } catch (err) {
            this.$q.notify({
               type: "warning",
               message:
                  "No se pudo copiar. Por favor, copia el texto manualmente.",
               timeout: 3000,
            });
         } finally {
            document.body.removeChild(textarea);
         }
      },
   },
};
</script>

<style scoped>
/* Estilos opcionales */
</style>
