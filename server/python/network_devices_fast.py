import ipaddress
import json
import sys
import nmap

nm = nmap.PortScanner()
nm.scan(sys.argv[1], arguments='-sn')


try:
    nm.scan(sys.argv[1], arguments='-sn')
    node = { "ip" : nm[sys.argv[1]]["addresses"]["ipv4"] }
    try:
        mac = nm[sys.argv[1]]["addresses"]["mac"]
        try:
            node = { "ip" : nm[sys.argv[1]]["addresses"]["ipv4"], 
                     "mac" : mac,
                     "vendor" : nm[sys.argv[1]]["vendor"][mac],
                     "name": nm[sys.argv[1]]["hostnames"][0]["name"],
                     "type" : nm[sys.argv[1]]["hostnames"][0]["type"]}
        except:
                node = { "ip" : nm[sys.argv[1]]["addresses"]["ipv4"], 
                         "mac" : mac,
                         "vendor" : None,
                         "name": nm[sys.argv[1]]["hostnames"][0]["name"],
                         "type" : nm[sys.argv[1]]["hostnames"][0]["type"]}

    except:
        node = { "ip" : nm[sys.argv[1]]["addresses"]["ipv4"], 
                 "mac" : None,
                 "vendor" : None,  
                 "name": nm[sys.argv[1]]["hostnames"][0]["name"],
                 "type" : nm[sys.argv[1]]["hostnames"][0]["type"]}
except:
    node = { "ip" : ""}



print(json.dumps(node))
sys.stdout.flush()