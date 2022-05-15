import store from '@/store';

export const updateTraffic = async (data) => {
    let node = await findNodeByIp(data[0].host);
    data.map(traffic => {
        node.interfaces.map(inter => {
            if(inter.interface.value == traffic.interface){
                inter.traffic.value.push(traffic)
                store.dispatch('UserData/setNode', {data: node, changedFromUser: false})                      
            }
        })
    })
}

const findNodeByIp = (ip) => {
    return new Promise(resolve => {
        let nodes = store.getters['UserData/getNodes'].data;
        for(let i=0; i < nodes.length; i++){
            nodes[i].interfaces.map(inter => {
                if(inter.ip_address.value.includes(ip+'/'))
                    resolve(nodes[i])
            })
        }
    })
}