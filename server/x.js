
//Tree.remove({});
//DataTree.createRoot({});
//console.log(123);
//



//DataTree.clear();
//DataTree.createRoot({root:true});
//var root = DataTree.getRoot();
//var childrenCount = root.childrenCount();
//var child1 = root.createChild({child1:'child1'});
////
//var child2 = root.createChild({child2:'child2'});
////
////
//var child3 = child1.createChild({child3:'child3'});
////
////
//child2.addParents(child1);

DataTree.clear();
var x = DataTree.createRoot({root:true});
var child1 = x.createChild({child1:'child1'});
var child11 = child1.createChild({child11:'child11'});
var child12 = child1.createChild({child12:'child12'});
var child13 = child1.createChild({child13:'child13'});

var child121 = child12.createChild({child121:'child121'});

child121.addParents(x);
child13.addParents(x);

var arr = x.getChildren();
//console.log(arr);

//child1.deleteNode();

//console.log('12346', _.without(['1'], '1', '2'));
