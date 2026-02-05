/**
 * Script de Google Apps Script para gestionar inscripciones a cursos
 * PROTOCOLO DE EVALUACIÓN DE RUIDO
 * Y REGISTRO DE ASISTENCIAS
 * Este script se debe copiar en el Editor de secuencias de comandos
 * de tu hoja de cálculo de Google Sheets
 *
 * IMPORTANTE: Este es un archivo TEMPLATE
 * 1. Copia este archivo como "Codigo.gs" en tu proyecto local
 * 2. Reemplaza los valores entre << >> con tus datos reales
 * 3. Copia el contenido completo al Editor de Apps Script de tu Google Sheet
 */

// ID de la hoja de cálculo - REEMPLAZAR CON TU ID
const SPREADSHEET_ID = '<<TU_SPREADSHEET_ID_AQUI>>';

// Nombres de las hojas
const REGISTROS_SHEET_NAME = 'Inscripciones';
const CONFIG_SHEET_NAME = 'Config';
const SHEET_NAME_ASISTENCIAS = 'Asistencias';

// Clave de API - REEMPLAZAR CON TU CLAVE SEGURA
const API_KEY = '<<TU_API_KEY_AQUI>>'; // Debe coincidir con la del secrets.toml

// Función para configurar el servicio web
// Función para recibir solicitudes GET
function doGet(e) {
  try {
    // Registrar información de depuración
    console.log("doGet llamado con parámetros: " + JSON.stringify(e.parameter));

    const action = e.parameter.action;
    const key = e.parameter.key;

    // Prueba simple para verificar que el Apps Script funciona
    if (action === "test") {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Conexión exitosa",
        timestamp: new Date().toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Verificar clave API
    if (key !== API_KEY) {
      console.log("Clave API inválida: " + key);
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Clave API inválida'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    let result;

    switch (action) {
      case 'getConfig':
        console.log("Ejecutando getConfigData()");
        result = getConfigData();
        break;
      case 'getRegistros':
        console.log("Ejecutando getRegistrosData()");
        result = getRegistrosData();
        break;
      case 'getCursoActivo':
        console.log("Ejecutando getCursoActivo()");
        result = getCursoActivo();
        break;
      case 'getAsistencias':
        console.log("Ejecutando getAsistencias()");
        result = getAsistencias();
        break;
      default:
        console.log("Acción no reconocida: " + action);
        result = { success: false, error: 'Acción no válida: ' + action };
    }

    console.log("Resultado: " + JSON.stringify(result));
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Error en doGet: " + error.toString());
    console.error("Stack: " + error.stack);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      stack: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// NOTA: El resto del código continúa igual que en Codigo_ACTUALIZADO.gs
// Por brevedad, este template solo muestra las primeras líneas que contienen
// información sensible. El archivo completo debe copiarse desde Codigo_ACTUALIZADO.gs
// reemplazando solo las constantes del inicio.
