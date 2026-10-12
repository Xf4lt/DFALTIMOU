/* ============================================================
   CATÁLOGO IMOU  ·  datos tomados de equipos_imou_caracteristicas.xlsx
   Para editar/añadir un modelo basta con copiar un bloque.
   group: "wifi" | "ip" | "otros"
   mp:    megapíxeles (para la barra de resolución). null = no aplica
   ghost: palabra grande que se ve detrás del producto
   ============================================================ */

window.CONFIG = {
  // Número de WhatsApp con código de país y sin "+" ni espacios. Ej: "18095551234".
  // Si lo dejas vacío, el botón de WhatsApp no se muestra.
  whatsapp: "584121239740",
  // Teléfono tal como se muestra en la web
  telefono: "+58 412-1239740",
  // Nombre del negocio
  empresa: "D.Falt",
  // Tu usuario de Instagram sin @. Si lo dejas vacío, el enlace no se muestra.
  instagram: "",
  // Mensaje que se envía por WhatsApp (se añade el modelo al final)
  mensaje: "Hola, me interesa esta cámara IMOU:",
};

window.GROUPS = [
  { id: "all",   label: "Todas" },
  { id: "wifi",  label: "WiFi / 4G" },
  { id: "ip",    label: "IP · PoE" },
  { id: "otros", label: "Complementos" },
];

window.PRODUCTS = [
  /* ───────────── CÁMARAS WIFI / 4G ───────────── */
  { code: "IPC-K2EN-3H3W", group: "wifi", kind: "Cámara WiFi", name: "Ranger 2", mp: 3, conn: "WiFi", ghost: "3MP",
    tags: ["Giratoria", "Interior"] },
  { code: "IPC-K2EN-5H3W", group: "wifi", kind: "Cámara WiFi", name: "Ranger 2", mp: 5, conn: "WiFi", ghost: "5MP",
    tags: ["Giratoria", "Interior"] },
  { code: "IPC-K2EN-3R1W", group: "wifi", kind: "Cámara WiFi · Domo", name: "Ranger 2 Domo", mp: 3, conn: "WiFi", ghost: "3MP",
    tags: ["Domo"] },
  { code: "IPC-K2EN-5R1W", group: "wifi", kind: "Cámara WiFi · Domo", name: "Ranger 2 Domo Sense", mp: 5, conn: "WiFi", ghost: "5MP",
    tags: ["Domo", "Sense"] },
  { code: "IPC-S2EN-5R1S", group: "wifi", kind: "Cámara WiFi · Domo", name: "Ranger 2 Pro", mp: 5, conn: "WiFi", ghost: "5MP",
    tags: ["Domo", "Pro"] },
  { code: "IPC-K2MN-3H1WE", group: "wifi", kind: "Cámara WiFi", name: "Ranger Mini", mp: 3, conn: "WiFi", ghost: "3MP",
    tags: ["Lente 3.6 mm", "Zoom digital 8x", "microSD hasta 512 GB"] },
  { code: "IPC-S20EN-10M0S", group: "wifi", kind: "Cámara WiFi · Domo", name: "Ranger Dos Dual", mp: 10, conn: "WiFi", ghost: "10MP",
    tags: ["Lente dual", "Giro / Inclinación (PT)"] },
  { code: "IPC-S3EN-3M0WE", group: "wifi", kind: "Cámara WiFi · Bullet", name: "Bullet 3", mp: 3, conn: "WiFi", ghost: "3MP",
    tags: ["Exterior", "Lente 3.6 mm"] },
  { code: "IPC-S6DN-3M0WEB", group: "wifi", kind: "Cámara WiFi · Bombillo", name: "Bulb", mp: 3, conn: "WiFi", ghost: "3MP",
    tags: ["Rosca E27", "Lente 2.8 mm"] },
  { code: "IPC-S6DN-5M0WEB", group: "wifi", kind: "Cámara WiFi · Bombillo", name: "Bulb", mp: 5, conn: "WiFi", ghost: "5MP",
    tags: ["Rosca E27", "Lente 2.8 mm"] },
  { code: "IPC-S2VN-5M0WR", group: "wifi", kind: "Cámara inalámbrica", name: "Videoportero", mp: 5, conn: "WiFi", ghost: "5MP",
    tags: ["Con pantalla", "Videoportero"] },
  { code: "IPC-S21FTN-AM", group: "wifi", kind: "Cámara 4G · Cruiser", name: "Cruiser 4G", mp: 2, mpLabel: "1080P", conn: "4G", ghost: "4G",
    tags: ["Exterior", "Full HD 1080P"] },
  { code: "IPC-S7DN-HM0WEZ", group: "wifi", kind: "Cámara WiFi · Cruiser", name: "Cruiser Z", mp: 5, conn: "WiFi", ghost: "5MP",
    tags: ["2 lentes (2.8 + 12 mm)", "Zoom mixto 12x", "microSD hasta 512 GB"] },
  { code: "IPC-S7XEN-10M0WED", group: "wifi", kind: "Cámara WiFi · Cruiser", name: "Cruiser Dual", mp: 5, mpLabel: "5MP + 5MP", conn: "WiFi", ghost: "5+5",
    tags: ["Lente dual 5 + 5 MP"] },
  { code: "IPC-S7XEN-8M0WED", group: "wifi", kind: "Cámara WiFi · Cruiser", name: "Cruiser Dual", mp: 5, mpLabel: "5MP + 3MP", conn: "WiFi", ghost: "5+3",
    tags: ["Lente dual 5 + 3 MP"] },

  /* ───────────── CÁMARAS IP · PoE ───────────── */
  { code: "IPC-PS3DN-3M0", group: "ip", kind: "Cámara IP · Bullet", name: "Bullet PoE", mp: 3, conn: "PoE", ghost: "3MP",
    tags: ["IP67", "Exterior"] },
  { code: "IPC-PS3EN-3M0", group: "ip", kind: "Cámara IP · Bullet", name: "Bullet PoE", mp: 3, conn: "PoE", ghost: "3MP",
    tags: ["IP67", "Exterior"] },
  { code: "IPC-PS3DN-5M0", group: "ip", kind: "Cámara IP · Bullet", name: "Bullet PoE", mp: 5, conn: "PoE", ghost: "5MP",
    tags: ["IP67", "Exterior"] },
  { code: "IPC-PS3EN-5M0", group: "ip", kind: "Cámara IP · Bullet", name: "Bullet PoE", mp: 5, conn: "PoE", ghost: "5MP",
    tags: ["IP67", "Exterior"] },
  { code: "IPC-PS8D-5V0", group: "ip", kind: "Cámara IP · Turret", name: "Domo Turret PoE", mp: 5, conn: "PoE", ghost: "5MP",
    tags: ["Domo turret"] },
  { code: "IPC-PS7FN-3M0", group: "ip", kind: "Cámara IP · Domo PT", name: "Domo PT PoE", mp: 3, conn: "PoE", ghost: "3MP",
    tags: ["Full Color", "Sense", "Zoom digital 8x", "Giro / Inclinación (PT)"] },
  { code: "IPC-PS7FN-5M0", group: "ip", kind: "Cámara IP · Domo PT", name: "Domo PT PoE", mp: 5, conn: "PoE", ghost: "5MP",
    tags: ["Full Color", "Sense", "Zoom digital 8x", "Giro / Inclinación (PT)"] },
  { code: "IPC-PS70FN-8M0", group: "ip", kind: "Cámara IP · Domo PT", name: "Domo PT PoE", mp: 8, conn: "PoE", ghost: "8MP",
    tags: ["Full Color", "Sense", "Audio de 2 vías", "Giro / Inclinación (PT)"] },
  { code: "IPC-PS70FN-10M0", group: "ip", kind: "Cámara IP · Domo PT", name: "Domo PT PoE", mp: 10, conn: "PoE", ghost: "10MP",
    tags: ["Full Color", "Sense", "Audio de 2 vías", "Giro / Inclinación (PT)"] },

  /* ───────────── COMPLEMENTOS ───────────── */
  { code: "NVR-N118-8A0E", group: "otros", kind: "Grabador NVR", name: "NVR IMOU", mp: 8, mpLabel: "Hasta 8MP", conn: "Cable", ghost: "NVR",
    tags: ["Audio de 2 vías", "1 disco SATA hasta 16 TB"] },
  { code: "NVR-N118W-8A0E", group: "otros", kind: "Grabador NVR", name: "NVR IMOU WiFi 6", mp: 8, mpLabel: "Hasta 8MP", conn: "WiFi 6", ghost: "NVR",
    tags: ["WiFi 6", "Audio de 2 vías", "1 disco SATA hasta 16 TB"] },
  { code: "CUBO1", group: "otros", kind: "Cerradura inteligente", name: "Cerradura Cubo", mp: null, conn: "WiFi", ghost: "LOCK",
    tags: ["Cerradura inteligente"] },
  { code: "FSP12", group: "otros", kind: "Panel solar", name: "Panel solar FSP12", mp: null, conn: null, ghost: "SOLAR",
    tags: ["IP65"] },
  { code: "HX15", group: "otros", kind: "Router", name: "Router AX1500", mp: null, conn: "WiFi 6", ghost: "WIFI 6",
    tags: ["Dual band", "Gigabit", "WiFi 6"] },
  { code: "HR300", group: "otros", kind: "Router", name: "Router HR300", mp: null, conn: "WiFi", ghost: "300",
    tags: ["2 antenas", "300 Mbps"] },
];

/* Imagen optimizada (generada por tools/optimizar_imagenes.py).
   Algunas fotos originales usan la letra "O" en vez del cero "0" del código del Excel. */
var IMG_NAME = {
  "IPC-S2VN-5M0WR":  "IPC-S2VN-5MOWR",
  "IPC-S3EN-3M0WE":  "IPC-S3EN-3MOWE",
  "IPC-S6DN-3M0WEB": "IPC-S6DN-3MOWEB",
  "IPC-S6DN-5M0WEB": "IPC-S6DN-5MOWEB",
};
window.PRODUCTS.forEach(function (p) { p.img = "assets/" + (IMG_NAME[p.code] || p.code) + ".webp"; });
