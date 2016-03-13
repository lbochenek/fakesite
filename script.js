document.addEventListener("click", init);

function init(){
    console.log("in init!");
    var post = document.querySelector("div#stuff");
    var insertNode = toStringDOM(post);
    post.parentNode.insertBefore(insertNode, post);
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
    if(node.nodeType === Node.ELEMENT_NODE){
        var htmlCode = outerInnerHTMLDifference(node.outerHTML, node.innerHTML);
        var newNode = arrangeNewNode(htmlCode);
        var potentialProcessing = insert(newNode, processingNodes);
    } else {
        var potentialProcessing = insert(node, processingNodes);
    }

    //means that this node is the root node
    if(potentialProcessing !== null){
        processingNodes = {containerNode: potentialProcessing, root: true};
    }


    //visit all unvisited children
    if(node.hasChildNodes()){
        var childrenAry = Array.prototype.slice.call(node.childNodes);
        for(var i=0, length=childrenAry.length; i<length; i++){
            var child = childrenAry[i];
            if(child.vistied != true){
                toStringDOM(child, {containerNode: newNode, appendBefore: newNode.lastChild, root: false});
            }
        }
        // for(var child=node.firstChild; child != null; child=child.nextSibling){
        //     if(child.visted != true){
        //         toStringDOM(child, {containerNode: newNode, appendBefore: newNode.lastChild, root: false});
        //     }
        // }

        // for(var i=0, length=node.childNodes.length; i<length; i++){
        //     var child = node.childNodes[i];
        //     if(child.visted != true){
        //         toStringDOM(child, {containerNode: newNode, appendBefore: newNode.lastChild, root: false});
        //     }
        // }
        //gone through all children of root node = done!
        if(processingNodes.root){
            return processingNodes.containerNode;
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
            if(processingNodes.appendBefore){
                processingNodes.containerNode.insertBefore(nodeNew, processingNodes.appendBefore);
            } else {
                processingNodes.containerNode.appendChild(nodeNew);
            }
            return null;
        } else {
            var newContainer = document.createElement("div");
            newContainer.appendChild(nodeNew);
            return newContainer;
        }
    }

}