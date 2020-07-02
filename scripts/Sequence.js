export class Sequence{
    constructor() {
        this.val = 0
    }
    nextVal(){
        let ret = this.val++;
        return ret
    }
    currentVal(){
        return this.val
    }
    increment(){
        this.val++
    }
}