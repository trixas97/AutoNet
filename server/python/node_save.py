from typing import Match
from netmiko import ConnectHandler
import json
import sys
import re

keysNames = {"name": "name", "value": "value", "edit":"editable"}
test = None
def modifyInterface(interface, key):
    if key == "interface_short":
        m = re.search(r"\d", interface["interface"][keysNames["value"]])
        return {keysNames["name"]: "Name Short", keysNames["value"]: interface["interface"][keysNames["value"]][0] + interface["interface"][keysNames["value"]][m.start():], keysNames["edit"]: False}
    elif key == "interface":
        return {keysNames["name"]: "Name", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "link_status":
        return {keysNames["name"]: "Link Status", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "protocol_status":
        return {keysNames["name"]: "Protocol Status", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "hardware_type":
        return {keysNames["name"]: "Hardware Type", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "address":
        return {keysNames["name"]: "Mac Address", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "bia":
        return {keysNames["name"]: "Bia", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "description":
        return {keysNames["name"]: "Description", keysNames["value"]: interface[key], keysNames["edit"]: True}
    elif key == "ip_address":
        return {keysNames["name"]: "Ip Address", keysNames["value"]: interface[key], keysNames["edit"]: True}
    elif key == "mtu":
        return {keysNames["name"]: "Mtu", keysNames["value"]: interface[key], keysNames["edit"]: True}
    elif key == "duplex":
        return {keysNames["name"]: "Duplex", keysNames["value"]: interface[key], keysNames["edit"]: True}
    elif key == "speed":
        return {keysNames["name"]: "Speed", keysNames["value"]: interface[key], keysNames["edit"]: True}
    elif key == "media_type":
        return {keysNames["name"]: "Media Type", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "bandwidth":
        return {keysNames["name"]: "Bandwidth", keysNames["value"]: interface[key], keysNames["edit"]: True}
    elif key == "delay":
        return {keysNames["name"]: "Delay", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "encapsulation":
        return {keysNames["name"]: "Encapsulation", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "last_input":
        return {keysNames["name"]: "Last Input", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "last_output":
        return {keysNames["name"]: "Last Output", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "last_output_hang":
        return {keysNames["name"]: "Last Output Hang", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "queue_strategy":
        return {keysNames["name"]: "Queue Strategy", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "input_rate":
        return {keysNames["name"]: "Input Rate", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "output_rate":
        return {keysNames["name"]: "Output Rate", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "input_packets":
        return {keysNames["name"]: "Input Packets", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "output_packets":
        return {keysNames["name"]: "Output Packets", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "input_errors":
        return {keysNames["name"]: "Input Errors", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "crc":
        return {keysNames["name"]: "Crc", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "abort":
        return {keysNames["name"]: "Abort", keysNames["value"]: interface[key], keysNames["edit"]: False}
    elif key == "output_errors":
        return {keysNames["name"]: "Output Errors", keysNames["value"]: interface[key], keysNames["edit"]: False}

try:
    cisco_881 = {
        'device_type': 'cisco_ios',
        'host':   sys.argv[1],
        'username': sys.argv[2],
        'password': sys.argv[3]
    }
    net_connect = ConnectHandler(**cisco_881)   
    
    interfaces = net_connect.send_command('show interfaces', use_textfsm=True)
    version = net_connect.send_command('show version', use_textfsm=True)
    typeNode = net_connect.send_command('show version', use_textfsm=False)
    routeTable = net_connect.send_command('show ip route', use_textfsm=True)
    arpTable = net_connect.send_command('show ip arp', use_textfsm=True)
    acl = net_connect.send_command('show access-list', use_textfsm=True)
    cdp = net_connect.send_command('show cdp neighbors detail', use_textfsm=True)

    for interface in interfaces:
        interface["interface_short"] = {}
        for key in  interface:
            interface[key] = modifyInterface(interface, key)
    
    node = {
        "name": {"name": "Name", "value":version[0]['hostname'], "editable": True},
        "model": {"name": "Model", "value":version[0]['hardware'][0], "editable": False},
        "type": {"name": "Type", "value":"Switch" if "Router" not in typeNode else "Router", "editable": False},
        "upTime": {"name": "UpTime", "value":version[0]['uptime'], "editable": False},
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


print(json.dumps(node))
sys.stdout.flush()
