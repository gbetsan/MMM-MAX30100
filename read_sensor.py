import sys 
import os
import smbus
sys.path.append(os.path.abspath("lib/max30100"))
import max30100


mx30 = max30100.MAX30100(i2c=smbus.SMBus(1))
mx30.read_sensor()
print("%d, %d".format(mx30.ir, mx30.red))