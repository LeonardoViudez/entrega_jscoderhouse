// variables constantes del simulador
const LADRILLOS_POR_M2_COMUN = 60;
const LADRILLOS_POR_M2_HUECO = 45;

const LADRILLOS_POR_PALLET_COMUN = 1000;
const LADRILLOS_POR_PALLET_HUECO = 144;

const BOLSAS_CEMENTO_POR_M2 = 0.2; // 1 bolsa de cemento 25kg cada 5 m2
const BOLSAS_ARENA_POR_M2 = 0.3;  // 1 bolsa de arena 25kg cada 3,3 m2

const COSTO_PALLET_LADRILLO_COMUN = 120000;
const COSTO_PALLET_LADRILLO_HUECO = 100000;

console.log("Simulador de construcción cargado.");

function pedirNumero(mensaje) {
  while (true) {
    const respuesta = prompt(mensaje);
    if (respuesta === null) return null;

    const valor = parseFloat(respuesta.replace(",", "."));
    if (!isNaN(valor) && valor > 0) return valor;

    alert("Ingresá un número mayor a 0");
  }
}

function pedirTipoLadrillo() {
  while (true) {
    const respuesta = prompt('Ingresá el tipo de ladrillo: "comun" o "hueco"');
    if (respuesta === null) return null;

    const tipo = respuesta.trim().toLowerCase();
    if (tipo === "comun" || tipo === "hueco") return tipo;

    alert('Opción NO VÁLIDA. Escribí "comun" o "hueco".');
  }
}

function calcularMateriales(m2, tipoLadrillo) {
  const ladrillosPorM2 = tipoLadrillo === "comun"
    ? LADRILLOS_POR_M2_COMUN
    : LADRILLOS_POR_M2_HUECO;

  const ladrillosPorPallet = tipoLadrillo === "comun"
    ? LADRILLOS_POR_PALLET_COMUN
    : LADRILLOS_POR_PALLET_HUECO;

  const costoPallet = tipoLadrillo === "comun"
    ? COSTO_PALLET_LADRILLO_COMUN
    : COSTO_PALLET_LADRILLO_HUECO;

  const ladrillosNecesarios = m2 * ladrillosPorM2;
  const pallets = Math.ceil(ladrillosNecesarios / ladrillosPorPallet);
  const bolsasCemento = Math.ceil(m2 * BOLSAS_CEMENTO_POR_M2);
  const bolsasArena = Math.ceil(m2 * BOLSAS_ARENA_POR_M2);

  return { pallets, bolsasCemento, bolsasArena, costoPallet };
}

function simuladorConstruccion() {
  console.clear();
  console.log("Simulador de materiales para construcción");

  const m2 = pedirNumero("Ingresá los metros cuadrados de la vivienda:");
  if (m2 === null) return;

  const tipoLadrillo = pedirTipoLadrillo();
  if (tipoLadrillo === null) return;
  const precioCemento = pedirNumero("Ingresá el precio de tu bolsa de cemento de 25kg:");
  if (precioCemento === null) return;
  const precioArena = pedirNumero("Ingresá el precio de tu bolsa de arena de 25kg:");
  if (precioArena === null) return;

  const materialesCalc = calcularMateriales(m2, tipoLadrillo);

  const materiales = [
    {
      nombre: `Pallets de ladrillo ${tipoLadrillo}`,
      cantidad: materialesCalc.pallets,
      precioUnitario: materialesCalc.costoPallet
    },
    {
      nombre: "Bolsas de cemento 25kg",
      cantidad: materialesCalc.bolsasCemento,
      precioUnitario: precioCemento
    },
    {
      nombre: "Bolsas de arena 25kg",
      cantidad: materialesCalc.bolsasArena,
      precioUnitario: precioArena
    }
  ];

  let costoTotal = 0;
  let detalle = "";

  console.log("Detalle de materiales y costos:");
  for (let i = 0; i < materiales.length; i++) {

    const mat = materiales[i];
    const subtotal = mat.cantidad * mat.precioUnitario;
    costoTotal += subtotal;
    console.log(`${mat.nombre}: ${mat.cantidad} x $${mat.precioUnitario} = $${subtotal}`);
    detalle += `- ${mat.nombre}: ${mat.cantidad} → $${subtotal}\n`;
  }

  console.log("Costo total aproximado: $" + costoTotal);

  const resumen =
    "Simulación de materiales para construcción\n" +
    "----------------------------------------\n" +
    `Metros cuadrados: ${m2}\n` +
    `Tipo de ladrillo: ${tipoLadrillo}\n\n` +
    "Materiales y costos aproximados:\n" +
    detalle +
    "\n" +
    `Costo TOTAL aproximado: $${costoTotal}`;

  alert(resumen);
}

simuladorConstruccion();
