const ReactDom = {
    render
}

function render(vnode, container) {
    if(vnode === undefined) return

    // 如果是字符串
    if (typeof vnode === 'string') {
        let textNode = document.createTextNode(vnode)
        return container.append(textNode)
    }

    const {tag, attrs, childrens} = vnode
    const dom = document.createElement(tag)
    if (attrs) {
        Object.keys(attrs).forEach(key =>  {
            const value = attrs[key]
            setAttribute(dom, key, value)
        })
    }

    // 子节点
    childrens.forEach(child => render(child, dom))

    return container.appendChild(dom)
}

function setAttribute(dom, key, value) {
    // className
    if (key === 'className') {
        key = 'class'
    }

    // event
    if (/on\w+/.test(key)) {
        key = key.toLowerCase()
        dom[key] = value || ''
    } else if (key === 'style') {
        // style 可以是字符串也可以是对象
        if(typeof value === 'string') { 
            dom.style.cssText = value
        } else if (value && typeof value === 'object') {
            for (k in value) {
                if (typeof value[k] === 'number') {
                    dom.style[k] = value[k] + 'px'
                } else {
                    dom.style[k] = value[k]
                }
            }
        }
    } else {
        // 其他属性
        if (key in dom) {
            dom[key] = value || ''
        } 
        if (value) {
            dom.setAttribute(key, value)
        } else {
            dom.removeAttribute(key)
        }
    }

    dom.setAttribute(key, value)
}

export default ReactDom