import { useState } from "react";
import todoContext from "./context";
import axios from 'axios';

const TodoState = (props) => {

    // useables
    let randomNumber = Math.random();
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();




    let finalItems = [];

    const [items, setitems] = useState(finalItems);

    const axiosPost = axios.create({
        headers: {
            "auth-token": localStorage.getItem('auth-token')
        }
    })

    const AddItem = async (title, desc) => {
        const data = {
            title: title,
            desc: desc
        }
        await axiosPost.post('/api/note/additem', data);
        const item = {
            "_id": randomNumber,
            "user": randomNumber,
            "title": title,
            "desc": desc,
            "Date": date,
            "time": time,
            "__v": 0
        }
        setitems(items.concat(item))
    }

    const DeleteItem = async (id) => {
        await axiosPost.delete(`/api/note/deleteitem/${id}`);
        const deletedData = items.filter((item) => { return item._id !== id })
        setitems(deletedData);
    }

    const GetItem = async () => {
        const response = await axiosPost.get('/api/note/getitem');
        setitems(response.data);
    }

    const UpdateItem = async (id, title, desc) => {

        await axiosPost.put(`/api/note/updateitem/${id}`, { title, desc });

        let newItem = JSON.parse(JSON.stringify(items))

        for (let i = 0; i < newItem.length; i++) {
            const element = newItem[i];
            if (element._id === id) {
                newItem[i].title = title;
                newItem[i].desc = desc;
                break
            }
        }
        setitems(newItem);

    }

    return (
        <todoContext.Provider value={{ items, AddItem, DeleteItem, GetItem, UpdateItem }}>
            {props.children}
        </todoContext.Provider>
    )
}
export default TodoState;