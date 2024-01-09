import { query } from "express";
import mongoose from "mongoose";
import { CakeModel } from "../Model/cake.js";

const getAllCakes = async (req, res) => {
    let { search } = req.query;
    let perPage = req.query.perPage || 2;
    let page = req.query.page || 1;

    let ex = new RegExp(`${search}`)
    try {
        let filter = {};
        if (search)
            filter.name = ex;
    
       
        let allCakes = await CakeModel.find(filter)
        .skip(page*(perPage-1)).limit(perPage);
        
        res.json(allCakes);
        
    }
    catch (er) {
        res.status(400).send("מצטערים ארעה שגיאה בעת שליפת הנתונים" + er.mongoose)
    }
}

const getCakeById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.cakeid))
            return res.status(460).send("קוד לא תקין")
        let cake = await CakeModel.findById(req.params.cakeid)
        if (!cake)
            return res.status(404).send("מצטערים לא נמצאה עוגה עם כזה קוד");
        res.json(cake)
    }
    catch (er) {
        res.status(400).send("מצטערים התרחשה שגיאה בעת שליפת הנתונים" + er.mongoose);
    }
}
const deleteCakeById = async (req, res) => {
    let { id } = req.params
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("קוד לא תקין")
        let cake = await CakeModel.findByIdAndDelete(id);
        if (!cake)
            return res.status(404).send("לא נמצאה עוגה עם כזה קוד למחיקה")
        res.json(cake)
    }
    catch (er) {
        res.status(400).send("מצטערין ארעה בעיה בעת מחיקת הנתונים" + er.mongoose)
    }
}

const updateCake = async (req, res) => {
    let { id } = req.params
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("קוד לעדכון עודה לא תקין")
        let cakeToUpdate = CakeModel.findById(id)
        if (!cakeToUpdate)
            return res.status(404).send("לא נמצאה עוגה עם כזה קוד לעדכון")
        await CakeModel.findByIdAndUpdate(id, req.body)
        let cake = await CakeModel.findById(id)
        res.json(cake)
    }
    catch (er) {
        res.status(400).send("ארעה תקלה בעת עדכון הנתונים");
    }
}
const addCake = async (req, res) => {
    let { name, allergic, isDairy, ManufacturingDate, severalLayers } = req.body;
    if (!name || !severalLayers)
        return res.status(404).send("שם ומספר שכבות בעוגה הינם חובה");
    try {
        let sameCake = await CakeModel.find({ name, severalLayers });
        if (sameCake.length > 0)
            return res.status(409).send("כבר קיימת עוגה עם שם כזה ומספר שכבות זהה");
        let newCake = new CakeModel({ name, allergic, isDairy, ManufacturingDate, severalLayers });
        await newCake.save();
        res.json(newCake);
    }
    catch (er) {
        res.status(400).send("ארעה שגיאה בעת הוספת נתונים" + er.mongoose)
    }
}

export { addCake, updateCake, deleteCakeById, getCakeById, getAllCakes };
