#!/bin/bash

echo "📦 Build de imagen Aula Virtual - Fly"
echo ""
read -p "Ingresa la versión (ej: 1.0.1-[nombre-aula]): " VERSION
# Eliminar secuencias de escape (ej: tecla Insert en Git Bash) y caracteres no válidos para tags Docker
VERSION=$(echo "$VERSION" | sed 's/\x1b\[[0-9;]*[a-zA-Z~]//g' | tr -cd 'a-zA-Z0-9._-')

if [ -z "$VERSION" ]; then
    echo "❌ Error: Debes ingresar una versión"
    exit 1
fi

IMAGE_NAME="peves/legalizaya:v${VERSION}"

echo ""
echo "🏷️  Versión: $VERSION"
echo "📦 Imagen: $IMAGE_NAME"
echo ""

echo "🔨 Construyendo imagen..."
echo ""

# Leer NEXT_PUBLIC_APP_URL desde .env si existe
APP_URL=""
if [ -f ".env" ]; then
    APP_URL=$(grep -E "^NEXT_PUBLIC_APP_URL=" .env | cut -d'=' -f2- | tr -d '"' | tr -d "'")
fi

if [ -z "$APP_URL" ]; then
    read -p "Ingresa la URL pública de la app (ej: https://tudominio.com): " APP_URL
fi

echo "🌐 NEXT_PUBLIC_APP_URL: $APP_URL"
echo ""

docker build \
  --no-cache \
  -f dockerfile \
  --build-arg NEXT_PUBLIC_APP_URL="$APP_URL" \
  -t $IMAGE_NAME \
  .

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Imagen construida exitosamente"
    echo ""

    read -p "¿Deseas subir la imagen al registry? (s/n): " PUSH

    if [ "$PUSH" = "s" ] || [ "$PUSH" = "S" ]; then
        echo "📤 Subiendo imagen al registry..."
        docker push $IMAGE_NAME

        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Imagen subida exitosamente"
            echo "📝 Actualiza tu compose o fly.toml para usar: $IMAGE_NAME"
        else
            echo "❌ Error al subir la imagen"
            exit 1
        fi
    else
        echo "⏭️  Omitiendo subida al registry"
        echo "📝 Para usar localmente: docker compose up"
    fi
else
    echo "❌ Error al construir la imagen"
    exit 1
fi
