import React from "react";
import { useNotes } from "../hooks";

const Toggletag = ({category}) => {
    const { filter } = useNotes();
    return ( 
    <label className={`category${category}`}>
        <input type="checkbox" name="categories" value={category}/><span class="b">{category}</span>
    </label>
    );
}
export default Toggletag;