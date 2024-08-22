const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");

        const frames={
            currentIndex:0,
            maxIndex: 299
        }

        imageCon = [];
        imageloder = 0;

        function preloader(){
            for(var i=2 ;i <= frames.maxIndex+1;i++){
               const imageurl = `./media/male${i.toString().padStart(4, "0")}.png`;
            const imagetag = new Image();
            imagetag.src = imageurl;
            imagetag.onload = ()=>{
                imageloder++;
                // console.log(imageloder);
                if(imageloder === frames.maxIndex){
                    // console.log("q")
                    loadImage(frames.currentIndex);
                    startanimation();
                }
            }
            imageCon.push(imagetag);
        
            }
            // console.log(imageCon);
        }
        function loadImage(index){
            // console.log("in")
            if(index >=0 && index <= frames.maxIndex){
                const img = imageCon[index];
                // console.log(img)
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const scalex = canvas.width / img.width;
                const scaley = canvas.height / img.height;
                const scale = Math.max(scalex,scaley);


                const newWidth = img.width *scale;
                const newHeight = img.height *scale;

                const offsetX = (canvas.width - newWidth)/2;
                const offsetY = (canvas.height - newHeight)/2;

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.imageSmoothingEnabled = true;
                context.imageSmoothingQuality = "high";
                context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
                frames.currentIndex = index;
                // console.log(img)

            }
        }
       
            function startanimation() {
            var tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".parent",
                    start: "top top",
                    scrub: 2,
                    // markers: true
                }
            });

            tl.to(frames, {
                currentIndex: frames.maxIndex,
                onUpdate: function () {
                    console.log(Math.floor(frames.currentIndex));
                    loadImage(Math.floor(frames.currentIndex));
                
                }
            });
        }
        
        preloader();

        var typed = new Typed(".element", {
            strings: [
              "Web developer",
              "Softwere developer",
              "Application developer",
              "Python developer",
              "Zoho developer"
            ],
            typeSpeed: 200,
            loop:true
          });