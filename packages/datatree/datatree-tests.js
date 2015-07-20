"use strict";
Tinytest.add('create subgraph', function (test) {

  DataTree.clear();
  var root = DataTree.getRoot();
  var childrenCount = root.childrenCount();

  console.log('root children before test', childrenCount);
  var child1 = root.createChild({child1:'child1'});
  test.equal(root.childrenCount(), childrenCount + 1);
  console.log('root children after 1 child added', root.childrenCount());

  var child2 = root.createChild({child2:'child2'});
  test.equal(root.childrenCount(), childrenCount + 2);
  console.log('root children after 2 child added', root.childrenCount());

  var child3 = root.createChild({child3:'child3'});
  test.equal(root.childrenCount(), childrenCount + 3);
  console.log('root children after 3 child added', root.childrenCount());

  //child3.deleteNode(function() {
  //      test.equal(root.childrenCount(), childrenCount + 2);
  //      console.log('root children after 1 child deleted', root.childrenCount());
  //    }
  //);

  child3.deleteNode();
  test.equal(root.childrenCount(), childrenCount + 2);
  console.log('root children after 1 child deleted', root.childrenCount());

  //
  //var child3 = child1.createChild({child3:'child3'});
  //test.equal(child1.childrenCount(), 1);
  //
  //child2.addParents(child1);
  //test.equal(child1.childrenCount(), 2);
  //
  //child1.deleteNode();
  //child2.deleteNode();
  //console.log(child3);



});

