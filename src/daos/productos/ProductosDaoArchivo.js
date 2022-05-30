const { ContenedorArchivo } = require("../../contenedores/ContenedorArchivo");

class ProductoDaoArchivo extends ContenedorArchivo{
    constructor() {
        super('./src/data/products.txt');
        let products = this.getAll().then(res=>{
            this.id = (res.length > 0) ? res.length + 1 : 1;
        });
        this.timestamp = Date.now();
    }
    /* --------------------------------------- */
    /*                CREATE                   */
    /* --------------------------------------- */
    async save(name, description, code, thumbnail, price, stock) {
        let products =  await this.getAll();
        let player = {id:this.id, timestamp: this.timestamp, name: name, description: description, code: code, thumbnail: thumbnail, price: price, stock: stock}
        products.push(player);
        await this.saveInFile(products);
        this.id++;
        
    }
    /* --------------------------------------- */
    /*                READ ALL                 */
    /* --------------------------------------- */
    getAll() {
        const prod = super.getContentFile()
        return prod;
    }
    async getProdById(id) {
        let products = await this.getAll();
        let prod = null;

        if(products.length > 0) {
            let element = await products.find(elem => elem.id == id);
            if(element) {
                prod = element;              
            }
        }
        return prod;
    }
    /* --------------------------------------- */
    /*                  UPDATE                 */
    /* --------------------------------------- */
    async updateByID(number,req){
        try {
            const jsonObj = await this.getAll();
            //console.log(jsonObj);
            for (let key in jsonObj) {
                // console.log(key);
                if (jsonObj[key].id == number) {
                    jsonObj[key] = {
                        id: number,
                        timestamp: this.timestamp,
                        name: req.name,
                        description: req.description,
                        code: req.code,
                        thumbnail: req.thumbnail,
                        price: req.price,
                        stock: req.stock
                    }
                }
            }
           // sobreescribir
           await this.saveInFile(jsonObj);
           return await this.getProdById(number);

        } catch (error) {
            console.log(error);
        }
    }
    
    
}

module.exports = { ProductoDaoArchivo }