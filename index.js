import express, { request } from 'express'; // установили через npm и заимпортили нашу библиотеку
import path from 'path'; // для работы с путями
// import fs from 'fs'; // для работы с файлами
import index_page from './routes/index_page.js';
import rooms_page from './routes/rooms_page.js';
import room_page from './routes/room_page.js';

const __dirname = path.resolve(); // из-за использования import при подключении express придеьтся так получить полный путь используя библиотеку path
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(index_page);
app.use(rooms_page);
app.use(room_page);
app.use('/app/javascript', express.static(path.resolve(__dirname, 'javascript')));
app.use('/app/styles', express.static(path.resolve(__dirname, 'styles')));

app.set('view engine', 'pug');
console.log(app.get('views'));

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});

// TODO создать Админку + возможно сделать регистрацию с идентификацией пользователей.
// TODO Сверстать и подключить страницы с сылкой от О нас - Контакты и прочие статические
// TODO Реализовать логику оплаты картой и прочие оплаты (серверный код + найти сервис и подключиться к их API)
// TODO Задиплоить проект
