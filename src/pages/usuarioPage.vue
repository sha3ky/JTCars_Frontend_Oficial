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
         <div class="usuario-page">
            <div class="usuario-page__glow" aria-hidden="true"></div>

            <!-- HERO -->
            <header class="usuario-hero">
               <div class="usuario-hero__eyebrow">
                  <span class="luxe-dot"></span>
                  <span>Panel de usuario</span>
                  <span class="luxe-dot"></span>
               </div>
               <h1 class="usuario-hero__title">Ajustes <em>Usuario</em></h1>
            </header>

            <!-- TARJETA PRINCIPAL -->
            <section class="luxe-card">
               <div class="luxe-card__glow" aria-hidden="true"></div>
               <div class="luxe-card__top-line" aria-hidden="true"></div>

               <!-- TABS -->
               <q-tabs
                  v-model="tab"
                  dense
                  class="luxe-tabs"
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                  narrow-indicator
               >
                  <q-tab
                     name="opciones"
                     label="Opciones"
                     icon="key"
                     class="luxe-tab"
                  />
                  <q-tab
                     name="analitica"
                     label="Analítica"
                     icon="insights"
                     class="luxe-tab"
                  />
               </q-tabs>

               <div class="luxe-tab-separator" aria-hidden="true"></div>

               <q-tab-panels v-model="tab" animated class="luxe-panels">
                  <!-- ============================================================
                       TAB 1: OPCIONES (CONTRASEÑA)
                       ============================================================ -->
                  <q-tab-panel name="opciones" class="luxe-panel">
                     <header class="luxe-section-header">
                        <div class="luxe-eyebrow">
                           <span class="luxe-dot"></span>
                           <span>Seguridad</span>
                           <span class="luxe-dot"></span>
                        </div>
                        <h2 class="luxe-section-title">
                           Modificar <em>contraseña</em>
                        </h2>
                     </header>

                     <div class="luxe-form">
                        <q-input
                           v-model="oldPassword"
                           type="password"
                           label="Contraseña antigua"
                           dense
                           class="luxe-input"
                           filled
                           borderless
                        />

                        <q-input
                           v-model="newPassword"
                           label="Contraseña nueva"
                           dense
                           type="password"
                           :rules="[
                              (val) => val.length >= 8 || 'Mínimo 8 caracteres',
                              (val) =>
                                 /[A-Z]/.test(val) ||
                                 'Debe incluir una Mayúscula',
                              (val) =>
                                 /[a-z]/.test(val) ||
                                 'Debe incluir una Minúscula',
                              (val) =>
                                 /[0-9]/.test(val) || 'Debe incluir un Número',
                              (val) =>
                                 /[^a-zA-Z0-9\s]/.test(val) ||
                                 'Debe incluir un Símbolo',
                           ]"
                           hide-bottom-space
                           class="luxe-input"
                           filled
                           borderless
                        />

                        <q-input
                           v-model="newPassword2"
                           label="Repetir contraseña"
                           dense
                           type="password"
                           class="luxe-input"
                           filled
                           borderless
                        />
                     </div>

                     <div class="luxe-form__actions">
                        <q-btn
                           label="Guardar contraseña"
                           icon="save"
                           @click="aceptarCambios"
                           no-caps
                           unelevated
                           class="luxe-btn luxe-btn--primary"
                        />
                     </div>
                  </q-tab-panel>

                  <!-- ============================================================
                       TAB 2: ANALÍTICA
                       ============================================================ -->
                  <q-tab-panel name="analitica" class="luxe-panel">
                     <header class="luxe-section-header">
                        <div class="luxe-eyebrow">
                           <span class="luxe-dot"></span>
                           <span>Estadísticas</span>
                           <span class="luxe-dot"></span>
                        </div>
                        <h2 class="luxe-section-title">
                           Resumen de <em>actividad</em>
                        </h2>
                     </header>

                     <!-- KPIs -->
                     <div class="kpi-grid">
                        <div
                           v-for="(kpi, i) in kpis"
                           :key="i"
                           class="kpi-card"
                           :style="{ '--delay': `${i * 0.08}s` }"
                        >
                           <div class="kpi-card__icon">
                              <q-icon :name="kpi.icon" size="20px" />
                           </div>
                           <div class="kpi-card__body">
                              <div class="kpi-card__label">
                                 {{ kpi.label }}
                              </div>
                              <div class="kpi-card__value">
                                 {{ kpi.value }}
                              </div>
                              <div
                                 class="kpi-card__trend"
                                 :class="`kpi-card__trend--${kpi.trend}`"
                              >
                                 <q-icon
                                    :name="
                                       kpi.trend === 'up'
                                          ? 'trending_up'
                                          : 'trending_down'
                                    "
                                    size="14px"
                                 />
                                 {{ kpi.delta }}
                              </div>
                           </div>
                        </div>
                     </div>

                     <!-- GRÁFICO: VISITAS POR MES -->
                     <div class="luxe-chart">
                        <div class="luxe-chart__header">
                           <h3 class="luxe-chart__title">
                              Visitas últimos 6 meses
                           </h3>
                           <span class="luxe-chart__legend">
                              <span class="dot"></span> Visitas totales
                           </span>
                        </div>
                        <div class="luxe-chart__svg-wrapper">
                           <svg
                              viewBox="0 0 600 220"
                              preserveAspectRatio="none"
                              class="luxe-chart__svg"
                           >
                              <defs>
                                 <linearGradient
                                    id="goldGrad"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                 >
                                    <stop
                                       offset="0%"
                                       stop-color="#d4af37"
                                       stop-opacity="0.7"
                                    />
                                    <stop
                                       offset="100%"
                                       stop-color="#d4af37"
                                       stop-opacity="0"
                                    />
                                 </linearGradient>
                              </defs>
                              <!-- Grid -->
                              <g stroke="rgba(212,175,55,0.1)" stroke-width="1">
                                 <line
                                    v-for="n in 5"
                                    :key="n"
                                    x1="0"
                                    :y1="n * 40"
                                    x2="600"
                                    :y2="n * 40"
                                 />
                              </g>
                              <!-- Área -->
                              <polygon
                                 :points="visitasAreaPoints"
                                 fill="url(#goldGrad)"
                              />
                              <!-- Línea -->
                              <polyline
                                 :points="visitasLinePoints"
                                 fill="none"
                                 stroke="#d4af37"
                                 stroke-width="2.5"
                                 stroke-linejoin="round"
                                 stroke-linecap="round"
                              />
                              <!-- Puntos -->
                              <circle
                                 v-for="(p, i) in visitasPoints"
                                 :key="i"
                                 :cx="p.x"
                                 :cy="p.y"
                                 r="4"
                                 fill="#0f1720"
                                 stroke="#d4af37"
                                 stroke-width="2"
                              />
                           </svg>
                           <div class="luxe-chart__labels">
                              <span
                                 v-for="(m, i) in meses"
                                 :key="i"
                                 class="luxe-chart__label"
                              >
                                 {{ m }}
                              </span>
                           </div>
                        </div>
                     </div>

                     <!-- GRÁFICO: COCHES MÁS VISTOS -->
                     <div class="luxe-chart luxe-chart--bars">
                        <div class="luxe-chart__header">
                           <h3 class="luxe-chart__title">Coches más vistos</h3>
                           <span class="luxe-chart__legend">
                              <span class="dot"></span> Visualizaciones
                           </span>
                        </div>
                        <ul class="bar-list">
                           <li
                              v-for="(coche, i) in cochesMasVistos"
                              :key="i"
                              class="bar-item"
                           >
                              <span class="bar-item__name">
                                 {{ coche.nombre }}
                              </span>
                              <div class="bar-item__track">
                                 <div
                                    class="bar-item__fill"
                                    :style="{
                                       width: `${coche.porcentaje}%`,
                                       '--delay': `${i * 0.1}s`,
                                    }"
                                 ></div>
                              </div>
                              <span class="bar-item__value">
                                 {{ coche.vistas }}
                              </span>
                           </li>
                        </ul>
                     </div>

                     <!-- GRÁFICO: USUARIOS INSCRITOS (DONUT) -->
                     <div class="luxe-chart luxe-chart--donut">
                        <div class="luxe-chart__header">
                           <h3 class="luxe-chart__title">Usuarios inscritos</h3>
                        </div>
                        <div class="donut-wrapper">
                           <svg viewBox="0 0 120 120" class="donut-svg">
                              <circle
                                 cx="60"
                                 cy="60"
                                 r="50"
                                 fill="none"
                                 stroke="rgba(212,175,55,0.12)"
                                 stroke-width="12"
                              />
                              <circle
                                 cx="60"
                                 cy="60"
                                 r="50"
                                 fill="none"
                                 stroke="#d4af37"
                                 stroke-width="12"
                                 stroke-linecap="round"
                                 :stroke-dasharray="`${donutDash} 314`"
                                 transform="rotate(-90 60 60)"
                                 class="donut-arc"
                              />
                              <text
                                 x="60"
                                 y="58"
                                 text-anchor="middle"
                                 class="donut-value"
                              >
                                 {{ totalUsuarios }}
                              </text>
                              <text
                                 x="60"
                                 y="74"
                                 text-anchor="middle"
                                 class="donut-label"
                              >
                                 usuarios
                              </text>
                           </svg>
                           <div class="donut-legend">
                              <div
                                 v-for="(u, i) in usuariosPorRol"
                                 :key="i"
                                 class="donut-legend__item"
                              >
                                 <span
                                    class="donut-legend__dot"
                                    :style="{ background: u.color }"
                                 ></span>
                                 <span class="donut-legend__label">
                                    {{ u.label }}
                                 </span>
                                 <span class="donut-legend__value">
                                    {{ u.value }}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </q-tab-panel>
               </q-tab-panels>
            </section>
         </div>
         <router-view />
      </q-page-container>
   </q-layout>

   <!-- NO AUTENTICADO -->
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
</template>
<style scoped>
/* ============================================================
   PÁGINA
   ============================================================ */
.usuario-page {
   position: relative;
   min-height: 100vh;
   padding: 40px 20px 80px;
   background-image: linear-gradient(
         rgba(10, 15, 22, 0.75),
         rgba(10, 15, 22, 0.85)
      ),
      url("/mechanic.webp");
   background-size: cover;
   background-position: center;
   overflow: hidden;
}

.usuario-page__glow {
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

.usuario-page > *:not(.usuario-page__glow) {
   position: relative;
   z-index: 1;
}

/* ============================================================
   HERO
   ============================================================ */
.usuario-hero {
   text-align: center;
   margin-bottom: 30px;
}

.usuario-hero__eyebrow {
   display: inline-flex;
   align-items: center;
   gap: 10px;
   color: #d4af37;
   font-size: 11px;
   font-weight: 600;
   letter-spacing: 4px;
   text-transform: uppercase;
   margin-bottom: 12px;
}

.luxe-dot {
   width: 4px;
   height: 4px;
   border-radius: 50%;
   background: #d4af37;
   box-shadow: 0 0 10px #d4af37;
}

.usuario-hero__title {
   margin: 0;
   font-family: "Playfair Display", "Times New Roman", serif;
   font-style: italic;
   font-weight: 500;
   font-size: clamp(26px, 4vw, 44px);
   color: #f5e6a8;
   letter-spacing: -0.5px;
   text-shadow: 0 4px 30px rgba(212, 175, 55, 0.4);
}

.usuario-hero__title em {
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
   max-width: 980px;
   margin: 0 auto;
   background: linear-gradient(160deg, #0f1720 0%, #1a2332 100%);
   border: 1px solid rgba(212, 175, 55, 0.35);
   border-radius: 14px;
   color: #e0e6ed;
   box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7),
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
:deep(.luxe-tabs) {
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
}

/* ============================================================
   PANELES
   ============================================================ */
:deep(.luxe-panels) {
   background: transparent !important;
}

:deep(.luxe-panel) {
   padding: 32px 36px !important;
}

.luxe-section-header {
   text-align: center;
   margin-bottom: 28px;
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
   margin-bottom: 10px;
}

.luxe-section-title {
   margin: 0;
   font-family: "Playfair Display", "Times New Roman", serif;
   font-style: italic;
   font-weight: 500;
   font-size: clamp(20px, 2.5vw, 28px);
   color: #f5e6a8;
   letter-spacing: -0.3px;
}

.luxe-section-title em {
   background: linear-gradient(90deg, #d4af37 0%, #f5e6a8 50%, #d4af37 100%);
   background-size: 200% auto;
   -webkit-background-clip: text;
   background-clip: text;
   -webkit-text-fill-color: transparent;
}

/* ============================================================
   FORMULARIO
   ============================================================ */
.luxe-form {
   display: flex;
   flex-direction: column;
   gap: 16px;
   max-width: 520px;
   margin: 0 auto;
}

:deep(.luxe-input .q-field__control) {
   background: rgba(255, 255, 255, 0.03) !important;
   border: 1px solid rgba(212, 175, 55, 0.25) !important;
   border-radius: 8px !important;
   color: #e0e6ed !important;
   transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
   padding: 0 14px;
   min-height: 42px;
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
:deep(.luxe-input .q-field__input) {
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

:deep(.luxe-input .q-field__bottom) {
   color: rgba(212, 175, 55, 0.6) !important;
   font-size: 10px;
   letter-spacing: 1.5px;
}

:deep(.luxe-input .q-field__append .q-icon),
:deep(.luxe-input .q-field__control .q-icon) {
   color: #d4af37 !important;
}

.luxe-form__actions {
   display: flex;
   justify-content: center;
   margin-top: 24px;
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
   padding: 10px 26px;
   min-height: 44px;
   overflow: hidden;
   transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

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

:deep(.luxe-btn--primary) {
   color: #e6c877 !important;
   background: linear-gradient(135deg, #141c26, #1a2430) !important;
   border: 1px solid rgba(212, 175, 55, 0.55);
   box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.12);
}

:deep(.luxe-btn--primary::before) {
   background: linear-gradient(180deg, #d4af37, #b8860b);
}

:deep(.luxe-btn--primary:hover::before) {
   transform: translateY(0);
}

:deep(.luxe-btn--primary:hover) {
   color: #0f1720 !important;
   border-color: #d4af37;
   transform: translateY(-2px);
   box-shadow: 0 10px 30px rgba(212, 175, 55, 0.35),
      0 0 20px rgba(212, 175, 55, 0.25);
}

:deep(.luxe-btn--primary:hover .q-btn__content) {
   color: #0f1720 !important;
}

/* ============================================================
   KPI CARDS
   ============================================================ */
.kpi-grid {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
   gap: 14px;
   margin-bottom: 28px;
}

.kpi-card {
   display: flex;
   align-items: center;
   gap: 12px;
   padding: 14px 16px;
   background: rgba(255, 255, 255, 0.03);
   border: 1px solid rgba(212, 175, 55, 0.2);
   border-radius: 10px;
   transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
   animation: kpiEnter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
   animation-delay: var(--delay, 0s);
}

@keyframes kpiEnter {
   from {
      opacity: 0;
      transform: translateY(20px) scale(0.97);
   }
   to {
      opacity: 1;
      transform: translateY(0) scale(1);
   }
}

.kpi-card:hover {
   border-color: rgba(212, 175, 55, 0.55);
   background: rgba(212, 175, 55, 0.06);
   transform: translateY(-3px);
   box-shadow: 0 10px 24px rgba(212, 175, 55, 0.2);
}

.kpi-card__icon {
   display: flex;
   align-items: center;
   justify-content: center;
   width: 40px;
   height: 40px;
   border-radius: 8px;
   background: linear-gradient(
      135deg,
      rgba(212, 175, 55, 0.2),
      rgba(212, 175, 55, 0.05)
   );
   border: 1px solid rgba(212, 175, 55, 0.3);
   color: #d4af37 !important;
   flex-shrink: 0;
}

.kpi-card__body {
   flex-grow: 1;
   min-width: 0;
}

.kpi-card__label {
   font-size: 9px;
   font-weight: 600;
   letter-spacing: 2px;
   text-transform: uppercase;
   color: rgba(212, 175, 55, 0.7);
   margin-bottom: 2px;
}

.kpi-card__value {
   font-family: "Playfair Display", "Times New Roman", serif;
   font-size: 22px;
   font-weight: 600;
   color: #f5e6a8;
   line-height: 1.1;
}

.kpi-card__trend {
   display: inline-flex;
   align-items: center;
   gap: 4px;
   font-size: 10px;
   font-weight: 600;
   letter-spacing: 1px;
   margin-top: 4px;
}

.kpi-card__trend--up {
   color: #81c784;
}

.kpi-card__trend--down {
   color: #e57373;
}

/* ============================================================
   GRÁFICOS
   ============================================================ */
.luxe-chart {
   margin-top: 26px;
   padding: 20px 22px;
   background: rgba(255, 255, 255, 0.025);
   border: 1px solid rgba(212, 175, 55, 0.2);
   border-radius: 12px;
}

.luxe-chart__header {
   display: flex;
   align-items: baseline;
   justify-content: space-between;
   gap: 12px;
   margin-bottom: 16px;
   flex-wrap: wrap;
}

.luxe-chart__title {
   margin: 0;
   font-family: "Playfair Display", "Times New Roman", serif;
   font-style: italic;
   font-weight: 500;
   font-size: 18px;
   color: #f5e6a8;
   letter-spacing: 0.3px;
}

.luxe-chart__legend {
   display: inline-flex;
   align-items: center;
   gap: 6px;
   font-size: 10px;
   letter-spacing: 2px;
   text-transform: uppercase;
   color: rgba(212, 175, 55, 0.7);
}

.luxe-chart__legend .dot {
   width: 8px;
   height: 8px;
   border-radius: 50%;
   background: #d4af37;
   box-shadow: 0 0 8px #d4af37;
}

/* SVG chart */
.luxe-chart__svg-wrapper {
   position: relative;
}

.luxe-chart__svg {
   width: 100%;
   height: 220px;
   display: block;
   overflow: visible;
}

.luxe-chart__labels {
   display: flex;
   justify-content: space-between;
   padding: 8px 0 0;
   font-size: 10px;
   letter-spacing: 2px;
   text-transform: uppercase;
   color: rgba(212, 175, 55, 0.6);
}

/* Barras */
.bar-list {
   list-style: none;
   padding: 0;
   margin: 0;
   display: flex;
   flex-direction: column;
   gap: 12px;
}

.bar-item {
   display: grid;
   grid-template-columns: 1fr 2fr auto;
   align-items: center;
   gap: 14px;
}

.bar-item__name {
   font-size: 13px;
   color: #e0e6ed;
   font-weight: 500;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
}

.bar-item__track {
   position: relative;
   height: 8px;
   background: rgba(212, 175, 55, 0.1);
   border-radius: 999px;
   overflow: hidden;
}

.bar-item__fill {
   position: absolute;
   inset: 0 auto 0 0;
   width: 0;
   background: linear-gradient(90deg, #b8860b, #d4af37, #f5e6a8);
   border-radius: 999px;
   animation: barGrow 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
   animation-delay: var(--delay, 0s);
   box-shadow: 0 0 12px rgba(212, 175, 55, 0.4);
}

@keyframes barGrow {
   to {
      width: var(--w, 100%);
   }
}

.bar-item__value {
   font-family: "Playfair Display", "Times New Roman", serif;
   font-size: 15px;
   font-weight: 600;
   color: #f5e6a8;
   min-width: 40px;
   text-align: right;
}

/* Donut */
.donut-wrapper {
   display: flex;
   align-items: center;
   gap: 28px;
   flex-wrap: wrap;
   justify-content: center;
}

.donut-svg {
   width: 160px;
   height: 160px;
   flex-shrink: 0;
}

.donut-arc {
   animation: donutGrow 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
   transform-origin: center;
}

@keyframes donutGrow {
   from {
      stroke-dasharray: 0 314;
   }
}

.donut-value {
   font-family: "Playfair Display", "Times New Roman", serif;
   font-size: 22px;
   font-weight: 600;
   fill: #f5e6a8;
}

.donut-label {
   font-size: 8px;
   letter-spacing: 2px;
   text-transform: uppercase;
   fill: rgba(212, 175, 55, 0.7);
}

.donut-legend {
   display: flex;
   flex-direction: column;
   gap: 10px;
}

.donut-legend__item {
   display: grid;
   grid-template-columns: 14px 1fr auto;
   align-items: center;
   gap: 10px;
   font-size: 12px;
}

.donut-legend__dot {
   width: 10px;
   height: 10px;
   border-radius: 50%;
   box-shadow: 0 0 8px currentColor;
}

.donut-legend__label {
   color: #cfd8dc;
   letter-spacing: 0.5px;
}

.donut-legend__value {
   font-weight: 600;
   color: #f5e6a8;
   font-family: "Playfair Display", "Times New Roman", serif;
}

/* ============================================================
   404
   ============================================================ */
.luxe-404 {
   position: relative;
   width: 100vw;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
   background: linear-gradient(160deg, #0a0f16 0%, #1a2332 100%);
   overflow: hidden;
}

.luxe-404__bg {
   position: absolute;
   inset: 0;
   background: radial-gradient(
      ellipse at center,
      rgba(212, 175, 55, 0.15),
      transparent 60%
   );
}

.luxe-404__content {
   position: relative;
   text-align: center;
   padding: 20px;
}

.luxe-404__code {
   font-family: "Playfair Display", "Times New Roman", serif;
   font-style: italic;
   font-size: clamp(120px, 22vw, 240px);
   line-height: 1;
   background: linear-gradient(135deg, #d4af37 0%, #f5e6a8 50%, #d4af37 100%);
   background-size: 200% auto;
   -webkit-background-clip: text;
   background-clip: text;
   -webkit-text-fill-color: transparent;
   animation: goldShimmer 5s linear infinite;
}

.luxe-404__msg {
   font-family: "Playfair Display", "Times New Roman", serif;
   font-style: italic;
   font-size: clamp(18px, 2.5vw, 28px);
   color: #cfd8dc;
   letter-spacing: 0.5px;
   margin-top: 12px;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 599px) {
   .usuario-page {
      padding: 24px 12px 60px;
   }

   :deep(.luxe-panel) {
      padding: 22px 18px !important;
   }

   .luxe-chart {
      padding: 16px;
   }

   .kpi-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
   }

   .kpi-card {
      padding: 12px;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
   }

   .kpi-card__value {
      font-size: 18px;
   }

   .bar-item {
      grid-template-columns: 1fr;
      gap: 6px;
   }

   .bar-item__value {
      text-align: left;
   }

   .donut-wrapper {
      flex-direction: column;
   }
}

/* ♿ Accesibilidad */
@media (prefers-reduced-motion: reduce) {
   .usuario-hero__title em,
   .luxe-card__top-line,
   :deep(.luxe-btn),
   :deep(.luxe-btn::before),
   .kpi-card,
   .bar-item__fill,
   .donut-arc,
   .luxe-404__code {
      animation: none !important;
      transition: none !important;
   }
}
</style>

<script>
// Limpiamos las importaciones no utilizadas
import Footer_Layout from "src/layouts/Footer_Layout.vue";
import { defineComponent, computed } from "vue";
import store from "../../src/store";
import { Notify } from "quasar";
import updatePasswordUser from "src/composable/updatePasswordUser"; // Mantener solo lo necesario
import { authMixin } from "../mixins/authMixin";
import HeaderLayout from "components/HeaderComponent.vue";

export default defineComponent({
   name: "ExtraUsuario",
   mixins: [authMixin],
   data() {
      return {
         // Se eliminan showInputUser, showLoginUser, modificarNomEmail, notificaciones, etc.
         oldPassword: "",
         newPassword: "",
         newPassword2: "",
         tab: "opciones",
         meses: ["May", "Jun", "Jul", "Ago", "Sep", "Oct"],
         visitasPorMes: [420, 580, 690, 810, 950, 1180],
         cochesMasVistos: [
            { nombre: "BMW Serie 3 320d", vistas: 342, porcentaje: 100 },
            { nombre: "Audi A4 2.0 TDI", vistas: 287, porcentaje: 84 },
            { nombre: "Mercedes C220", vistas: 231, porcentaje: 68 },
            { nombre: "VW Golf 1.6 TDI", vistas: 189, porcentaje: 55 },
            { nombre: "Seat León FR", vistas: 142, porcentaje: 42 },
         ],
         totalUsuarios: 128,
         usuariosPorRol: [
            { label: "Clientes", value: 96, color: "#d4af37" },
            { label: "Vendedores", value: 24, color: "#b8860b" },
            { label: "Admins", value: 8, color: "#f5e6a8" },
         ],
         // Se eliminan todos los campos innecesarios del formulario
      };
   },

   // Se elimina el watcher, ya que solo hay una sección

   computed: {
      backgroundStyle() {
         const baseStyle = {
            "max-width": "550px",
            "z-index": "10",
            "border-radius": "10px",
            "margin-top": "10%",
         };
         // Si el usuario ES Admin (por ejemplo) o está en modo claro
         if (store.state.darkMode) {
            return {
               ...baseStyle,
               "background-color": "rgba(251, 251, 251, 0.33)",
            };
         } else {
            // Si NO es Admin, usa la versión oscura
            return {
               ...baseStyle,
               "background-color": "rgba(0, 0, 0, 0.62)",
            };
         }
      },
      kpis() {
         const totalVisitas = this.visitasPorMes.reduce((a, b) => a + b, 0);
         return [
            {
               label: "Visitas este mes",
               value: this.visitasPorMes[this.visitasPorMes.length - 1],
               icon: "visibility",
               trend: "up",
               delta: "+24%",
            },
            {
               label: "Total visitas",
               value: totalVisitas.toLocaleString("es-ES"),
               icon: "insights",
               trend: "up",
               delta: "+18%",
            },
            {
               label: "Coches publicados",
               value: this.cochesMasVistos.length,
               icon: "directions_car",
               trend: "up",
               delta: "+3",
            },
            {
               label: "Usuarios inscritos",
               value: this.totalUsuarios,
               icon: "group",
               trend: "up",
               delta: "+12",
            },
         ];
      },

      visitasPoints() {
         const max = Math.max(...this.visitasPorMes);
         const w = 600;
         const h = 200;
         const padding = 10;
         return this.visitasPorMes.map((v, i) => ({
            x:
               (i / (this.visitasPorMes.length - 1)) * (w - padding * 2) +
               padding,
            y: h - (v / max) * (h - padding * 2) - padding,
         }));
      },

      visitasLinePoints() {
         return this.visitasPoints.map((p) => `${p.x},${p.y}`).join(" ");
      },

      visitasAreaPoints() {
         const pts = this.visitasPoints.map((p) => `${p.x},${p.y}`).join(" ");
         const first = this.visitasPoints[0];
         const last = this.visitasPoints[this.visitasPoints.length - 1];
         return `${first.x},200 ${pts} ${last.x},200`;
      },

      donutDash() {
         // 314 = circunferencia aproximada (2*PI*50)
         return (this.totalUsuarios / 200) * 314;
      },
   },
   methods: {
      // Simplificamos 'aceptarCambios' para que solo maneje el cambio de contraseña
      async aceptarCambios() {
         if (this.newPassword !== this.newPassword2) {
            console.log("Las contraseñas no son iguales");
            Notify.create({
               type: "negative",
               message: "Las contraseñas no son iguales",
            });
         } else {
            // Llama a la función del composable para actualizar la contraseña
            let resPassword = await updatePasswordUser(
               this.oldPassword,
               this.newPassword
            );

            if (resPassword) {
               console.log("Contraseña actualizada correctamente");
               Notify.create({
                  type: "positive",
                  message: "Contraseña cambiada exitosamente",
               });
               // Limpia los campos después del éxito
               this.oldPassword = "";
               this.newPassword = "";
               this.newPassword2 = "";
            } else {
               // Esto incluye el caso de que la oldPassword sea incorrecta
               console.log("Error al cambiar la contraseña");
               Notify.create({
                  type: "negative",
                  message:
                     "Error al cambiar la contraseña. Verifica tu contraseña antigua.",
               });
            }
         }
      },

      // Mantener solo los métodos de autenticación si son necesarios para HeaderLayout
      updateUsuarioLogineado(bool) {
         if (bool) {
            this.usuarioLogineado = store.state.name;
            this.sessionData = store.state.sessionData;
            this.userIsAdmin = store.state.isAdmin;
         }
      },
      handleDialogClose() {
         // Método de manejo de diálogos eliminado
      },
      nuevoUsuario() {
         // Método eliminado
      },
      loginearUsuario() {
         // Método eliminado
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
      // Se eliminan InputUser y loginUser
      Footer_Layout,
      HeaderLayout,
   },
});
</script>
