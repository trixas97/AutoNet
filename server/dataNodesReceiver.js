const {getAllNodes, updateNodeData} = require('./database/node');
const {getNodeInfo} = require('./routes/api/nodes_save');

const updateNodesData = async () => {
    let nodes = await getAllNodes()
    nodes = nodes.map(node => {
        return {...node, ip: node.ip.includes('/') ? node.ip.slice(0, -(node.ip.length - node.ip.indexOf('/'))) : node.ip }
    })
    nodes.forEach(node => saveUpdatedNodesData(node))
}

const saveUpdatedNodesData = async (node) => {
    let updatedNode = await getNodeInfo(node)
    updatedNode._id = node._id
    updateNodeData(updatedNode)

}

module.exports.updateNodesData = updateNodesData