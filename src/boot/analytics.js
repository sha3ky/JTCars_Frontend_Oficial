export default async () => {
   console.log("🎯 Boot analytics EJECUTÁNDOSE...");

   // ✅ Usar process.env que Quasar inyecta
   const gaId = import.meta.env.VITE_GA_ID;

   console.log("🔍 process.env.VITE_GA_ID:", gaId);
   console.log("🔍 Tipo de dato:", typeof gaId);
   console.log("🔍 Longitud:", gaId ? gaId.length : 0);

   if (gaId && gaId !== "undefined" && gaId.length > 10) {
      console.log("🚀 INICIALIZANDO Google Analytics... ID:", gaId);

      // Verificar si ya está cargado
      if (window.dataLayer && typeof window.gtag === "function") {
         console.log("✅ Google Analytics YA estaba inicializado");
         return;
      }

      // Cargar Google Analytics
      const scriptGtag = document.createElement("script");
      scriptGtag.async = true;
      scriptGtag.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;

      const scriptConfig = document.createElement("script");
      scriptConfig.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;

      document.head.appendChild(scriptGtag);
      document.head.appendChild(scriptConfig);

      console.log("✅ Google Analytics CONFIGURADO correctamente");
   } else {
      console.warn("❌ Google Analytics NO configurado - ID inválido:", gaId);
   }
};
