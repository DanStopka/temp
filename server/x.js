randWDclassic = function(n){
    var s ='', abd ='abcdefghijklmnopqrstuvwxyz0123456789', aL = abd.length;
    while(s.length < n)
        s += abd[Math.random() * aL|0];
    return s;
};

Node.remove({});

if (Node.find().count() === 0) {
    var meta = {};
    var count = Math.round((Math.random() * 10 + 10)); //количество параметров







    for (var i = 0; i < count; i++){
        //Node.insert({title: randWDclassic(10)});
        meta[randWDclassic(10)] = randWDclassic(10);

    }

    Node.insert(meta);





    //Node.insert({
    //    title: 'Introducing Telescope',
    //    url: 'http://sachagreif.com/introducing-telescope/'
    //});
    //
    //Node.insert({
    //    title: 'Meteor',
    //    url: 'http://meteor.com'
    //});
    //
    //Node.insert({
    //    title: 'The Meteor Book',
    //    url: 'http://themeteorbook.com'
    //});
}