# 1. Node imajını seç
FROM node:18-alpine

# 2. Uygulama dizini oluştur
WORKDIR /app

# 3. package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Geri kalan tüm dosyaları kopyala
COPY . .

# 6. Uygulama portunu bildir
EXPOSE 3000

# 7. Geliştirme için (live reload vs. istiyorsan)
CMD ["npm", "run", "start:dev"]
