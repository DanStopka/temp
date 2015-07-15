"use strict";
function Node(id, parent, data){
    //root constructor
    if (parent == null){
        var tmp = Tree.findOne({parent:null}); //search root in db
        if (tmp === undefined){ //root not exist in db, creation
            this._id = Tree.insert({parent: null, data: data});
            this.parent = null;
            this.data = data;
        } else { //root exists in db returning them
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

    getCildren: function(){
        //todo getChildren
    },

    deleteChildRelation: function(){
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

console.log(dataTree.createRoot({meta: [], tags: []}));



//console.log(dataTree.getRoot());


//var y = new Node(undefined, null, {a:1, b:3});
//var z = new Node(undefined, [1,2], {dfg:56});
//var q = x.createChild({child:786878});
//q.addParents([[q], q], z);
//
//console.log(q.getParents());




