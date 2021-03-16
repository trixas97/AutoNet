import ipaddress
import json
import sys

x = list(ipaddress.ip_network(sys.argv[1]).hosts())

ips = []

for i in range(len(x)):
    ips.append({ "ip": str(x[i]) })

print(json.dumps(ips))
sys.stdout.flush()