class Container{
    constructor(list){
        this.list = list
    }
    getIterator(){
        return new Iterator(this.list)
    } 
}
class Iterator{
    constructor(list){
        this.list = list
        this.index = 0
    }
    haveNext(){     
        if(this.index >= this.list.length){ 
            return false
        }
        return true
    }
    Next(){
        if(this.haveNext()){
            return console.log(this.list[this.index++])
            //  this.list[this.index]
        }
        return null
    }
}
export {Container}