# ⚡ Pasos Pendientes - Configuración Rápida

## ✅ Ya Completado

- ✅ Google Sheet creado: `108-ip-NR-QLObfO3iWU6VTsUK-ShfAPqYJL0NNMF7NU`
- ✅ SPREADSHEET_ID actualizado en `Codigo_ACTUALIZADO.gs`
- ✅ API_KEY definida: `ruido_2026_clave_segura_IST`

---

## 📋 Pasos Restantes (15 minutos)

### **Paso 1: Configurar Hojas en Google Sheet (3 min)**

Ir a: https://docs.google.com/spreadsheets/d/108-ip-NR-QLObfO3iWU6VTsUK-ShfAPqYJL0NNMF7NU/edit

**Renombrar/Crear hojas:**

1. **Renombrar primera hoja** a: `Inscripciones`
   - Click derecho en la pestaña "Hoja 1" → Rename → "Inscripciones"

2. **Crear hoja** llamada: `Config`
   - Click en "+" al lado de las pestañas
   - Nombrar: Config

3. **Crear hoja** llamada: `Asistencias`
   - Click en "+" de nuevo
   - Nombrar: Asistencias

**Resultado esperado:**
```
Pestañas del Sheet:
├─ Inscripciones
├─ Config
└─ Asistencias
```

---

### **Paso 2: Configurar Apps Script (5 min)**

1. En el Google Sheet: **Extensiones → Apps Script**

2. **Eliminar** todo el código que aparece

3. **Copiar** el archivo `Codigo_ACTUALIZADO.gs` completo:
   ```bash
   # Abrir el archivo en tu editor
   code C:\EspecialidadesTecnicas\Pytest\ProtocoloEvaluacionRuido\Codigo_ACTUALIZADO.gs
   ```

4. **Pegar** en Apps Script (ya tiene el SPREADSHEET_ID correcto)

5. **Guardar:** Ctrl + S

6. **Crear headers manualmente en cada hoja:**

   **Hoja "Config"** - En fila 1, copiar estos headers:
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

   **Hoja "Inscripciones"** - En fila 1, copiar estos headers:
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

   **Hoja "Asistencias"** - En fila 1, copiar estos headers:
   ```
   A1: id
   B1: curso_id
   C1: rut
   D1: sesion
   E1: fecha_registro
   F1: estado
   G1: metodo
   ```

   **Tip:** Opcionalmente, puedes poner los headers en negrita para mejor visualización

---

### **Paso 3: Deploy como Web App (3 min)**

1. En Apps Script, click **"Deploy"** (arriba derecha)

2. **"New deployment"**

3. Configurar:
   - ⚙️ Click en el engranaje → **"Web app"**
   - Description: `API Protocolo Ruido`
   - Execute as: **Me**
   - Who has access: **Anyone**

4. Click **"Deploy"**

5. **COPIAR LA URL** completa que aparece
   - Formato: `https://script.google.com/macros/s/ABC123.../exec`
   - Guardarla en un notepad temporalmente

---

### **Paso 4: Actualizar secrets.toml (2 min)**

1. Abrir archivo:
   ```bash
   code C:\EspecialidadesTecnicas\Pytest\ProtocoloEvaluacionRuido\.streamlit\secrets.toml
   ```

2. Reemplazar la línea que dice:
   ```toml
   API_URL = "PENDIENTE_COPIAR_URL_DEL_DEPLOYMENT"
   ```

3. Con la URL que copiaste:
   ```toml
   API_URL = "https://script.google.com/macros/s/TU_URL_AQUI/exec"
   ```

4. **Guardar** el archivo (Ctrl + S)

5. **Verificar** que también está:
   ```toml
   API_KEY = "ruido_2026_clave_segura_IST"
   SECRET_PASSWORD = "Admin123*"
   ```

---

### **Paso 5: Probar el Sistema (5 min)**

#### **Prueba A: Verificar Conexión**

```bash
# Activar entorno
conda activate dash

# Ir al proyecto
cd C:\EspecialidadesTecnicas\Pytest\ProtocoloEvaluacionRuido

# Ejecutar inscripciones
streamlit run InscripcionCSV.py
```

**Verificar:**
1. Se abre el navegador automáticamente
2. En sidebar, ingresar: `Admin123*`
3. Si dice "✅ Acceso concedido" → **CONEXIÓN OK** ✅

---

#### **Prueba B: Crear Curso de Prueba**

1. En InscripcionCSV.py (con password)
2. Seleccionar: **"Crear Curso"**
3. Completar:
   - Región: `Región Metropolitana de Santiago`
   - Fecha inicio: (hoy o mañana)
   - Fecha fin: (en 10 días)
   - Cupo máximo: `30`
   - Fecha sesión 1: (fecha con sesión)
   - Fecha sesión 2: (2 días después)
   - Fecha sesión 3: (5 días después)
4. Click **"Crear Curso"**

**Verificar:**
- Mensaje de éxito
- Ir a Google Sheet → hoja "Config"
- Debe aparecer el curso → **CREAR CURSO OK** ✅

---

#### **Prueba C: Inscribir Participante**

1. En InscripcionCSV.py (con password)
2. Seleccionar: **"Inscribir Participante"**
3. Completar con datos de prueba:
   - RUT: `12345678-9`
   - Nombre: `Juan Pérez Test`
   - Email: `test@email.com`
   - Teléfono: `912345678`
   - Región, Comuna, Rol, Sexo
4. Click **"Inscribir"**

**Verificar:**
- Mensaje de éxito
- Ir a Google Sheet → hoja "Inscripciones"
- Debe aparecer el participante → **INSCRIPCIÓN OK** ✅

---

#### **Prueba D: Sistema de Asistencia con Buffer**

```bash
# Nueva terminal
streamlit run AsistenciaCurso.py
```

**Verificar (sin password - modo participante):**
1. Aparece el curso creado
2. Ingresar RUT: `12345678-9`
3. Click **"Marcar Asistencia"**
4. Confirmación instantánea → **BUFFER ESCRITURA OK** ✅

**Verificar (con password - modo admin):**
1. Ingresar: `Admin123*`
2. Sidebar muestra:
   ```
   📊 Estado del Buffer
   Total: 1
   Pendientes: 1
   Sincronizadas: 0
   ```
3. Click **"🔄 Sincronizar Ahora"**
4. Esperar 2-3 segundos
5. Debe cambiar a:
   ```
   Pendientes: 0
   Sincronizadas: 1
   ```
6. Ir a Google Sheet → hoja "Asistencias"
7. Debe aparecer el registro → **BUFFER SYNC OK** ✅

---

## ✅ Checklist Final

- [ ] Hojas renombradas: Inscripciones, Config, Asistencias
- [ ] Apps Script copiado y guardado
- [ ] Headers creados manualmente en las 3 hojas
- [ ] Apps Script desplegado como Web App
- [ ] URL del deployment copiada
- [ ] secrets.toml actualizado con API_URL
- [ ] InscripcionCSV.py ejecuta sin errores
- [ ] Login con password funciona
- [ ] Se puede crear un curso
- [ ] Curso aparece en Sheet "Config"
- [ ] Se puede inscribir participante
- [ ] Participante aparece en Sheet "Inscripciones"
- [ ] AsistenciaCurso.py ejecuta sin errores
- [ ] Se puede marcar asistencia (confirmación <1s)
- [ ] Dashboard buffer muestra estadísticas
- [ ] Sincronización manual funciona
- [ ] Registro aparece en Sheet "Asistencias"

---

## 🎯 Si Todo Funciona

**¡Sistema listo para producción!** 🎉

Puedes comenzar a:
- Crear cursos reales
- Inscribir participantes
- Usar sistema de asistencia en sesiones

---

## 🔧 Si Algo Falla

**Error común: "Error al conectar con la API"**

Verificar en orden:
1. ✅ API_URL en secrets.toml termina en `/exec`
2. ✅ API_KEY en secrets.toml = `ruido_2026_clave_segura_IST`
3. ✅ Apps Script tiene el mismo API_KEY en línea 15
4. ✅ Apps Script está desplegado (no solo guardado)

**Probar URL manualmente:**
```
Abrir en navegador:
[TU_API_URL]?action=test&key=ruido_2026_clave_segura_IST

Debe responder:
{"success":true,"message":"Conexión exitosa"}
```

---

## 📞 Ayuda Adicional

Si necesitas ayuda:
1. Revisar `CONFIGURACION.md` (documentación completa)
2. Revisar `IMPLEMENTACION_FINAL.md` (troubleshooting)
3. Verificar logs de Apps Script (View → Logs)

---

**Tiempo estimado:** 15-20 minutos
**Próximo paso:** Ejecutar Paso 1 (configurar hojas)
