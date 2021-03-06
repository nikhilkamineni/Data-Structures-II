/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable */
// Do not modify this GraphNode class
// Use any of its methods as you see fit to implement your graph
class GraphNode {
  constructor({ value, edges }) {
    this._value = value;
    this._edges = edges;
  }

  get value() {
    return this._value;
  }

  get edges() {
    return this._edges;
  }

  get numberOfEdges() {
    return this._edges.length;
  }

  set edges(x) {
    this._edges = x;
  }

  pushToEdges(y) {
    this._edges.push(y);
  }
}

class Graph {
  constructor() {
    this.vertices = [];
  }
  // Wraps the input value in a new GraphNode and adds it to the array of vertices
  // If there are only two nodes in the graph, they need to be automatically 
  // connected via an edge
  // Optionally accepts an array of other GraphNodes for the new vertex to be connected to
  // Returns the newly-added vertex
  addVertex(value, edges = []) {
    const newNode = new GraphNode({
      value,
      edges,
    });
    // ensure that the edges that this node is connected to all connect to the new node we're adding
    if (edges.length > 0) {
      edges.forEach((edge) => {
        this.addEdge(newNode, edge);
      });
    }
    this.vertices.push(newNode);
    // we need to check if there are exactly two nodes in the graph and the do not have a connection bewtween them
    if (this.vertices.length === 2) {
      this.addEdge(this.vertices[0], this.vertices[1]);
    }
    return newNode;
  }
  // Checks all the vertices of the graph for the target value
  // Returns true or false
  contains(value) {
    let hasValue = false;
    this.vertices.forEach((vertex) => {
      if (vertex.value === value)
      hasValue = true;
      return;
    })
    return hasValue;
  }
  // Checks the graph to see if a GraphNode with the specified value exists in the graph 
  // and removes the vertex if it is found
  // This function should also handle the removing of all edge references for the removed vertex
  removeVertex(value) {
    // check if graph node that contains value exists
    let exists;
    let toRemove;
    this.vertices.forEach((vertex) => {
      if (vertex.value === value) {
        exists = true;
        toRemove = vertex;
      }
    })
    // if true, iterate over all the nodes and their individual edges array and remove the node
    if (exists === true) {
      this.vertices.forEach((vertex) => {
        vertex.edges = vertex.edges.filter((edge) => {
          return !toRemove;
        })
      })
      this.vertices = this.vertices.filter((vertex) => {
        return !toRemove;
      })
    }
  } 
  // Checks the two input vertices to see if each one references the other in their respective edges array
  // Both vertices must reference each other for the edge to be considered valid
  // If only one vertex references the other but not vice versa, should not return true
  // Note: You'll need to store references to each vertex's array of edges so that you can use 
  // array methods on said arrays. There is no method to traverse the edge arrays built into the GraphNode class
  checkIfEdgeExists(fromVertex, toVertex) {
    let fromEdges = [];
    let toEdges = [];
    this.vertices.forEach((vertex) => {
      if (fromVertex === vertex) fromEdges = vertex.edges;
      if (toVertex === vertex) toEdges = vertex.edges;
    })
    if (fromEdges.includes(toVertex) && toEdges.includes(fromVertex)) return true;
    return false;
  }
  // Adds an edge between the two given vertices if no edge already exists between them
  // Again, an edge means both vertices reference the other 
  addEdge(fromVertex, toVertex) {
    if (!this.checkIfEdgeExists(fromVertex, toVertex)) {
      fromVertex.pushToEdges(toVertex);
      toVertex.pushToEdges(fromVertex);
    }
  }
  // Removes the edge between the two given vertices if an edge already exists between them
  // After removing the edge, neither vertex should be referencing the other
  // If a vertex would be left without any edges as a result of calling this function, those
  // vertices should be removed as well
  removeEdge(fromVertex, toVertex) {
    if (this.checkIfEdgeExists(fromVertex, toVertex)) {
      fromVertex.edges = fromVertex.edges.filter((edge) => {return !toVertex});
      toVertex.edge = toVertex.edges.filter((edge) => {return !fromVertex});
      if (fromVertex.numberOfEdges === 0) {
        this.vertices = this.vertices.filter((vertex) => {return !fromVertex});
      }
      if (toVertex.numberOfEdges === 0) {
        this.vertices = this.vertices.filter((vertex) => {return !toVertex});
      }
    }
  }
}

module.exports = Graph;

