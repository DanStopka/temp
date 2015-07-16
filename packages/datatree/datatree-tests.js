"use strict";
Tinytest.add('create subgraph', function (test) {

  Meteor.call('remove');
  var root = DataTree.getRoot();
  var childrenCount = root.childrenCount();
  var child1 = root.createChild({child1:'child1'});
  test.equal(root.childrenCount(), childrenCount + 1);
  var child2 = root.createChild({child2:'child2'});
  test.equal(root.childrenCount(), childrenCount + 2);

  var child3 = child1.createChild({child3:'child3'});
  test.equal(child1.childrenCount(), 1);

  child2.addParents(child1);
  test.equal(child1.childrenCount(), 2);

  child1.deleteNode();
  child2.deleteNode();
  console.log(child3);



});

Meteor.methods({remove:function(){
  Tree.remove({});
}});