let ind = 0;
let newInd = 1;

function Slide(index, title, background, link ) {
    this.title = title;
    this.background = background;
    this.link = link;
    this.id = "slide-" + index;
}

const Slider = {
    current: 0,
    slides: [],
    initSlider: function(slides){
        let index = 0;
        for (let slide of slides){
            this.slides.push(new Slide(index, slide.title, slide.background, slide.link));
            index++;
        }
        this.buildSlider();
    },

    buildSlider: function() {
        let sliderHTML = "";

        for(let slide of this.slides) {

//зверніть увагу на можливість використання ``,яка дозволяє додавати в string змінні ${}
            sliderHTML +=
                `<div id='${slide.id}' class='singleSlide'
           style='background-image:url(${slide.background});'>
           <div class='slideOverlay'>
           <h2>${slide.title}</h2>
           <a class='link' href='${slide.link}' target='_blank'>Open</a></div></div>`;

            let someB = document.createElement('button');
            someB.className = 'dymButtons';
            someB.id = 'button-' + slide.id;
            someB.innerHTML = "Slide " + newInd;

            var someDiv = document.getElementById("slideJS");

            document.getElementById("slider").appendChild(someB);
            someB.addEventListener("click", ()=> {
                let curr = slide.id.slice(-1);
                    while (ind != curr) {
                        this.nextSlide();
                    }
                }
            );
            someDiv.appendChild(someB);
            newInd++;
        }
        document.getElementById("slider").innerHTML = sliderHTML;
        document.getElementById("slide-" + this.current).style.left = 0;
    },
    prevSlide: function() {
        console.log(ind);
        let next;
        if (this.current === 0 ) {
            ind = this.slides.length - 1;
            next = this.slides.length - 1;
        } else {
            ind--;
            next = this.current - 1;
        }
        document.getElementById("slide-" + next).style.left = "-100%";
        document.getElementById("slide-" + this.current).style.left = 0;

        document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInLeft");
        document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutRight");

        this.current = next;
    },
    nextSlide: function(){
        console.log(ind);
        let next;
        if (this.current === (this.slides.length - 1) ) {
            ind = 0;
            next = 0;
        } else {
            ind++;
            next = this.current + 1;
        }

        document.getElementById("slide-" + next).style.left = "100%";
        document.getElementById("slide-" + this.current).style.left = 0;

        document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInRight");
        document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutLeft");
        this.current = next;
    },
    setSlide: function (index) {
        while(index !== this.getIndex){
            this.nextSlide();
        }
    },
    setFirstSlide: function () {
        while (this.current !== 0) {
            this.nextSlide();
        }
    },
    getIndex: function () {
        return this.newInd;
    },
}