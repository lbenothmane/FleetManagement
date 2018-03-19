import decimal
import time
import sys
import threading
import can_interface
import gps_interface
import nova_interface
import config



def truncate(num):
	return float(decimal.Decimal(num).quantize(decimal.Decimal('.0001'), rounding=decimal.ROUND_DOWN))
	
class FleetMonitorApp:
	def __init__(self):
		
	def startup(self):
		result = True
		# Check for proper config
		try:
			self.server_uri = config.server['uri']
			self.vid = config.car['vid']
			self.veh_bitrate = config.car['bitrate']
		except AttributeError:
			# log(
			return False
		
		# Check for connectivity
		try:
			self.conn = nova_interface.Connection()
			if not self.connection.setup()
				return False
		except:
			# log(
		
		# Check for PiCAN connection
		try:
			self.can = can_interface.CanHandler(self.veh_bitrate)
			if not self.can.setup():
				return False
		except:
			# log_and_warn(
			return False
			
		# Check for GPS connection
		try:
			self.gps = gps_interface.GPSHandler()
			if not self.gps.setup():
				return False
		except:
			# log_and_warn(
			return False
	
	def run(self):
		try:
			self.can.start()
			self.gps.start()
			self.can.join(None)
			self.gps.join(None)
		except:
			pass
		self.can.shutdown()
		self.gps.shutdown()
		self.connection.shutdown()
		
		

def main():
	app = FleetMonitorApp()
	if app.startup():
		app.run()

	# requests.post(url = uri + '/vehicle', data=driver_id)
	
	# try:
		# while(True):
			# empty_data = vehicle_data(0.0, 0.0, 0.0, 0.0)
			# empty_data.data['latitude'] = truncate(gps_handler.lat)
			# empty_data.data['longitude'] = truncate(gps_handler.lon)
			# empty_data.data['speed'] = truncate(can_handler.speed)
			# empty_data.data['gas'] = truncate(can_handler.gas)
			# print(empty_data.data)
			# sys.stdout.flush()
			# print (uri + '/vehicle/' + str(driver_id['uid']))
			# requests.put(url = uri + '/vehicle/' + str(driver_id['uid']), data=empty_data.data)
			# time.sleep(5)
	# except KeyboardInterrupt:
		# print("")
		# quit()
		


if __name__ == "__main__":
	main()
