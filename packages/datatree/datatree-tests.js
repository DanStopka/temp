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

  child3.deleteNode();
  test.equal(root.childrenCount(), childrenCount + 2);
  console.log('root children after 1 child deleted', root.childrenCount());

});

Tinytest.add('tags tests (clear tags, getTags, deleteTags, addTags)', function (test) {
  DataTree.clear();
  DataTree.createRoot({});

  var root = DataTree.getRoot();
  root.clearTags();
  root.addTags('123', '234', '123');
  test.equal(root.getTags(), ['123', '234']);

  root.deleteTags('123');
  test.equal(root.getTags(), ['234']);
  root.addTags('123', '234', '123', ['567', '890']);
  test.equal(root.getTags(), ['234', '123', '567', '890']);
  root.deleteTags(['123'], '567');
  test.equal(root.getTags(), ['234', '890']);

});