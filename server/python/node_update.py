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
    config_commands = []

    if sys.argv[4] == 'credentials':
        config_commands = ["username " + sys.argv[5]  + " privilege 15 password " + sys.argv[6],]


    if len(config_commands) > 0:
        output = net_connect.send_config_set(config_commands)

    net_connect.send_command('wr')      
    net_connect.disconnect()

except NameError:
    print(NameError)

node = {"complete": True}
print(json.dumps(node))
sys.stdout.flush()
