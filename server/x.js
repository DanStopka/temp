randWDclassic = function(n){
    var s ='', abd ='abcdefghijklmnopqrstuvwxyz0123456789', aL = abd.length;
    while(s.length < n)
        s += abd[Math.random() * aL|0];
    return s;
};

genRandomMeta = function(){
    var meta = {};
    var count = Math.round((Math.random() * 10 + 10)); //количество параметров

    for (var i = 0; i < count; i++){
        meta[randWDclassic(10)] = randWDclassic(10);
    }
    return meta;
};

genRandomTags = function(){
    var tags = [];
    var count = Math.round((Math.random() * 10 + 10)); //количество тегов

    for (var i = 0; i < count; i++){
        tags[i] = randWDclassic(10);
    }
    return tags;
};

createNode = function(_parent, _tags, _meta){
    var id = new Meteor.Collection.ObjectID();
    var o = {_id: id, parent: _parent, tags : _tags, meta : _meta};
    Node.insert(o);
    return id;
};

f = function(_parent, level, limit){
    if (level < limit){
        for (var i = 0; i < 10; i ++){
            currentNode = createNode(_parent, genRandomTags(), genRandomMeta());
            console.log(level);
            f(currentNode, level + 1, limit );
        }
    }
};


Node.remove({});


if (Node.find().count() === 0) {

    for (var i = 0; i < 1; i++) {
        f(null, 0, 3);
    }

}