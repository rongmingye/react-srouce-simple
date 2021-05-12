import React from './react.js'

class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            title: 'hello, home'
        }
    }
    
    render () {
        return (
        <div className="active" title="123">
            Hello,
            <span>React</span>
          </div>
        )
    }
}

export default Home