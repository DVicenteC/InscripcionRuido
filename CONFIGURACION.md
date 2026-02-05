# ⚙️ Guía de Configuración - Protocolo Evaluación Ruido

## 🎯 Configuración Requerida (Paso a Paso)

### **Paso 1: Crear Google Sheet (5 minutos)**

1. Ir a [Google Sheets](https://sheets.google.com)
2. Click en **"+ Nuevo"** o "Blank spreadsheet"
3. Nombrar: **"Protocolo Evaluación Ruido - Inscripciones"**
4. Crear 3 hojas (sheets) con estos nombres **EXACTOS**:

#### **Hoja 1: "Config"**
```
A1: curso_id
B1: region
C1: fecha_inicio
D1: fecha_fin
E1: estado
F1: cupo_maximo
G1: fecha_sesion_1
H1: fecha_sesion_2
I1: fecha_sesion_3
```

#### **Hoja 2: "Hoja 1"**
```
A1: curso_id
B1: rut
C1: nombre
D1: email
E1: telefono
F1: region
G1: comuna
H1: rol
I1: sexo
```

#### **Hoja 3: "Asistencias"**
```
A1: id
B1: curso_id
C1: rut
D1: sesion
E1: fecha_registro
F1: estado
G1: metodo
```

5. **Copiar el ID del Sheet:**
   - Ver la URL: `https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit`
   - Copiar la parte `ESTE_ES_EL_ID`
   - Guardarlo en un notepad temporalmente

---

### **Paso 2: Configurar Apps Script (10 minutos)**

1. En el Google Sheet creado: **Extensiones → Apps Script**

2. **Eliminar** todo el código que aparece por defecto

3. **Abrir el archivo** `Codigo_ACTUALIZADO.gs` de este proyecto

4. **Copiar TODO** el contenido y pegarlo en Apps Script

5. **MODIFICAR Línea 9** - Cambiar SPREADSHEET_ID:
   ```javascript
   // ANTES:
   const SPREADSHEET_ID = '1U64j95_UPpKH1gZvjB11YhFypcpKJQX8P320KhIK6js';

   // DESPUÉS (pegar el ID que copiaste):
   const SPREADSHEET_ID = 'PEGAR_AQUI_EL_ID_DE_TU_SHEET';
   ```

6. **MODIFICAR Línea 15** - Cambiar API_KEY:
   ```javascript
   // ANTES:
   const API_KEY = 'tu_clave_secretaISTColon3066';

   // DESPUÉS (crear una clave nueva y segura):
   const API_KEY = 'ruido_2026_clave_super_segura';
   ```
   **Importante:** Guardar esta clave, la necesitarás después

7. **Guardar:** Ctrl + S o icono de disco

8. **Crear headers manualmente:**

   Ir a cada hoja en tu Google Sheet y agregar estos headers en la **fila 1**:

   **Hoja "Config":**
   ```
   A1: curso_id       | B1: region    | C1: fecha_inicio | D1: fecha_fin | E1: estado
   F1: cupo_maximo    | G1: fecha_sesion_1 | H1: fecha_sesion_2 | I1: fecha_sesion_3
   ```

   **Hoja "Hoja 1" (o "Inscripciones"):**
   ```
   A1: curso_id | B1: rut | C1: nombre | D1: email | E1: telefono
   F1: region   | G1: comuna | H1: rol | I1: sexo
   ```

   **Hoja "Asistencias":**
   ```
   A1: id | B1: curso_id | C1: rut | D1: sesion | E1: fecha_registro | F1: estado | G1: metodo
   ```

   **Opcional:** Aplica formato negrita a la fila 1 para mejor visualización

9. **Deploy:**
   - Click en **"Deploy"** (arriba derecha)
   - **"New deployment"**
   - Configuración:
     - Type: **Web app**
     - Description: "API Protocolo Ruido"
     - Execute as: **Me** (tu email)
     - Who has access: **Anyone**
   - Click **"Deploy"**
   - **COPIAR LA URL** que aparece (muy importante)
   - Formato: `https://script.google.com/macros/s/LETRAS_Y_NUMEROS/exec`

---

### **Paso 3: Configurar Secrets (3 minutos)**

1. **Navegar a la carpeta del proyecto:**
   ```bash
   cd C:\EspecialidadesTecnicas\Pytest\ProtocoloEvaluacionRuido\.streamlit
   ```

2. **Copiar el ejemplo:**
   ```bash
   # Si no existe secrets.toml, crearlo desde el ejemplo
   cp secrets.example.toml secrets.toml
   ```

3. **Editar** `.streamlit/secrets.toml` con tus valores:

   ```toml
   # Password para entrar como admin
   SECRET_PASSWORD = "elige_un_password_seguro"

   # GitHub token (opcional, dejar como está)
   GITHUB_TOKEN = "tu_github_token_aqui"

   # Encryption key (opcional, dejar como está)
   ENCRYPTION_KEY = "tu_encryption_key_aqui"

   # ===== IMPORTANTE: Actualizar estos dos =====

   # La URL que copiaste del deployment
   API_URL = "PEGAR_AQUI_LA_URL_DEL_DEPLOYMENT"

   # La MISMA clave que pusiste en Apps Script línea 15
   API_KEY = "ruido_2026_clave_super_segura"
   ```

4. **Guardar el archivo**

---

### **Paso 4: Verificar Instalación (2 minutos)**

1. **Activar entorno conda:**
   ```bash
   conda activate dash
   ```

2. **Verificar DuckDB instalado:**
   ```bash
   python -c "import duckdb; print('DuckDB OK')"
   ```

   Si da error, instalar:
   ```bash
   pip install duckdb
   ```

3. **Navegar al proyecto:**
   ```bash
   cd C:\EspecialidadesTecnicas\Pytest\ProtocoloEvaluacionRuido
   ```

---

### **Paso 5: Probar el Sistema (10 minutos)**

#### **Prueba 1: Sistema de Inscripción**

```bash
streamlit run InscripcionCSV.py
```

**Verificaciones:**
1. Abrir en navegador (se abre automáticamente)
2. En sidebar, ingresar password: `elige_un_password_seguro`
3. Si aparece "✅ Acceso concedido" → OK
4. Probar crear un curso:
   - Región: Región Metropolitana de Santiago
   - Fecha inicio: (hoy)
   - Fecha fin: (en 10 días)
   - Cupo máximo: 30
   - Completar fechas de sesiones
5. Click "Crear Curso"
6. Si aparece mensaje de éxito → **✅ Inscripciones OK**
7. Verificar en Google Sheet hoja "Config" que aparece el curso

#### **Prueba 2: Sistema de Asistencia**

```bash
streamlit run AsistenciaCurso.py
```

**Verificaciones:**
1. Abrir en navegador
2. **SIN ingresar password** (modo participante)
3. Si aparece el curso creado → OK
4. Primero **inscribir un participante:**
   - Volver a InscripcionCSV.py
   - Con password, inscribir participante con RUT válido
5. Volver a AsistenciaCurso.py
6. Ingresar el RUT del participante inscrito
7. Click "Marcar Asistencia"
8. Si aparece confirmación instantánea → **✅ Asistencias OK**
9. En sidebar debe aparecer:
   ```
   📊 Estado del Buffer
   Total: 1
   Sincronizadas: 0
   Pendientes: 1
   Fallidas: 0
   ```
10. Ingresar password en sidebar
11. Click "🔄 Sincronizar Ahora"
12. Esperar 2-3 segundos
13. Verificar que:
    - Pendientes: 0
    - Sincronizadas: 1
14. Ir a Google Sheet hoja "Asistencias"
15. Debe aparecer el registro → **✅ Buffer funciona**

---

## ✅ Checklist de Verificación

### **Configuración:**
- [ ] Google Sheet creado con 3 hojas
- [ ] Headers creados manualmente en cada hoja (Config, Hoja 1, Asistencias)
- [ ] ID del Sheet copiado
- [ ] Apps Script actualizado con SPREADSHEET_ID
- [ ] Apps Script actualizado con API_KEY
- [ ] Apps Script desplegado como Web App
- [ ] URL del deployment copiada
- [ ] `.streamlit/secrets.toml` creado
- [ ] API_URL actualizada en secrets.toml
- [ ] API_KEY actualizada en secrets.toml (misma que Apps Script)
- [ ] SECRET_PASSWORD configurado
- [ ] DuckDB instalado en entorno conda dash

### **Pruebas:**
- [ ] InscripcionCSV.py ejecuta sin errores
- [ ] Login con password funciona
- [ ] Se puede crear un curso
- [ ] Curso aparece en Google Sheet "Config"
- [ ] Se puede inscribir un participante
- [ ] Participante aparece en Google Sheet "Hoja 1"
- [ ] AsistenciaCurso.py ejecuta sin errores
- [ ] Aparece curso con sesión hoy
- [ ] Se puede marcar asistencia
- [ ] Dashboard de buffer muestra estadísticas
- [ ] Sincronización manual funciona
- [ ] Registro aparece en Google Sheet "Asistencias"

---

## 🔧 Troubleshooting

### **Error: "Error al conectar con la API"**

**Posibles causas:**
1. API_URL incorrecta en secrets.toml
2. Apps Script no desplegado
3. Apps Script no autorizado

**Solución:**
```bash
# Verificar la URL en secrets.toml
# Debe terminar en /exec
# Ejemplo: https://script.google.com/macros/s/ABC123.../exec

# Probar la URL en el navegador agregando: ?action=test&key=TU_API_KEY
# Debe responder: {"success":true,"message":"Conexión exitosa"}
```

---

### **Error: "Clave API inválida"**

**Causa:** API_KEY en secrets.toml no coincide con Apps Script

**Solución:**
1. Abrir Apps Script, ver línea 15
2. Copiar el valor exacto
3. Pegarlo en secrets.toml
4. Guardar
5. Reiniciar streamlit

---

### **Error: "No hay cursos disponibles"**

**Causas posibles:**
1. No hay cursos creados
2. Todos los cursos están vencidos
3. Cache desactualizado

**Solución:**
1. Crear un curso de prueba
2. Verificar que fecha_fin sea futura
3. Click "🔄 Actualizar Datos"

---

### **Error: "Ya existe un registro de asistencia"**

**Causa:** Intentas marcar asistencia dos veces

**Solución:**
- Es comportamiento esperado
- Cada participante solo puede marcar asistencia una vez por sesión

---

### **Registros no llegan a Google Sheets**

**Posibles causas:**
1. Sincronización pendiente
2. Error de conectividad
3. Apps Script con problemas

**Solución:**
1. Click "🔄 Sincronizar Ahora"
2. Verificar que Fallidas = 0
3. Si Fallidas > 0, revisar logs de Apps Script
4. Verificar API_URL y API_KEY

---

## 📞 Ayuda Adicional

Si después de seguir esta guía aún tienes problemas:

1. Verificar el archivo `IMPLEMENTACION_FINAL.md` sección Troubleshooting
2. Revisar logs de Apps Script en Google (View → Logs)
3. Verificar que el Sheet tiene permisos correctos
4. Probar crear un Sheet completamente nuevo y repetir el proceso

---

**Tiempo estimado total:** 30 minutos
**Dificultad:** Media
**Requisitos:** Cuenta de Google, Python con conda, entorno dash
