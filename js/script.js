document.addEventListener('DOMContentLoaded', () => {

        // clearActiveClass

        function clearActiveClass (arr, activeClass) {
            arr.forEach(item => {
                item.classList.remove(activeClass);
            });
        }

    // select

    function select (_el, fixedContentHeight, optionActiveClass) {
        const el = document.querySelector(_el);
        const content = el.lastElementChild;
        let options = content.children;
        options = Array.prototype.slice.call(options);  // теперь options - массив
        let contentHeight = 0;
        options.forEach(item => {
          contentHeight += item.clientHeight;
        });
        function closeSelect () {
            el.classList.remove('select--active');
            content.style.maxHeight = '0px';
            document.removeEventListener('click', closeSelect);
        }

        options.forEach(item => {
            item.addEventListener('click', (e) => {
              e.stopPropagation();
              clearActiveClass (options, 'active');
              item.classList.add(optionActiveClass);
              el.firstElementChild.textContent = item.textContent;
              closeSelect();
              document.removeEventListener('click', closeSelect);
            });
        });

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            if (el.classList.contains('select--active')) {
                closeSelect();
            } else {
                el.classList.add('select--active');
                if (fixedContentHeight) {
                    content.style.maxHeight = fixedContentHeight + 'px';
                } else {
                    content.style.overflow = 'hidden';
                    content.style.maxHeight = contentHeight + 5 + 'px';
                }
                document.addEventListener('click', closeSelect);
            }
        });
    }

    select('.select--1', 240, 'active');
    select('.select--2', false, 'active');
    select('.select--3', 240, 'active');
    select('.select--4', 240, 'active');
    select('.select--5', 240, 'active');
    select('.select--6', 240, 'active');

    // tabs

    function tabs (buttons, contents, activeClass) {
        const _buttons = document.querySelectorAll(buttons),
                _contents = document.querySelectorAll(contents);

        _buttons.forEach((btn, index1) => {
            btn.addEventListener('click', () => {
                clearActiveClass(_buttons, activeClass);
                clearActiveClass(_contents, activeClass);
                btn.classList.add(activeClass);
                _contents.forEach((content, index2) => {
                    if (index1 === index2) {
                        content.classList.add(activeClass);
                    }
                });
            });
        });
    }

    tabs('.master-calc__tabs__item', '.master-calc__tab-content', 'active');

});