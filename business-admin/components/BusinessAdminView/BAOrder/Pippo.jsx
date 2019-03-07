import React from 'react'

let Goofy = React.createClass({

    render:function () {
        return( <p> Somebody come quick</p>);
    }
});

//Così posso esportare con le parentesi graffe, altrimenti devo esportare senza
module.exports = {
    Goofy
};