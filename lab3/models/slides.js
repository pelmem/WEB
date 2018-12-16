const fs = require('fs');
const util = require('util');

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

async function readInfo(){
    // read
    const json = await readFile('./data/slides.json');
    const jsonStr = json.toString();
    //parse
    return JSON.parse(jsonStr); 
};

class Slide {
    constructor({ id, url}){
        this.id = id;
        this.url = url;
    }

    
    static async  getAll(){
        let storageObj = await readInfo(); 
        let slidesArr = storageObj.items;
        //fill array
        let allSlides = new Array();
        for (const sl of slidesArr) {
            allSlides.push(new Slide(sl));
        }
        return allSlides;
    }

    static async getByCount(count){
        if(typeof count !== "number" || count < 0){
            return undefined;
        }
        let storageObj = await readInfo();  
        let slidesArr = storageObj.items;
        //fill array
        let countSlides = new Array();
        for(let i = 0; i < slidesArr.length && i < count; i++) {
            countSlides.push(slidesArr[i]);
        }
        return countSlides;
    }

    static async getById(id){
        //check id
        if(typeof id !== "number" || id < 0){
            return undefined;
        }
        let storageObj = await readInfo(); 
        let slidesArr = storageObj.items;
        //search user by id
        for (let sl of slidesArr) {
            if(sl.id === id){
                return new Slide(sl);
            }
            
        }
        return undefined;
    }
}

module.exports = Slide;