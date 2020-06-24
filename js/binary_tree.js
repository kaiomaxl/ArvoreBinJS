class BinaryTree {                   
    // inicializa a raiz como nula
    constructor() {
        this.root = null
    }

    //exibe o menor valor da arvore
    min() {
        let current = this.root          //A current receberar o valor da raiz
        if (current == null)            //Analisa se a current é null
            return null                //retornara null
        while (current.left != null)  //enquando valor esquerda for diferente de nulo 
            current = current.left   //O current receberar o valor da esquerda 
        return current.content      // retornara o valor de current na estrutura repetida 
    }

    //exibe o maior valor da arvore
    max() {
        let current = this.root            //current recebe o valor da raiz
        if (current == null)              //analisa se o valor de current é null
            return null                  // se for null retorna null
        while (current.right != null)   //Valor da direita diferente de nulo 
            current = current.right    // current recebe o valor da direita 
        return current.content        // retornara o valor de current na estrutura repetida 
    }

    //insere o elemento da arvores
    insert(element) {   //insere o elemento na arvore 
        this.root = this.insertNode(this.root, element) //inicia a partir da raiz 
    }

    insertNode(rootNode, element) {
        if (rootNode == null)                                            // verifica se o node da raiz é nulo 
            return new Node(element)                                    //se nulo raiz recebe novo valor
        if (element > rootNode.content)                                //Verifica se o novo elemento é maior do que o node raiz 
            rootNode.right = this.insertNode(rootNode.right, element) // se maior adiciona a direita da raiz
        else
            rootNode.left = this.insertNode(rootNode.left, element) // se menor adiciona a esquerda da raiz 
        return rootNode
    }

    //executa a função callback para cada nó, em ordem
    inOrderTraverse(callback) {
        this.inOrderVisitor(this.root, callback)
    }

    inOrderVisitor(node, callback) {    
        if (node == null)                             //verifica se o node é nulo
            return                                   //Conclui a função 
        this.inOrderVisitor(node.left, callback)    //recebe o valor da esquerda da raiz 
        callback(node.content)                     //recebe o valor da raiz 
        this.inOrderVisitor(node.right, callback) //recebe o valor da direita da raiz 
    }

    //executa a função callback para cada nó, em pré-ordem
    preOrderTraverse(callback) {
        this.preOrderVisitor(this.root, callback)
    }

    preOrderVisitor(node, callback) {
        if (node == null)                              //analisa se o node é null
            return                                    //Conclui a função 
        callback(node.content)                       //recebe o valor da raiz 
        this.preOrderVisitor(node.left, callback)   // recebe valores da esquerda da raiz
        this.preOrderVisitor(node.right, callback) // recebe valores da direita da raiz
    }

    //executa a função callback para cada nó, em pós-ordem
    postOrderTraverse(callback) {
        this.postOrderVisitor(this.root, callback)
    }

    postOrderVisitor(node, callback) {
        if (node == null)                               //analisa se o node é null
            return                                     //Conclui o função 
        this.postOrderVisitor(node.left, callback)    // recebe valores da esquerda da raiz
        this.postOrderVisitor(node.right, callback)  // recebe valores da direita da raiz
        callback(node.content)                      //recebe valores da raiz 
    }

    //retorna true se o valor já existe na arvore 
    //     Busca na árvore binária
    //    1. É nulo? o elemento não existe
    //    2. É igual ao conteúdo? achou
    //    3. É maior que o conteúdo?
    //       3.1 busca de direita
    //       3.2 busca na esquerda

    search(value) {                                      //pesquisa o elemento na arvore
        return this.searchVisitor(this.root, value)     //começo apartir da raiz
    }

    searchVisitor(node, element) {
        if (node == null)                                          //analisa se o node é null
            return false                                          // se for nulo retorna false
        if (node.content == element)                             //analisa se o node é igual ao elemento buscado
            return true;                                        // se for igual retorna true
        if (element > node.content)                         
            return this.searchVisitor(node.right, element)    //o elemento procurando for maior que o node, procura elemento a direita
        else
            return this.searchVisitor(node.left, element)   // o elemento procurando for menor que o node, procura elemento a esquerda
    }

    //remove um elemento existente na arvore o retorna
    remove(value) {                                       //remove elemento na arvore
        this.root = this.removeVisitor(this.root, value)
    }

    removeVisitor(node, value) {
        if (node.content == value) {                      // analisa se o valor do node é igual ao valor procurado
            if (node.left == node.right) {               // analisa se a raiz tem filhos
                //nao tem filhos - Grau 0
                return null                            // retorna null
            } else if (node.right == null) {          // analisa se a raiz tem filhos a direita
                //não tem filhos na direita, e tem nó na esqueda - Grau 1
                return node.left                    //volta o valor a esquerda
            } else if (node.left == null) {        // analisa se a raiz tem filhos a esquerda
                //não tem filhos da esquerda, e tem nó da direita - Grau 1
                return node.right                       // volta o valor a direita
            } else {                                   // se a raiz tiver os dois ramos
                // tem os dois ramos - Grau 2
                const newRoot = node.right           // newroot receberar o valor do node da direita
                let current = node.right;
                while (current.left != null)       //durante curent for diferente de null
                    current = current.left        // current recebe no da esquerda
                current.left = node.left
                return newRoot;                 // voltara newroot
            }
        } else if (value < node.content) {                          // se o valor for menor do que o no atual
            node.left = this.removeVisitor(node.left, value)       // percorre valores do node da esquerda
        } else {
            node.right = this.removeVisitor(node.right, value)   // percorre valores do node da direita
        }
        return node;
    }

    //exibe a altura da arvore
    height() {                                //exibir a altura da arvore
        return this.heightVisitor(this.root)
    }

    heightVisitor(node) {
        if (!node)                                              //analisa se existe algum node na arvore 
            return -1                                          // devolve-1
        let leftHeight = this.heightVisitor(node.left),       // a variável recebe o tamanho da altura da esquerda
            rightHeight = this.heightVisitor(node.right)     // a variável recebe o tamanho da altura da direita
        return Math.max(leftHeight, rightHeight) + 1        // devolve o maior entre os valores da esquerda e da direita mais 1
    }

    // informa quantos nós existem na arvore
    size() {                                   //exibi o tamanho da arvore
        return this.sizeVisitor(this.root)
    }

    sizeVisitor(node) {
        if (!node)                                                                        // analisa se existe algum nó na arvore
            return 0                                                                     // devolve-0
        return this.sizeVisitor(node.left) + this.sizeVisitor(node.right) + 1           // devolve o total de itens da esquerda somados com os items da direita mais 1
    }
}
