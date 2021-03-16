import nmap
import asyncio
import sys

nm = nmap.PortScanner()
nm.scan(sys.argv[1], arguments='-O')
print(nm[sys.argv[1]]['osmatch'][0]['osclass'][0]['vendor'])
