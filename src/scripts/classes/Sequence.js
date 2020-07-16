export default class Sequence{
    constructor() {
        this.val = 0
    }
    nextVal(){
        return this.val++
    }
    currentVal(){
        return this.val
    }
    increment(){
        this.val++
    }
}