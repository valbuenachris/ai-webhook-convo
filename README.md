
# Chat AI con Webhook de n8n

Una aplicación web de chat tipo ChatGPT que se conecta con un webhook de n8n para procesar mensajes y devolver respuestas de IA.

## ✨ Características

- 💬 Interfaz de chat minimalista y responsive
- 🎨 Burbujas de conversación estilo ChatGPT
- ⚡ Envío con Enter, nueva línea con Shift+Enter
- 🔄 Indicador de "escribiendo..." animado
- 🚨 Manejo elegante de errores
- 🌙 Soporte para modo oscuro
- 📱 Diseño completamente responsive

## 🚀 Instalación Rápida

### 1. Clonar e instalar dependencias

```bash
# Clonar el repositorio
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Instalar dependencias
npm install
```

### 2. Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar el archivo .env con tu URL de webhook
nano .env
```

En el archivo `.env`, configura tu webhook de n8n:

```env
VITE_WEBHOOK_URL=https://tu-n8n-instance.com/webhook/tu-webhook-id
```

### 3. Ejecutar la aplicación

```bash
# Modo desarrollo
npm run dev

# La app estará disponible en http://localhost:8080
```

## 🔧 Configuración del Webhook n8n

### Flujo de n8n recomendado:

1. **Webhook Trigger**
   - URL: `/webhook/tu-webhook-id`
   - Método: POST
   - Response Mode: **On Received** (importante!)
   - Response Data: JSON

2. **Nodo OpenAI Chat** (o LLM compatible)
   - Input: `{{ $json.message }}`
   - Configurar API key de OpenAI

3. **Respond to Webhook**
   - Response Body: 
   ```json
   {
     "reply": "{{ $json.choices[0].message.content }}"
   }
   ```

### Ejemplo de flujo n8n (JSON):

```json
{
  "meta": {
    "instanceId": "1"
  },
  "nodes": [
    {
      "parameters": {
        "path": "c0e9b4e6-f76a-4cfb-9c34-1ad4243f7b85",
        "responseMode": "onReceived",
        "options": {}
      },
      "id": "webhook",
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [200, 300]
    },
    {
      "parameters": {
        "messages": {
          "values": [
            {
              "role": "user",
              "content": "={{ $json.message }}"
            }
          ]
        },
        "options": {
          "temperature": 0.7
        }
      },
      "id": "openai",
      "name": "OpenAI Chat Model",
      "type": "@n8n/n8n-nodes-langchain.openAi",
      "typeVersion": 1,
      "position": [400, 300]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ { \"reply\": $json.response } }}"
      },
      "id": "respond",
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [600, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "OpenAI Chat Model",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI Chat Model": {
      "main": [
        [
          {
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

## 📡 API del Webhook

### Request (Frontend → n8n)
```json
POST /webhook/tu-webhook-id
Content-Type: application/json

{
  "message": "Hola, ¿cómo estás?"
}
```

### Response (n8n → Frontend)
```json
{
  "reply": "¡Hola! Estoy muy bien, gracias por preguntar. ¿En qué puedo ayudarte hoy?"
}
```

## 🛠️ Desarrollo

### Estructura del proyecto

```
src/
├── components/
│   ├── ChatContainer.tsx    # Contenedor principal del chat
│   ├── MessageBubble.tsx    # Burbujas de mensajes
│   ├── ChatInput.tsx        # Campo de entrada con Enter/Shift+Enter
│   └── TypingIndicator.tsx  # Indicador de escritura animado
├── pages/
│   └── Index.tsx           # Página principal
└── index.css              # Sistema de diseño y estilos
```

### Scripts disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Linter
```

## 🎨 Personalización

### Colores del chat (en `src/index.css`):

```css
:root {
  --chat-user-bubble: 217 91% 60%;    /* Color burbujas usuario */
  --chat-ai-bubble: 0 0% 100%;        /* Color burbujas IA */
  --chat-bg: 220 27% 98%;              /* Fondo del chat */
  --chat-typing: 142 76% 36%;          /* Color indicador escritura */
}
```

### Configuración de Tailwind

El proyecto usa un sistema de diseño basado en variables CSS para fácil personalización.

## 🚀 Despliegue

### Con Lovable

1. Abre tu proyecto en [Lovable](https://lovable.dev)
2. Configura las variables de entorno en Project Settings
3. Haz clic en "Publish"

### Manual

```bash
# Build
npm run build

# Los archivos estarán en /dist
# Sube estos archivos a tu hosting preferido
```

## 🔒 Seguridad

- ✅ Variables de entorno para URLs sensibles
- ✅ Validación de respuestas del webhook
- ✅ Manejo de errores robusto
- ✅ Sanitización automática de inputs

## 🐛 Troubleshooting

### Error: "Webhook URL no configurada"
- Verifica que existe el archivo `.env`
- Confirma que `VITE_WEBHOOK_URL` está definida
- Reinicia el servidor de desarrollo

### Error: "Error del servidor: 404"
- Verifica que el webhook en n8n está activo
- Confirma que la URL del webhook es correcta
- Revisa los logs de n8n

### Error: "Respuesta inválida del servidor"
- Verifica que n8n devuelve `{ "reply": "..." }`
- Confirma que el nodo "Respond to Webhook" está configurado
- Revisa el Response Mode en "On Received"

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs del navegador (F12 → Console)
2. Verifica los logs de n8n
3. Confirma que el webhook responde manualmente con herramientas como Postman

## 🔄 Actualizaciones

Este proyecto usa Vite + React + TypeScript + Tailwind CSS. Para actualizaciones:

```bash
npm update
```

## 📄 Licencia

Este proyecto está bajo licencia MIT.
