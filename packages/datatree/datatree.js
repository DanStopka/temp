function without(arr, arr1){
    var r = arr;
    for (var i = 0; i < arr1.length; i++){
        r = _.without(r, arr1[i])
    }
    return r;
}


Meteor.methods({
    clear:function(){
        Tree.remove({});
    },

    getChildren: function(_id){
        var r = [];
        var tmp = Tree.find({parent: {$in:[_id]}}).fetch();
        for (var i = 0; i < tmp.length; i++){
            r.push(new Node(tmp[i]._id, tmp[i].parent, tmp[i].data));
        }
        return r;
    },

    deleteNode: function(id){
        var arr = [id];
        function x() {
            var bLength = arr.length;
            var found = Tree.find({parent: {$in: arr}}).fetch();
            for (var i = 0; i < found.length; i++){
                if (without(found[i].parent, arr).length == 0){
                    arr = _.union(arr, found[i]._id);
                }
            }

            if (arr.length != bLength) {
                x();
            }
        }

        x();

        Tree.remove ({_id:{$in:arr}});
        Tree.update({parent: {$in: arr}}, {$pullAll: {parent: arr}}, {multi: true});

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
        return Tree.find({parent: {$in:[this._id]}}).count() > 0;
    },

    childrenCount: function(){
        return Tree.find({parent: {$in:[this._id]}}).count();
    },

    getChildren: function(){
        return Meteor.call('getChildren', this._id);
    },

    deleteNode: function(){
        Meteor.call('deleteNode', this._id);
        //callback();
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

    deleteParentRelation: function(){
        //todo deleteParentRelation*
    },

    dropParentNode: function(){
        //todo physical drop parent node*
    },

    addTags: function(){
        Tree.update({_id:this._id}, {$addToSet:{tags:[arguments]}});
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

