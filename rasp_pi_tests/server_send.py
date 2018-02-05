import decimal
import requests
import json
import time
import sys
import threading
import can_interface
import gps_interface

class vehicle_data:
	def __init__(self, lat, lon, speed, gas):
		self.data = {}
		self.data['latitude'] = lat
		self.data['longitude'] = lon
		self.data['speed'] = speed
		self.data['gas'] = gas

	def __str__(self):
		return 'Currently going ' + str(self.data['speed']) + 'km/hr at (' + str(self.data['latitude']) + ', ' + str(self.data['longitude']) + ') while using ' + str(self.data['gas']) + ' gas.'

def truncate(num):
	return float(decimal.Decimal(num).quantize(decimal.Decimal('.0001'), rounding=decimal.ROUND_DOWN))

def main():
	uri = 'http://35.193.87.37:8080'
	driver_id={'uid':0}
	requests.post(url = uri + '/vehicle', data=driver_id)
	can_handler = can_interface.CANHandler()
	gps_handler = gps_interface.GPSHandler()
	can_handler.start()	
	gps_handler.start()
	try:
		while(True):
			empty_data = vehicle_data(0.0, 0.0, 0.0, 0.0)
			empty_data.data['latitude'] = truncate(gps_handler.lat)
			empty_data.data['longitude'] = truncate(gps_handler.lon)
			empty_data.data['speed'] = truncate(can_handler.speed)
			empty_data.data['gas'] = truncate(can_handler.gas)
			print(empty_data.data)
			sys.stdout.flush()
			print (uri + '/vehicle/' + str(driver_id['uid']))
			requests.put(url = uri + '/vehicle/' + str(driver_id['uid']), data=empty_data.data)
			time.sleep(5)
	except KeyboardInterrupt:
		print("")
		quit()


if __name__ == "__main__":
	main()
