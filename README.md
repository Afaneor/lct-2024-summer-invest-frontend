## Клиентская часть решения проекта DOLMA хакатона "Лидеры цифровой трансформации"
### Связанные репозитории
- [Серврная часть](https://github.com/Afaneor/lct-2024-summer-invest-backend) в рамках этого репозитория есть все инструкции по развертыванию проекта
- [Расширение для браузера](https://github.com/Afaneor/lct-2024-summer-invest-extension) для добавления чат-бота на investmoscow.ru

## Сборка
Убедитесь, что у вас установлен node.js версии 16 или выше

Установка пакетного менеджера yarn
```shell
npm install --global yarn
```
Установка зависимостей
```shell
yarn install
```
Запуск проекта
```shell
yarn run dev
```

Сборка docker контейнера (ваш сервер, скорее всего не на ARM, поэтому явно указываем архитектуру)
```shell
docker build --platform linux/amd64 -t frontend .
```
