import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();

export const findRooms = (reqBody) => {
    function rev(str) {
        // let date = new Date(str).toLocaleDateString('ru');

        // if (str.includes('.') || date === 'Invalid Date') {
        let arr = str.includes('/') ? str.split('/') : str.split('.');
        [arr[0], arr[1]] = [arr[1], arr[0]];
        return arr.join('/');
        // }

        // let arr = date.includes('/') ? date.split('/') : date.split('.'); // ???
        // [arr[0], arr[1]] = [arr[1], arr[0]];
        // return arr.join('/');
    }

    let start = Date.parse(rev(reqBody.arival));
    let end = Date.parse(rev(reqBody.departure));

    // ! Считаем данные из файла синхронно
    let content = fs.readFileSync(path.resolve(__dirname, 'db/db.json'), 'utf8');

    let selectRoomsId = [];
    let obj = JSON.parse(content);

    for (let key in obj.rooms) {
        if (+obj.rooms[key].peoples_max < +reqBody['guests-grownup'] + +reqBody['guests-children']) continue;

        if (!obj.rooms[key].reserved_paid.reserved) {
            selectRoomsId.push(key);
        } else {
            let reserved_date = obj.rooms[key].reserved_paid.reserved_date;
            let dbStart = Date.parse(reserved_date.start);
            let dbEnd = Date.parse(reserved_date.end);

            if (start >= dbEnd || end <= dbStart) selectRoomsId.push(key);
        }
    }

    return selectRoomsId;

    //! асинхронный вариант чтения файла. Выше указан синхронный вариант.
    // fs.readFile(path.resolve(__dirname, 'db/db.json'), (error, content) => {
    //     if (error) throw error;

    //     let selectRoomsId = [];
    //     let obj = JSON.parse(content);

    //     for (let key in obj.rooms) {
    //         if (+obj.rooms[key].peoples_max < +reqBody['guests-grownup'] + +reqBody['guests-children']) continue;

    //         let reserved_date = obj.rooms[key].reserved_paid.reserved_date;

    //         if (!obj.rooms[key].reserved_paid.reserved) {
    //             selectRoomsId.push(key);
    //         } else {
    //             let dbStart = Date.parse(rev(reserved_date.start));
    //             let dbEnd = Date.parse(rev(reserved_date.end));

    //             if (start >= dbEnd || end <= dbStart) selectRoomsId.push(key);
    //         }
    //     }
    //     return selectRoomsId;
    // });
};
