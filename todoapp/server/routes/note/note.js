const express = require('express');
const { fetchuser } = require('../../fetchuser/fetchuser');
const { Note } = require('../../model/note');



const router = express.Router();

router.get('/getitem', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
})

router.post('/additem', fetchuser, async (req, res) => {
    const { title, desc } = req.body;

    if (!title || !desc) {
        return res.status(404).send({ success: false, error: "credentials not found!" });
    }

    try {
        const data = new Note({
            title: title,
            desc: desc,
            user: req.user.id
        })

        await data.save();
        res.status(201).send({ success: true, data })

    } catch (error) {
        console.log(error)
    }

})

router.delete('/deleteitem/:id', fetchuser, async (req, res) => {
    const noteid = await Note.findById(req.params.id);
    try {
        if (!noteid) {
            return res.status(401).send({ error: "id not found!" });
        }

        if (noteid.user.toString() != req.user.id) {
            return res.status(401).send({ error: "not allowed" });
        }

        const note = await Note.findByIdAndDelete(req.params.id);

        res.status(201).send({ message: 'note deleted' });

    } catch (error) {
        console.log(error);
    }

})

router.put('/updateitem/:id', fetchuser, async (req, res) => {
    const { title, desc } = req.body;
    if (!title || !desc) {
        return res.status(404).send({ success: false, error: "credentials not found!" });
    }

    try {
        const newItem = {};
        if (title) { newItem.title = title };
        if (desc) { newItem.desc = desc };

        const noteid = await Note.findById(req.params.id);
        if (!noteid) {
            return res.status(401).send({ error: "id not found!" });
        }
        if (noteid.user.toString() != req.user.id) {
            return res.status(401).send({ error: "not allowed" });
        }

        const updatednote = await Note.findByIdAndUpdate(req.params.id, { $set: newItem }, { new: true });
        res.status(201).send({ success: true, updatednote });


    } catch (error) {
        console.log(error);
        return res.status(401).send({ error: "id not found!" });
    }
})


module.exports = {
    routes: router
}