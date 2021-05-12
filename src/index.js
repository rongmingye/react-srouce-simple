import React from './react.js'
import ReactDom from './react-dom.js'
import Home from './home.js'

const elem = (
    <div className="active" title="123">
        hello, react    
    </div>
)

ReactDom.render(<Home></Home>, document.querySelector('#root'))


