import { findRooms } from '../models/room.js'; // экспортируем нужные нам функции из модели

export const getAll = (req, res) => {
    res.render('rooms');
};

export const selectRooms = (req, res) => {
    let result = findRooms(req.body);
    res.json({ id: result });
};
