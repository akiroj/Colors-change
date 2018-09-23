window.onload = function () {

    //Создаем элементы
    function createColors(id, prop) {
        var colors =
            '#8F69A5 #8F3974 #5B5EA6 #8690CB #94417B #D2ADD5 #965A67 #723157 #6D579A #8B559B #C6B0D5 #9F9AAE #8F3975 #77529A #923B77 #8F99CF #9B9DC7 #BEB2D5 #C693C7 #A4A4BF #4E468B #9C7694 #53396A #4C2D4C #AA8BB2 #5F698F #2D2E49 #B284BE #C2BFD3 #D5D5DE';
        var arrColors = colors.split(' ');
        var elem = document.querySelector(id);

        for (var i = 0; i < arrColors.length; i++) {
            var div = document.createElement('div');
            div.className = 'color-item';
            elem.appendChild(div);
            elem.appendChild(div).style.backgroundColor = arrColors[i];
            elem.appendChild(div).style.color = arrColors[i];
            div.textContent = arrColors[i];
            elem.appendChild(div).style.display = prop;
        }
    }
    createColors('.selection', 'flex');
    createColors('.seled-colors', 'none');
    createColors('.mopo-colors', 'none');

    //Закрываем всплывающее окна
    function closeElem(id, closeId) {
        var elem = document.querySelector(id);
        elem.onclick = function () {
            var closeElem = document.querySelector(closeId);
            closeElem.style.display = 'none';
        }
    }
    closeElem('.close_in-in', '.initial-info');
    closeElem('.close_hint', '.hint');
    closeElem('.shadow_hint', '.hint');

    //Элементы переключатели в меню + затемнение
    function togElem(id_1, id_2, togCls) {
        var elem = document.querySelector(id_1);
        elem.onclick = function () {
            elem.classList.toggle('mopo-seled_color');
            var elem_2 = document.querySelector(id_2);
            elem_2.classList.toggle(togCls);
            var shadow = document.querySelector('.shadow');
            shadow.classList.toggle('sha_on');
        }
    }
    togElem('.seled-cl', '.selected', 'seled_on');
    togElem('.mopo-cl', '.most-popular', 'mopo_on');

    //Адаптивное меню
    function menuTog() {
        var btnMenu = document.querySelector('.btn-menu'),
            btnCl = document.querySelector('.btn-cl'),
            seled = document.querySelector('.selected'),
            mopo = document.querySelector('.most-popular');
        btnMenu.onclick = function () {
            btnCl.classList.toggle("btn-cl_on");
            seled.classList.toggle("seled_on");
            mopo.classList.toggle("mopo_on");
        }
    }
    menuTog();

    //Нахождение конкретного элемента
    function searchCurrentElem() {
        var count = 1,
            selection = document.querySelector('.selection'),
            selected = document.querySelector('.selected'),
            mopo = document.querySelector('.most-popular'),
            seled = document.querySelector('.seled-colors'),
            seled_text = document.querySelector('.seled-text'),
            shadow = document.querySelector('.shadow'),
            counter = document.querySelector('.count'),
            end = document.querySelector('.end'),
            end_block = document.querySelector('.end-block'),
            btnCl = document.querySelector('.btn-cl');

        for (var i = 0; i < selection.children.length; i++) {
            var currentElem = selection.children[i];
            currentElem.addEventListener('click', function (e) {
                if (count >= 7) {
                    e.target.style.display = 'none';
                    counter.value = count;
                    selElem(e.target.textContent);
                    count++;
                    shadow.style.display = 'block';
                    end_block.style.display = 'block';
                    end.style.display = 'inherit';

                    /*Просмотр результатов после окончания*/
                    end.onclick = function () {
                        end.style.display = 'none';
                        mopo.className += ' mopo_on';
                        btnCl.className += ' btn-cl_on';
                        selected.className += ' seled_on';
                        seled_text.textContent = 'Цвета которые вы выбрали во время опроса. Вы можете сравнить их с популярными)) После того как вы их выбрали, цвета удалить нельзя.';
                    }

                } else {
                    e.target.style.display = 'none';
                    selElem(e.target.textContent);
                    counter.value = count;
                    count++;
                }
            });

            //Запись элемента в выбранное
            function selElem(current) {
                for (var i = 0; i < seled.children.length; i++) {
                    var currentElem = seled.children[i];
                    if (currentElem.textContent == current) {
                        currentElem.style.display = 'flex';

                        currentElem.onclick = function (e) {
                            //Отработка счетчика -- при удалении элемента
                            if (count == 2) {
                                counter.value = 0;
                                count = 1;
                                e.target.style.display = 'none';
                                delEl(e.target.textContent);
                            } else if (count >= 8) {
                                currentElem = null;
                            } else {
                                e.target.style.display = 'none';
                                delEl(e.target.textContent);
                                count--;
                                counter.value = count - 1;
                            }
                        };
                    }
                }
            }
            //Удаление из выбранного
            function delEl(el) {
                for (var i = 0; i < selection.children.length; i++) {
                    var currentElem = selection.children[i];
                    if (currentElem.textContent == el) {
                        currentElem.style.display = 'flex';
                    }
                }
            }
            selElem();


        }
    }
    searchCurrentElem();

}
