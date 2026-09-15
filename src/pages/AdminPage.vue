<template>
   <q-layout view="lHh Lpr lFf" v-if="isAuthenticated()">
      <HeaderLayout
         :is-authenticated="isAuthenticated()"
         :usuario-logineado="usuarioLogineado"
         @login="loginearUsuario"
         @logout="logOut"
      />
      <Footer_Layout />

      <q-page-container>
         <div class="admin-page">
            <!-- ✨ Glow radial superior -->
            <div class="admin-page__glow" aria-hidden="true"></div>

            <!-- CABECERA -->
            <header class="admin-hero">
               <div class="admin-hero__eyebrow">
                  <span class="luxe-dot"></span>
                  <span>Panel de administración</span>
                  <span class="luxe-dot"></span>
               </div>
               <h1 class="admin-hero__title">Mi <em>Garaje</em></h1>
            </header>

            <!-- TARJETA PRINCIPAL -->
            <section class="luxe-card admin-card">
               <div class="luxe-card__glow" aria-hidden="true"></div>
               <div class="luxe-card__top-line" aria-hidden="true"></div>

               <q-tabs
                  v-model="tab"
                  dense
                  class="luxe-tabs"
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                  narrow-indicator
               >
                  <q-tab name="coches" label="Garaje" class="luxe-tab" />
                  <q-tab name="personas" label="Interesados" class="luxe-tab" />
               </q-tabs>

               <div class="luxe-tab-separator" aria-hidden="true"></div>

               <q-tab-panels v-model="tab" animated class="luxe-panels">
                  <!-- ============================================================
                       PANEL: COCHES
                       ============================================================ -->
                  <q-tab-panel name="coches" class="luxe-panel">
                     <div class="luxe-panel__actions">
                        <q-btn
                           @click="resetDataCar"
                           no-caps
                           unelevated
                           class="luxe-btn luxe-btn--primary"
                           icon="add"
                           label="Añadir Coche"
                        />
                     </div>

                     <div class="luxe-table-wrapper">
                        <q-table
                           title="Garaje"
                           :rows="rowsCoches"
                           :columns="columnsCoches"
                           row-key="matricula"
                           @row-click="handleCarRowClick"
                           dense
                           :rows-per-page="25"
                           :filter="filterCoches"
                           class="luxe-table"
                           flat
                           bordered
                        >
                           <template v-slot:top-right>
                              <q-input
                                 borderless
                                 dense
                                 debounce="300"
                                 v-model="filterCoches"
                                 placeholder="Buscar coche"
                                 class="luxe-search"
                              >
                                 <template v-slot:append>
                                    <q-icon name="search" />
                                 </template>
                              </q-input>
                           </template>
                        </q-table>
                     </div>
                  </q-tab-panel>

                  <!-- ============================================================
                       PANEL: PERSONAS
                       ============================================================ -->
                  <q-tab-panel name="personas" class="luxe-panel">
                     <div class="luxe-panel__actions">
                        <h3 class="luxe-subtitle">Interesados</h3>
                     </div>

                     <div class="luxe-table-wrapper">
                        <q-table
                           title="Personas"
                           :rows="rowsPersonas"
                           :columns="columnsPersonas"
                           row-key="email"
                           dense
                           :rows-per-page="10"
                           :filter="filterPersonas"
                           @row-click="handlePersonRowClick"
                           class="luxe-table"
                           flat
                           bordered
                        >
                           <template v-slot:top-right>
                              <q-input
                                 borderless
                                 dense
                                 debounce="300"
                                 v-model="filterPersonas"
                                 placeholder="Buscar"
                                 class="luxe-search"
                              >
                                 <template v-slot:append>
                                    <q-icon name="search" />
                                 </template>
                              </q-input>
                           </template>
                        </q-table>
                     </div>
                  </q-tab-panel>
               </q-tab-panels>
            </section>

            <!-- ============================================================
                 DIÁLOGO COCHES
                 ============================================================ -->
            <q-dialog v-model="dialogCoches" persistent>
               <q-card class="luxe-dialog">
                  <div class="luxe-dialog__top-line" aria-hidden="true"></div>
                  <div class="luxe-dialog__glow" aria-hidden="true"></div>

                  <header class="luxe-dialog__header">
                     <div class="luxe-eyebrow">
                        <span class="luxe-dot"></span>
                        <span>Configuración</span>
                        <span class="luxe-dot"></span>
                     </div>
                     <h2 class="luxe-dialog__title">
                        {{ newCar ? "Añadir coche" : "Editar coche" }}
                     </h2>
                  </header>

                  <q-card-section class="luxe-dialog__body">
                     <!-- Fila 1 -->
                     <div class="luxe-row luxe-row--3">
                        <q-input
                           v-model="datosCoches.matricula"
                           label="Matrícula"
                           dense
                           type="text"
                           maxlength="10"
                           hint="9245 NHG o B-3456-HC"
                           :rules="[
                              (val) => !!val || 'La matrícula es obligatoria',
                              (val) =>
                                 /^[A-Z0-9\s-]{6,10}$/i.test(val) ||
                                 'Formato inválido',
                           ]"
                           hide-bottom-space
                           @input="limpiarYFormatearMatricula"
                           class="luxe-input"
                           filled
                           borderless
                        />
                        <q-input
                           v-model="datosCoches.marca"
                           label="Marca"
                           dense
                           type="text"
                           class="luxe-input"
                           filled
                           borderless
                        />
                        <q-input
                           v-model="datosCoches.modelo"
                           label="Modelo"
                           dense
                           type="text"
                           class="luxe-input"
                           filled
                           borderless
                        />
                     </div>

                     <!-- Fila 2 -->
                     <div class="luxe-row luxe-row--2">
                        <q-select
                           v-model="datosCoches.ano"
                           :options="optionsAno"
                           label="Año"
                           dense
                           class="luxe-input"
                           filled
                           borderless
                           behavior="menu"
                        />
                        <q-input
                           v-model="datosCoches.km"
                           type="number"
                           label="KM"
                           min="0"
                           max="1000000"
                           step="1"
                           dense
                           @keypress="soloNumerosYPuntos"
                           input-class="no-arrows"
                           class="luxe-input"
                           filled
                           borderless
                        />
                     </div>

                     <!-- Fila 3 -->
                     <div class="luxe-row luxe-row--3">
                        <q-select
                           v-model="datosCoches.etiqueta"
                           :options="optionsEtiqueta"
                           label="Etiqueta"
                           dense
                           class="luxe-input"
                           filled
                           borderless
                           behavior="menu"
                        />
                        <q-select
                           v-model="datosCoches.tipo"
                           :options="optionsTipo"
                           label="Tipo"
                           dense
                           class="luxe-input"
                           filled
                           borderless
                           behavior="menu"
                        />
                        <q-select
                           v-model="datosCoches.promocion"
                           :options="optionsPromotion"
                           label="Promoción"
                           dense
                           class="luxe-input"
                           filled
                           borderless
                           behavior="menu"
                        />
                     </div>

                     <!-- Fila 4 -->
                     <div class="luxe-row luxe-row--3">
                        <q-select
                           v-model="datosCoches.combustible"
                           :options="optionsCombustible"
                           label="Combustible"
                           dense
                           class="luxe-input"
                           filled
                           borderless
                           behavior="menu"
                        />
                        <q-input
                           dense
                           v-model.number="datosCoches.precio"
                           type="number"
                           label="Precio"
                           @keypress="soloNumerosYPuntos"
                           input-class="no-arrows"
                           class="luxe-input"
                           filled
                           borderless
                        />
                        <q-select
                           v-model="datosCoches.colorBanner"
                           :options="coloresBanners"
                           label="Color Banner"
                           dense
                           class="luxe-input"
                           filled
                           borderless
                           behavior="menu"
                        />
                     </div>

                     <!-- Descripción -->
                     <div class="luxe-row">
                        <q-input
                           v-model="datosCoches.descripcion"
                           label="Descripción"
                           dense
                           type="textarea"
                           maxlength="150"
                           counter
                           :rules="reglasDescripcion"
                           autogrow
                           class="luxe-input"
                           filled
                           borderless
                        >
                           <template v-slot:append>
                              <q-icon
                                 name="smart_toy"
                                 class="cursor-pointer luxe-ai-icon"
                                 @click="generarDescripcionIA"
                              >
                                 <q-tooltip class="tooltip-luxe">
                                    Generar descripción con IA
                                 </q-tooltip>
                              </q-icon>
                           </template>

                           <template v-slot:counter>
                              <span :class="contadorClass">
                                 {{
                                    datosCoches.descripcion
                                       ? datosCoches.descripcion.length
                                       : 0
                                 }}/150
                              </span>
                           </template>
                        </q-input>
                     </div>

                     <!-- Imágenes -->
                     <div class="luxe-row">
                        <q-file
                           v-model="nuevaImagen"
                           label="Añadir imagen"
                           dense
                           accept="image/*"
                           max-files="1"
                           class="luxe-input luxe-file"
                           filled
                           borderless
                        >
                           <template v-slot:prepend>
                              <q-icon name="image" class="luxe-file-icon" />
                           </template>
                        </q-file>
                     </div>

                     <div class="luxe-images-grid">
                        <div
                           v-for="(image, index) in imagenesArray"
                           :key="index"
                           class="luxe-image-card"
                        >
                           <q-img
                              :src="image.ruta"
                              class="luxe-image-preview"
                              fit="cover"
                           />
                           <div class="luxe-image-actions">
                              <q-btn
                                 flat
                                 round
                                 dense
                                 @click="modImg(image)"
                                 icon="edit"
                                 class="luxe-icon-btn"
                              />
                              <q-btn
                                 flat
                                 round
                                 dense
                                 @click="deleteImage(image)"
                                 icon="delete"
                                 class="luxe-icon-btn luxe-icon-btn--danger"
                              />
                           </div>
                        </div>
                     </div>
                  </q-card-section>

                  <q-card-actions class="luxe-dialog__actions">
                     <q-btn
                        v-if="!newCar"
                        label="Eliminar"
                        icon="delete_outline"
                        @click="confirmDeleteCar"
                        no-caps
                        flat
                        class="luxe-btn luxe-btn--danger"
                     />
                     <q-space />
                     <q-btn
                        label="Cancelar"
                        @click="cancelInputCarDialog"
                        no-caps
                        flat
                        class="luxe-btn luxe-btn--ghost"
                     />
                     <q-btn
                        label="Aceptar"
                        @click="aceptarCambios"
                        no-caps
                        unelevated
                        class="luxe-btn luxe-btn--primary"
                     />
                  </q-card-actions>
               </q-card>
            </q-dialog>

            <!-- ============================================================
                 DIÁLOGO CAMBIAR IMAGEN
                 ============================================================ -->
            <q-dialog v-model="anadirImagenDialog">
               <q-card class="luxe-dialog luxe-dialog--small">
                  <div class="luxe-dialog__top-line" aria-hidden="true"></div>

                  <q-card-section class="luxe-dialog__header-row">
                     <div class="luxe-eyebrow">
                        <span class="luxe-dot"></span>
                        <span>Cambiar imagen</span>
                        <span class="luxe-dot"></span>
                     </div>
                     <q-space />
                     <q-btn
                        icon="close"
                        flat
                        round
                        dense
                        v-close-popup
                        class="luxe-icon-btn"
                     />
                  </q-card-section>

                  <q-card-section class="luxe-dialog__body">
                     <q-file
                        v-model="inputImagen"
                        label="Seleccionar imagen"
                        filled
                        borderless
                        class="luxe-input luxe-file"
                     >
                        <template v-slot:prepend>
                           <q-icon name="image" class="luxe-file-icon" />
                        </template>
                     </q-file>
                  </q-card-section>
               </q-card>
            </q-dialog>

            <!-- CONTACTO DIRECTO -->
            <ContactoDirecto
               :showContactDialog="showDialog"
               :arrayDatos="personaIndividual"
               @close-dialog-contact="showDialog = false"
            />
         </div>
      </q-page-container>

      <InputUser
         :inputUserDialog="showInputUser"
         @close-dialog-newuser="handleDialogClose"
      />
      <loginUser
         :loginUserDialog="showLoginUser"
         @close-dialog-loginuser="handleDialogClose"
      />
      <router-view />
   </q-layout>

   <!-- ============================================================
        SIN AUTENTICACIÓN
        ============================================================ -->
   <q-layout v-else>
      <div class="luxe-404">
         <div class="luxe-404__bg" aria-hidden="true"></div>
         <div class="luxe-404__content">
            <div class="luxe-404__code">404</div>
            <div class="luxe-404__msg">Oops. No hay nada que ver aquí...</div>
            <q-btn
               to="/"
               no-caps
               unelevated
               label="Primera página"
               class="luxe-btn luxe-btn--primary q-mt-xl"
            />
         </div>
      </div>
   </q-layout>

   <!-- ============================================================
        WAIT DIALOG
        ============================================================ -->
   <q-dialog v-model="waitDialog" persistent>
      <q-card class="luxe-wait">
         <div class="luxe-wait__bar" aria-hidden="true"></div>
         <p class="luxe-wait__text">Espere por favor...</p>
         <q-circular-progress
            indeterminate
            size="28px"
            :thickness="1"
            color="primary"
            track-color="grey-8"
            class="q-ml-md"
         />
      </q-card>
   </q-dialog>
</template>

<style>
body.body--dark {
   background: #0c0c0c;
}
</style>

<!-- Estilos del componente -->
<style scoped>
/* ============================================================
   PÁGINA ADMIN
   ============================================================ */
.admin-page {
   position: relative;
   min-height: 100vh;
   padding: 40px 20px 80px;
   background: linear-gradient(160deg, #0a0f16 0%, #0f1720 50%, #0a0f16 100%);
   overflow: hidden;
}

.admin-page__glow {
   position: absolute;
   inset: 0;
   background: radial-gradient(
      ellipse at top center,
      rgba(212, 175, 55, 0.09),
      transparent 55%
   );
   pointer-events: none;
   z-index: 0;
}

.admin-page > *:not(.admin-page__glow) {
   position: relative;
   z-index: 1;
}

/* ============================================================
   HERO
   ============================================================ */
.admin-hero {
   text-align: center;
   margin-bottom: 36px;
}

.admin-hero__eyebrow {
   display: inline-flex;
   align-items: center;
   gap: 10px;
   color: #d4af37;
   font-size: 11px;
   font-weight: 600;
   letter-spacing: 4px;
   text-transform: uppercase;
   margin-bottom: 14px;
   opacity: 0.9;
}

.luxe-dot {
   width: 4px;
   height: 4px;
   border-radius: 50%;
   background: #d4af37;
   box-shadow: 0 0 10px #d4af37;
}

.admin-hero__title {
   margin: 0;
   font-family: "Playfair Display", "Times New Roman", serif;
   font-style: italic;
   font-weight: 500;
   font-size: clamp(28px, 4vw, 46px);
   line-height: 1.1;
   color: #f5e6a8;
   letter-spacing: -0.5px;
   text-shadow: 0 4px 30px rgba(212, 175, 55, 0.35);
}

.admin-hero__title em {
   background: linear-gradient(90deg, #d4af37 0%, #f5e6a8 50%, #d4af37 100%);
   background-size: 200% auto;
   -webkit-background-clip: text;
   background-clip: text;
   -webkit-text-fill-color: transparent;
   animation: goldShimmer 5s linear infinite;
}

@keyframes goldShimmer {
   0% {
      background-position: 0% center;
   }
   100% {
      background-position: 200% center;
   }
}

/* ============================================================
   TARJETA LUXE
   ============================================================ */
.luxe-card {
   position: relative;
   max-width: 1400px;
   margin: 0 auto;
   background: linear-gradient(160deg, #0f1720 0%, #1a2332 100%);
   border: 1px solid rgba(212, 175, 55, 0.35);
   border-radius: 14px;
   padding: 8px 0 20px;
   color: #e0e6ed;
   box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6),
      inset 0 0 0 1px rgba(212, 175, 55, 0.08);
   overflow: hidden;
}

.luxe-card__glow {
   position: absolute;
   inset: 0;
   background: radial-gradient(
      ellipse at top center,
      rgba(212, 175, 55, 0.08),
      transparent 55%
   );
   pointer-events: none;
   z-index: 0;
}

.luxe-card__top-line {
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

.luxe-card > *:not(.luxe-card__glow):not(.luxe-card__top-line) {
   position: relative;
   z-index: 2;
}

/* ============================================================
   TABS LUXE
   ============================================================ */
.luxe-tabs {
   color: rgba(207, 216, 220, 0.6) !important;
}

:deep(.luxe-tab) {
   font-family: inherit;
   font-weight: 600;
   letter-spacing: 3px;
   text-transform: uppercase;
   font-size: 11px;
   color: rgba(207, 216, 220, 0.6) !important;
   transition: all 0.35s ease;
}

:deep(.luxe-tab.q-tab--active) {
   color: #d4af37 !important;
}

:deep(.luxe-tab:hover) {
   color: #f5e6a8 !important;
}

:deep(.luxe-tabs .q-tab__indicator) {
   background: linear-gradient(
      90deg,
      transparent,
      #d4af37,
      transparent
   ) !important;
   height: 2px;
}

.luxe-tab-separator {
   height: 1px;
   background: linear-gradient(
      90deg,
      transparent,
      rgba(212, 175, 55, 0.35),
      transparent
   );
   margin: 0;
}

/* ============================================================
   PANELES
   ============================================================ */
.luxe-panels {
   background: transparent !important;
}

.luxe-panel {
   padding: 26px 28px !important;
}

.luxe-panel__actions {
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 20px;
   gap: 12px;
   flex-wrap: wrap;
}

.luxe-subtitle {
   margin: 0;
   font-family: "Playfair Display", "Times New Roman", serif;
   font-style: italic;
   font-weight: 500;
   font-size: 22px;
   color: #f5e6a8;
   letter-spacing: -0.3px;
}

/* ============================================================
   TABLA LUXE
   ============================================================ */
.luxe-table-wrapper {
   border-radius: 10px;
   overflow: hidden;
   border: 1px solid rgba(212, 175, 55, 0.2);
}

:deep(.luxe-table) {
   background: transparent !important;
   color: #e0e6ed !important;
}

:deep(.luxe-table .q-table__title) {
   font-family: "Playfair Display", "Times New Roman", serif;
   font-style: italic;
   color: #f5e6a8 !important;
   font-weight: 500;
   font-size: 20px;
   letter-spacing: 0.3px;
}

:deep(.luxe-table thead tr) {
   background: rgba(212, 175, 55, 0.08) !important;
}

:deep(.luxe-table thead th) {
   color: #d4af37 !important;
   font-weight: 600 !important;
   letter-spacing: 2px;
   text-transform: uppercase;
   font-size: 10px !important;
   border-bottom: 1px solid rgba(212, 175, 55, 0.25) !important;
}

:deep(.luxe-table tbody tr) {
   transition: all 0.25s ease;
   border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

:deep(.luxe-table tbody tr:hover) {
   background: rgba(212, 175, 55, 0.07) !important;
   cursor: pointer;
   transform: scale(1.001);
}

:deep(.luxe-table tbody td) {
   color: #cfd8dc !important;
   font-size: 13px !important;
   border-bottom: none !important;
}

:deep(.luxe-table .q-table__bottom) {
   background: rgba(0, 0, 0, 0.15) !important;
   color: rgba(212, 175, 55, 0.7) !important;
   border-top: 1px solid rgba(212, 175, 55, 0.15) !important;
}

:deep(.luxe-table .q-table__bottom .q-btn) {
   color: #d4af37 !important;
}

/* Búsqueda luxe */
:deep(.luxe-search .q-field__control) {
   background: rgba(255, 255, 255, 0.03) !important;
   border: 1px solid rgba(212, 175, 55, 0.25) !important;
   border-radius: 6px !important;
   padding: 0 10px;
   min-height: 34px;
}

:deep(.luxe-search .q-field__native),
:deep(.luxe-search input) {
   color: #e0e6ed !important;
   font-size: 12px;
}

:deep(.luxe-search input::placeholder) {
   color: rgba(207, 216, 220, 0.4) !important;
}

:deep(.luxe-search .q-icon) {
   color: #d4af37 !important;
}

/* ============================================================
   DIÁLOGOS
   ============================================================ */
.luxe-dialog {
   position: relative;
   width: 92vw;
   max-width: 900px;
   max-height: 90vh;
   display: flex;
   flex-direction: column;
   background: linear-gradient(160deg, #0f1720 0%, #1a2332 100%);
   border: 1px solid rgba(212, 175, 55, 0.35);
   border-radius: 14px;
   color: #e0e6ed;
   box-shadow: 0 30px 80px rgba(0, 0, 0, 0.75),
      inset 0 0 0 1px rgba(212, 175, 55, 0.08);
   overflow: hidden;
}

.luxe-dialog--small {
   max-width: 480px;
}

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

.luxe-dialog__glow {
   position: absolute;
   inset: 0;
   background: radial-gradient(
      ellipse at top center,
      rgba(212, 175, 55, 0.09),
      transparent 55%
   );
   pointer-events: none;
   z-index: 0;
}

.luxe-dialog > *:not(.luxe-dialog__top-line):not(.luxe-dialog__glow) {
   position: relative;
   z-index: 2;
}

.luxe-dialog__header {
   padding: 26px 30px 12px;
   text-align: center;
}

.luxe-dialog__header-row {
   display: flex;
   align-items: center;
   padding: 20px 24px 10px;
}

.luxe-eyebrow {
   display: inline-flex;
   align-items: center;
   gap: 10px;
   color: #d4af37;
   font-size: 10px;
   font-weight: 600;
   letter-spacing: 4px;
   text-transform: uppercase;
   opacity: 0.9;
}

.luxe-dialog__title {
   margin: 8px 0 0;
   font-family: "Playfair Display", "Times New Roman", serif;
   font-style: italic;
   font-weight: 500;
   font-size: clamp(20px, 2.5vw, 28px);
   color: #f5e6a8;
   letter-spacing: -0.3px;
   text-shadow: 0 2px 20px rgba(212, 175, 55, 0.25);
}

.luxe-dialog__body {
   padding: 12px 30px 20px !important;
   overflow-y: auto;
   flex-grow: 1;
}

.luxe-dialog__body::-webkit-scrollbar {
   width: 6px;
}
.luxe-dialog__body::-webkit-scrollbar-thumb {
   background: rgba(212, 175, 55, 0.3);
   border-radius: 3px;
}

/* ============================================================
   FILAS Y INPUTS LUXE
   ============================================================ */
.luxe-row {
   margin-bottom: 14px;
}

.luxe-row--2,
.luxe-row--3 {
   display: grid;
   gap: 12px;
}

.luxe-row--2 {
   grid-template-columns: 1fr 1fr;
}

.luxe-row--3 {
   grid-template-columns: repeat(3, 1fr);
}

/* Inputs */
:deep(.luxe-input .q-field__control) {
   background: rgba(255, 255, 255, 0.03) !important;
   border: 1px solid rgba(212, 175, 55, 0.25) !important;
   border-radius: 8px !important;
   color: #e0e6ed !important;
   transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
   padding: 0 14px;
   min-height: 38px;
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
   font-size: 13px;
}

:deep(.luxe-input .q-field__label) {
   color: rgba(212, 175, 55, 0.75) !important;
   font-size: 10px;
   font-weight: 600;
   letter-spacing: 2px;
   text-transform: uppercase;
}

:deep(.luxe-input.q-field--focused .q-field__label) {
   color: #d4af37 !important;
}

:deep(.luxe-input .q-field__native::placeholder),
:deep(.luxe-input textarea::placeholder) {
   color: rgba(207, 216, 220, 0.35) !important;
   font-style: italic;
}

:deep(.luxe-input .q-field__bottom) {
   color: rgba(212, 175, 55, 0.6) !important;
   font-size: 10px;
   letter-spacing: 1.5px;
   text-transform: uppercase;
   padding-top: 4px;
}

:deep(.luxe-input .q-field__append .q-icon),
:deep(.luxe-input .q-field__control .q-icon) {
   color: #d4af37 !important;
}

:deep(.luxe-input .q-field__counter) {
   color: rgba(212, 175, 55, 0.7) !important;
   font-size: 10px;
   letter-spacing: 1.5px;
}

:deep(.luxe-input .q-field__messages) {
   color: #e57373 !important;
   font-size: 11px;
}

.luxe-ai-icon {
   color: #d4af37 !important;
   transition: transform 0.3s ease;
}

.luxe-ai-icon:hover {
   transform: scale(1.15) rotate(-8deg);
   color: #f5e6a8 !important;
}

/* File input */
:deep(.luxe-file .q-field__control) {
   padding: 0 14px;
}

.luxe-file-icon {
   color: #d4af37 !important;
}

/* Select dropdown luxe */
:deep(.q-menu .q-item--active),
:deep(.q-item.q-item--active) {
   color: #d4af37 !important;
}

/* ============================================================
   IMÁGENES
   ============================================================ */
.luxe-images-grid {
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
   gap: 12px;
   margin-top: 8px;
}

.luxe-image-card {
   position: relative;
   border-radius: 8px;
   overflow: hidden;
   border: 1px solid rgba(212, 175, 55, 0.3);
   background: rgba(0, 0, 0, 0.3);
   transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.luxe-image-card:hover {
   border-color: #d4af37;
   transform: translateY(-2px);
   box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
}

.luxe-image-preview {
   width: 100%;
   height: 80px;
   display: block;
}

.luxe-image-actions {
   display: flex;
   justify-content: center;
   gap: 4px;
   padding: 4px;
   background: rgba(0, 0, 0, 0.4);
}

.luxe-icon-btn {
   color: #d4af37 !important;
   transition: all 0.3s ease;
}

.luxe-icon-btn:hover {
   background: rgba(212, 175, 55, 0.15) !important;
   transform: scale(1.1);
}

.luxe-icon-btn--danger {
   color: #e57373 !important;
}

.luxe-icon-btn--danger:hover {
   background: rgba(229, 115, 115, 0.15) !important;
}

/* ============================================================
   BOTONES LUXE
   ============================================================ */
:deep(.luxe-btn) {
   position: relative;
   border-radius: 6px;
   font-weight: 600;
   letter-spacing: 2px;
   text-transform: uppercase;
   font-size: 11px;
   padding: 8px 22px;
   min-height: 40px;
   overflow: hidden;
   transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

:deep(.luxe-btn::before) {
   content: "";
   position: absolute;
   inset: 0;
   transform: translateY(101%);
   transition: transform 0;
}
</style>

<script>
import Footer_Layout from "src/layouts/Footer_Layout.vue";
import { defineComponent, ref, computed } from "vue";
import store from "../../src/store";
import ContactoDirecto from "../components/ContactoDirecto.vue";
import InputUser from "components/InputUser.vue";
import loginUser from "src/components/loginUser.vue";
import { Notify } from "quasar";
import getAllData from "src/composable/loadAllData";
import getAllusers from "src/composable/getUsersContact";
import deleteCar from "src/composable/deleteCar";
import HeaderLayout from "components/HeaderComponent.vue";
import updateTables from "src/composable/updatetableCocheMedia";
import convertFileToBase64 from "src/composable/convertirFileBase64";
import insertCocheNuevo from "src/composable/insertarCocheNuevo";
import generarContenidoIA from "src/composable/generarContenidoIA";
import { colorsEn_Es } from "src/composable/translateColorEn_Es";
import { colorsEs_En } from "src/composable/translateColorEs_En";
import {
   etiquetaCoche,
   tipoCoche,
   tipoPromocion,
   tipoCombustible,
   coloresBanners,
   cocheAno,
} from "src/composable/dataSelectores";
import { authMixin } from "../mixins/authMixin";
import apiLink from "../composable/apiLink";
import axios from "axios";
export default defineComponent({
   name: "AdminPage",
   mixins: [authMixin],
   data() {
      return {
         link: apiLink,
         anadirImagenDialog: false,
         dialogCoches: false,
         showInputUser: false,
         showLoginUser: false,
         userId: null,
         modelSelectedMenu: ref("coches"),
         tab: "coches",
         columnsCoches: [
            {
               name: "matricula",
               required: true,
               label: "Matricula",
               align: "center",
               sortable: true,
               field: "matricula",
            },
            {
               name: "marca",
               align: "center",
               label: "Marca",
               field: "marca",
               sortable: true,
            },
            {
               name: "modelo",
               label: "Modelo",
               field: "modelo",
               sortable: true,
               align: "center",
            },
            { name: "ano", label: "Año", field: "ano", align: "center" },
            { name: "km", label: "KM", field: "km", align: "center" },
            {
               name: "descripcion",
               label: "Descripcion",
               field: "descripcion",
               align: "center",
            },
            {
               name: "etiqueta",
               label: "Etiqueta",
               field: "etiqueta",
               sortable: true,
               align: "center",
            },
            {
               name: "tipo",
               label: "Tipo",
               field: "tipo",
               sortable: true,
               align: "center",
            },
            {
               name: "promocion",
               label: "Promocion",
               field: "promocion",
               sortable: true,
               align: "center",
            },
            {
               name: "combustible",
               label: "Combustible",
               field: "combustible",
               sortable: true,
               align: "center",
            },
            {
               name: "precio",
               label: "Precio",
               field: "precio",
               sortable: true,
               align: "center",
            },
            {
               name: "colorBanner",
               label: "ColorBanner",
               field: "colorBanner",
               sortable: true,
               align: "center",
            },
         ],
         rowsCoches: [],
         rowsPersonas: [],
         columnsPersonas: [
            {
               name: "username",
               label: "Nombre",
               align: "center",
               field: "username",
               sortable: true,
            },
            {
               name: "email",
               align: "center",
               label: "Email",
               field: "email",
               sortable: true,
            },
            {
               name: "mensaje",
               label: "Mensaje",
               field: "mensaje",
               sortable: true,
               classes: "message-truncate",
            },
            { name: "telefono", label: "Telefono", field: "telefono" },
            {
               name: "createdAt",
               label: "Fecha de Contacto",
               field: "created_at",
               sortable: true,
               format: (val) => {
                  const date = new Date(val);
                  const day = String(date.getUTCDate()).padStart(2, "0");
                  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
                  const year = date.getUTCFullYear();
                  const hours = String(date.getUTCHours()).padStart(2, "0");
                  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
                  return `${day}/${month}/${year} ${hours}:${minutes}`;
               },
               align: "left",
            },
         ],
         datosCoches: {},
         imagenesArray: [],
         imagenParaCambiar: "",
         inputImagen: null,
         inputPdf: null,
         mediaTable: {},
         optionsPromotion: tipoPromocion,
         optionsEtiqueta: etiquetaCoche,
         optionsTipo: tipoCoche,
         optionsAno: cocheAno,
         optionsCombustible: tipoCombustible,
         coloresBanners: coloresBanners,
         newCar: false,
         nuevaImagen: null,
         existPdf: null,
         fechaActual: new Date().getFullYear(),
         filterCoches: "",
         filterPersonas: "",
         waitDialog: false,
         imagenesParaEliminar: [],
         showDialog: false,
         personaIndividual: {},
         emailCliente: "",
         enviando: false,
         loadingAI: false,
      };
   },
   computed: {
      reglasDescripcion() {
         return [
            (val) =>
               (val && val.length > 0) ||
               "La descripción ayuda a mejorar las ventas",
            (val) => val.length <= 150 || "Máximo 150 caracteres",
            (val) => val.length >= 10 || "Minimo 10 caracteres",
         ];
      },
      contadorClass() {
         const length = this.datosCoches.descripcion
            ? this.datosCoches.descripcion.length
            : 0;
         if (length > 140) return "text-negative";
         if (length > 120) return "text-warning";
         return "text-grey";
      },
   },
   watch: {
      // ✅ PDF sigue en base64
      inputPdf: function (item) {
         convertFileToBase64(item).then((result) => {
            if (result) {
               this.existPdf = result;
            } else {
               console.log("El pdf no se ha podido añadir");
            }
         });
      },
      // ✅ NUEVAS imágenes - usar archivo directamente
      nuevaImagen: function (archivo) {
         if (archivo) {
            this.procesarNuevaImagen(archivo);
         }
      },
   },
   async mounted() {
      this.waitDialog = true;
      this.rowsCoches = await getAllData();
      this.rowsPersonas = await getAllusers();
      this.waitDialog = false;
   },
   methods: {
      async generarDescripcionIA() {
         if (this.loadingAI) return;

         // 1. Recoger datos clave del coche (AJUSTA ESTO a los datos que tengas disponibles)
         const datosParaIA = {
            marca: this.datosCoches.marca,
            modelo: this.datosCoches.modelo,
            ano: this.datosCoches.ano,
            km: this.datosCoches.km,
            combustible: this.datosCoches.combustible,
            precio: this.datosCoches.precio,
            promocion: this.datosCoches.promocion,
            tipo: this.datosCoches.tipo,
            etiqueta: this.datosCoches.etiqueta,
         };

         this.loadingAI = true;

         try {
            // 2. LLAMADA CORREGIDA: Llamamos a la función de servicio y esperamos el objeto de resultado
            const result = await generarContenidoIA(datosParaIA); // <--- Corrección

            if (result.success) {
               // El servicio devuelve { success: true, data: {...} }
               // 3. Éxito: Actualizar el campo de descripción
               this.datosCoches.descripcion = result.data.description.substring(
                  0,
                  150
               );
               this.$q.notify({
                  type: "positive",
                  message: "Descripción generada con éxito por IA.",
               });
            } else {
               // 4. Fallo: Mostrar error del servicio (result.error es el mensaje de error que definimos)
               this.$q.notify({
                  type: "negative",
                  message: `Error IA: ${
                     result.error || "No se pudo generar el texto."
                  }`,
               });
            }
         } catch (error) {
            // Este catch solo atrapará fallos de ejecución, el manejo de error 400/500 ya está en el servicio.
            this.$q.notify({
               type: "negative",
               message: "Fallo inesperado del sistema de IA.",
            });
            console.error("Error al llamar a la IA:", error);
         } finally {
            this.loadingAI = false;
         }
      },
      limpiarYFormatearMatricula(value) {
         let cleanValue = value ? value.toUpperCase() : "";
         cleanValue = cleanValue.replace(/[^A-Z0-9\s-]/g, "");
         this.datosCoches.matricula = cleanValue;
      },
      // ✅ Procesar nueva imagen sin base64
      procesarNuevaImagen(archivo) {
         if (!archivo.type.startsWith("image/")) {
            this.$q.notify({
               type: "negative",
               message: "Por favor, selecciona un archivo de imagen válido",
               timeout: 3000,
            });
            this.nuevaImagen = null;
            return;
         }

         if (archivo.size > 5 * 1024 * 1024) {
            this.$q.notify({
               type: "negative",
               message: "La imagen es demasiado grande (máximo 5MB)",
               timeout: 3000,
            });
            this.nuevaImagen = null;
            return;
         }

         const urlTemporal = URL.createObjectURL(archivo);
         /*  this.renumerarImagenes(); */
         this.agregarImagenAlArray(urlTemporal, archivo);
         this.nuevaImagen = null;
      },
      // ✅ Agregar imagen al array
      agregarImagenAlArray(urlImagen, archivo) {
         // 1. Verificar que no excedemos el límite de 8 imágenes
         if (this.imagenesArray.length >= 8) {
            this.$q.notify({
               type: "warning",
               message: "Máximo 8 imágenes permitidas",
               timeout: 3000,
            });
            URL.revokeObjectURL(urlImagen); // Liberar memoria de la URL temporal
            return; // Salir de la función
         }

         // 2. Encontrar qué números de imagen (1-8) están ya en uso
         // Mapeamos el array para extraer solo los números de cada imagenNum
         // Ejemplo: ["imagen1", "imagen3"] → [1, 3]
         const numerosUsados = this.imagenesArray.map(
            (img) => parseInt(img.imagenNum.replace("imagen", "")) // Convierte "imagen2" → 2
         );

         // 3. Buscar el primer número disponible empezando desde 1
         let nuevoNumero = 1;
         // Mientras el número esté usado y no hayamos superado el límite de 8
         while (numerosUsados.includes(nuevoNumero) && nuevoNumero <= 8) {
            nuevoNumero++; // Probamos con el siguiente número
         }

         // 4. Crear un ID único para la nueva imagen
         // Combina el número de imagen + timestamp para asegurar unicidad
         const nuevoId = `imagen_${nuevoNumero}_${Date.now()}`;

         // 5. Construir el objeto de la nueva imagen
         const nuevaImagen = {
            id: nuevoId, // ID único para identificar esta imagen
            imagen: urlImagen, // URL temporal blob para previsualización en el navegador
            archivo: archivo, // Objeto File real que se enviará al backend
            imagenNum: `imagen${nuevoNumero}`, // Campo que identifica la posición (imagen1, imagen2, etc.)
            nombreArchivo: archivo.name, // Nombre original del archivo
            esNueva: true, // Flag que indica que es una imagen nueva (no existente en BD)
            ruta: urlImagen, // URL temporal para mostrar en la interfaz
         };

         // 6. Agregar la nueva imagen al array
         this.imagenesArray.push(nuevaImagen);

         // 7. Notificar al usuario que la imagen se agregó correctamente
         this.$q.notify({
            type: "positive",
            message: `Imagen ${nuevoNumero} agregada correctamente`,
            timeout: 2000,
         });
      },
      // ✅ Eliminar imagen liberando memoria
      eliminarImagen(imagen) {
         const index = this.imagenesArray.findIndex(
            (img) => img.imagenNum === imagen.imagenNum
         );
         if (index !== -1) {
            this.imagenesParaEliminar.push(
               this.imagenesArray.splice(index, 1)[0]
            );
         }
      },
      limpiarURLsTemporales() {
         this.imagenesArray.forEach((imagen) => {
            if (imagen.imagen && imagen.imagen.startsWith("blob:")) {
               URL.revokeObjectURL(imagen.imagen); // ✅ Libera memoria
            }
            // OPCIONAL: También limpiar ruta si es blob
            if (imagen.ruta && imagen.ruta.startsWith("blob:")) {
               URL.revokeObjectURL(imagen.ruta); // ✅ Libera memoria
            }
         });
      },
      // ✅ Confirmación para eliminar coche
      confirmDeleteCar() {
         this.$q
            .dialog({
               title: "🚗 Eliminar coche",
               message:
                  "¿Estás seguro de que quieres eliminar este coche? Esta acción no se puede deshacer.",
               ok: { push: true, color: "negative", label: "Eliminar" },
               cancel: { push: true, color: "primary", label: "Cancelar" },
               persistent: true,
            })
            .onOk(() => {
               this.deleteCar();
               this.$q.notify({
                  type: "positive",
                  message: "Coche eliminado correctamente",
                  timeout: 2000,
               });
            })
            .onCancel(() => {
               this.$q.notify({
                  type: "info",
                  message: "Eliminación cancelada",
                  timeout: 1500,
               });
            });
      },
      // ✅ Confirmación para eliminar imagen
      deleteImage(image) {
         this.$q
            .dialog({
               title: "Confirmar",
               message: "¿Estás seguro de que quieres eliminar esta imagen?",
               cancel: true,
               persistent: true,
            })
            .onOk(() => {
               this.eliminarImagen(image);
               this.$q.notify({
                  type: "info",
                  message: "Imagen eliminada correctamente.",
               });
            })
            .onCancel(() => {
               console.log("Eliminación de imagen cancelada.");
            });
      },
      // ✅ Validación para solo números y puntos
      soloNumerosYPuntos(event) {
         const char = String.fromCharCode(event.which || event.keyCode);
         const currentValue = event.target.value; // El valor actual del input
         if (!/[0-9.]/.test(char)) {
            event.preventDefault();
            return false;
         }
         if (char !== ".") {
            // a. Simular el nuevo valor
            const newValue =
               currentValue.slice(0, event.target.selectionStart) +
               char +
               currentValue.slice(event.target.selectionEnd);
            const numericValue = parseFloat(newValue.replace(/,/g, "")); // Reemplazar comas si usas separador
            if (numericValue > 1000000) {
               event.preventDefault();
               return false;
            }
            if (currentValue.length >= 7 && numericValue < 1000000) {
               event.preventDefault();
               return false;
            }
         }

         return true;
      },
      // ✅ Recargar datos desde API
      async reloadData() {
         this.waitDialog = true;
         this.rowsCoches = await getAllData();
         this.rowsPersonas = await getAllusers();
         this.waitDialog = false;
      },

      async deleteCar() {
         let respuesta = await deleteCar(this.datosCoches.id);
         if (respuesta) console.log(respuesta);
         this.resetDataCar();
         this.dialogCoches = false;
         await this.reloadData();
      },

      deletePdf() {
         this.existPdf = null;
      },

      resetDataCar() {
         this.dialogCoches = true;
         this.newCar = true;
         this.datosCoches = {};
         this.imagenesArray = [];
         this.existPdf = null;
         this.inputPdf = null;
      },

      async aceptarCambios() {
         const colorEs_En = colorsEs_En(this.datosCoches.colorBanner);
         this.datosCoches.colorBanner = colorEs_En;
         this.limpiarURLsTemporales();
         this.mediaTable = {};
         this.mediaTable = this.imagenesArray.reduce((result, item) => {
            return Object.assign(result, {
               id: item.id,
               [item.imagenNum]: item.esNueva ? item.archivo : item.imagen,
            });
         }, this.mediaTable);
         this.mediaTable.pdf = this.existPdf;
         this.mediaTable.id = this.datosCoches.id;
         this.waitDialog = true;
         try {
            if (!this.newCar) {
               let res = await updateTables(
                  this.datosCoches,
                  this.mediaTable,
                  this.imagenesParaEliminar
               );
               console.log(
                  res
                     ? "Datos subidos a la base"
                     : "Error al subir datos en la base"
               );
               this.imagenesParaEliminar = [];
            } else {
               await insertCocheNuevo(this.datosCoches, this.mediaTable);
            }
            this.newCar = false;
            await this.reloadData();
         } catch (error) {
            console.error("Error al guardar:", error);
         } finally {
            this.dialogCoches = false;
            this.datosCoches = {};
            this.inputImagen = null;
            this.waitDialog = false;
         }
      },

      cancelInputCarDialog() {
         this.newCar = false;
         this.dialogCoches = false;
      },

      handleCarRowClick(evt, row) {
         this.dialogCoches = true;
         console.log("Row clicked:", row);
         this.datosCoches.matricula = row.matricula;
         this.datosCoches.marca = row.marca;
         this.datosCoches.modelo = row.modelo;
         this.datosCoches.ano = row.ano;
         this.datosCoches.km = row.km;
         this.datosCoches.descripcion = row.descripcion;
         this.datosCoches.etiqueta = row.etiqueta;
         this.datosCoches.tipo = row.tipo;
         this.datosCoches.promocion = row.promocion;
         this.datosCoches.combustible = row.combustible;
         this.datosCoches.precio = row.precio;
         const color = colorsEn_Es(row.colorBanner);
         this.datosCoches.colorBanner = color;
         this.datosCoches.id = row.id;
         this.existPdf = row.pdf;
         this.extrerImagenes(row);
      },
      handlePersonRowClick(evt, row) {
         this.showDialog = true;
         const { email, mensaje, username, telefono } = row;
         this.personaIndividual = { email, mensaje, username, telefono };
      },
      // Necesitarás este método en tu sección 'methods'
      // En tu componente Vue/Quasar

      modImg(item) {
         this.imagenParaCambiar = item;
         this.anadirImagenDialog = true;
      },

      extrerImagenes(row) {
         this.imagenesArray = [];
         for (let img = 1; img <= 8; img++) {
            const propertyName = "imagen" + img;
            if (row[propertyName]) {
               // Usa URL para evitar problemas con barras
               const rutaCompleta = new URL(row[propertyName], this.link).href;

               let imgObj = {
                  imagen: row[propertyName],
                  imagenNum: propertyName,
                  id: row.media_files,
                  esNueva: false,
                  ruta: rutaCompleta, // ← URL correcta
               };

               this.imagenesArray.push(imgObj);
            }
         }
      },

      handleDialogClose() {
         this.showLoginUser = false;
         this.showInputUser = false;
      },

      loginearUsuario() {
         this.showLoginUser = true;
      },

      logOut() {
         store.dispatch("logout");
         Notify.create({ type: "positive", message: "Adios." });
         this.$router.push({ name: "principal-coches" });
      },
   },

   components: {
      InputUser,
      loginUser,
      Footer_Layout,
      HeaderLayout,
      ContactoDirecto,
   },
});
</script>
