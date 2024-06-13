(function() {
    function getMatrixes(text) {
        const regex = /\\left\[\\begin{array}{((?:c|l|r)*)}([\s\S]*?)\\end{array}\\right\]/g;
        let matches = Array.from(text.matchAll(regex)).map(match => match[2]);
        return matches;
    }

    function transform(text) {
        const matrixes = getMatrixes(text);
        return matrixes.map(function (matrix) {
            matrix = matrix.replace(/\s\\\\\s/g, "\n");
            matrix = matrix.replace(/\s&\s/g, " ");
            return matrix;
        });
    }

    const matrixes = transform(document.querySelector("html").innerText);

    matrixes.forEach(matrix => {
        const button = document.createElement("button");
        button.innerHTML = matrix;
        button.onclick = function() {
            let tempInput = document.createElement("textarea");
            tempInput.value = matrix;
            document.body.appendChild(tempInput);
            
            tempInput.select();
            tempInput.setSelectionRange(0, 99999); // For mobile devices
            
            document.execCommand("copy");
            
            document.body.removeChild(tempInput);
    
            // window.close();
        };
        document.body.appendChild(button);
    });
})();
