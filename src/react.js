import Component from './component.js'

const React = {
    createElement,
    Component   
}

function createElement (tag, attrs, ...childrens) {
    return {
        tag, 
        attrs, 
        childrens
    }
}

export default React