![615829fb-0b67-4820-a92a-2f3ab38847f5](https://github.com/13Hz/simple-rpg/assets/39442071/436ce457-138b-4f99-b38a-678c24fda4f9)

# Простая RPG на TypeScript
RPG с видом сверху на TypeScript. Сейчас происходит перенос и доработка того что уже было написано на Javascript

## Окружение
* Node v20.11.1

## Запуск и установка
1. Скачать репозиторий
```bash
git clone git@github.com:13Hz/simple-rpg.git
```
2. Установить зависимости
```bash
npm install
```
3. Запустить в режими разработки или компиляции
```
# development
npm run dev

# production
npm run build
```

## Запуск после компиляции
Для запуска игры после компиляции нужен сервер. Если у вас установлен php, можно открыть сервер в директории `dist` выполнив команду
```bash
php -S 127.0.0.1:3000
```
Если php сервера нет, можно запустить сервер с помощью node утилиты `http-server`
```bash
npm install http-server -g
http-server
```

## Помогите разработке
Если вы нашли ошибку или у вас есть идея, как можно улучшить игру - вы можете оставить запрос через соответствующую [форму](https://github.com/13Hz/simple-rpg/issues/new/choose). По другим вопросам можете написать мне на почту [async13hhz@gmail.com](mailto:async13hhz@gmail.com). Критика и любые другие виды отзывов приветствуются.
