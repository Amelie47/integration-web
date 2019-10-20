module.exports = function () {
    this.sliderAutoEntete = function (sliderElement) {
        console.log('sliderAutoEntete');
        let n = 0;
        sliderElement.children[1].style.display = 'flex';
        let interval = setInterval(displayed, 3000);
        function displayed() {
            console.log(sliderElement.children);
            sliderElement.children.forEach(function (item, index, array) {
                // if (index == n) {
                //     item.style.display = 'flex';
                //     // section_entete.style.backgroundColor = getColor(item.getAttribute('data-color'));
                // } else {
                //     item.style.display = 'none';
                // }

                // console.log('oo');
            });
            n++;

            //retour au début
            if (n >= sliderElement.children.length) {
                n = 0;
            }
        }
        // function getColor(color) {
        //     switch (color) {
        //         case 'Rouge Feu': return '#e73025';
        //         case 'Vert Gazon': return '#009f55';
        //         case 'Bleu nuit': return '#231F6A';
        //         case 'Blanc': return '#CCCCCC';
        //         case 'Gris Souris': return '#CCCCCC';
        //         case 'Jaune Poussin': return '#FFBE00';
        //     }
        // }
    }
}