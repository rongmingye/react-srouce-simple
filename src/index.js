import React from './react.js'
import ReactDom from './react-dom.js'

const elem = (
    <div className="active" title="123">
        hello, react    
    </div>
)

ReactDom.render(elem, document.querySelector('#root'))


