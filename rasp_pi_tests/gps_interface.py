import gps
import time
from threading import Thread

class GPSHandler(Thread):
	def __init__(self):
		super(GPSHandler, self).__init__()
		self.lat = 0.0
		self.lon = 0.0

	def run(self):
		session = gps.GPS("localhost", "2947")
		session.stream(gps.WATCH_ENABLE | gps.WATCH_NEWSTYLE)
		while True:
			try:
				self.lat += 0.01
				self.lon += 0.02
				time.sleep(1)			
				report = session.next()
				if report['class'] == 'TPV':
					if hasattr(report, 'lat'):
						self.lat = report.lat
						print("Latitude changed")
					if hasattr(report, 'lon'):
						self.lon = report.lon
						print("Longitude changed")

			except KeyError:
				pass
			except KeyboardInterrupt:
				print("")
				quit()
			except StopIteration:
				quit()


