document.querySelector('.button-rooms').addEventListener('click', function (e) {
    e.preventDefault();

    let form = document.forms['rooms-form-xhr'];
    let arival = form.elements['arival'].value;
    let departure = form.elements['departure'].value;
    let guests_grownup = form.elements['guests-grownup'].value;
    let guests_children = form.elements['guests-children'].value;

    // сериализуем данные в json
    let user = JSON.stringify({
        arival: arival,
        departure: departure,
        'guests-grownup': guests_grownup,
        'guests-children': guests_children,
    });

    let request = new XMLHttpRequest(); // ! более новый способ с fetch

    request.open('POST', '/rooms', true); // true (асинхронный), false (синхронный)
    request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener('load', function () {
        // получаем и парсим ответ сервера
        let result = JSON.parse(request.response);

        let main_content = document.querySelector('.search-room-main__content');
        main_content.innerHTML = ''; // удалим все дочерние элементы из родительской ноды

        for (let i = 0, size = result.id.length; i < size; i++) {
            let div = document.createElement('div');
            div.classList.toggle('room-card');
            div.classList.toggle('search-room-main__room-card');

            div.innerHTML = `<div class="room-card__slider"><div class="room-card__slide" style="background-image: url(/assets/img/room1.jpg)"></div><div class="room-card__slide" style="background-image: url(/assets/img/room2.jpg)"></div></div>`;

            let a = document.createElement('a');
            a.classList.toggle('room-card__description');
            a.href = '/room'; // потом добавить id к адресу для перехода к конкретной комнате

            let div4 = document.createElement('div');
            div4.classList.toggle('room-card__row');

            div4.innerHTML = `<span class="room-number item-title"><span class="room-number__smaller-text cta-text cta-text_light">№&nbsp;</span>888&nbsp;<span class="room-number__smaller-text room-number__smaller-text_primary cta-text">люкс</span></span><span class="faded-text">9 990₽&nbsp;<span class="faded-text__secondary">в сутки</span></span>`;

            a.appendChild(div4);

            div4 = document.createElement('div');
            div4.classList.toggle('room-card__divider');

            a.appendChild(div4);

            div4 = document.createElement('div');
            div4.classList.toggle('room-card__row');
            div4.innerHTML = `<div class="rating"><span class="rating__star rating__star_active"></span><span class="rating__star rating__star_active"></span><span class="rating__star rating__star_active"></span><span class="rating__star rating__star_active"></span><span class="rating__star rating__star_active"></span></div><span class="faded-text">143&nbsp;<span class="faded-text__secondary">отзывов</span></span>`;

            a.appendChild(div4);

            div.appendChild(a);

            main_content.appendChild(div);
        }
    });

    request.send(user);
});
