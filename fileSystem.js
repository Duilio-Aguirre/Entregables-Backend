import {promises as fs} from "fs"

class ProductManager {
    constructor () {
       this.patch = "./products.txt";
       this.products = []
    }

    static id = 0

    addProduct = async(title, description, price, thumbnail, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)
        
        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    readProducts = async() => {
        let answer = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(answer)
    }

    getProducts = async() => {
        let answer2 = await this.readProducts()
       return console.log(answer2)
    }

    getProductsById = async(id) => {
        let answer3 = await this.readProducts()
        if(!answer3.find(product => product.id === id)){
            console.log("Not Found")
        } else
        console.log(answer3.find(product => product.id === id))
    }

    deleteProductById = async(id) => {
        let answer3 = await this.readProducts();
        let productFilter = answer3.filter(product => product.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("Product deleted succesfuly")
    }

    updateProducts = async({id, ...product}) => {
        await this.deleteProductById(id);

        let oldProducts = await this.readProducts()
        let updatedProducts = [{ ...product, id }, ...oldProducts];

        await fs.writeFile(this.patch, JSON.stringify(updatedProducts))
        
    }
}

const product = new ProductManager

/*product.addProduct("Title1","Description1", 14000, "img1", "code123", 14)
product.addProduct("Title2","Description2", 7000, "img2", "code124", 7)
product.addProduct("Title3","Description3", 23000, "img3", "code125", 23) */

//product.getProducts()

//product.getProductsById(3)

//product.deleteProductById(3)

product.updateProducts({ title: 'Title2',
    description: 'Description2',
    price: 9500,
    thumbnail: 'img2',
    code: 'code124',
    stock: 7,
    id: 2})