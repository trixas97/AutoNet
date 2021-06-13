from netmiko import ConnectHandler
import json
import sys
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

    node = {
        "name": version[0]['hostname'],
        "model": version[0]['hardware'][0],
        "interfaces": interfaces,
        "serial": version[0]['serial'][0]
    }
except:
    node = None
# print(interfaces[0])

print(json.dumps(node))
sys.stdout.flush()
