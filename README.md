# 📚 Sistema de Inscripción y Asistencia - Protocolo de Evaluación de Ruido

Sistema completo para gestionar inscripciones y registro de asistencia a cursos de Protocolo de Evaluación de Ruido, optimizado para alta concurrencia con buffer y cache.

## 🚀 Inicio Rápido

### **Instalación**

```bash
# Activar entorno conda
conda activate dash

# Navegar al proyecto
cd C:\EspecialidadesTecnicas\Pytest\ProtocoloEvaluacionRuido

# Instalar DuckDB (si no está en el entorno)
pip install duckdb

# Configurar secrets
# Editar .streamlit/secrets.toml con tus credenciales del nuevo Google Sheet
```

### **Ejecutar**

```bash
# Sistema de Inscripción
streamlit run InscripcionCSV.py

# Sistema de Asistencia (CON BUFFER - versión optimizada)
streamlit run AsistenciaCurso.py
```

---

## 🔒 Archivos Sensibles (NO están en GitHub)

**IMPORTANTE:** Los siguientes archivos contienen información sensible y están excluidos del repositorio:

- `Codigo_ACTUALIZADO.gs` - Contiene SPREADSHEET_ID y API_KEY reales
- `.streamlit/secrets.toml` - Credenciales y URLs de deployment
- `.claude/` - Configuración local de desarrollo
- `__pycache__/` - Caché de Python

**Para nuevos colaboradores:** Usa `Codigo_ACTUALIZADO.template.gs` como base y completa con tus propios valores.

---

## 📦 Configuración Inicial REQUERIDA

### **1. Crear Nuevo Google Sheet**

Este proyecto necesita su PROPIO Google Sheet (diferente al de TMERT):

1. Ir a Google Sheets → Crear nuevo spreadsheet
2. Nombrarlo: **"Protocolo Evaluación Ruido - Inscripciones"**
3. Crear 3 hojas con estos nombres exactos:
   - `Config`
   - `Hoja 1`
   - `Asistencias`

### **2. Configurar Apps Script**

1. En el Google Sheet: **Extensiones → Apps Script**
2. Copiar todo el contenido de `Codigo_ACTUALIZADO.gs`
3. **IMPORTANTE - Línea 9:** Cambiar el SPREADSHEET_ID:
   ```javascript
   // Encontrar el ID en la URL de tu sheet:
   // https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit
   const SPREADSHEET_ID = 'PEGAR_AQUI_EL_ID_DEL_NUEVO_SHEET';
   ```
4. **IMPORTANTE - Línea 15:** Cambiar la API_KEY:
   ```javascript
   const API_KEY = 'clave_ruido_2026_segura'; // Diferente a TMERT
   ```
5. Guardar (Ctrl + S)
6. **Deploy → Manage deployments → + Create deployment**
7. Type: Web app
8. Execute as: Me
9. Who has access: Anyone
10. Deploy
11. **Copiar la URL** que aparece

### **3. Configurar Secrets**

Editar `.streamlit/secrets.toml`:

```toml
SECRET_PASSWORD = "password_admin_ruido"
API_URL = "PEGAR_AQUI_LA_URL_DEL_DEPLOYMENT"
API_KEY = "clave_ruido_2026_segura"  # La misma del Apps Script
```

---

## ✅ Sistema Optimizado

**Versión instalada:** Buffer + Cache (última versión)

### **Inscripciones:**
- ✅ Cache 5 minutos
- ✅ Retry automático
- ✅ Multi-región

### **Asistencias:**
- ✅ Buffer con DuckDB
- ✅ Escrituras <100ms
- ✅ Sync automático cada 60s
- ✅ 1000+ usuarios simultáneos

---

## 📊 Estructura de Datos

### **Hoja "Config" (Cursos)**

Headers en A1:
```
curso_id | region | fecha_inicio | fecha_fin | estado | cupo_maximo | fecha_sesion_1 | fecha_sesion_2 | fecha_sesion_3
```

Ejemplo:
```
RM-Mar26 | Región Metropolitana de Santiago | 04-03-2026 | 13-03-2026 | activo | 50 | 04-03-2026 | 06-03-2026 | 13-03-2026
```

---

## 🎯 Uso

### **Admin - Crear Curso:**
1. `streamlit run InscripcionCSV.py`
2. Password: `password_admin_ruido`
3. Crear curso con datos

### **Admin - Inscribir:**
1. Misma app con password
2. Inscribir participante
3. Validación de RUT automática

### **Participante - Marcar Asistencia:**
1. `streamlit run AsistenciaCurso.py` (sin password)
2. Ingresar RUT
3. Confirmación instantánea ⚡
4. Sincroniza a Sheets en 60s

---

## 📈 Monitoreo

Dashboard en sidebar:
```
📊 Estado del Buffer
Total: X
Sincronizadas: Y
Pendientes: Z
Fallidas: 0

[🔄 Sincronizar Ahora]
```

**Salud del sistema:**
- ✅ Pendientes < 50
- ✅ Fallidas = 0

---

## 📞 Soporte

**Problemas comunes:**

1. **"Error al conectar API"**
   → Verificar API_URL y API_KEY en secrets.toml

2. **"Pendientes > 100"**
   → Click "Sincronizar Ahora"

3. **"No aparece curso"**
   → Click "🔄 Actualizar Datos"
   → Verificar que curso está en hoja Config

---

## 📚 Docs Adicionales

- `IMPLEMENTACION_FINAL.md` - Guía completa
- `BUFFER_GUIDE.md` - Documentación técnica

---

**Proyecto:** Protocolo de Evaluación de Ruido
**Entorno:** conda dash
**Versión:** 1.0 (Buffer + Cache)
**Fecha:** Febrero 2026
