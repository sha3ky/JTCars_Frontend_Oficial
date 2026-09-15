<template>
   <q-layout view="lHh Lpr lFf">
      <HeaderLayout
         :is-authenticated="isAuthenticated()"
         :usuario-logineado="usuarioLogineado"
         @login="loginearUsuario"
         @logout="logOut"
      />
      <Footer_Layout />

      <q-page-container class="page-container">
         <!-- ============================================================
              HERO CINEMATOGRÁFICO
              ============================================================ -->
         <section class="hero-container">
            <q-img src="/backPrincipal.jpg" class="hero-image" alt="jt Logo">
               <!-- Overlay degradado -->
               <div class="hero-overlay absolute-full"></div>

               <!-- Contenido central -->
               <div class="absolute-full flex flex-center text-white">
                  <div class="text-center hero-text">
                     <div class="hero-badge q-mb-md">
                        <q-icon name="star" size="14px" />
                        <span>Concesionario Premium</span>
                     </div>
                     <h1 class="hero-title">
                        Bienvenido a
                        <span class="hero-title-accent">JTCars</span>
                     </h1>
                     <p class="hero-subtitle">Tu concesionario de confianza</p>
                     <div class="hero-actions q-mt-lg">
                        <q-btn
                           unelevated
                           no-caps
                           icon="directions_car"
                           label="Ver catálogo"
                           class="hero-cta hero-cta--primary"
                           @click="scrollToCars"
                        />
                        <!--  <q-btn
                           outline
                           no-caps
                           icon="contact_mail"
                           label="Contactar"
                           class="hero-cta hero-cta--ghost"
                           to="/contacto"
                        /> -->
                     </div>
                  </div>
               </div>

               <!-- Indicador scroll -->
               <div
                  class="scroll-indicator absolute-bottom text-center q-pb-md"
               >
                  <q-icon name="keyboard_arrow_down" size="28px" />
               </div>
            </q-img>
         </section>

         <!-- ============================================================
              BANNER WAVIY PREMIUM
              ============================================================ -->
         <div class="luxe-banner">
            <div class="luxe-banner__glow" aria-hidden="true"></div>
            <div class="luxe-banner__lines" aria-hidden="true">
               <span></span><span></span>
            </div>

            <div class="luxe-banner__content">
               <div class="luxe-banner__eyebrow">
                  <span class="luxe-dot"></span>
                  <span>Selección exclusiva</span>
                  <span class="luxe-dot"></span>
               </div>

               <h2 class="luxe-banner__title">
                  <span class="luxe-word">Grandes</span>
                  <span class="luxe-word">oportunidades</span>
                  <span class="luxe-word">sobre</span>
                  <span class="luxe-word luxe-word--accent">ruedas</span>
               </h2>

               <div class="luxe-banner__divider" aria-hidden="true">
                  <span class="luxe-divider-line"></span>
                  <svg viewBox="0 0 24 24" class="luxe-divider-icon">
                     <path
                        d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
                        fill="currentColor"
                     />
                  </svg>
                  <span class="luxe-divider-line"></span>
               </div>
            </div>
         </div>

         <!-- ============================================================
              GRID DE COCHES
              ============================================================ -->
         <section class="cars-container">
            <div
               class="cars-grid"
               :class="{ garajeVacio: datosCochesProcesados.length === 0 }"
            >
               <q-card
                  v-for="(item, index) in datosCochesProcesados"
                  :key="index"
                  class="car-card"
                  :style="{ '--delay': `${index * 0.06}s` }"
                  bordered
               >
                  <!-- IMAGEN -->
                  <div class="image-container">
                     <q-img
                        :src="item.imagenPrincipal"
                        class="car-image"
                        ratio="1"
                        fit="contain"
                     >
                        <div class="absolute-bottom row justify-center q-pb-md">
                           <q-badge
                              class="promo-badge text-subtitle2 q-px-md q-py-xs"
                              :color="item.colorBanner"
                              :label="item.promocion"
                           />
                        </div>
                     </q-img>
                  </div>

                  <!-- INFO -->
                  <q-card-section class="car-info">
                     <div class="car-details">
                        <div
                           class="car-price"
                           :class="`text-${item.colorBanner}`"
                        >
                           {{ formatPrice(item.precio) }}<span>€</span>
                        </div>

                        <div class="car-detail">
                           <span class="label text-grey"> Marca: </span>
                           <span class="value text-grey">
                              {{ item.marca }}
                           </span>
                        </div>
                        <div class="car-detail">
                           <span class="label text-grey"> Modelo: </span>
                           <span class="value text-grey">
                              {{ item.modelo }}
                           </span>
                        </div>
                        <div class="car-detail">
                           <span class="label text-grey"> Año: </span>
                           <span class="value text-grey">
                              {{ formatPrice(item.ano) }}
                           </span>
                        </div>

                        <div class="car-detail">
                           <span class="label text-grey">Km:</span>
                           <span class="value text-grey">{{ item.km }}</span>
                        </div>

                        <div class="car-detail">
                           <span class="label flex items-center">
                              Etiqueta:
                           </span>
                           <img
                              v-if="
                                 item.etiqueta &&
                                 item.etiqueta !== 'Sin Etiqueta'
                              "
                              :src="getEtiquetaImage(item.etiqueta)"
                              :alt="`Etiqueta ${item.etiqueta}`"
                              class="etiqueta-image"
                           />
                           <div v-else class="no-etiqueta">
                              <q-icon name="block" color="grey-6" size="24px" />
                              <span
                                 class="text-caption text-grey-6 q-ml-xs flex items-center"
                              >
                                 Sin etiqueta
                              </span>
                           </div>
                        </div>

                        <div class="car-detail">
                           <span class="label text-grey flex items-center">
                              Combustible:
                           </span>
                           <div>
                              <img
                                 :src="getCombustibleImage(item.combustible)"
                                 class="combustible-image"
                              />
                           </div>
                        </div>

                        <div class="car-detail">
                           <span
                              class="value text-grey text-center"
                              style="display: block; width: 100%"
                           >
                              {{ item.descripcion }}
                           </span>
                        </div>
                     </div>
                  </q-card-section>

                  <!-- ACCIONES -->
                  <q-card-actions class="car-actions">
                     <q-btn
                        flat
                        color="primary"
                        label="Más Fotos"
                        @click="carouselFoto(index)"
                        class="action-btn"
                     />
                     <template v-if="item.pdf">
                        <q-btn
                           flat
                           color="secondary"
                           label="Más Datos"
                           @click="datosPdf(index)"
                           class="action-btn"
                        />
                     </template>
                  </q-card-actions>
               </q-card>
            </div>
         </section>

         <!-- DIALOGS (sin cambios) -->
         <MasInfoDatos
            :masInfoDialog="showMasInfo"
            @close-dialog-masinfo="handleDialogClose"
            :pdf-datos="pdfDatos"
         />
         <InputUser
            :inputUserDialog="showInputUser"
            @close-dialog-newuser="handleDialogClose"
         />
         <loginUser
            :loginUserDialog="showLoginUser"
            @close-dialog-loginuser="handleDialogClose"
         />
         <MyCarousel
            :carouseloDialog="showCarousel"
            @close-dialog-carousel="handleDialogClose"
            :array-datos="arrayDatos"
         />
         <router-view />
      </q-page-container>
   </q-layout>
</template>

<style scoped>
/* ============================================================
   CONTENEDOR DE PÁGINA
   ============================================================ */
.page-container {
   background: #f5f7fa;
   overflow-x: hidden;
   padding-top: 0 !important;
}
.app-header {
   box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4) !important;
   /* ↑ ya lo tienes, solo asegúrate de que NO haya una segunda sombra clara */
}
/* ============================================================
   HERO CINEMATOGRÁFICO
   ============================================================ */
.hero-container {
   position: relative;
   overflow: hidden;
   height: 500px;
}

.hero-image {
   width: 100%;
   height: 500px !important;
   animation: subtleZoom 24s ease-in-out infinite;
   transform-origin: center;
}

.hero-image :deep(.q-img__image) {
   object-position: center;
   will-change: transform;
}

.hero-overlay {
   background: linear-gradient(
      180deg,
      rgba(15, 23, 32, 0.55) 0%,
      rgba(15, 23, 32, 0.35) 40%,
      rgba(15, 23, 32, 0.85) 100%
   );
   pointer-events: none;
   z-index: 1;
}

.hero-text {
   position: relative;
   z-index: 2;
   padding: 0 20px;
   max-width: 900px;
   animation: fadeUp 1s ease-out;
}

/* Badge superior */
.hero-badge {
   display: inline-flex;
   align-items: center;
   gap: 6px;
   padding: 6px 14px;
   border-radius: 999px;
   background: rgba(100, 181, 246, 0.15);
   border: 1px solid rgba(100, 181, 246, 0.4);
   backdrop-filter: blur(10px);
   color: #bbdefb;
   font-size: 12px;
   font-weight: 600;
   letter-spacing: 1px;
   text-transform: uppercase;
}

/* Título principal */
.hero-title {
   font-size: clamp(28px, 5vw, 56px);
   font-weight: 800;
   line-height: 1.1;
   margin: 0;
   letter-spacing: -0.5px;
   text-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
}

.hero-title-accent {
   display: inline-block;
   background: linear-gradient(135deg, #64b5f6 0%, #ff9800 100%);
   -webkit-background-clip: text;
   background-clip: text;
   -webkit-text-fill-color: transparent;
   animation: hueShift 6s ease-in-out infinite;
   background-size: 200% 200%;
}

@keyframes hueShift {
   0%,
   100% {
      background-position: 0% 50%;
   }
   50% {
      background-position: 100% 50%;
   }
}

.hero-subtitle {
   margin: 12px 0 0;
   font-size: clamp(14px, 1.8vw, 20px);
   opacity: 0.9;
   font-weight: 300;
   letter-spacing: 0.3px;
}

/* CTA */
.hero-actions {
   display: flex;
   gap: 12px;
   justify-content: center;
   flex-wrap: wrap;
}

.hero-cta {
   border-radius: 12px;
   font-weight: 700;
   padding: 10px 24px;
   letter-spacing: 0.4px;
   transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hero-cta--primary {
   background: linear-gradient(135deg, #64b5f6, #1976d2) !important;
   color: white !important;
   box-shadow: 0 8px 24px rgba(25, 118, 210, 0.45);
}

.hero-cta--primary:hover {
   transform: translateY(-3px) scale(1.05);
   box-shadow: 0 14px 34px rgba(25, 118, 210, 0.6);
}

.hero-cta--ghost {
   border: 2px solid rgba(255, 255, 255, 0.6) !important;
   color: white !important;
   backdrop-filter: blur(8px);
}

.hero-cta--ghost:hover {
   background: rgba(255, 255, 255, 0.12) !important;
   border-color: white !important;
   transform: translateY(-3px) scale(1.05);
}

/* Indicador scroll */
.scroll-indicator {
   z-index: 3;
   color: rgba(255, 255, 255, 0.7);
   animation: bounceDown 2s ease-in-out infinite;
   pointer-events: none;
}

@keyframes bounceDown {
   0%,
   100% {
      transform: translateY(0);
      opacity: 0.5;
   }
   50% {
      transform: translateY(-8px);
      opacity: 1;
   }
}

@keyframes subtleZoom {
   0%,
   100% {
      transform: scale(1);
   }
   50% {
      transform: scale(1.08);
   }
}

@keyframes fadeUp {
   from {
      opacity: 0;
      transform: translateY(30px);
   }
   to {
      opacity: 1;
      transform: translateY(0);
   }
}

/* ============================================================
   BANNER LUXE
   ============================================================ */
.luxe-banner {
   position: relative;
   padding: 56px 20px;
   background: linear-gradient(135deg, #0f1720 0%, #1a2332 50%, #0f1720 100%);
   overflow: hidden;
   display: flex;
   justify-content: center;
   align-items: center;
   border-top: 1px solid rgba(212, 175, 55, 0.18);
   border-bottom: 1px solid rgba(212, 175, 55, 0.18);
}

/* Glow radial dorado sutil */
.luxe-banner__glow {
   position: absolute;
   inset: 0;
   background: radial-gradient(
      ellipse at center,
      rgba(212, 175, 55, 0.12),
      transparent 65%
   );
   pointer-events: none;
}

/* Líneas decorativas laterales (esquinas) */
.luxe-banner__lines {
   position: absolute;
   inset: 0;
   pointer-events: none;
}
.luxe-banner__lines span {
   position: absolute;
   width: 60px;
   height: 60px;
   border: 1px solid rgba(212, 175, 55, 0.35);
}
.luxe-banner__lines span:nth-child(1) {
   top: 20px;
   left: 24px;
   border-right: none;
   border-bottom: none;
}
.luxe-banner__lines span:nth-child(2) {
   bottom: 20px;
   right: 24px;
   border-left: none;
   border-top: none;
}

/* Contenido */
.luxe-banner__content {
   position: relative;
   z-index: 2;
   text-align: center;
   max-width: 900px;
}

/* Eyebrow (texto superior pequeño) */
.luxe-banner__eyebrow {
   display: inline-flex;
   align-items: center;
   gap: 10px;
   color: #d4af37;
   font-size: 11px;
   font-weight: 600;
   letter-spacing: 4px;
   text-transform: uppercase;
   margin-bottom: 18px;
   opacity: 0.9;
}
.luxe-dot {
   width: 4px;
   height: 4px;
   border-radius: 50%;
   background: #d4af37;
   box-shadow: 0 0 10px #d4af37;
}

/* Título principal */
.luxe-banner__title {
   margin: 0;
   font-family: "Playfair Display", "Times New Roman", serif;
   font-weight: 400;
   font-style: italic;
   font-size: clamp(28px, 4.5vw, 56px);
   line-height: 1.15;
   letter-spacing: -0.5px;
   color: #f5f5f5;
}

.luxe-word {
   display: inline-block;
   margin: 0 8px;
   opacity: 0;
   transform: translateY(20px);
   animation: luxeReveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.luxe-word:nth-child(1) {
   animation-delay: 0.05s;
}
.luxe-word:nth-child(2) {
   animation-delay: 0.2s;
}
.luxe-word:nth-child(3) {
   animation-delay: 0.35s;
}
.luxe-word:nth-child(4) {
   animation-delay: 0.5s;
}

/* Palabra acento con gradiente dorado */
.luxe-word--accent {
   background: linear-gradient(
      90deg,
      #d4af37 0%,
      #f5e6a8 30%,
      #d4af37 50%,
      #f5e6a8 70%,
      #d4af37 100%
   );
   background-size: 200% auto;
   -webkit-background-clip: text;
   background-clip: text;
   -webkit-text-fill-color: transparent;
   font-weight: 600;
   animation: luxeReveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards,
      goldShimmer 4s linear infinite;
   animation-delay: 0.5s, 1.4s;
}

@keyframes luxeReveal {
   to {
      opacity: 1;
      transform: translateY(0);
   }
}

@keyframes goldShimmer {
   0% {
      background-position: 0% center;
   }
   100% {
      background-position: 200% center;
   }
}

/* Divisor decorativo */
.luxe-banner__divider {
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 14px;
   margin-top: 22px;
}
.luxe-divider-line {
   display: block;
   width: 80px;
   height: 1px;
   background: linear-gradient(
      90deg,
      transparent,
      rgba(212, 175, 55, 0.7),
      transparent
   );
}
.luxe-divider-icon {
   width: 14px;
   height: 14px;
   color: #d4af37;
   filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.6));
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 599px) {
   .luxe-banner {
      padding: 40px 16px;
   }
   .luxe-banner__eyebrow {
      font-size: 10px;
      letter-spacing: 3px;
   }
   .luxe-word {
      margin: 0 4px;
   }
   .luxe-banner__lines span {
      width: 36px;
      height: 36px;
   }
   .luxe-banner__lines span:nth-child(1) {
      top: 12px;
      left: 12px;
   }
   .luxe-banner__lines span:nth-child(2) {
      bottom: 12px;
      right: 12px;
   }
}

/* ♿ Accesibilidad */
@media (prefers-reduced-motion: reduce) {
   .luxe-word,
   .luxe-word--accent {
      opacity: 1;
      transform: none;
      animation: none !important;
   }
}

/* ============================================================
   CONTENEDOR DE COCHES
   ============================================================ */
.cars-container {
   padding: 40px 20px 60px;
   max-width: 1400px;
   margin: 0 auto;
}

.cars-grid {
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   gap: 28px;
   width: 100%;
   justify-content: center;
}

/* ============================================================
   TARJETA PREMIUM
   ============================================================ */
.car-card {
   position: relative;
   display: flex;
   flex-direction: column;
   height: 100%;
   border-radius: 16px !important;
   overflow: hidden;
   background: #ffffff;
   border: 1px solid rgba(0, 0, 0, 0.05) !important;
   box-shadow: 0 4px 18px rgba(15, 23, 32, 0.08);
   transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow 0.45s ease;
   animation: cardEnter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
   animation-delay: var(--delay, 0s);
}

@keyframes cardEnter {
   from {
      opacity: 0;
      transform: translateY(40px) scale(0.96);
   }
   to {
      opacity: 1;
      transform: translateY(0) scale(1);
   }
}

.car-card::before {
   content: "";
   position: absolute;
   inset: 0;
   border-radius: 16px;
   padding: 1px;
   background: linear-gradient(
      135deg,
      rgba(100, 181, 246, 0.6),
      rgba(255, 152, 0, 0.5)
   );
   -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
   -webkit-mask-composite: xor;
   mask-composite: exclude;
   opacity: 0;
   transition: opacity 0.4s ease;
   pointer-events: none;
   z-index: 3;
}

.car-card:hover {
   transform: translateY(-8px) scale(1.015);
   box-shadow: 0 24px 50px rgba(15, 23, 32, 0.22);
}

.car-card:hover::before {
   opacity: 1;
}

/* ============================================================
   IMAGEN DEL COCHE
   ============================================================ */
.image-container {
   position: relative;
   width: 100%;
   overflow: hidden;
   background: linear-gradient(180deg, #f8fafc, #eef2f7);
}

.car-image {
   width: 100%;
   height: 250px;
   transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.car-card:hover .car-image {
   transform: scale(1.08);
}

.promo-badge {
   border-radius: 999px !important;
   font-weight: 700 !important;
   letter-spacing: 0.5px;
   box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
   backdrop-filter: blur(4px);
}

/* ============================================================
   INFORMACIÓN
   ============================================================ */
.car-info {
   flex-grow: 1;
   padding: 16px 20px;
}

.car-details {
   padding: 6px 0;
}

.car-price {
   font-size: 1.6rem;
   font-weight: 800;
   margin-bottom: 14px;
   padding: 10px 14px;
   background: linear-gradient(135deg, #f1f4f9, #e0e5ec);
   border-radius: 12px;
   text-align: center;
   letter-spacing: -0.5px;
   border: 1px solid rgba(0, 0, 0, 0.04);
   transition: transform 0.3s ease;
}

.car-price span {
   font-size: 1.1rem;
   margin-left: 2px;
   opacity: 0.75;
}

.car-card:hover .car-price {
   transform: scale(1.03);
}

.car-detail {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 6px;
   padding-bottom: 6px;
   border-bottom: 1px solid #f0f0f0;
}

.car-detail:last-child {
   border-bottom: none;
   font-size: 1.05rem;
   max-height: 4.5em;
   overflow: hidden;
}

.car-detail .label {
   font-weight: 700;
   color: #9e9e9e;
   font-size: 1rem;
}

.car-detail .value {
   font-weight: 700;
   color: #333;
   font-size: 0.9rem;
}

/* ============================================================
   ACCIONES
   ============================================================ */
.car-actions {
   display: flex;
   justify-content: space-between;
   padding: 0 16px 16px;
   gap: 8px;
}

.action-btn {
   flex: 1;
   border-radius: 10px !important;
   font-weight: 700 !important;
   letter-spacing: 0.3px;
   transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
   background: rgba(100, 181, 246, 0.08);
}

.action-btn:hover {
   transform: translateY(-2px);
   background: rgba(100, 181, 246, 0.18) !important;
   box-shadow: 0 6px 18px rgba(25, 118, 210, 0.25);
}

/* ============================================================
   ETIQUETAS / COMBUSTIBLE
   ============================================================ */
.combustible-image,
.etiqueta-image {
   width: 5vh;
   filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15));
   transition: transform 0.3s ease;
}

.car-card:hover .combustible-image,
.car-card:hover .etiqueta-image {
   transform: scale(1.1);
}

/* ============================================================
   GARAJE VACÍO
   ============================================================ */
.garajeVacio {
   background-image: url("/garaje2.jpg");
   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;
   background-attachment: fixed;
   background-color: #333;
   min-height: 300px;
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   color: white;
   font-size: 1.5em;
   text-align: center;
   border-radius: 16px;
   box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 599px) {
   .hero-container,
   .hero-image {
      height: 420px !important;
   }

   .hero-actions {
      flex-direction: column;
      align-items: stretch;
   }

   .hero-cta {
      width: 100%;
   }

   .cars-grid {
      grid-template-columns: 1fr;
      gap: 18px;
   }

   .car-image {
      height: 200px;
   }

   .cars-container {
      padding: 24px 14px 40px;
   }

   .garajeVacio {
      background-attachment: unset;
   }

   .waviy {
      font-size: 6vw !important;
   }
}

@media (min-width: 600px) and (max-width: 1023px) {
   .cars-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
   }

   .car-image {
      height: 220px;
   }

   .waviy {
      font-size: 4vw;
   }
}

@media (min-width: 1024px) and (max-width: 1439px) {
   .cars-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
   }
}

@media (min-width: 1440px) {
   .cars-grid {
      grid-template-columns: repeat(3, 1fr);
   }
}

/* ♿ Accesibilidad */
@media (prefers-reduced-motion: reduce) {
   .hero-image,
   .hero-text,
   .hero-title-accent,
   .waviy span,
   .car-card,
   .scroll-indicator {
      animation: none !important;
      transition: none !important;
   }
}
</style>

<script>
import Footer_Layout from "src/layouts/Footer_Layout.vue";
import { defineComponent, ref } from "vue";
import { useQuasar, Notify } from "quasar";
import { RouterView, RouterLink } from "vue-router";
import InputUser from "components/InputUser.vue"; //
import loginUser from "src/components/loginUser.vue";
import MyCarousel from "src/components//MyCarousel.vue";
import MasInfoDatos from "components/MasInfoDatos.vue";
import HeaderLayout from "components/HeaderComponent.vue";
import getAllData from "src/composable/loadAllData";
import store from "../../src/store";
import { authMixin } from "../mixins/authMixin";
import apiLink from "../composable/apiLink";
export default defineComponent({
   name: "PrincipalCoches",
   mixins: [authMixin],
   data() {
      return {
         link: apiLink,
         datosCochesProcesados: [],
         pdfDatos: "",
         allData: [],
         arrayDatos: [],
         showMasInfo: false,
         showInputUser: false, // Initialize showInputUser to control InputUser component
         showLoginUser: false,
         showCarousel: false,
         userId: null,
         toggleDark: false,
         modelSelectedMenu: ref("coches"),

         expandedArrow: false,
         arrayDescripciones: [],
         anoCoche: [],
         kmCoche: [],
         etiquetas: [],
         combustible: [],
         promocion: [],
         precios: [],

         modelos: [],
         colores: [],
         arrayPdf: [],
      };
   },
   async mounted() {
      // ⏬ Carga de datos asincrónica
      this.allData = await getAllData();
      console.log("this.allData / mounted", this.allData);
      if (this.allData.length !== 0) {
         this.repartirData(this.allData);
      }
   },
   methods: {
      scrollToCars() {
         const el = document.querySelector(".cars-container");
         if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      },
      getCombustibleImage(combustible) {
         console.log("combustible", combustible);
         if (!combustible) return "/etiquetas/gasolina.png";
         const combustibleMap = {
            Gasolina: "/etiquetas/gasolina.png",
            Diesel: "/etiquetas/diesel.png",
            Electrico: "/etiquetas/electrico.png",
            Alternativo: "/etiquetas/alternativo.png",
            Hibrido: "/etiquetas/alternativo.png",
         };

         return combustibleMap[combustible] || "/etiquetas/gasolina.png";
      },
      formatPrice(price) {
         if (!price && price !== 0) return "0";
         const number = Number(price);
         return isNaN(number) ? "0" : number.toLocaleString("es-ES");
      },
      getEtiquetaImage(etiqueta) {
         const etiquetaMap = {
            B: "/etiquetas/etiquetaB.png",
            C: "/etiquetas/etiquetaC.png",
            Híbrido: "/etiquetas/etiquetaEco.png",
            Eléctrico: "/etiquetas/etiqueta0.png",
            "Sin Etiqueta": "Sin Etiqueta",
         };

         return etiquetaMap[etiqueta] || "/etiquetas/etiqueta0.png";
      },
      repartirData() {
         // Vacía el array para que no se dupliquen datos si se llama varias veces
         this.datosCochesProcesados = [];

         this.allData.forEach((element) => {
            // 1. Encontrar la imagen principal
            let imagenUrl = this.firstImgNotNull(element);

            // 2. Crear un objeto limpio con solo la información necesaria
            const cocheData = {
               imagenPrincipal: imagenUrl,
               descripcion: element.descripcion,
               ano: element.ano,
               km: element.km,
               etiqueta: element.etiqueta,
               promocion: element.promocion,
               combustible: element.combustible,
               precio: element.precio,
               marca: element.marca,
               modelo: element.modelo,
               colorBanner: element.colorBanner,
               pdf: element.pdf,
               // (Opcional) Si necesitas todas las rutas de imagen para el carrusel:
               imagenesSecundarias: [
                  element.imagen1,
                  element.imagen2,
                  element.imagen3,
                  element.imagen4,
                  element.imagen5,
                  element.imagen6,
                  element.imagen7,
                  element.imagen8,
               ].filter((img) => img), // Filtra los nulls
            };

            // 3. Añadir el objeto al nuevo array
            this.datosCochesProcesados.push(cocheData);
         });
      },
      firstImgNotNull(item) {
         const baseUrl = this.link;
         // Itera sobre los nombres de propiedad esperados (imagen1 hasta imagen8)
         for (let i = 1; i <= 8; i++) {
            const propertyName = `imagen${i}`;
            const imageUrl = item[propertyName];
            // 1. Verifica si la propiedad tiene un valor real (no es null, undefined, o string vacío)
            // El valor de la URL relativa de la imagen debe existir.
            if (imageUrl) {
               // 2. Construye la URL absoluta de forma segura usando el constructor URL.
               // Se puede usar 'new URL()' a partir de ES6 (2015), pero su soporte se popularizó después.
               // Si 'new URL()' da problemas en algún navegador viejo, usar la concatenación (ver nota).
               try {
                  // new URL() es la forma más limpia y estándar.
                  const rutaCompleta = new URL(imageUrl, baseUrl).href;
                  // 3. Si la URL se construye sin errores, la devuelve.
                  return rutaCompleta;
               } catch (error) {
                  // Esto maneja errores si la URL relativa es inválida,
                  // aunque no debería suceder si imageUrl existe.
                  console.error("Error al construir la URL:", error);
               }
            }
         }
         return null;
      },
      carouselFoto(index) {
         this.showCarousel = true;
         this.arrayDatos = this.allData[index];
      },
      datosPdf(index) {
         this.pdfDatos = this.allData[index].pdf;
         if (this.pdfDatos.length != 0) {
            this.showMasInfo = true;
         }
      },
      handleDialogClose() {
         this.showLoginUser = false; // Set showLoginUser to false when the dialog is closed
         this.showInputUser = false;
         this.showMasInfo = false;
         this.showCarousel = false;
      },
      nuevoUsuario() {
         this.showInputUser = true;
      },
      loginearUsuario() {
         this.showLoginUser = true;
      },
      async logOut() {
         store.dispatch("logout");
         Notify.create({
            type: "positive",
            message: "Adios.",
         });
         this.$router.push({ name: "principal-coches" });
      },
   },

   components: {
      InputUser,
      loginUser,
      MyCarousel,
      MasInfoDatos,
      Footer_Layout,
      HeaderLayout,
   },
});
</script>
