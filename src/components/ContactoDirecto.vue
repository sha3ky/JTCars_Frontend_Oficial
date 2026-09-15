<template>
   <!--
    1. WRAPPER PRINCIPAL: Q-Dialog
    Usamos el estado interno 'dialogVisible' que se sincroniza con la prop.
    Al cerrarse (swipe, escape, click fuera), se dispara @hide, que notifica al padre.
  -->
   <q-dialog v-model="dialogVisible" @hide="closeDialog">
      <q-card class="luxe-dialog">
         <!-- ✨ Línea dorada superior -->
         <div class="luxe-dialog__top-line" aria-hidden="true"></div>
         <!-- ✨ Glow radial sutil -->
         <div class="luxe-dialog__glow" aria-hidden="true"></div>

         <!-- CABECERA -->
         <q-card-section class="luxe-dialog__header">
            <div class="luxe-dialog__eyebrow">
               <span class="luxe-dot"></span>
               <span>Responder mensaje</span>
               <span class="luxe-dot"></span>
            </div>
            <h2 class="luxe-dialog__title">
               {{ arrayDatos.username }}
            </h2>
         </q-card-section>

         <!-- MENSAJE RECIBIDO -->
         <q-card-section class="luxe-dialog__block">
            <div class="luxe-label">Mensaje recibido</div>
            <p class="luxe-message">
               {{ arrayDatos.mensaje }}
            </p>
         </q-card-section>

         <!-- INPUT DE RESPUESTA -->
         <q-card-section class="luxe-dialog__block luxe-dialog__scroll">
            <div class="luxe-label">Mensaje de respuesta</div>
            <q-input
               v-model="emailCliente"
               filled
               type="textarea"
               rows="5"
               autogrow
               class="luxe-input q-mt-sm"
               :placeholder="placeholderText"
               borderless
            />
            <div class="luxe-hint">
               El texto se copiará automáticamente al portapapeles
            </div>
         </q-card-section>

         <!-- INFORMACIÓN DE CONTACTO -->
         <q-card-section class="luxe-dialog__contact">
            <div v-if="arrayDatos.email" class="luxe-contact-item">
               <q-icon name="mail_outline" size="14px" />
               <span class="luxe-contact-label">Email</span>
               <span class="luxe-contact-value">{{ arrayDatos.email }}</span>
            </div>
            <div v-if="arrayDatos.telefono" class="luxe-contact-item">
               <q-icon name="phone" size="14px" />
               <span class="luxe-contact-label">Teléfono</span>
               <span class="luxe-contact-value">{{ arrayDatos.telefono }}</span>
            </div>
         </q-card-section>

         <!-- ACCIONES -->
         <q-card-actions class="luxe-dialog__actions">
            <q-btn
               flat
               no-caps
               label="Cancelar"
               class="luxe-btn luxe-btn--ghost"
               @click="closeDialog"
            />

            <q-btn
               flat
               no-caps
               label="WhatsApp"
               icon="chat"
               class="luxe-btn luxe-btn--primary"
               @click="abrirWhatsApp"
               :disable="!arrayDatos.telefono"
            />

            <q-btn
               flat
               no-caps
               label="Responder"
               icon="mail_outline"
               class="luxe-btn luxe-btn--primary"
               @click="abrirEmail"
               :disable="!arrayDatos.email"
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
            messageText = `Hola ${this.arrayDatos.username}, te contacto respecto a tu mensaje en Concesionario.`;
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
/* ============================================================
   DIÁLOGO LUXE
   ============================================================ */
.luxe-dialog {
   position: relative;
   max-width: 620px;
   width: 92%;
   max-height: 88vh;
   display: flex;
   flex-direction: column;
   background: linear-gradient(160deg, #0f1720 0%, #1a2332 100%);
   border: 1px solid rgba(212, 175, 55, 0.35);
   border-radius: 14px;
   box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7), 0 0 40px rgba(212, 175, 55, 0.08),
      inset 0 0 0 1px rgba(212, 175, 55, 0.08);
   overflow: hidden;
   color: #e0e6ed;
}

/* ✨ Línea dorada superior */
.luxe-dialog__top-line {
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   height: 2px;
   background: linear-gradient(
      90deg,
      transparent,
      rgba(212, 175, 55, 0.7),
      rgba(245, 230, 168, 1),
      rgba(212, 175, 55, 0.7),
      transparent
   );
   background-size: 200% 100%;
   animation: goldFlow 6s ease-in-out infinite;
   z-index: 3;
   pointer-events: none;
}

@keyframes goldFlow {
   0%,
   100% {
      background-position: 0% 50%;
   }
   50% {
      background-position: 100% 50%;
   }
}

/* ✨ Glow radial de fondo */
.luxe-dialog__glow {
   position: absolute;
   inset: 0;
   background: radial-gradient(
      ellipse at top center,
      rgba(212, 175, 55, 0.1),
      transparent 55%
   );
   pointer-events: none;
   z-index: 0;
}

/* Todas las secciones por encima del glow */
.luxe-dialog > *:not(.luxe-dialog__top-line):not(.luxe-dialog__glow) {
   position: relative;
   z-index: 2;
}

/* ============================================================
   CABECERA
   ============================================================ */
.luxe-dialog__header {
   padding: 26px 28px 10px;
   text-align: center;
}

.luxe-dialog__eyebrow {
   display: inline-flex;
   align-items: center;
   gap: 10px;
   color: #d4af37;
   font-size: 10px;
   font-weight: 600;
   letter-spacing: 4px;
   text-transform: uppercase;
   margin-bottom: 10px;
   opacity: 0.9;
}

.luxe-dot {
   width: 4px;
   height: 4px;
   border-radius: 50%;
   background: #d4af37;
   box-shadow: 0 0 10px #d4af37;
}

.luxe-dialog__title {
   margin: 0;
   font-family: "Playfair Display", "Times New Roman", serif;
   font-style: italic;
   font-weight: 500;
   font-size: clamp(22px, 3vw, 30px);
   line-height: 1.15;
   color: #f5e6a8;
   letter-spacing: -0.3px;
   text-shadow: 0 2px 20px rgba(212, 175, 55, 0.25);
}

/* ============================================================
   BLOQUES DE CONTENIDO
   ============================================================ */
.luxe-dialog__block {
   padding: 6px 28px 12px;
}

.luxe-label {
   font-size: 10px;
   font-weight: 600;
   letter-spacing: 3px;
   text-transform: uppercase;
   color: #d4af37;
   margin-bottom: 8px;
   opacity: 0.85;
}

.luxe-message {
   margin: 0;
   padding: 12px 16px;
   background: rgba(255, 255, 255, 0.03);
   border-left: 2px solid rgba(212, 175, 55, 0.5);
   border-radius: 6px;
   color: #cfd8dc;
   font-size: 14px;
   line-height: 1.55;
   font-style: italic;
}

/* Scroll interno si el mensaje es muy largo */
.luxe-dialog__scroll {
   flex-grow: 1;
   overflow-y: auto;
}

.luxe-dialog__scroll::-webkit-scrollbar {
   width: 6px;
}
.luxe-dialog__scroll::-webkit-scrollbar-track {
   background: transparent;
}
.luxe-dialog__scroll::-webkit-scrollbar-thumb {
   background: rgba(212, 175, 55, 0.3);
   border-radius: 3px;
}
.luxe-dialog__scroll::-webkit-scrollbar-thumb:hover {
   background: rgba(212, 175, 55, 0.5);
}

/* ============================================================
   INPUT LUXE
   ============================================================ */
:deep(.luxe-input .q-field__control) {
   background: rgba(255, 255, 255, 0.03) !important;
   border: 1px solid rgba(212, 175, 55, 0.25) !important;
   border-radius: 8px !important;
   color: #e0e6ed !important;
   transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

:deep(.luxe-input .q-field__control:hover) {
   border-color: rgba(212, 175, 55, 0.5) !important;
}

:deep(.luxe-input.q-field--focused .q-field__control) {
   border-color: #d4af37 !important;
   box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15),
      inset 0 0 12px rgba(212, 175, 55, 0.05);
}

:deep(.luxe-input .q-field__native),
:deep(.luxe-input .q-field__input),
:deep(.luxe-input textarea) {
   color: #e0e6ed !important;
   font-size: 14px;
   line-height: 1.55;
}

:deep(.luxe-input .q-field__native::placeholder),
:deep(.luxe-input .q-field__input::placeholder),
:deep(.luxe-input textarea::placeholder) {
   color: rgba(207, 216, 220, 0.4) !important;
   font-style: italic;
}

/* Hint bajo el input */
.luxe-hint {
   margin-top: 8px;
   font-size: 10px;
   letter-spacing: 1.5px;
   text-transform: uppercase;
   color: rgba(212, 175, 55, 0.6);
   text-align: right;
   font-weight: 500;
}

/* ============================================================
   INFO DE CONTACTO
   ============================================================ */
.luxe-dialog__contact {
   padding: 4px 28px 12px;
   display: flex;
   flex-wrap: wrap;
   gap: 12px 24px;
}

.luxe-contact-item {
   display: inline-flex;
   align-items: center;
   gap: 8px;
   font-size: 12px;
   color: #cfd8dc;
}

.luxe-contact-item .q-icon {
   color: #d4af37;
   opacity: 0.85;
}

.luxe-contact-label {
   font-size: 10px;
   font-weight: 600;
   letter-spacing: 2px;
   text-transform: uppercase;
   color: rgba(212, 175, 55, 0.7);
}

.luxe-contact-value {
   color: #f5e6a8;
   font-weight: 500;
   letter-spacing: 0.3px;
}

/* ============================================================
   ACCIONES
   ============================================================ */
.luxe-dialog__actions {
   display: flex;
   justify-content: flex-end;
   gap: 10px;
   padding: 16px 24px 20px;
   border-top: 1px solid rgba(212, 175, 55, 0.15);
   background: rgba(0, 0, 0, 0.15);
   flex-wrap: wrap;
}

/* Botón base luxe */
:deep(.luxe-btn) {
   position: relative;
   border-radius: 6px;
   font-weight: 600;
   letter-spacing: 2px;
   text-transform: uppercase;
   font-size: 11px;
   padding: 8px 20px;
   min-height: 40px;
   overflow: hidden;
   transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Reutilizamos el efecto de relleno dorado del header */
:deep(.luxe-btn::before) {
   content: "";
   position: absolute;
   inset: 0;
   transform: translateY(101%);
   transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
   z-index: 0;
}

:deep(.luxe-btn .q-btn__content) {
   position: relative;
   z-index: 1;
   transition: color 0.35s ease;
}

/* — Variante fantasma (Cancelar) — */
:deep(.luxe-btn--ghost) {
   color: #cfd8dc !important;
   background: transparent !important;
   border: 1px solid rgba(207, 216, 220, 0.2);
}

:deep(.luxe-btn--ghost::before) {
   background: linear-gradient(180deg, #37474f, #263238);
}

:deep(.luxe-btn--ghost:hover) {
   color: #ffffff !important;
   border-color: rgba(207, 216, 220, 0.5);
   transform: translateY(-1px);
}

/* — Variante principal (WhatsApp / Email) — */
:deep(.luxe-btn--primary) {
   color: #e6c877 !important;
   background: linear-gradient(135deg, #141c26, #1a2430) !important;
   border: 1px solid rgba(212, 175, 55, 0.55);
   box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.12);
}

:deep(.luxe-btn--primary::before) {
   background: linear-gradient(180deg, #d4af37, #b8860b);
}

:deep(.luxe-btn--primary:hover) {
   color: #0f1720 !important;
   border-color: #d4af37;
   transform: translateY(-1px);
   box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.4),
      0 8px 24px rgba(212, 175, 55, 0.35), 0 0 18px rgba(212, 175, 55, 0.25);
}

:deep(.luxe-btn--primary:hover::before) {
   transform: translateY(0);
}

:deep(.luxe-btn--primary:hover .q-btn__content) {
   color: #0f1720 !important;
}

/* Deshabilitados: apagados pero legibles */
:deep(.luxe-btn--primary.q-btn--disabled) {
   opacity: 0.35;
   color: rgba(230, 200, 119, 0.5) !important;
   border-color: rgba(212, 175, 55, 0.2);
   box-shadow: none;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 599px) {
   .luxe-dialog {
      width: 96%;
      max-height: 92vh;
   }

   .luxe-dialog__header {
      padding: 22px 20px 8px;
   }

   .luxe-dialog__block,
   .luxe-dialog__contact {
      padding-left: 20px;
      padding-right: 20px;
   }

   .luxe-dialog__actions {
      padding: 14px 16px 18px;
      gap: 8px;
   }

   :deep(.luxe-btn) {
      flex: 1 1 auto;
      padding: 8px 14px;
      font-size: 10px;
      letter-spacing: 1.5px;
   }
}

/* ♿ Accesibilidad */
@media (prefers-reduced-motion: reduce) {
   .luxe-dialog__top-line,
   :deep(.luxe-btn),
   :deep(.luxe-btn::before),
   :deep(.luxe-btn::after) {
      animation: none !important;
      transition: none !important;
   }
}
</style>
