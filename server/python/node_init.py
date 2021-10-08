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
    config_commands = [ 'snmp-server community AutoNet RW',
	                    'snmp-server host ' + sys.argv[4] + ' version 2c AutoNet',
	                    'snmp-server trap link ietf',
	                    'snmp-server enable traps snmp authentication linkdown linkup coldstart warmstart' ]
    output = net_connect.send_config_set(config_commands)
    net_connect.send_command('wr')      

    net_connect.disconnect()

except NameError:
    print(NameError)

