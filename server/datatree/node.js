"use strict";
function Node(id, parent, data){
    //root constructor
    if (parent == null){
        var tmp = Tree.findOne({parent:null}); //search root in db
        if (tmp === undefined){ //root not exist in db, creation
            this._id = Tree.insert({parent: null, data: data});
            this.parent = null;
            this.data = data;
        } else { //root exists in db - returning them
            this._id = tmp._id;
            this.parent = tmp.parent;
            this.data = tmp.data;
        }
    }
    //node constructor
    else { //parent parameter
        if (id === undefined){ //creation node
            var genId = Tree.insert({parent:_.flatten([parent]), data: data});
            this._id = genId;
            this.parent = _.flatten([parent]);
            this.data = data;
        } else {
            var tmp = Tree.findOne({_id: id});
            this._id = tmp._id;
            this.parent = tmp.parent;
            this.data = tmp.data;
        }
    }




}
_.extend(Node.prototype, {
    isRoot: function(){
        return this.parent == null ? true : false;
    },

    createChild: function(data){
        return new Node(undefined, this._id, data);
    },

    addParents: function(){ //parameters Nodes in array or per ","
        var args = _.flatten(arguments);
        for (var i = 0; i < args.length; i++){
            this.parent = _.union(this.parent, args[i]._id);
        }
        Tree.update({_id: this._id}, {$set:{parent: this.parent}});
    },

    getParents: function(){
        if (this.isRoot()) return [];
        var tmp = Tree.find({
            _id: { $in: this.parent }
        }).fetch();

        var r = [];
        for (var i = 0; i < tmp.length; i++){
            r.push(new Node(tmp[i]._id, 1));
        }
        return r;
    },

    haveChildren:function(){
        return Tree.find({parent: {$in:[this._id]}}).count() > 0;
    },

    childrenCount: function(){
        return Tree.find({parent: {$in:[this._id]}}).count();
    },

    getChildren: function(){
        var r = [];
        var tmp = Tree.find({parent: {$in:[this._id]}}).fetch();
        for (var i = 0; i < tmp.length; i++){
            r.push(new Node(tmp[i]._id, tmp[i].parent, tmp[i].data));
        }
        return r;
    },

    deleteNode: function(){ //delete children nodes recursive (if parents = [])
        if (this.parent == null) return -1;
        var id = this._id;
        var children = this.getChildren();
        for (var i = 0; i < children.length; i++){
            children[i].parent = _.without(children[i].parent, id);
            if (children[i].parent.length == 0){
                children[i].deleteNode();
            }
        }
        Tree.remove({_id: id});
        return 0;
    },

    isChildFor: function(node){
        return _.include(this.parent, node._id);
    },

    isParentFor: function(node){
        return _.include(node.parent, this._id);
    },


    // delete all child relations(in params) from node, if node left
    deleteChildRelation: function(){
        var args = _.flatten(arguments);
        for (var i = 0; i < args.length; i++){
            //удаляю id объекта из парентов параметра
            //если парент остается [], то нужно удалить этот узел и ссылки в парентах на него
            //todo, nothing ready
        }

        console.log(args);



        //todo deleteChildRelation*
    },

    dropChildNode: function(){
        //todo physical drop child node*
    },

    deleteParentRelation: function(){
        //todo deleteParentRelation*
    },

    dropParentNode: function(){
        //todo physical drop parent node*
    },

    addTags: function(){
        //todo addTags
    },

    deleteTags: function(){
        //todo deleteTags
    },

    addMetaType: function(){
        //todo addMetaType
    },

    deleteMetaType: function(){
        //todo deleteMetaType
    }








});


function DataTree(){
}

_.extend(DataTree.prototype, {
    createRoot: function(data){
        return new Node(undefined, null, data);
    },
    getRoot: function(){
        return new Node(undefined, null);
    }
});







Tree.remove({});

//var x = new Node(undefined, null, {a:1, b:2});

var dataTree = new DataTree();
var root = dataTree.createRoot({root: []});
var child1 = root.createChild({child1: []});
var child2 = root.createChild({child2: []});


var child3 = child1.createChild({child3:32132});
var child4 = child1.createChild({child4:32132});
var child5 = child4.createChild({child5:32132});
child5.addParents(root);

console.log(child1.deleteNode());







//console.log(dataTree.getRoot());


//var y = new Node(undefined, null, {a:1, b:3});
//var z = new Node(undefined, [1,2], {dfg:56});
//var q = x.createChild({child:786878});
//q.addParents([[q], q], z);
//
//console.log(q.getParents());




