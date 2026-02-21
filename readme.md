# btlz-wb-test

## Описание
Для запуска надо добавить в env переменные POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, APP_PORT, WB_API_KEY.

В директорию проекта нужно добавить файлы service-key.json(сервисный ключ google api), spreadsheets.json(массив айди гугл таблиц в формате string[]).

Для проверки можно разкомментировать 8 строку в файле runner.ts.

## Команды:

Запуск базы данных:
```bash
docker compose up -d --build postgres
```

Для выполнения миграций и сидов не из контейнера:
```bash
npm run knex:dev migrate latest
```

```bash
npm run knex:dev seed run
```
Также можно использовать и остальные команды (`migrate make <name>`,`migrate up`, `migrate down` и т.д.)

Для запуска приложения в режиме разработки:
```bash
npm run dev
```

Запуск проверки самого приложения:
```bash
docker compose up -d --build app
```

Для финальной проверки рекомендую:
```bash
docker compose down --rmi local --volumes
docker compose up --build
```
