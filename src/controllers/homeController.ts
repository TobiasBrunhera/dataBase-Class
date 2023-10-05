import { Request, Response } from 'express';

import { Op } from 'sequelize'

import { Product } from '../models/Product';

import { User } from '../models/User'

export const home = async (req: Request, res: Response)=>{
    
    let users = await User.findAll()

    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bonieky',
        lastName: 'Lacerda',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users
    });
};

export const novoUsuario = async (req: Request, res: Response) => {
    let { name, age } = req.body
    if(name) {
        const newUser = User.build({ name })

        if(age) {
            newUser.age = parseInt(age)
        }

        await newUser.save()
    }
     
    res.redirect('/')
}
    // const user = User.build({
    //     name: 'Beltrano'
    // })

    // let idade: number = 27
    // user.age = idade
    // await user.save()

    // const user = await User.create({
    //     name: 'Ciclano',
    //     age: 39


    
    // })
    // console.log("NOME: ", user.name)
    // console.log("AGE: ", user.age)