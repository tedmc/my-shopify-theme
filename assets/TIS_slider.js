class PromotionCarousel extends HTMLElement {
    constructor() {
      super();
      this.arrows = this.getAttribute("data-arrows") === "true";
      this.dots = this.getAttribute("data-dots") === "true";
      this.autoPlay = this.getAttribute("data-auto_play") === "true";
      this.fade = this.getAttribute("data-fade") === "true";
      //this.groupCell = parseInt(this.getAttribute("data-group_cell"), 10) || 1;
      this.images = this.querySelectorAll("img");      
    }
  
    connectedCallback() {
      const hasMultipleImages = this.images.length > 1;
  
      this.carousel = new Flickity(this, {
        prevNextButtons: hasMultipleImages && this.arrows,
        autoPlay: this.autoPlay,
        fade: this.fade,
        wrapAround: true,        
        pageDots: hasMultipleImages && this.dots,
        wrapAround: true,                
        contain: true,
        percentPosition: true,
        initialIndex: 0,
      });
    }
  }
  
  customElements.define("promotion-carousel", PromotionCarousel);

function setupSlide(selector) {
  //  if (DK.isMobile) return false;
    const slider = document.querySelector(selector);
    var sliderId = slider.getAttribute('data-carousel-id');
    var ihCarousel = slider.getAttribute('data-ih-carousel');
    
    let isDown = false;
    let startX;
    let scrollLeft;
    slider.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.classList.add("grab");
    });
    slider.addEventListener('mouseleave', (e) => {
      e.stopPropagation();
      isDown = false;
      slider.classList.remove("grab");
    });
    slider.addEventListener('mouseup', (e) => {
      e.stopPropagation();
      isDown = false;
      slider.classList.remove("grab");
    });
    slider.addEventListener('mousemove', (e) => {
      
      if(!isDown) return;
      e.preventDefault();
      e.stopPropagation();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;

    });       
  }