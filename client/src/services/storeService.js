import store from '@/store';

export const updateTraffic = (data) => {
    data.map(async traffic => {
        let node = await findNodeByIp(traffic.host);
        node.interfaces.map(inter => {
            if(inter.interface.value == traffic.interface){
                inter.traffic.value.push(traffic)
                store.dispatch('UserData/setNode', node)                      
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