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
            loop: false,
            transitionTime: 0.3,
            auto: true
        }, options);
        this.children = [].slice.call(element.children);
        this.root = this.createDivWithClass('carousel');
        this.currentItem = 0;
        this.moveCallBacks = [];
        this.isMobile = false;

        this.createStructure();
        this.createNavigation();
        this.moveCallBacks.forEach(cb => cb(0));

        this.screenResize();
        window.addEventListener('resize', this.screenResize.bind(this));

        if(this.options.auto){
            let interval = setInterval(console.log('hop'),1000);
        }
    }

    /**
     * Créer la strucuture du carousel (ajoute des div et des class)
     */
    createStructure() {
        this.container = this.createDivWithClass('carousel__container');
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
        let nextButton = this.createDivWithClass('carousel__next');
        nextButton.innerHTML = '>';
        // nextButton.classList.add('arrow-droite');
        let prevButton = this.createDivWithClass('carousel__prev');
        prevButton.innerHTML = '<';
        // prevButton.classList.add('arrow-gauche');

        // let nextButton = document.createElement('button');
        // nextButton.classList.add('arrow-slider');
        // nextButton.classList.add('arrow-droite');
        // nextButton.innerHTML = '>';

        // let prevButton = document.createElement('button');
        // prevButton.classList.add('arrow-slider');
        // prevButton.classList.add('arrow-gauche');
        // prevButton.innerHTML = '<';

        this.root.appendChild(nextButton);
        this.root.appendChild(prevButton);

        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));

        if (!this.options.loop) {
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
        }else if (index >= this.items.length || (this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem)) {
            index = 0;
        }

        let calcul = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + calcul + '%,0,0)';
        this.currentItem = index;

        this.moveCallBacks.forEach(cb => cb(index));
    }

    onMove(cb) {
        this.moveCallBacks.push(cb);
    }

    /**
     * Ajoute une transition au défilement
     */
    setTransition() {
        this.container.style.transition = 'transform '+ this.options.transitionTime +'s, opacity '+ this.options.transitionTime +'s';
        this.container.style.transform = 'translate3d(0,0,0)';
    }

    screenResize() {
        let mobile = window.innerWidth < 800;
        if (mobile != this.isMobile) {
            this.isMobile = mobile;
            this.setStyle();
            this.moveCallBacks.forEach(cb => cb(this.currentItem));
        }
    }

    /**
     * @return {number}
     */
    get slidesToScroll() {
        if(this.isMobile){
            return 1;
        }else{
            return this.options.slidesToScroll;
        }
    }

    /**
     * @return {number}
     */
    get slidesVisible() {
        if(this.isMobile){
            return 1;
        }else{
            return this.options.slidesVisible;
        }
    }
}