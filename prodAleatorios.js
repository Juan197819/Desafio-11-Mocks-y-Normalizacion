import { faker } from '@faker-js/faker';

faker.locale= 'es'

// const listaAleatoria= ()=>{
//     for (let index = 0; index < 5; index++) {
//         let name =faker.commerce.product()
//         console.log({
//             nombre:name,
//             precio:faker.commerce.price(100, 500, 2, '$'),
//             foto: faker.image.imageUrl(1234, 2345, `${name}`, true)
//         }) 
//     }
// }

// const listaAleatoria2= ()=>{
//     let name =faker.commerce.product()
//     return ({
//         nombre:name,
//         precio:faker.commerce.price(100, 500, 2, '$'),
//         foto: faker.image.imageUrl(1234, 2345, `${name}`, true)
//     })
//}

// const crearCombinacion = ()=>{
//     const element = []
//     for (let i = 0; i < 5; i++) {
//         element.push(listaAleatoria2())
//     }
//     return element
// }

const crearCombinacion2 = ()=>{
    let element=''
    for (let i = 0; i < 5; i++) {
        let name =faker.commerce.product()
        element = element + `
        <tr class="textoCentrado">
            <td>${name}</td>
            <td>${faker.commerce.price(100, 500, 2, '$')}</td>
            <td>
                <img width="50px" height="50px"src="${faker.image.imageUrl(1234, 2345,name , true)}" alt="${name}"></img> 
            </td> 
        </tr>`
    }
    return element
}

export default crearCombinacion2