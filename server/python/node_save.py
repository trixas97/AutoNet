from netmiko import ConnectHandler
import json
import sys

cisco_881 = {
    'device_type': 'cisco_ios',
    'host':   sys.argv[1],
    'username': 'trixas',
    'password': 'trixas'
}
print('opa')

net_connect = ConnectHandler(**cisco_881)
print('ela')

interfaces = net_connect.send_command('show ip int brief', use_textfsm=True)
print(interfaces[0]['intf'])

print(json.dumps(interfaces))
sys.stdout.flush()
