export default class Carousel {
    
    /**
     * @param {HTMLelement} element 
     * @param {objet} options 
     */
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: true,
            transitionTime: 0.3,
            auto: { bool: false, interval: 0, nav: true, stopHover: false },
            anime: 'translateX'
        }, options);
        this.children = [].slice.call(element.children);
        this.root = this.createDivWithClass('carousel');
        this.currentItem = 0;
        this.moveCallBacks = [];
        this.isMobile = false;
        this.isScrollPaused = false;
        this.index = 0;

        this.createStructure();
        if (this.options.auto.bool) {
            setInterval(() => {
                if(!this.isScrollPaused) this.next();
            }, this.options.auto.interval);
            this.setEventSliderPause();
        }
        if (this.options.auto.nav) {
            this.createNavigation();
        }
        this.moveCallBacks.forEach(cb => cb(0));

        this.screenResize();
        window.addEventListener('resize', this.screenResize.bind(this));
    }

    /**
     * Créer la strucuture du carousel (ajoute des div et des class)
     */
    createStructure() {
        this.container = this.createDivWithClass('carousel__container');
        this.container.style.display = 'flex';
        this.setTransition();

        this.root.appendChild(this.container);
        this.element.appendChild(this.root);

        this.items = this.children.map((child) => {
            let item = this.createDivWithClass('carousel__item');
            item.appendChild(child);
            this.container.appendChild(item);

            return item;
        });

        this.setStyle();
    }

    /**
     * Créer une div avec une class
     * @param {string} classname
     * @return div
     */
    createDivWithClass(classname) {
        let div = document.createElement('div');
        div.classList.add(classname);
        return div;
    }

    createButtonWithClass(classname) {
        let btn = document.createElement('button');
        btn.classList.add(classname);
        return btn;
    }

    /**
     * Appliquer les largeurs correspondantes
     */
    setStyle() {
        let ratio = this.items.length / this.slidesVisible;
        this.container.style.width = (ratio * 100) + "%";

        // Aligner les item en affectant une width en fonction du nombre de slides visibles
        this.items.forEach(item => item.style.width = (100 / this.slidesVisible) / ratio + "%");
    }

    /**
     * Ajoute les bouttons pour la navigation
     */
    createNavigation() {
        let nextButton = this.createButton('arrow-droite', '/src/assets/images/Droite.png');
        let prevButton = this.createButton('arrow-gauche', '/src/assets/images/Gauche.png');

        this.element.parentNode.appendChild(nextButton);
        this.element.parentNode.appendChild(prevButton);

        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));

        if (this.options.loop) {
            return;
        }
        this.onMove(index => {
            if (index === 0) {
                prevButton.classList.add('carousel__prev--hidden');
            } else {
                prevButton.classList.remove('carousel__prev--hidden');
            }
            if (this.items[this.currentItem + this.slidesVisible] === undefined) {
                nextButton.classList.add('carousel__next--hidden');
            } else {
                nextButton.classList.remove('carousel__next--hidden');
            }
        })
    }

    createButton(classname, src) {
        let button_div = document.createElement('div');
        let btn = this.createButtonWithClass('arrow-slider');
        btn.classList.add(classname);
        let img = document.createElement('img');
        img.setAttribute('src', src);
        btn.appendChild(img);
        button_div.appendChild(btn);
        return button_div;
    }

    next() {
        this.goToItem(this.currentItem + this.options.slidesToScroll);
    }
    prev() {
        this.goToItem(this.currentItem - this.options.slidesToScroll);
    }

    /**
     * Déplace le carousel vers l'élément ciblé
     * @param {number} index 
     */
    goToItem(index) {
        // Aller à la fin si click prev et qu'il y a rien au début
        if (index < 0) {
            index = this.items.length - this.slidesVisible;
        } else if (index >= this.items.length || (this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem)) {
            index = 0;
        }

        this.currentItem = index;
        this.setStyleTransition();

        this.moveCallBacks.forEach(cb => cb(index));
    }

    onMove(cb) {
        this.moveCallBacks.push(cb);
    }

    /**
     * Ajoute une transition au défilement
     */
    setTransition() {
        this.container.style.transition = this.options.transitionTime + 's all';
        switch (this.options.anime) {
            case 'translateX': this.container.style.transform = 'translate3d(0,0,0)'; break;
        }
    }
    setStyleTransition() {
        let calcul = this.currentItem * -100 / this.items.length;
        switch (this.options.anime) {
            case 'translateX': this.container.style.transform = 'translate3d(' + calcul + '%,0,0)'; break;
            case 'translateY':
                this.container.style.transform = 'translate3d(0,' + calcul + '%,0)';
                this.root.style.height = this.container.firstChild.offsetHeight + 'px';
                this.container.children.forEach((item) => {
                    item.classList.remove('carousel__item');
                })
                this.container.style.display = 'block';
                this.container.children.forEach((item) => {
                    let img = item.getElementsByTagName('img');
                    img[0].style.opacity = '0';
                })
                let current_img = this.findCurrentSlideWithHeight(this.currentItem).getElementsByTagName('img');
                current_img[0].style.opacity = '1';

                break;
        }
    }

    screenResize() {
        let mobile = window.innerWidth < 800;
        if (mobile != this.isMobile) {
            this.isMobile = mobile;
            this.setStyle();
            this.moveCallBacks.forEach(cb => cb(this.currentItem));
        }
    }

    setEventSliderPause() {
        this.container.addEventListener('mouseover', () => {
            this.isScrollPaused = true;
        });
        this.container.addEventListener('mouseout', () => {
            this.isScrollPaused = false;
        });
    }

    findCurrentSlideWithHeight(index) {
        let current;
        this.container.children.forEach((item) => {
            if (this.getPos(item).y == this.getPos(this.container).y + this.container.firstChild.offsetHeight * index) {
                current = item;
            }
        })
        return current;
    }

    getPos(el) {
        for (var lx = 0, ly = 0;
            el != null;
            lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
        return { x: lx, y: ly };
    }

    /**
     * @return {number}
     */
    get slidesToScroll() {
        if (this.isMobile) {
            return 1;
        } else {
            return this.options.slidesToScroll;
        }
    }

    /**
     * @return {number}
     */
    get slidesVisible() {
        if (this.isMobile) {
            return 1;
        } else {
            return this.options.slidesVisible;
        }
    }
}