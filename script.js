document.addEventListener("click", init);

function init(){
    console.log("in init!");
    var post = document.querySelector("div#stuff");
    toStringDOM(post);
    post.parentNode.removeChild(post);
}

//depth first search!
function toStringDOM(node, processingNodes){
    //already been here!
    if(node.visited == true){
        return;
    }

    //if unvisited, process node
    node.visited = true;
    var htmlCode = outerInnerHTMLDifference(node.outerHTML, node.innerHTML);
    var newNode = arrangeNewNode(htmlCode);
    insert(newNode, processingNodes);

    //visit all unvisited children
    if(node.hasChildNodes){
        for(var i=0, length=node.childNodes.length; i<length; i++){
            var child = node.childNodes[i];
            if(child.visted != true){
                toStringDOM(child, {containerNode: newNode, appendBefore: newNode.lastChild});
            }
        }
    }

    function outerInnerHTMLDifference(outer, inner){
        var startInner = outer.indexOf(inner);
        var endInner = startInner + inner.length;
        var justOuterBegin = outer.slice(0, startInner);
        var justOuterEnd = outer.slice(endInner, outer.length);
        return {startC: justOuterBegin, endC: justOuterEnd};
    }

    function arrangeNewNode(rippedhtml){
        var newNode = document.createElement(node.nodeName);
        newNode = assignAllOriginalValues(node, newNode);
        var startCode = document.createTextNode(rippedhtml.startC);
        var endCode = document.createTextNode(rippedhtml.endC);
        newNode.appendChild(startCode);
        newNode.appendChild(endCode);
        return newNode;

        function assignAllOriginalValues(oldN, newN){

            return newN;
        }
    }

    function insert(nodeNew, processingNodes){
        if(processingNodes){
            processingNodes.containerNode.insertBefore(nodeNew, processingNodes.appendBefore);
        } else {
            node.parentNode.insertBefore(nodeNew, node);
        }
    }

}