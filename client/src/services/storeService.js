import store from '@/store';

export const updateTraffic = (data) => {
    let nodes = store.getters['UserData/getNodes'].data;
    data.forEach(traffic => {
        nodes.forEach(node => {
            node.interfaces.forEach(inter => {
                if(inter.ip_address.value.includes(traffic.host)){
                    inter.traffic.value.push(traffic)
                    store.dispatch('UserData/setNode', node)                      
                }
            })
        })

    });
}