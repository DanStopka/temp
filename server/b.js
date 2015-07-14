function Root(data){
    var havingRoot = Tree.findOne({parent:null});
    if (havingRoot === undefined){
        var creationRootData = {parent:null};
        _.extend(creationRootData, data);
        Tree.insert(creationRootData);
        this.data = Tree.findOne({parent:null});
    } else {
        this.data = Tree.findOne({parent:null});
    }

    this.createChild = function(data){
        return new Node(undefined, this.data._id, data);
    };
}

/*
 Node(id, parent, data)
  если заданы все параметры - возвращает ноду по ним (ничего не ищет и не создает)
  если задан только id - ищет по _id
  если id не задан - создает его и возвращает

 createChild(data)
  создает дочерний узел

 getParents()
  возвращает все родительские узлы массивом



* */

function Node(id, parent, data){
    if (id === undefined) {
            var creationNodeData = {parent: _.flatten(parent)};
            _.extend(creationNodeData, data);
            var _id = Tree.insert(creationNodeData);
            this.data = Tree.findOne({_id: _id});
    }

    if (id !== undefined && parent === undefined && data === undefined)  {
        this.data = Tree.findOne({_id: id});
    }

    if (id !== undefined && parent !== undefined && data !== undefined)  {
        this.data = {_id:id, parent: parent, data: data};
    }


    this.createChild = function(data){
        return new Node(undefined, this.data._id, data);
    };

    this.getParents = function() {
        var r = [];
        if (this.data.parent instanceof Array) {
            var arr = Tree.find({
                _id: { $in: this.data.parent}}).fetch();
            for (var i = 0; i < arr.length; i++){
                r.push(
                    new Node(arr[i]._id, arr[i].parent, _.omit(arr[i], '_id', 'parent'))
                );
            }
            return r;
        }
    };

    this.addParents = function(){
        if (this.data.parent != null && arguments.length > 0){
            var l = arguments.length;
            for (var i = 0; i < l; i++)
                this.data.parent.push(arguments[i].data._id);
        }

    }



}





Tree.remove({});

var root = new Root({a:1, b:'2'});

//console.log('root - ',  root);

var parent1 = root.createChild({asd:'11111111'});
//console.log('parent1 - ', parent1);

var parent2 = root.createChild({asd:'22222222'});
//console.log('parent2 - ', parent2);



var node = new Node(undefined,[parent1.data._id, parent2.data._id]);

node.addParents(parent1, node);
node.addParents(node);


//var arr = node.getParents();


//parent1.addParents(parent1);
console.log(node);




//console.log(arr[0]);


//console.log(node);






















