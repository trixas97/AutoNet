import nmap
import asyncio
import json
import sys

nm = nmap.PortScanner()


try:
    nm.scan(sys.argv[1], arguments='-O')
    node = { "vendor": nm[sys.argv[1]]['osmatch'][0]['osclass'][0]['vendor'],
             "ip": sys.argv[1]}

except:
    node = { "vendor": None,
             "ip": sys.argv[1] }


print(json.dumps(node))
sys.stdout.flush()