document.addEventListener('DOMContentLoaded', function() {
   
    const floatingImages = document.querySelectorAll('.floating-image');
    
    
    let activeImage = null;
    let initialX, initialY;
    let currentX, currentY;
    let xOffset = 0, yOffset = 0;
    
 
    document.querySelector('.image-container').addEventListener('mouseover', function() {
        document.querySelectorAll('.floating-image:not(:hover)').forEach(img => {
            img.style.filter = 'grayscale(80%) contrast(120%)';
        });
    });
    
    document.querySelector('.image-container').addEventListener('mouseout', function() {
        document.querySelectorAll('.floating-image').forEach(img => {
            img.style.filter = 'grayscale(80%) contrast(120%)';
        });
    });
    
  
    floatingImages.forEach(img => {
  
        img.addEventListener('touchstart', dragStart, false);
        img.addEventListener('touchend', dragEnd, false);
        img.addEventListener('touchmove', drag, false);
        
      =
        img.addEventListener('mousedown', dragStart, false);
        img.addEventListener('mouseup', dragEnd, false);
        img.addEventListener('mousemove', drag, false);
        img.addEventListener('mouseleave', dragEnd, false);
        
       
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });
    });
    
    function dragStart(e) {
        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
        
        if (e.target.closest('.floating-image')) {
            activeImage = e.target.closest('.floating-image');
            activeImage.style.cursor = 'grabbing';
            activeImage.style.zIndex = '30';
            
          
            const style = window.getComputedStyle(activeImage);
            const matrix = new WebKitCSSMatrix(style.transform);
            
            if (matrix.m41) {
                xOffset = matrix.m41;
                yOffset = matrix.m42;
            }
        }
    }
    
    function dragEnd(e) {
        if (activeImage) {
            activeImage.style.cursor = 'grab';
            setTimeout(() => {
                activeImage.style.zIndex = activeImage.matches(':hover') ? '20' : '5';
            }, 100);
        }
        initialX = currentX;
        initialY = currentY;
        activeImage = null;
    }
    
    function drag(e) {
        if (activeImage) {
            e.preventDefault();
            
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }
            
            xOffset = currentX;
            yOffset = currentY;
            
            setTranslate(currentX, currentY, activeImage);
        }
    }
    
    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
    
  
    floatingImages.forEach(img => {
        img.addEventListener('mousemove', function(e) {
            if (!activeImage) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
               
                const xPercent = ((x / rect.width) - 0.5) * 10; 
                const yPercent = ((y / rect.height) - 0.5) * 10;
                
                const imgElement = this.querySelector('img');
                imgElement.style.transform = `translate(${xPercent}px, ${yPercent}px) scale(1.05)`;
            }
        });
        
        img.addEventListener('mouseleave', function() {
            if (!activeImage) {
                const imgElement = this.querySelector('img');
                imgElement.style.transform = 'translate(0, 0) scale(1)';
            }
        });
    });
});
