from netmiko import ConnectHandler
import json
import sys
import re

keysNames = {"name": "name", "value": "value", "edit":"editable", "visible": "visible"}

def  modifyInterface(interface, key):
    if key == "interface_short":
        m = re.search(r"\d", interface["interface"][keysNames["value"]])
        return {keysNames["name"]: "Name Short", keysNames["value"]: interface["interface"][keysNames["value"]][0] + interface["interface"][keysNames["value"]][m.start():], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "interface":
        return {keysNames["name"]: "Name", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "link_status":
        return {keysNames["name"]: "Link Status", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "protocol_status":
        return {keysNames["name"]: "Protocol Status", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "hardware_type":
        return {keysNames["name"]: "Hardware Type", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "address":
        return {keysNames["name"]: "Mac Address", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "bia":
        return {keysNames["name"]: "Bia", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "description":
        return {keysNames["name"]: "Description", keysNames["value"]: interface[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "ip_address":
        return {keysNames["name"]: "Ip Address", keysNames["value"]: interface[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "mtu":
        return {keysNames["name"]: "Mtu", keysNames["value"]: interface[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "duplex":
        return {keysNames["name"]: "Duplex", keysNames["value"]: interface[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "speed":
        return {keysNames["name"]: "Speed", keysNames["value"]: interface[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "media_type":
        return {keysNames["name"]: "Media Type", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "bandwidth":
        return {keysNames["name"]: "Bandwidth", keysNames["value"]: interface[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "delay":
        return {keysNames["name"]: "Delay", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "encapsulation":
        return {keysNames["name"]: "Encapsulation", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "last_input":
        return {keysNames["name"]: "Last Input", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "last_output":
        return {keysNames["name"]: "Last Output", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "last_output_hang":
        return {keysNames["name"]: "Last Output Hang", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "queue_strategy":
        return {keysNames["name"]: "Queue Strategy", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "input_rate":
        return {keysNames["name"]: "Input Rate", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "output_rate":
        return {keysNames["name"]: "Output Rate", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "input_packets":
        return {keysNames["name"]: "Input Packets", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "output_packets":
        return {keysNames["name"]: "Output Packets", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "input_errors":
        return {keysNames["name"]: "Input Errors", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "crc":
        return {keysNames["name"]: "Crc", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "abort":
        return {keysNames["name"]: "Abort", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "output_errors":
        return {keysNames["name"]: "Output Errors", keysNames["value"]: interface[key], keysNames["edit"]: False, keysNames["visible"]: True}

def modifyRouteTable(route, key):
    if key == "protocol":
        return {keysNames["name"]: "Protocol", keysNames["value"]: route[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "type":
        return {keysNames["name"]: "Type", keysNames["value"]: route[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "network":
        return {keysNames["name"]: "Network", keysNames["value"]: route[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "mask":
        return {keysNames["name"]: "Mask", keysNames["value"]: route[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "distance":
        return {keysNames["name"]: "Distance", keysNames["value"]: route[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "metric":
        return {keysNames["name"]: "Metric", keysNames["value"]: route[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "nexthop_ip":
        return {keysNames["name"]: "Nexthop-IP", keysNames["value"]: route[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "nexthop_if":
        return {keysNames["name"]: "Nexthop-IF", keysNames["value"]: route[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "uptime":
        return {keysNames["name"]: "Uptime", keysNames["value"]: route[key], keysNames["edit"]: False, keysNames["visible"]: True}

def modifyArpTable(entry, key):
    if key == "protocol":
        return {keysNames["name"]: "Protocol", keysNames["value"]: entry[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "address":
        return {keysNames["name"]: "IP Address", keysNames["value"]: entry[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "age":
        return {keysNames["name"]: "Age", keysNames["value"]: entry[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "mac":
        return {keysNames["name"]: "MAC Address", keysNames["value"]: entry[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "type":
        return {keysNames["name"]: "Type", keysNames["value"]: entry[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "interface":
        return {keysNames["name"]: "Interface", keysNames["value"]: entry[key], keysNames["edit"]: False, keysNames["visible"]: True}


def modifyACL(acl, key):
    if key == "name":
        return {keysNames["name"]: "Name", keysNames["value"]: acl[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "sn":
        return {keysNames["name"]: "SN", keysNames["value"]: acl[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "action":
        return {keysNames["name"]: "Action", keysNames["value"]: acl[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "protocol":
        return {keysNames["name"]: "Protocol", keysNames["value"]: acl[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "source":
        return {keysNames["name"]: "Source", keysNames["value"]: acl[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "port":
        return {keysNames["name"]: "Port", keysNames["value"]: acl[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "range":
        return {keysNames["name"]: "Range", keysNames["value"]: acl[key], keysNames["edit"]: False, keysNames["visible"]: True}
    elif key == "destination":
        return {keysNames["name"]: "Destination", keysNames["value"]: acl[key], keysNames["edit"]: True, keysNames["visible"]: True}
    elif key == "modifier":
        return {keysNames["name"]: "Modifier", keysNames["value"]: acl[key], keysNames["edit"]: False, keysNames["visible"]: True}


try:
    cisco_881 = {
        'device_type': 'cisco_ios',
        'host':   sys.argv[1],
        'username': sys.argv[2],
        'password': sys.argv[3]
    }
    net_connect = ConnectHandler(**cisco_881) 

    runConf = net_connect.send_command('show running-config', use_textfsm=True)
    startConf = net_connect.send_command('show startup-config', use_textfsm=True)
    interfaces = net_connect.send_command('show interfaces', use_textfsm=True)
    version = net_connect.send_command('show version', use_textfsm=True)
    typeNode = net_connect.send_command('show version', use_textfsm=False)
    routeTable = net_connect.send_command('show ip route', use_textfsm=True)
    arpTable = net_connect.send_command('show ip arp', use_textfsm=True)
    acl = net_connect.send_command('show access-list', use_textfsm=True)
    cdp = net_connect.send_command('show cdp neighbors detail', use_textfsm=True)

    # Modify Interfaces
    for interface in interfaces:
        interface["interface_short"] = {}
        for key in  interface:
            interface[key] = modifyInterface(interface, key)
        if(sys.argv[1] not in interface['ip_address']['value']): 
            interface['mainIf'] = { keysNames["name"]: "Main Interface", keysNames["value"]: False, keysNames["edit"]: False, keysNames["visible"]: False }
        else:
            interface['mainIf'] = { keysNames["name"]: "Main Interface", keysNames["value"]: True, keysNames["edit"]: False, keysNames["visible"]: False }
    
    # Modify Route Table
    for route in routeTable:
        for key in route:
            route[key] = modifyRouteTable(route, key)
    
    # Modify ARP Table
    for entry in arpTable:
        for key in entry:
            entry[key] = modifyArpTable(entry, key)

    # Modify ACL
    for aclItem in acl:
        for key in aclItem:
            aclItem[key] = modifyACL(aclItem, key)
            

    node = {
        "name": {keysNames["name"]: "Name", keysNames["value"]:version[0]['hostname'], keysNames["edit"]: True},
        "model": {keysNames["name"]: "Model", keysNames["value"]:version[0]['hardware'][0], keysNames["edit"]: False},
        "type": {keysNames["name"]: "Type", keysNames["value"]:"Switch" if "Router" not in typeNode else "Router", keysNames["edit"]: False},
        "upTime": {keysNames["name"]: "UpTime", keysNames["value"]:version[0]['uptime'], keysNames["edit"]: False},
        "runConf": runConf,
        "startConf": startConf,
        "interfaces": interfaces,
        "route_table": routeTable,
        "arp_table": arpTable,
        "acl": acl,
        "cdp": cdp,
        "serial": version[0]['serial'][0]
    }
except NameError:
    print(NameError)
    node = None


net_connect.disconnect()


print(json.dumps(node))
sys.stdout.flush()
