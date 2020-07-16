import {PrintedArea} from "./PrintedArea.js"
import '../css/style.css'
import * as $ from 'jquery'
import React from 'react'
import {render} from 'react-dom'
import App from './pageElements/App.jsx'

/*
let printedArea;
let sizesForm = document.forms['sizes'];
let findDomensButton = document.getElementById('findDomens');
let autoForm = document.forms['auto'];
console.log(sizesForm);
sizesForm.elements['lSize'].value = 3;
sizesForm.elements['mSize'].value = 5;
sizesForm.elements['nSize'].value = 7;
autoForm.elements['probability'].value = 0.5;
sizesForm.onsubmit = () => {
    printedArea = new PrintedArea({
        l: parseInt(sizesForm.elements['lSize'].value),
        m: parseInt(sizesForm.elements['mSize'].value),
        n: parseInt(sizesForm.elements['nSize'].value)
    });
    return false;
};
autoForm.onsubmit = () => {
    printedArea = new PrintedArea({
        l: parseInt(sizesForm.elements['lSize'].value),
        m: parseInt(sizesForm.elements['mSize'].value),
        n: parseInt(sizesForm.elements['nSize'].value)
    });
    printedArea.hexagons.forEach(hg=>{
        if(Math.random() >= 1-autoForm.elements['probability'].value){
            hg.changeValue();
        }
    });
    printedArea.findDomens((qd,qnd,qh,qht)=>{
        let table = document.getElementById('calculations');
        let rows = table.querySelectorAll('tr.tableRow');
        let newRow = document.createElement('tr');
        newRow.classList.add('tableRow');
        newRow.innerHTML = `
            <td>${autoForm.elements['probability'].value}</td>
            <td>${qd}</td>
            <td>${qnd}</td>
            <td>${qh}, ${qht}</td>
        `;
        table.append(newRow);
        if(rows.length>9)rows[0].remove();
    });
    return false;
};
findDomensButton.addEventListener('click', () => {
    printedArea.findDomens();
});
*/


render (<App />, document.getElementById('app'));

console.log(typeof $('#app'), $('#app'))




