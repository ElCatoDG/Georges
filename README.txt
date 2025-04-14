
---

## Despliegue en Railway

1. Ve a https://railway.app
2. Crea un nuevo proyecto → "Deploy from GitHub repo" o "Deploy from zip"
3. Asegúrate de que tenga este archivo `.env`:

    OPENAI_API_KEY=tu_clave_de_openai
    HOST=ip_o_dominio_del_servidor_minecraft
    PORT=25565

4. Railway ejecutará `npm install` y luego `npm start` automáticamente.
5. ¡Georges se conectará al servidor Minecraft externo (cracked)!
