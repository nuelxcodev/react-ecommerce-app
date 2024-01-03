import User from '../schemas/user.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import data from '../utils/Data.js';
import Item from '../schemas/items.js';


export async function register(req, res) {
    const { username, email, password } = req.body;

    const checkuser = await User.findOne({ email })
    if (checkuser) { res.status(401).send({ message: " user already exist" }) }
    else {
        const salt = bcrypt.genSaltSync();
        const hashedpassword = bcrypt.hashSync(password, salt);
        const newuser = await User.create({ username, email, password: hashedpassword });

        const token = jwt.sign({ username }, 'munachimso', { expiresIn: '1d' })
        res.status(201).send(token);
    }

}
export async function login(req, res) {
    const { username, password } = req.body
    const check = await User.findOne({ username })
    if (!check) {
        res.status(403).send({ message: "invalid username or email" })
    } else {
        const isValid = bcrypt.compareSync(password, check.password);
        const token = jwt.sign({ username }, 'munachimso', { expiresIn: '1d' })
        return res.json({
            status: "success",
            id: check._id,
            username: check.username,
            token: token  
        });

    }
}
export async function resetpassword(req, res) {

}


export async function items(req, res) {
    const { username, data } = req.body
    const { name, slug, category, brand, price, countInStock, image } = data;
    const newitem = await Item.create({ username, name, slug, category, brand, price, countInStock, image })
    return res.json({ status: "success", message: "created" })
}
export async function getitems(req, res) {
    const allItem = await Item.find()
    
    res.json(data)
}

