class AnimatableNumberObject{
    constructor(numberSpan){
        this.numberContainer = numberSpan;

        this.startNumber = +this.numberContainer.getAttribute("data-start-number") || 0;
        this.endNumber = +this.numberContainer.getAttribute("data-end-number") || 1000;
        this.currNumber = +this.numberContainer.getAttribute("data-curr-number") || this.startNumber;

        this.totalTimeForAnimation = +this.numberContainer.getAttribute("data-time") || null;
        

        /* if this time(totalTimeForAnimation) is very big or very small it will not apply,
         becouse currNumberIncrement is always integer and cant be very small number something like: 0.0001, or very big number, bigger then endNumber.so totalTimeFroAnimation should be some resonable number. 
        */
        // In miliseconds
        this.currNumberIncrement = +this.totalTimeForAnimation ? this.calculateIncrement() : +this.numberContainer.getAttribute("data-increment") || 10;

    }

    calculateIncrement(){
        return Math.ceil((this.endNumber - this.startNumber)/Math.floor(this.totalTimeForAnimation/16));
    }
}

const numberObjects = [];

setTimeout(() => {
   initAll();
   console.log("aaaaaa");
}, 400);


function initAll(){
    console.log("all")
    document.querySelectorAll(".number-span").forEach(span => {
        numberObjects.push(new AnimatableNumberObject(span))
    })

    requestAnimationFrame(animate);

}





const updateNumber = (numberObject) => {
    numberObject.numberContainer.textContent = numberObject.currNumber;
}

const incrementNumber = (numberObject) => {
    numberObject.currNumber += numberObject.currNumberIncrement;
}


const animate = () => {

    let isInAnimationMode = numberObjects.some(numberObject => numberObject.currNumber < numberObject.endNumber);

    numberObjects.forEach(numberObject => {
        if(numberObject.currNumber < numberObject.endNumber){
            incrementNumber(numberObject);
            updateNumber(numberObject);
        }else{
            numberObject.numberContainer.textContent = numberObject.endNumber;
        }
    })

    if(isInAnimationMode){
        requestAnimationFrame(animate);
    }else{
    }

}



