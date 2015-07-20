Meteor.methods({
    clear:function(){
        Tree.remove({});
    },

    update:function(){


    }





});

function Node(id, parent, data){
    //root constructor
    if (parent == null){
        var tmp = Tree.findOne({parent:null}); //search root in db
        if (tmp === undefined){ //root not exist in db, creation
            this._id = Tree.insert({parent: null, data: data, chCount: 0, pCount: 0});
            this.parent = null;
            this.data = data;
            this.chCount = 0;
        } else { //root exists in db - returning them
            this._id = tmp._id;
            this.parent = tmp.parent;
            this.data = tmp.data;
            this.chCount = tmp.chCount;
        }
    }
    //node constructor
    else { //parent parameter
        if (id === undefined){ //creation node
            var _parent = _.flatten([parent]);
            var genId = Tree.insert({parent: _parent, data: data});
            this._id = genId;
            this.parent = _parent;
            this.data = data;
            this.chCount = 0;
        } else {
            var tmp = Tree.findOne({_id: id});
            this._id = tmp._id;
            this.parent = tmp.parent;
            this.data = tmp.data;
            this.chCount = tmp.chCount;
        }
    }


}
_.extend(Node.prototype, {

    isRoot: function(){
        return this.parent == null;
    },

    createChild: function(data){
        this.chCount++;
        Tree.update({_id: this._id}, {$set:{chCount:this.chCount}});
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

    parentCount: function(){
        return this.parent.length;
    },

    haveChildren:function(){
        //return Tree.find({parent: {$in:[this._id]}}).count() > 0;
        return this.chCount > 0;
    },

    childrenCount: function(){
        //return Tree.find({parent: {$in:[this._id]}}).count();
        return this.chCount
    },

    getChildren: function(){
        var r = [];
        var tmp = Tree.find({parent: {$in:[this._id]}}).fetch();
        for (var i = 0; i < tmp.length; i++){
            r.push(new Node(tmp[i]._id, tmp[i].parent, tmp[i].data));
        }
        return r;
    },

    deleteNode: function(callback){ //delete children nodes recursive (if parents = [])
        if (this.parent == null) return -1;
        var id = this._id;
        //decrement chCount all of his parents
        for (var j = 0; j < this.parentCount(); j++){
            //var tmp = Tree.findOne({_id: this.parent[j]});
            Tree.update({_id: this.parent[j]}, {$inc: {chCount:-1}});
            //console.log(tmp);
        }

        var children = this.getChildren();
        for (var i = 0; i < children.length; i++){
            children[i].parent = _.without(children[i].parent, id);
            if (children[i].parent.length == 0){
                children[i].deleteNode();
            } else {
                Tree.update({_id:children[i]._id}, {$set:{parent: children[i].parent}});
            }
        }
        Tree.remove({_id: id}, callback);
        return 0;
    },

    isChildFor: function(node){
        return _.include(this.parent, node._id);
    },

    isParentFor: function(node){
        return _.include(node.parent, this._id);
    },

    deleteChildNodes: function(){
        var args = _.flatten(arguments);
        for (var i = 0; i < args.length; i++){
            if (this.isParentFor(args[i])){
                args[i].deleteNode();
            }
        }
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


DataTree = {

    createRoot: function(data){
        return new Node(undefined, null, data);
    },

    getRoot: function(){
        return new Node(undefined, null);
    },

    clear: function(){
        Meteor.call('clear');
    },

    nodesCount: function(){
        return Tree.find({}).count();
    }




};

