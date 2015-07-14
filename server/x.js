//
//randWDclassic = function(n){
//    var s ='', abd ='abcdefghijklmnopqrstuvwxyz0123456789', aL = abd.length;
//    while(s.length < n)
//        s += abd[Math.random() * aL|0];
//    return s;
//};
//
//
//function randomNumber (from, to) {
//    return Math.round((Math.random() * (to - from) + from));
//}
//var genRandomMeta = function(from, to){
//    var meta = [];
//    var count = randomNumber(from, to); //количество параметров
//
//    for (var i = 0; i < count; i++){
//        var m = {
//            _type: typeList[randomNumber(0, typeList.length)]
//        };
//        var fieldCount = randomNumber(10, 20);
//        for (var j = 0; j < fieldCount; j++) {
//            m[randWDclassic(10)] = randWDclassic(20);
//        }
//        meta[i] = m;
//    }
//    return meta;
//};
//
//
//var genRandomTags = function(from, to){
//    var tags = [];
//    var count = randomNumber(from, to); //количество тегов
//
//    for (var i = 0; i < count; i++){
//        tags[i] = tagList[randomNumber(0, tagList.length)];
//    }
//    return tags;
//};
//
//var genRandomTagsList = function(from, to){
//    var tags = [];
//    var count = randomNumber(from, to); //количество тегов
//
//    for (var i = 0; i < count; i++){
//        tags[i] = randWDclassic(10);
//    }
//    return tags;
//};
//
//
//var typeList = genRandomTagsList(100, 200);
//var tagList = genRandomTagsList(500, 1000);
//
//var count = 0;
//
//
//createNode = function(_parent, _tags, _meta){
//    var o = {parent: _parent, tags : _tags, meta : _meta};
//    count++;
//    if (count % 1000 == 0)
//        console.log(count);
//
//    return Node.insert(o);
//};
//
//f = function(_parent, level, limit){
//    if (level < limit){
//        for (var i = 0; i < 10; i ++){
//            var currentNode = createNode(_parent, genRandomTags(5, 10), genRandomMeta(5, 10));
//            //console.log(level);
//            f(currentNode, level + 1, limit );
//        }
//    }
//};
//
//
//Node.remove({});
//
//
//if (Node.find().count() === 0) {
//    for (var i = 0; i < 1; i++) {
//        f(null, 0, 3);
//    }
//}
//console.log(Node.find().count());