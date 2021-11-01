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
	                    'snmp-server enable traps snmp authentication linkdown linkup coldstart warmstart', 
                        'logging monitor xml',
                        'logging host ' + sys.argv[4],
                        'cdp run' ]


    interfaces = net_connect.send_command('show interfaces', use_textfsm=True)
    
    for interface in interfaces:
        config_commands.append('interface ' + interface["interface"])
        config_commands.append('cdp enable')
        config_commands.append('exit')


    net_connect.send_config_set(config_commands)
    
    i = 100
    flag = True
    for interface in interfaces:

        config_commands = []
        config_commands.append('event manager applet AutonetTraffic')
        config_commands.append('event timer watchdog time 300')

        if flag:
            config_commands.append('action '+ str(i) + ' cli command "en"')
            i += 1
            flag = False
        
        config_commands.append('action '+ str(i) + ' cli command "show interface ' + interface["interface"] + ' | in packets input"')
        i += 1
        config_commands.append('action '+ str(i) + ' set inTr "$_cli_result"')
        i += 1
        config_commands.append('action '+ str(i) + ' cli command "show interface ' + interface["interface"] + ' | in packets output"')
        i += 1
        config_commands.append('action '+ str(i) + ' set outTr "$_cli_result"')
        i += 1
        config_commands.append('action '+ str(i) + ' puts "' + interface["interface"] + ' $inTr"')
        i += 1
        config_commands.append('action '+ str(i) + ' puts "' + interface["interface"] + ' $outTr"')
        i += 1
        config_commands.append('exit')
        output = net_connect.send_config_set(config_commands)
        
    config_commands = []
    config_commands.append('event manager applet AutonetTraffic')
    config_commands.append('event timer watchdog time 300')
    config_commands.append('action '+ str(i+1) + ' puts Traffic_Finish"')
    config_commands.append('exit')
    output = net_connect.send_config_set(config_commands)

    net_connect.send_command('wr')      

    net_connect.disconnect()

except NameError:
    print(NameError)

node = {"complete": True}
print(json.dumps(node))
sys.stdout.flush()
